# Architecture

How SMC Course stays free while serving thousands of users, and how the pieces fit.

## Big picture
```
            ┌──────────────────────── Vercel (free Hobby) ────────────────────────┐
 Browser ── │  Next.js App Router                                                  │
 (mobile)   │   • Static lesson/module/landing pages (SSG) → served from CDN edge  │
            │   • Client-side SWR data layer (dashboard, academy, journal)         │
            │   • Server Actions for writes (enroll, progress, quiz attempt)       │
            │   • Middleware: session refresh + rate limiting + security            │
            └───────────────┬─────────────────────────────────────────────────────┘
                            │ https + wss
            ┌───────────────▼──────────── Supabase (free) ────────────────────────┐
            │  Auth (magic-link + Google) · Postgres · Row Level Security          │
            │  REST API (PostgREST) ← browser reads go here, not through pool     │
            └─────────────────────────────────────────────────────────────────────┘
```

## Why this scales on free tiers
- **Course content is static.** Modules/lessons are TypeScript data compiled into
  statically generated pages. They serve from Vercel's CDN edge → ~zero compute,
  effectively unlimited reads. Adding users does not add content cost.
- **Reads bypass the DB connection pool.** Dashboard, academy, courses, and journal
  pages are client components that fetch via the Supabase browser SDK (REST API over
  HTTPS). This does NOT consume pooled DB connections, dramatically increasing the
  number of concurrent readers the free tier can serve.
- **Multi-layer caching.** SWR (in-memory) + localStorage (survives reloads) +
  stale-while-revalidate HTTP headers. Most page navigations never touch the database.
- **DB only holds per-user rows.** Enrollment, lesson progress, and quiz attempts are
  small and infrequent. Supabase free tier (~50k MAU, 500MB DB) covers thousands of
  learners comfortably.
- **No video, no media egress.** Visuals are code-rendered SVG charts, not files.

## Multi-layer caching architecture
```
User action
  ↓
Layer 1: SWR in-memory cache              ← instant, ~80% of reads stop here
  ↓ miss
Layer 2: localStorage (TTL-based)         ← survives page reloads, offline fallback
  ↓ miss
Layer 3: Vercel CDN edge                  ← stale-while-revalidate for static pages
  ↓ miss
Layer 4: Supabase REST API (browser SDK)  ← bypasses server DB pool entirely
  ↓ writes only
Layer 5: Server Actions → Database        ← quiz saves, journal writes, chat
```

Cache invalidation: after writes (quiz pass, journal save), `swr.mutate()` revalidates
affected keys so the UI reflects the latest state without a full page reload.

## Rendering strategy
- Landing, module list, lesson pages: **SSG** (and ISR if ever needed). Cacheable.
- Dashboard, academy, journal: **static shell** (client components) + **SWR data
  fetching** via browser Supabase client. No server-side DB queries.
- Interactivity (charts, quizzes, toggles): client components hydrated on top of
  static HTML.

## Auth & data flow
- `@supabase/ssr` stores the session in httpOnly cookies. Three helpers in
  `src/lib/supabase/`: `client.ts` (browser), `server.ts` (RSC/actions), `middleware.ts`
  (cookie refresh). Middleware runs on protected routes.
- Reads: SWR hooks in `src/lib/hooks/use-user-data.ts` fetch via the browser Supabase
  client (REST API). Cached in memory + localStorage.
- Writes go through **Server Actions** with zod validation + per-user rate limiting.
  The client never writes to the DB directly with elevated rights; RLS enforces "users
  touch only their own rows."

## Data model (see `supabase/migrations/`)
- `profiles(id → auth.users, display_name, email, locale_pref, created_at)`
- `enrollments(user_id, enrolled_at)` — one row = enrolled in the course.
- `lesson_progress(user_id, lesson_slug, status, last_viewed_at, completed_at)`
- `quiz_attempts(user_id, lesson_slug, score, total, answers jsonb, attempted_at)`
- `notes(id, user_id, content, lesson_slug, …)` — private scratchpad.
- `journal_entries(id, user_id, pair, direction, entry/stop/target, rr, outcome, …)` — private.
- `chat_messages(id, user_id, display_name, body, deleted_at, …)` + `chat_bans` — global chat
  (Realtime). `announcements(id, body, active, …)` — admin → all.
- Per-user tables: RLS `using (auth.uid() = user_id)`, plus an "admin read all" SELECT policy
  gated on `public.is_admin()` (admin = a non-editable `auth.users.app_metadata` JWT claim).
  Chat is readable by any signed-in user (non-deleted) and moderated by admins. Slugs come from
  `src/content/course.ts`.

## Caching & performance
- Static pages: immutable CDN caching by Next/Vercel + stale-while-revalidate headers.
- Client data: SWR hooks (`src/lib/hooks/use-user-data.ts`) + localStorage cache
  (`src/lib/cache.ts`) with TTL presets (progress 5min, dashboard 2min, journal 3min,
  profile 10min).
- Dynamic imports: SmcChart and CommunityChat are lazy-loaded (`next/dynamic`).
- Fonts: `next/font` (self-hosted at build, no layout shift).
- Charts: lightweight inline SVG; animate with Framer Motion; respect reduced-motion.

## Security
- TLS/HTTPS + HSTS automatic on Vercel; extra headers in `next.config.mjs`.
- Content-Security-Policy: allows self, Supabase, and chat relay. Blocks frames/objects.
- RLS on every user table. Middleware-level auth gating for protected routes.
- Rate limiting: IP-based in middleware (login 10/min, auth 10/min, API 30/min) +
  user-ID-based in server actions (chat 12/min, quiz 10/min, journal 20/min, exam 5/min,
  notes 30/min). In-memory sliding windows.
- zod validation on all Server Action inputs. Secrets only in env (never `NEXT_PUBLIC_*`
  except the anon URL/key, which are public by design).
- Open redirect protection: auth callback + login validate `next` param against allowlist.

## Deployment
1. Push repo to GitHub. 2. Import to Vercel. 3. Set env vars (see `.env.example`).
4. Create Supabase project, run `supabase/migrations/`, set Auth redirect URLs.
5. Deploy. Vercel handles TLS, CDN, previews. (Hobby tier = non-commercial; a free
   course qualifies. Monetizing later → Vercel Pro.)
