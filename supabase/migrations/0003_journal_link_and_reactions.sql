-- ────────────────────────────────────────────────────────────────────────────
-- SMC Course — journal lesson-link + chat reactions
-- Adds: journal_entries.lesson_slug (link a trade to the lesson/setup it used),
-- and chat_reactions (emoji reactions on community messages, realtime).
-- ────────────────────────────────────────────────────────────────────────────

-- Link a journaled trade to the SMC lesson/setup it used (optional).
alter table public.journal_entries add column if not exists lesson_slug text;

-- Emoji reactions on chat messages. One row per (message, user, emoji).
create table if not exists public.chat_reactions (
  message_id uuid not null references public.chat_messages(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  emoji      text not null check (char_length(emoji) between 1 and 8),
  created_at timestamptz not null default now(),
  primary key (message_id, user_id, emoji)
);
create index if not exists chat_reactions_message_idx
  on public.chat_reactions (message_id);

alter table public.chat_reactions enable row level security;
drop policy if exists "reactions - read" on public.chat_reactions;
drop policy if exists "reactions - insert own" on public.chat_reactions;
drop policy if exists "reactions - delete own" on public.chat_reactions;
-- Any signed-in user can read reactions; you may only add/remove your own.
create policy "reactions - read" on public.chat_reactions
  for select using (auth.uid() is not null);
create policy "reactions - insert own" on public.chat_reactions
  for insert with check (auth.uid() = user_id);
create policy "reactions - delete own" on public.chat_reactions
  for delete using (auth.uid() = user_id);

-- Live reaction updates (idempotent publish).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'chat_reactions'
  ) then
    alter publication supabase_realtime add table public.chat_reactions;
  end if;
end$$;
