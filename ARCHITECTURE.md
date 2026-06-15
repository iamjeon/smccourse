# Architecture

How Liquidity Lab stays free while serving thousands of users, and how the pieces fit.

## Big picture
```
            ┌──────────────────────── Vercel (free Hobby) ────────────────────────┐
 Browser ── │  Next.js App Router                                                  │
 (mobile)   │   • Static lesson/module/landing pages (SSG) → served from CDN edge  │
            │   • Server Components for dashboard (reads session)                  │
            │   • Server Actions for writes (enroll, progress, quiz attempt)       │
            │   • Middleware: refresh Supabase session cookie + security           │
            └───────────────┬─────────────────────────────────────────────────────┘
                            │ https + wss
            ┌───────────────▼──────────── Supabase (free) ────────────────────────┐
            │  Auth (magic-link + Google) · Postgres · Row Level Security          │
            └─────────────────────────────────────────────────────────────────────┘
```

## Why this scales on free tiers
- **Course content is static.** Modules/lessons are TypeScript data compiled into
  statically generated pages. They serve from Vercel's CDN edge → ~zero compute,
  effectively unlimited reads. Adding users does not add content cost.
- **DB only holds per-user rows.** Enrollment, lesson progress, and quiz attempts are
  small and infrequent. Supabase free tier (~50k MAU, 500MB DB) covers thousands of
  learners comfortably.
- **No video, no media egress.** Visuals are code-rendered SVG charts, not files.

## Rendering strategy
- Landing, module list, lesson pages: **SSG** (and ISR if ever needed). Cacheable.
- Dashboard & anything user-specific: **dynamic** Server Components reading the session.
- Interactivity (charts, quizzes, toggles): client components hydrated on top of static HTML.

## Auth & data flow
- `@supabase/ssr` stores the session in httpOnly cookies. Three helpers in
  `src/lib/supabase/`: `client.ts` (browser), `server.ts` (RSC/actions), `middleware.ts`
  (cookie refresh). Middleware runs on protected routes.
- Writes go through **Server Actions** with zod validation. The client never writes to
  the DB directly with elevated rights; RLS enforces "users touch only their own rows."

## Data model (see `supabase/migrations/`)
- `profiles(id → auth.users, display_name, locale_pref, created_at)`
- `enrollments(user_id, enrolled_at)` — one row = enrolled in the course.
- `lesson_progress(user_id, lesson_slug, status, last_viewed_at, completed_at)`
- `quiz_attempts(user_id, lesson_slug, score, total, answers jsonb, attempted_at)`
- All tables: RLS `using (auth.uid() = user_id)`. Slugs come from `src/content/course.ts`.

## Caching & performance
- Static pages: immutable CDN caching by Next/Vercel.
- Fonts: `next/font` (self-hosted at build, no layout shift).
- Images/screenshots (if added): `next/image`.
- Charts: lightweight inline SVG; animate with Framer Motion; respect reduced-motion.

## Security
- TLS/HTTPS + HSTS automatic on Vercel; extra headers in `next.config.mjs`.
- RLS on every user table. Server-side session checks for protected routes.
- zod validation on all Server Action inputs. Secrets only in env (never `NEXT_PUBLIC_*`
  except the anon URL/key, which are public by design).
- Light rate-limiting on auth actions (add Upstash free or simple in-memory guard).

## Deployment
1. Push repo to GitHub. 2. Import to Vercel. 3. Set env vars (see `.env.example`).
4. Create Supabase project, run `supabase/migrations/`, set Auth redirect URLs.
5. Deploy. Vercel handles TLS, CDN, previews. (Hobby tier = non-commercial; a free
   course qualifies. Monetizing later → Vercel Pro.)
