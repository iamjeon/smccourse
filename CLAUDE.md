# CLAUDE.md — SMC Course (Free SMC Course Platform)

> Guidance for Claude when working in this repo. Keep this file **under 100 lines**.
> Details live in the linked docs — link, don't inline.

## What this is
A free, mobile-first web platform that turns an SMC (Smart Money Concepts) trading
course (transcripts only — no video) into Modules → Lessons → Quizzes. Users enroll
free, learn with interactive charts, and take quizzes. Must run on **free tiers** and
hold **thousands of users**. The owner is **not a developer** — explain choices simply.

## Golden rules
1. **Accuracy first.** Lesson content must stay faithful to the source transcript in
   `../TextCourse`. Never invent SMC rules. Flag mislabeled transcripts (some exist).
2. **Free-tier only.** No paid services. Keep lesson pages static/cacheable. Only
   per-user data touches the DB.
3. **Mobile-first.** Design at 360px first. See [BRAND.md](BRAND.md).
4. **Bilingual.** Every lesson ships English + Taglish; UI has an EN/TL toggle.
5. **Security by default.** RLS on all user tables; never expose secrets; validate input.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind + custom UI · Framer Motion ·
Supabase (Auth + Postgres + RLS) · Vercel (TLS + CDN). Details:
[ARCHITECTURE.md](ARCHITECTURE.md).

## Map of the repo
- `src/app/` — routes (landing, auth, dashboard, course, lesson, exam, `/community`, `/admin`,
  `/tools/*`, `/certificate`). `*-actions.ts` = grouped Server Actions (notes/chat/journal/admin).
- `src/components/charts/` — interactive SMC chart engine (candles + annotations).
- `src/components/ui/` — base UI primitives (Button, Card, Sheet, Input, Textarea, Badge).
- `src/components/shell/` — responsive app shell (desktop sidebar + mobile drawer) for `(app)`.
- `src/components/floating/notes-panel.tsx` — private notes slide-over (opened from the shell).
- `src/components/community/` — full-page global chat (presence + reactions).
- `src/components/admin/` — admin dashboard islands (user table, moderation, announcements).
- `src/content/course.ts` — course taxonomy (modules/lessons). Static, in code.
- `src/content/lessons/` — per-lesson typed content (EN + TL) + chart specs + quiz.
- `src/content/glossary.ts` — SMC glossary (bilingual, faithful to lessons).
- `src/lib/supabase/` — client/server/middleware helpers + `require-user` (`requireUser`/`requireAdmin`).
- `src/lib/hooks/use-user-data.ts` — SWR hooks for client-side data (progress, dashboard, journal, profile).
- `src/lib/cache.ts` — localStorage cache with TTL (Layer 2 of caching architecture).
- `src/lib/auth.ts` — admin role check (`isAdmin`; role = `app_metadata` JWT claim).
- `src/lib/brand.ts` — brand name/tagline. Colors: [BRAND.md](BRAND.md).
- `supabase/migrations/` — DB schema + RLS (`0002` notes/chat/journal/announcements + admin;
  `0003` journal lesson-link + chat reactions).
- `.claude/` — agents & skills (see below).

## Content pipeline (READ COURSE-BUILD.md FIRST)
**[COURSE-BUILD.md](COURSE-BUILD.md) is the durable master plan** (22-lesson inventory, rules,
build order, final-exam spec) — read it first; it must survive context compaction. Flow:
verify → **coverage checklist** → clean & structure (EN+TL, story-style) → spec **guided**
charts (steps + "Spot it" tips + structural proof) → **10-question** quiz (100% pass) →
verify (`check:coverage`, `validate:charts`, `typecheck`, `lint`) → review. Full method:
[CONTENT-PIPELINE.md](CONTENT-PIPELINE.md). Use the `smc-content`/`smc-chart` skills +
`smc-lesson-builder`/`smc-chart-builder` agents. Beginner-first: spoon-feed, never assume.

## Agents & skills (`.claude/`)
- `agents/smc-lesson-builder.md` — converts one transcript into a reviewable lesson.
- `agents/smc-chart-builder.md` — builds/fixes ONE chart until the validator passes.
- `agents/smc-smoke-tester.md` — runs the debug + smoke test and reports pass/fail.
- `skills/smc-content/` — the transformation method + templates.
- `skills/smc-chart/` — accurate chart-authoring rules.
- `skills/smc-design/` — brand + UI/UX + app-shell guardrails for any new screen.
- `skills/smc-smoke/` — the debug + smoke-test procedure (run after every change).
- `skills/smc-perf/` — multi-layer caching architecture + scalability rules.
- `skills/prompt-helper/` — turns the owner's rough idea into a clear prompt.

## Always smoke-test after a change (IMPORTANT)
After ANY code or schema change, run the **`smc-smoke`** procedure (or the
**`smc-smoke-tester`** agent) BEFORE reporting done: `typecheck`, `lint`, `validate:charts`,
`check:coverage`, and (for UI/route/dep changes) `npm run build` — confirm `/learn` stays SSG,
then delete `.next`. After a DB migration, also run the Supabase security advisor via MCP.

## Commands
- `npm run dev` — local dev (http://localhost:3000).
- `npm run build` — production build. `npm run typecheck` — types. `npm run lint`.
- `npm run validate:charts` — chart accuracy (0 errors). `npm run check:coverage` — every
  lesson has a `// COVERAGE` checklist (smoke test).
- DB: apply files in `supabase/migrations/` (kept in sync with the live project).

## Platform tasks — use the MCP first
For Supabase (and other platforms like Vercel), **prefer the connected MCP** over manual
dashboard/CLI steps: apply migrations, inspect tables, read logs, and run security advisors
through it. The Supabase project is **`bgsewtiawzbueeswhvem` ("SMC Course")** and the schema
above is already applied. After any DDL change, run the security advisor and keep
`supabase/migrations/` matching the live DB.

## Conventions
- Lesson content is **typed TS objects**, not MDX (better for bilingual + embedded
  interactive charts). See [DECISIONS.md](DECISIONS.md).
- Course structure + glossary live in code (cacheable); the DB stores per-user rows
  (`profiles`, `enrollments`, `lesson_progress`, `quiz_attempts`, `notes`, `journal_entries`)
  plus community tables (`chat_messages`, `chat_bans`, `announcements`).
- Slugs are the join key between code content and DB progress — never reuse a slug.
- Prefer Server Components; mark interactive bits `"use client"`. Keep `/learn` SSG: anything
  mounted in `(app)/layout.tsx` must be a client component, never a server fetch.
- **Admin** = a non-editable `app_metadata` JWT claim; check with `isAdmin` ([src/lib/auth.ts](src/lib/auth.ts)).
  Admin cross-user reads go through RLS ("admin read all" policies) + SECURITY INVOKER RPCs. No CMS:
  lesson content stays in code; the admin dashboard is analytics + moderation + preview only.

## Self-updating rule (IMPORTANT)
When we agree on a new decision, convention, or method during a session:
1. Append it to [DECISIONS.md](DECISIONS.md) (dated, one entry).
2. Update the relevant pointer/line here or in the linked doc.
Keep this file short — push detail into the linked docs, not into CLAUDE.md.

## Status / next steps
See the "Build order" and current progress in
[DECISIONS.md](DECISIONS.md#status). Update it as milestones complete.
