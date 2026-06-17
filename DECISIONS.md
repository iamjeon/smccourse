# Decisions Log

Append-only record of choices we've agreed on. Newest first. Each entry: date, decision,
why. CLAUDE.md's "self-updating rule" points here — add an entry whenever we decide
something new.

---

## 2026-06-17 — Debug + smoke-test skill & agent (owner decision)
Added a standing "smoke test after every change" workflow so regressions are caught before work
is reported done.
- **`skills/smc-smoke/SKILL.md`** — the procedure: `typecheck`, `lint`, `validate:charts`,
  `check:coverage`, production `build` (confirm `/learn` stays SSG), the known-benign warnings
  (chart "first pivot" warns, the `next lint` deprecation notice, the leaked-password Auth toggle),
  the Windows `.next` cache pitfall (delete `.next` after a build so `next dev` isn't corrupted),
  runtime route checks, and the Supabase security-advisor step after a migration.
- **`agents/smc-smoke-tester.md`** — runs those checks, fixes small unambiguous breakages, and
  reports an honest PASS/FAIL with real output; flags the MCP advisor step for DB changes.
- **CLAUDE.md** gained an "Always smoke-test after a change" rule pointing here.
- Note: a skill/agent is invoked by convention (by Claude at end of a change set), not auto-fired.
  Truly automatic enforcement would need a settings.json hook (e.g. a Stop hook running the static
  checks); offered, not yet added, since build-on-every-edit would be too heavy.

## 2026-06-17 — App-shell navigation + feature enhancements (owner decision)
Redesigned the authenticated navigation into a proper app shell and deepened the tools/community.
Migration `0003_journal_link_and_reactions.sql` (applied via MCP, advisor clean).

- **Responsive app shell** (`src/components/shell/app-shell.tsx`) wraps all `(app)` routes,
  replacing the old top header + bottom tab bar + floating dock. Desktop: persistent left
  **sidebar** (256px, grouped Learn / Tools / Community / Manage; theme+locale+sign-out in the
  footer). Mobile (owner choice): **hamburger drawer only** (no bottom bar) via `Sheet side="left"`
  + a slim top bar with a quick-notes button. `SiteHeader` stays for public pages (landing/login).
- **Surfaces (owner choices):** Community **chat is a full page** `/community`; **Notes is a
  slide-over** (`Sheet`) opened from the shell. Floating FAB dock retired. Old `mobile-nav.tsx`,
  `floating/floating-dock.tsx`, `floating/chat-panel.tsx` deleted.
- **`Sheet` gained a `side` prop** ("panel" responsive default, "left" drawer). `/community`,
  `/exam`, `/certificate` added to middleware's protected prefixes.
- **Community chat enhanced:** online **presence** count (Realtime presence) + emoji **reactions**
  (`chat_reactions` table, realtime, RLS own insert/delete; toggled client-side).
- **Risk calculator enhanced:** account currency, 0.5/1/2% risk presets, breakeven reference, up to
  3 take-profits each with its own R:R + projected profit, clearer result cards.
- **Journal enhanced:** edit entries (`updateJournalEntry`), outcome/direction filters, richer stats
  (win rate, avg R:R, **Net R**), and a **lesson link** (`journal_entries.lesson_slug`) so a trade
  ties to the SMC concept it used.
- **Glossary enhanced:** each term links to the lesson that teaches it (only where unambiguous, to
  stay accurate) + related-term chips. **Notes enhanced:** light markdown (write/preview) + the
  linked lesson title surfaced as a chip.
- **smc-design skill updated** with an "App shell & navigation" standard (sidebar + mobile drawer,
  single global controls in the shell, chat=page / notes=slide-over, no per-view nav or FABs).
- **Admin note:** the admin role is a non-editable `auth.users.app_metadata` claim; there is no
  separate admin login. Sign in normally with the admin email; the Admin link appears in the
  sidebar. Owner `hiribitirlufreedocs@gmail.com` is admin (set via MCP).

## 2026-06-17 — Admin dashboard + community + trader tools (owner decision)
Added an admin role, an admin dashboard, a global community chat, a private floating notes
widget, and four trader tools. All on the existing free stack (Supabase + Vercel). Migration:
`supabase/migrations/0002_community_and_tools.sql` (applied via MCP; security advisor clean
except the pre-existing, owner-toggled leaked-password setting).

- **Admin = a JWT claim, not a DB flag.** The role lives in `auth.users.app_metadata`
  (`{"role":"admin"}`), which users cannot edit. Read server-side via `user.app_metadata.role`
  (`src/lib/auth.ts` → `isAdmin`/`getAuth`) and in RLS via `public.is_admin()`. To make someone
  admin, set their `app_metadata.role` via the Supabase MCP, then they **re-login** so the new
  JWT carries the claim. Owner `hiribitirlufreedocs@gmail.com` is admin.
- **RLS stays the single source of truth.** Base per-user tables keep own-row policies, PLUS an
  "admin read all" SELECT policy gated on `is_admin()`. Admin analytics are **SECURITY INVOKER**
  RPCs (`admin_overview`, `admin_user_list`, `admin_lesson_stats`) that read through those
  policies, so no SECURITY DEFINER data function ever bypasses RLS (chosen over DEFINER to keep
  the advisor clean and the model auditable). `profiles` gained an `email` column (backfilled +
  set on signup) so the admin sees emails without touching `auth.users`.
- **Admin dashboard** (`/admin`, middleware-gated to admins): overview stats, content-health
  counts (from code), a searchable learner table, lesson analytics (completion + avg quiz
  attempts to spot confusing lessons), chat moderation, and an announcement composer. **It is
  analytics + moderation + lesson PREVIEW only — not a CMS;** lesson content stays typed-TS in
  code. Admins get `unlockAll` so every lesson/exam shows unlocked for review (UI flag only;
  gating was always UI-side in `lesson-state.ts`). Admin UI is English-only (internal tool).
- **Global community chat** (`chat_messages`, Supabase Realtime): one room, free-tier friendly.
  **Free-tier limits to respect: ~200 concurrent connections + 2M realtime messages/month** on
  Supabase free. Abuse controls: a DB trigger enforces **slow-mode (5s)**, a **ban list**
  (`chat_bans`), and a **server-trusted display name** (clients can't spoof it); 500-char cap;
  admin soft-delete + ban/unban; a pinned code-of-conduct + scam warning. If it ever outgrows
  the free tier, upgrade Supabase or split into rooms.
- **Floating notes** (`notes`, private, RLS own-row): a bottom-right dock (also opens chat) on
  every learning page. Multi-note, debounced autosave via server actions; reads via the browser
  client. The dock + announcement **banner are client components** so the static `/learn` pages
  stay SSG (verified by `next build`).
- **Trader tools** (`/tools`): risk/position calculator (client-only math) and SMC glossary
  (`src/content/glossary.ts`, bilingual, faithful to lessons) are static; trading journal
  (`journal_entries`, private) is dynamic; completion certificate (`/certificate`) is gated on
  passing `final-exam` and printable.
- **New UI primitives** on `@radix-ui/react-dialog`: `Sheet` (bottom-sheet on mobile, side panel
  on desktop), `Input`, `Textarea`, `Badge`. New action files: `notes-actions`, `chat-actions`,
  `journal-actions`, `admin-actions`; shared `src/lib/supabase/require-user.ts`
  (`requireUser`/`requireAdmin`).

## 2026-06-17 — All lessons done + final exam + mastery-loop quizzes (owner decision)
- **ALL 23 lessons authored & validated.** Module 0 (7, incl. the primer), Part 1 (3), Part 2
  (6), Part 3 (4), Part 4 (3). Module 0's 6 originals were retrofitted to guided charts +
  `// COVERAGE` blocks + 10 Q. Suite: `validate:charts` **43 charts, 0 errors**;
  `check:coverage` **23 lessons, 0 failing**; `typecheck` + `lint` clean; `next build` passes
  (23 lesson pages SSG'd, `/exam` route compiles).
- **Quiz pass = 100% with a mastery loop (applies to ALL quizzes, not just the exam).** Owner
  decision: instead of a hard fail, every question answered wrong is **re-asked in a review
  round**, repeating until none are wrong, then it's a clean 100% pass. Rewrote
  `components/lesson/quiz.tsx` to round-robin the misses (round 1 = all questions; later rounds
  = only the missed ones). Replaces the old "Retry quiz" full restart.
- **Final exam built (the last open item).** `src/content/final-exam.ts` = a bespoke
  **100-question** test covering every lesson (grouped by source lesson, bilingual, MCQ + T/F).
  New gated route `/exam` (`app/(app)/exam/page.tsx`) unlocks only when **all lessons are
  completed**; otherwise an `ExamLocked` screen shows progress. Uses the same mastery-loop Quiz.
- **Exam persistence without a migration.** New `saveExamAttempt` server action records under
  the reserved slug **`final-exam`** (quiz_attempts + lesson_progress are plain-text slugs, so
  no schema change). It skips the `getLesson()` check that the per-lesson action enforces. Quiz
  gained an optional `onSave` prop so the exam supplies its own action.
- **Dashboard + landing wired.** Dashboard shows a Final Exam card (locked until all lessons
  done, then gold/unlocked, plus a "passed" state). Landing "Lessons" stat now derives from
  `totalLessons()` (was hardcoded "22"; now 23) so it never drifts.

## 2026-06-16 — Beginner-first content standard + full-course build flow (owner decisions)
- **Master plan persisted:** created [COURSE-BUILD.md](COURSE-BUILD.md) as the durable source
  of truth (22-lesson inventory, rules, build order, final-exam spec, transcript-recovery
  note). Read it first every session; it must survive conversation compaction.
- **Beginner-first guided charts:** added `GuidedChart` (step-through). Lesson charts use
  `steps` (each `caption` + a **"Spot it" `tip`** rendered as a gold/eye callout) with
  `appearAtStep` gating; reveal candles beat-by-beat and point at exact candles. Quiz charts
  stay static. Schema: `ChartStep` gained `tip`.
- **Story, not blocks:** re-explain reused concepts every time and call back to earlier lessons
  ("Remember the MSS? this break is that"), proving *why* with reused structural visuals.
- **Coverage = EVERYTHING** (every concept, tip, example). Each lesson carries a `// COVERAGE`
  checklist; **`npm run check:coverage`** (new smoke test) fails if a lesson lacks it or has
  unchecked items.
- **Quizzes: 10 questions per lesson, 100% to pass** (owner). Applies to all lessons incl. a
  retrofit of Module 0's 6.
- **New first lesson:** `how-to-read-charts` (candlestick primer) so true beginners can read
  a chart before anything else.
- **Transcripts recovered:** the Parts 1–4 `.txt` were corrupted at creation (all duplicates
  of States of the Market). Re-transcribed from the owner's videos with Whisper `large-v3`
  (Tagalog) → `../TextCourse/_recovered/`, verified title-vs-content. Tooling:
  `scripts/transcribe-videos.py`, `scripts/colab-transcribe.ipynb`, `scripts/videos-*.tsv`.
- **Final exam:** a separate bespoke **100-question** exam (built last). OPEN: confirm its
  pass threshold with the owner before building (100% over 100 Q is extreme).
- Docs/skills/agents updated to encode all of the above (CONTENT-PIPELINE, smc-content,
  smc-chart, smc-lesson-builder, smc-chart-builder).

## 2026-06-16 — Database provisioned via Supabase MCP (progress-save bug root cause)
- **Bug:** progress never saved; the dashboard showed 0% and resumed at lesson 1. Root cause
  (verified by probing the REST API with the anon key, `PGRST205`): **the migration was never
  applied** to the live project, so `profiles/enrollments/lesson_progress/quiz_attempts`
  didn't exist. Auth worked (built-in), so the dashboard still showed the user's name, which
  masked the problem. Writes failed and reads returned empty.
- **Fix:** connected the **Supabase MCP** and applied `0001_init.sql` to project
  `bgsewtiawzbueeswhvem`. Verified all 4 tables exist with RLS enabled and the anon probe now
  returns `200 []` instead of `404`.
- **Hardening:** security advisor flagged `handle_new_user` (SECURITY DEFINER) as API-callable;
  revoked EXECUTE from public/anon/authenticated (trigger still works). Added the revoke to
  `0001_init.sql`. Remaining advisor (leaked-password protection) is N/A — auth is passwordless.
- **Code robustness:** `saveQuizAttempt` no longer swallows a failed `completeLesson`; DB
  errors are logged server-side; the quiz now tells the user when saving fails because the
  DB isn't set up. So a silent save failure can't recur invisibly.
- **Convention:** prefer the platform MCP (Supabase/Vercel) over manual steps; see CLAUDE.md.

## 2026-06-16 — Reading-UX fixes + chart clarity standards (owner feedback)
- **One locale toggle.** The lesson view had its own EN/TL toggle on top of the one in
  `SiteHeader`. Removed the in-view toggle; the header's single control governs locale
  everywhere. (smc-design now flags duplicated global controls as an anti-pattern.)
- **"In progress" is now visible.** Opening a lesson always recorded an `in_progress` row,
  but the UI only counted *completed* lessons, so a started course looked unsaved. Added
  `inProgress`/`hasStarted` to `lib/lesson-state.ts`; the course page shows an "In progress"
  pill and "Continue", and the dashboard card shows "Continue" + "1 in progress" once
  started. (No DB change; progress was saving, it just wasn't surfaced.)
- **No em-dashes in copy.** Removed every `—` from user-facing text (lessons, captions,
  quizzes, landing, login, brand tagline/description, page title) and recast with periods,
  colons, commas, or parentheses. `smc-content` + `smc-design` now forbid em-dashes.
- **Charts must be obvious at a glance.** New clarity rules in the `smc-chart` skill +
  `smc-chart-builder` agent: big swing legs, wide pivot separation, height ≈360–420 — never
  teach a 1–2 unit difference.
- **Labels must never merge + professional level-line drawing.** The MS2 "Last HL" line
  label merged with the "MSS (break)" marker, and "MSS" sat inside a candle. Fixes:
  - Added a systemic **text halo** (`paint-order: stroke` in `var(--chart-bg)`) behind all
    chart text in `SmcChart.tsx` so labels read over any line/candle.
  - Added **centered level-line labels** (`labelPlacement: "center"` on `LineAnnotation`):
    the line connects the pivot candle to the breaking candle and the label sits ON the line
    (`——— MSS ———`), the way a trader marks a level. The break `marker` is kept (so the
    validator proves the break) but with a blank label so only the dot shows.
  - **Rebuilt every Module 0 chart** (MS1 bullish/bearish + quiz, MS2, MSB/MSS, Order Blocks,
    FVG, Liquidity) with bigger, obvious swings and clean, connected, centered level lines.
  - `npm run validate:charts` → 0 errors across all 11 charts.

## 2026-06-15 — Project kickoff decisions
- **Language: bilingual (EN + Taglish toggle).** Source is Taglish; audience is Filipino
  traders, but English broadens reach. Each lesson stores both variants.
- **Scope: full platform + all 22 lessons.** Build the whole thing; Module 0 first as the
  accuracy proof, then scale.
- **Visuals: generated, accurate AND engaging.** Custom animated SVG candlestick engine
  driven by hand-authored OHLC + annotations — not static images, not real-market guesses.
- **Brand: created fresh.** Working name "Liquidity Lab" (see BRAND.md); final name TBD by
  owner from 3 options.
- **Stack: Next.js 15 + Supabase + Vercel**, all free tier. Why: static lesson pages are
  CDN-cacheable (scale ~free), Supabase free tier handles thousands of users, Vercel gives
  automatic TLS + CDN. See ARCHITECTURE.md.

## 2026-06-15 — Lesson content as typed TS, not MDX
- **Decision:** Author lessons as typed TypeScript objects (`src/content/lessons/*.ts`)
  instead of MDX (the plan originally said MDX).
- **Why:** Each lesson needs two language variants per block AND embedded interactive chart
  components. Typed objects make bilingual content + chart specs + quizzes type-safe and
  trivial to render, validate, and translate; MDX would get awkward and error-prone for
  paired EN/TL blocks.

## 2026-06-15 — Bumped Next.js 15.3.3 → 15.5.19 for security
- **Decision:** Pin a patched Next.js.
- **Why:** `npm audit` flagged a **critical** chain (RCE/SSRF/cache-poisoning) in 15.3.3.
  15.5.x clears it. A residual *moderate* in Next's internally-bundled postcss is
  build-time only (CSS stringify), not a runtime exposure — accepted for now.

## 2026-06-15 — Front-end raised to product-demo / senior standard
- **Decision:** Rebuilt the landing as a product demo (hero + live app preview in a
  `BrowserFrame`, stats, feature bento, how-it-works, interactive `SmcChart` demo,
  curriculum, FAQ, glowing CTA) with scroll reveals (`src/components/marketing/reveal.tsx`),
  depth (layered shadows/glow/spotlight/noise/glass utilities in `globals.css`), and a
  scroll-aware header.
- **Why:** The first pass looked "vibe-coded." Owner wants a modern, professional feel with
  animation, scroll effects, and shadows. The `smc-design` skill was rewritten to a senior
  product-designer bar (anti-patterns + motion/depth system) so future UI stays at this level.

## 2026-06-15 — Supabase keys corrected (security)
- **What happened:** In `.env.local` the URL and key fields were swapped, and the
  `service_role` secret had been placed in a public `NEXT_PUBLIC_` slot. Fixed the URL to the
  real project URL, set the correct **anon** key, and removed `service_role` (the app never
  uses it; only anon + RLS). **Owner advised to rotate the service_role key** in Supabase.

## 2026-06-15 — Product/UX overhaul (multi-course, gating, theme)
- **Multi-course:** Added a `Course` entity above modules (`courses` in `course.ts`,
  `courseSlug` on modules). Dashboard now lists courses (one today: "SMC Beginner to Expert
  Course"); a course page (`/courses/[slug]`) shows modules as a **dropdown accordion** of
  lessons. Per-course progress computed from the global progress map (no DB change).
- **Quiz gating:** Lessons hide the quiz behind a **"Take quiz now"** button. Quiz is now
  **one question per page** (with optional charts), instant feedback, and requires **100%**
  to pass; otherwise **Retry**. Passing marks the lesson complete and **unlocks the next**
  lesson (sequential lock via `lib/lesson-state.ts`). Server pass threshold = 100%.
- **Charts:** Removed play/step controls — charts are now **plain, static, accurate** and
  theme-aware (`--chart-bg`). Some quiz questions now include charts.
- **Theme:** Added **light + dark** themes (token sets + no-flash script + header toggle).
- **Navigation:** Landing redirects logged-in users to the dashboard; the logo points to the
  dashboard when signed in. `smc-design` skill governs the senior look.

## 2026-06-15 — Chart accuracy made machine-verifiable
- **Added a validator** (`src/content/chart-validate.ts`, `npm run validate:charts`) that
  checks each chart's candle data against SMC definitions: candle integrity, swing pivots,
  HH/HL/LH/LL relationships, FVG gaps, OB body+color, liquidity touches, and **BOS/MSS
  markers**. `error` = definitional violation; `warn` = review. A chart is "done" only at 0 errors.
- **Added the `smc-chart` skill + `smc-chart-builder` agent** — enforce the construction
  process (bookend rule, "confirm a low before you break it", label the real extreme) and
  require a passing validator run.
- **Audited all Module 0 lessons** ([ACCURACY-AUDIT.md](ACCURACY-AUDIT.md)). Text + quizzes
  were accurate; the validator caught **4 structurally wrong charts** (MS1 bullish + bearish,
  MS2, MSB/MSS — only one of which I'd spotted by eye). **All 4 rebuilt to 0 errors.**
- Added 2 transcript tips that were missing: liquidity RTS/STR; FVG vs volume-imbalance vs
  opening-gap.

---

## Status

Build order and progress (update as milestones land):
1. [x] Scaffold (Next.js + TS + Tailwind + security headers) — builds clean.
2. [x] Brand system + docs (BRAND, ARCHITECTURE, CONTENT-PIPELINE, CLAUDE, this file).
3. [x] Agents & skills in `.claude/` (smc-lesson-builder, smc-content, prompt-helper, smc-design).
4. [x] Supabase integration (client/server/middleware + schema + RLS + graceful no-config mode).
5. [x] Interactive SMC chart engine (animated candles + OB/FVG/liquidity/BOS/MSS + step-through).
6. [x] Course taxonomy + lesson/quiz templates + EN/TL toggle + server actions.
7. [x] Landing, auth (magic-link + Google), dashboard, lesson pages, mobile tab bar.
8. [x] Module 0 content — all 6 lessons authored, then retrofitted (guided + COVERAGE + 10 Q).
9. [x] Remaining lessons (Parts 1–4, 16 lessons) — all authored & registered. **ALL 23 lessons
       done** (incl. primer). 43 charts at 0 errors, coverage 0 failing.
10. [x] Final exam — 100-question bespoke test, gated `/exam` route, mastery-loop (100% pass,
        misses re-asked until correct, applied to all quizzes), saved under `final-exam`.
11. [~] Hardening: security headers + static caching done; production build passes. Remaining:
        real-device mobile QA + Lighthouse after deploy; live-DB smoke test of exam completion.

### Known data issues to handle when authoring Parts 1–4
- `Part 4 Lesson 2 - Main Model.txt` contains the *States of the Market* transcript (mislabel).
- `Part 4 Lesson 3 - Previous Day High & Low Model.txt` is duplicated (Part 3 and Part 4 folders).
- Verify each transcript's content vs. its title before authoring (CONTENT-PIPELINE.md step 1).
