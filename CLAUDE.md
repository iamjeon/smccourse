# CLAUDE.md — Liquidity Lab (Free SMC Course Platform)

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
- `src/app/` — routes (landing, auth, dashboard, modules, lesson, quiz).
- `src/components/charts/` — interactive SMC chart engine (candles + annotations).
- `src/components/ui/` — base UI primitives.
- `src/content/course.ts` — course taxonomy (modules/lessons). Static, in code.
- `src/content/lessons/` — per-lesson typed content (EN + TL) + chart specs + quiz.
- `src/lib/supabase/` — client/server/middleware Supabase helpers.
- `src/lib/brand.ts` — brand name/tagline. Colors: [BRAND.md](BRAND.md).
- `supabase/migrations/` — DB schema + RLS.
- `.claude/` — agents & skills (see below).

## Content pipeline
Transforming a transcript → lesson is a defined process: verify → clean & structure
(EN+TL) → spec visuals → generate quiz → review. Full method:
[CONTENT-PIPELINE.md](CONTENT-PIPELINE.md). Use the `smc-content` skill /
`smc-lesson-builder` agent.

## Agents & skills (`.claude/`)
- `agents/smc-lesson-builder.md` — converts one transcript into a reviewable lesson.
- `skills/smc-content/` — the transformation method + templates.
- `skills/prompt-helper/` — turns the owner's rough idea into a clear prompt.
- `skills/smc-design/` — brand + mobile UI guardrails for any new screen.

## Commands
- `npm run dev` — local dev (http://localhost:3000).
- `npm run build` — production build. `npm run typecheck` — types. `npm run lint`.
- DB: apply files in `supabase/migrations/` via the Supabase SQL editor or CLI.

## Conventions
- Lesson content is **typed TS objects**, not MDX (better for bilingual + embedded
  interactive charts). See [DECISIONS.md](DECISIONS.md).
- Course structure lives in code (cacheable); the DB only stores per-user rows
  (`profiles`, `enrollments`, `lesson_progress`, `quiz_attempts`).
- Slugs are the join key between code content and DB progress — never reuse a slug.
- Prefer Server Components; mark interactive bits `"use client"`.

## Self-updating rule (IMPORTANT)
When we agree on a new decision, convention, or method during a session:
1. Append it to [DECISIONS.md](DECISIONS.md) (dated, one entry).
2. Update the relevant pointer/line here or in the linked doc.
Keep this file short — push detail into the linked docs, not into CLAUDE.md.

## Status / next steps
See the "Build order" and current progress in
[DECISIONS.md](DECISIONS.md#status). Update it as milestones complete.
