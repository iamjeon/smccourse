-- ────────────────────────────────────────────────────────────────────────────
-- SMC Course — community, notes, journal, announcements + admin access
-- Adds: notes (private), chat_messages + chat_bans (global chat, moderated),
-- journal_entries (private), announcements (admin → all), and admin analytics RPCs.
--
-- Admin is a JWT claim in auth.users.app_metadata ({"role":"admin"}); it is NOT
-- user-editable. RLS stays the single source of truth: base tables are own-row,
-- PLUS an "admin read all" SELECT policy gated on public.is_admin(). The analytics
-- functions are SECURITY INVOKER (they read through those admin-read policies), so
-- no SECURITY DEFINER data function ever bypasses RLS.
-- ────────────────────────────────────────────────────────────────────────────

-- ── Admin claim helper (used by RLS + admin RPCs) ────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

-- ── profiles: add email + backfill (admins read it via the admin-read policy) ─
alter table public.profiles add column if not exists email text;

insert into public.profiles (id, display_name, email)
select u.id,
       coalesce(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
       u.email::text
from auth.users u
on conflict (id) do nothing;

update public.profiles p
  set email = u.email::text
  from auth.users u
  where u.id = p.id and p.email is null;

-- Keep email + name fresh on signup (overrides the 0001 version).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, email)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
          new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public, anon, authenticated;

-- Admin-read policies on the existing per-user tables (RLS stays authoritative).
drop policy if exists "admin read all - profiles" on public.profiles;
create policy "admin read all - profiles" on public.profiles
  for select using (public.is_admin());
drop policy if exists "admin read all - enrollments" on public.enrollments;
create policy "admin read all - enrollments" on public.enrollments
  for select using (public.is_admin());
drop policy if exists "admin read all - lesson_progress" on public.lesson_progress;
create policy "admin read all - lesson_progress" on public.lesson_progress
  for select using (public.is_admin());
drop policy if exists "admin read all - quiz_attempts" on public.quiz_attempts;
create policy "admin read all - quiz_attempts" on public.quiz_attempts
  for select using (public.is_admin());

-- ── 1) Notes — private OneNote-style scratchpad, one row per note ────────────
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  content     text not null default '',
  lesson_slug text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists notes_user_updated_idx
  on public.notes (user_id, updated_at desc);

alter table public.notes enable row level security;
drop policy if exists "own notes - select" on public.notes;
drop policy if exists "own notes - insert" on public.notes;
drop policy if exists "own notes - update" on public.notes;
drop policy if exists "own notes - delete" on public.notes;
create policy "own notes - select" on public.notes
  for select using (auth.uid() = user_id);
create policy "own notes - insert" on public.notes
  for insert with check (auth.uid() = user_id);
create policy "own notes - update" on public.notes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own notes - delete" on public.notes
  for delete using (auth.uid() = user_id);

-- ── 2) Chat bans — moderation list (define before chat_messages trigger) ─────
create table if not exists public.chat_bans (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  reason     text,
  until      timestamptz,            -- null = permanent
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
alter table public.chat_bans enable row level security;
drop policy if exists "bans - admin all" on public.chat_bans;
drop policy if exists "bans - own select" on public.chat_bans;
create policy "bans - admin all" on public.chat_bans
  for all using (public.is_admin()) with check (public.is_admin());
create policy "bans - own select" on public.chat_bans
  for select using (auth.uid() = user_id);

-- ── 3) Chat messages — single global room, soft-deletable by admins ──────────
create table if not exists public.chat_messages (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  body         text not null check (char_length(body) between 1 and 500),
  created_at   timestamptz not null default now(),
  deleted_at   timestamptz,
  deleted_by   uuid references auth.users(id)
);
create index if not exists chat_messages_created_idx
  on public.chat_messages (created_at desc);
-- FULL replica identity so moderation (soft-delete) UPDATE events carry enough
-- data for realtime subscribers to react.
alter table public.chat_messages replica identity full;

alter table public.chat_messages enable row level security;
drop policy if exists "chat - read non-deleted" on public.chat_messages;
drop policy if exists "chat - admin read all" on public.chat_messages;
drop policy if exists "chat - insert own" on public.chat_messages;
drop policy if exists "chat - admin update" on public.chat_messages;
-- read: any signed-in user sees non-deleted messages; admins see everything
create policy "chat - read non-deleted" on public.chat_messages
  for select using (auth.uid() is not null and deleted_at is null);
create policy "chat - admin read all" on public.chat_messages
  for select using (public.is_admin());
-- insert: only as yourself (rate-limit + ban + name enforced by trigger below)
create policy "chat - insert own" on public.chat_messages
  for insert with check (auth.uid() = user_id and deleted_at is null);
-- update (soft delete / unhide): admins only
create policy "chat - admin update" on public.chat_messages
  for update using (public.is_admin()) with check (public.is_admin());

-- Enforce ban, slow-mode (5s), and trusted display_name on every insert.
create or replace function public.enforce_chat_rules()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  ban_row   public.chat_bans%rowtype;
  last_at   timestamptz;
  name_val  text;
begin
  -- Ban check (permanent or still within window)
  select * into ban_row from public.chat_bans where user_id = new.user_id;
  if found and (ban_row.until is null or ban_row.until > now()) then
    raise exception 'You are not allowed to post in chat.' using errcode = 'check_violation';
  end if;

  -- Slow mode: at least 5 seconds between messages from the same user
  select max(created_at) into last_at
    from public.chat_messages where user_id = new.user_id;
  if last_at is not null and last_at > now() - interval '5 seconds' then
    raise exception 'Slow down. Wait a few seconds between messages.' using errcode = 'check_violation';
  end if;

  -- Trust the server-side profile name, never the client-supplied one
  select coalesce(display_name, 'Trader') into name_val
    from public.profiles where id = new.user_id;
  new.display_name := coalesce(name_val, 'Trader');
  return new;
end;
$$;
revoke all on function public.enforce_chat_rules() from public, anon, authenticated;

drop trigger if exists chat_enforce_rules on public.chat_messages;
create trigger chat_enforce_rules
  before insert on public.chat_messages
  for each row execute function public.enforce_chat_rules();

-- Live updates: publish chat to Supabase Realtime (idempotent).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'chat_messages'
  ) then
    alter publication supabase_realtime add table public.chat_messages;
  end if;
end$$;

-- ── 4) Trading journal — private trade log ───────────────────────────────────
create table if not exists public.journal_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  pair       text not null,
  direction  text not null check (direction in ('long','short')),
  setup      text,
  entry      numeric,
  stop       numeric,
  target     numeric,
  rr         numeric,
  outcome    text not null default 'open' check (outcome in ('win','loss','breakeven','open')),
  notes      text,
  traded_at  timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists journal_user_traded_idx
  on public.journal_entries (user_id, traded_at desc);

alter table public.journal_entries enable row level security;
drop policy if exists "own journal - select" on public.journal_entries;
drop policy if exists "own journal - insert" on public.journal_entries;
drop policy if exists "own journal - update" on public.journal_entries;
drop policy if exists "own journal - delete" on public.journal_entries;
create policy "own journal - select" on public.journal_entries
  for select using (auth.uid() = user_id);
create policy "own journal - insert" on public.journal_entries
  for insert with check (auth.uid() = user_id);
create policy "own journal - update" on public.journal_entries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own journal - delete" on public.journal_entries
  for delete using (auth.uid() = user_id);

-- ── 5) Announcements — admin posts, all signed-in users read active ones ─────
create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  body       text not null check (char_length(body) between 1 and 1000),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  active     boolean not null default true
);
alter table public.announcements enable row level security;
drop policy if exists "announcements - read active" on public.announcements;
drop policy if exists "announcements - admin all" on public.announcements;
create policy "announcements - read active" on public.announcements
  for select using (auth.uid() is not null and active = true);
create policy "announcements - admin all" on public.announcements
  for all using (public.is_admin()) with check (public.is_admin());

-- ── 6) Admin analytics RPCs (SECURITY INVOKER; read via admin-read RLS) ──────
create or replace function public.admin_overview()
returns json
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return (select json_build_object(
    'users',             (select count(*) from public.profiles),
    'enrolled',          (select count(*) from public.enrollments),
    'lessons_completed', (select count(*) from public.lesson_progress
                            where status = 'completed' and lesson_slug <> 'final-exam'),
    'exam_passes',       (select count(*) from public.lesson_progress
                            where lesson_slug = 'final-exam' and status = 'completed'),
    'active_7d',         (select count(distinct user_id) from public.lesson_progress
                            where last_viewed_at > now() - interval '7 days'),
    'active_30d',        (select count(distinct user_id) from public.lesson_progress
                            where last_viewed_at > now() - interval '30 days')
  ));
end;
$$;

create or replace function public.admin_user_list()
returns table (
  user_id         uuid,
  display_name    text,
  email           text,
  locale_pref     text,
  enrolled_at     timestamptz,
  completed_count bigint,
  last_viewed     timestamptz,
  exam_passed     boolean
)
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select p.id,
           coalesce(p.display_name, split_part(coalesce(p.email, ''), '@', 1)),
           p.email,
           coalesce(p.locale_pref, 'en'),
           e.enrolled_at,
           coalesce(lp.completed_count, 0),
           lp.last_viewed,
           coalesce(ex.passed, false)
    from public.profiles p
    left join public.enrollments e on e.user_id = p.id
    left join (
      select user_id,
             count(*) filter (where status = 'completed' and lesson_slug <> 'final-exam') as completed_count,
             max(last_viewed_at) as last_viewed
      from public.lesson_progress group by user_id
    ) lp on lp.user_id = p.id
    left join (
      select user_id, true as passed
      from public.lesson_progress
      where lesson_slug = 'final-exam' and status = 'completed'
    ) ex on ex.user_id = p.id
    order by lp.last_viewed desc nulls last;
end;
$$;

create or replace function public.admin_lesson_stats()
returns table (
  lesson_slug       text,
  completed_count   bigint,
  in_progress_count bigint,
  attempts          bigint,
  avg_attempts      numeric
)
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return query
    select coalesce(lp.lesson_slug, qa.lesson_slug) as lesson_slug,
           coalesce(lp.completed_count, 0),
           coalesce(lp.in_progress_count, 0),
           coalesce(qa.attempts, 0),
           case when coalesce(qa.distinct_users, 0) > 0
                then round(qa.attempts::numeric / qa.distinct_users, 2) else 0 end
    from (
      select lesson_slug,
             count(*) filter (where status = 'completed')   as completed_count,
             count(*) filter (where status = 'in_progress') as in_progress_count
      from public.lesson_progress group by lesson_slug
    ) lp
    full outer join (
      select lesson_slug, count(*) as attempts, count(distinct user_id) as distinct_users
      from public.quiz_attempts group by lesson_slug
    ) qa on qa.lesson_slug = lp.lesson_slug;
end;
$$;

-- Admin RPCs are guarded internally; expose only to signed-in users, never anon.
revoke all on function public.admin_overview()       from public, anon;
revoke all on function public.admin_user_list()       from public, anon;
revoke all on function public.admin_lesson_stats()    from public, anon;
grant execute on function public.admin_overview()     to authenticated;
grant execute on function public.admin_user_list()    to authenticated;
grant execute on function public.admin_lesson_stats() to authenticated;
