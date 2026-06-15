-- ────────────────────────────────────────────────────────────────────────────
-- Liquidity Lab — initial schema
-- Run this in the Supabase SQL editor (or `supabase db push`).
-- Only PER-USER data lives here; course content lives in the app code.
-- Every table is protected by Row Level Security: a user can only see/edit own rows.
-- ────────────────────────────────────────────────────────────────────────────

-- 1) Profiles — one row per auth user.
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale_pref  text not null default 'en' check (locale_pref in ('en','tl')),
  created_at   timestamptz not null default now()
);

-- 2) Enrollments — presence of a row = enrolled in the (single) course.
create table if not exists public.enrollments (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  enrolled_at timestamptz not null default now()
);

-- 3) Lesson progress — one row per (user, lesson). `lesson_slug` comes from app code.
create table if not exists public.lesson_progress (
  user_id        uuid not null references auth.users(id) on delete cascade,
  lesson_slug    text not null,
  status         text not null default 'in_progress'
                   check (status in ('in_progress','completed')),
  last_viewed_at timestamptz not null default now(),
  completed_at   timestamptz,
  primary key (user_id, lesson_slug)
);

-- 4) Quiz attempts — history of attempts; multiple per lesson allowed.
create table if not exists public.quiz_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_slug  text not null,
  score        int  not null check (score >= 0),
  total        int  not null check (total > 0),
  answers      jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_lesson_idx
  on public.quiz_attempts (user_id, lesson_slug);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table public.profiles        enable row level security;
alter table public.enrollments     enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts   enable row level security;

-- profiles
create policy "own profile - select" on public.profiles
  for select using (auth.uid() = id);
create policy "own profile - insert" on public.profiles
  for insert with check (auth.uid() = id);
create policy "own profile - update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- enrollments
create policy "own enrollment - select" on public.enrollments
  for select using (auth.uid() = user_id);
create policy "own enrollment - insert" on public.enrollments
  for insert with check (auth.uid() = user_id);

-- lesson_progress
create policy "own progress - select" on public.lesson_progress
  for select using (auth.uid() = user_id);
create policy "own progress - insert" on public.lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "own progress - update" on public.lesson_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- quiz_attempts
create policy "own attempts - select" on public.quiz_attempts
  for select using (auth.uid() = user_id);
create policy "own attempts - insert" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);

-- ── Auto-create a profile when a user signs up ───────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
