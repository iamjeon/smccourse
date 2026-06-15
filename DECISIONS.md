# Decisions Log

Append-only record of choices we've agreed on. Newest first. Each entry: date, decision,
why. CLAUDE.md's "self-updating rule" points here — add an entry whenever we decide
something new.

---

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
8. [x] Module 0 content — all 6 lessons authored from verified transcripts.
9. [ ] Remaining lessons (Parts 1–4, 16 lessons) — via the content pipeline. Modules show
       "Coming soon" until each is registered in `src/content/lessons/index.ts`.
10. [~] Hardening: security headers + static caching done; production build + runtime smoke
        test pass. Remaining: real-device mobile QA + Lighthouse after deploy.

### Known data issues to handle when authoring Parts 1–4
- `Part 4 Lesson 2 - Main Model.txt` contains the *States of the Market* transcript (mislabel).
- `Part 4 Lesson 3 - Previous Day High & Low Model.txt` is duplicated (Part 3 and Part 4 folders).
- Verify each transcript's content vs. its title before authoring (CONTENT-PIPELINE.md step 1).
