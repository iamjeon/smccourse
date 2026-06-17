# COURSE-BUILD.md — the master build plan (READ FIRST, every session)

> This file is the durable source of truth for building the full course. It must survive
> conversation compaction. If anything here conflicts with chat memory, **trust this file**.
> Update it whenever a lesson's status changes or a rule is decided. Linked detail lives in
> [CONTENT-PIPELINE.md](CONTENT-PIPELINE.md), the `.claude/skills`, and the `.claude/agents`.

## The goal
Turn the owner's SMC video course into 22 bilingual, beginner‑first lessons (Modules →
Lessons → Quizzes) plus a final exam. The owner is **not a developer** and the audience are
**absolute beginners** who cannot read charts yet. Spoon‑feed everything.

## Non‑negotiable rules (apply to EVERY lesson)
1. **Accuracy first.** Faithful to the transcript. Never invent SMC rules. If a transcript is
   garbled, omit + leave `// TODO: verify`, never guess. Verify each transcript's content
   matches its title before authoring (some were historically mislabeled — see recovery note).
2. **Coverage bar = EVERYTHING.** Capture every concept, every tip, and every worked example
   the instructor shows. Do not summarize away tips/examples. (Owner decision, this session.)
3. **Coverage checklist in every lesson file.** A `// COVERAGE (source: …)` comment block at
   the top mapping each transcript point → where it's taught (block/step/quiz). Use `[x]` when
   covered. The smoke test `npm run check:coverage` must pass (fails if any lesson lacks the
   block or has unchecked `[ ]` items).
4. **Beginner‑first, spoon‑fed charts.** Charts are **guided step‑throughs** (`GuidedChart`):
   reveal candles beat‑by‑beat, point at the exact candles, explain in plain words. Never
   assume the learner can read a chart. The first lesson (`how-to-read-charts`) teaches candle
   anatomy.
5. **"Spot it" tips.** Each guided step has `caption` (the teaching) AND an optional `tip`
   (the "how to spot it" cue) rendered as a separate gold/eye callout. Keep them distinct.
6. **Storytelling / spiral, not block‑by‑block.** Re‑explain a concept in plain words every
   time it reappears (never assume they remember), AND call back to earlier lessons
   ("Remember the MSS from the earlier lesson? this break is exactly that"). Prove *why* with
   structural visuals (trendlines, MSS/BOS markers, liquidity lines) reused from prior lessons.
7. **10 quiz questions per lesson.** The best 10, MCQ + true/false, answerable purely from the
   lesson, bilingual, each with an explanation. **Pass = 100%** (owner decision).
8. **Charts provably correct.** `npm run validate:charts` → 0 errors for every chart.
9. **Bilingual EN + Taglish** for every text/caption/tip/quiz. **No em‑dashes (`—`)** anywhere
   (use periods/colons/commas). Mobile‑first (design at 360px).

## Definition of done (per lesson)
`// COVERAGE` block present & all `[x]` · `npm run check:coverage` passes · guided charts with
captions+tips+structural proof · 10 questions (100% pass) · `npm run validate:charts` 0 errors ·
`npm run typecheck` + `npm run lint` clean · registered in `src/content/lessons/index.ts`.

## Lesson inventory & status (22 lessons + final exam)
Transcripts (verified, recovered via Whisper large-v3) live in
`../TextCourse/_recovered/<Part>/…txt`. Module 0 uses `../TextCourse/Basic TradingCourse/…txt`.

### Module 0 — Basic Trading Course (`basics`)
- [x] how-to-read-charts — candlestick primer (authored; guided; 10 Q) ✓
- [x] market-structure-1 — retrofit DONE (guided HH/HL + LL/LH charts, COVERAGE, 10 Q) ✓
- [x] market-structure-2 — retrofit DONE (guided MSS chart, COVERAGE, 10 Q) ✓
- [x] msb-mss — retrofit DONE (guided MSB→POI→MSS chart, COVERAGE, 10 Q) ✓
- [x] liquidity — retrofit DONE (guided BSL-sweep chart + SSL mirror, COVERAGE, 10 Q) ✓
- [x] fair-value-gap — retrofit DONE (guided FVG chart, COVERAGE, 10 Q) ✓
- [x] order-blocks — retrofit DONE (guided OB+FVG chart, COVERAGE, 10 Q) ✓
  MODULE 0 COMPLETE. ALL 22 LESSONS + PRIMER DONE (23 lessons, 43 charts, 0 errors, coverage 0 failing).

### Part 1 — Market Foundations (`part-1`)
- [x] states-of-the-market — authored (guided, tips, MSS callback, 10 Q) ✓ template
- [x] ohlc-olhc — authored (2 guided charts OHLC/OLHC, tips, AMD+liquidity callbacks, 10 Q) ✓
- [x] liquidity-pools — authored (guided sweep->MSS->PDRA->opposite-pool, all pool types + tips, 10 Q) ✓
  PART 1 COMPLETE.

### Part 2 — Order Flow & Structure (`part-2`)
- [x] order-flow — authored (guided bullish flow + fractal chart, 10 Q, COVERAGE) ✓
- [x] generated-liquidity — authored (consolidation/equal H-L + LRLR target charts, 10 Q) ✓
- [x] erl-irl — authored (range anatomy + ERL→IRL cycle charts, 10 Q) ✓
- [x] market-structure-p2 — authored (STH/ITH/LTH chart + bullish entry chart, 10 Q) ✓
- [x] smt-divergence — authored (stop-hunt vs failure-swing comparison + guided trade, 10 Q) ✓
- [x] standard-deviation-projection — authored (AMD/sessions + projection-target charts, 10 Q) ✓
  PART 2 COMPLETE.

### Part 3 — Models & Entries (`part-3`)
- [x] mmxms — authored (MMBM + mirrored MMSM guided charts, 10 Q) ✓
- [x] catching-expansions — authored (mirrored bearish/bullish expansion charts, 10 Q) ✓
- [x] entry-patterns — authored (STH-ITH-STH FVG entry + breaker-at-50% charts, 10 Q) ✓
- [x] combining-everything — authored (5-point checklist + capstone chart, 10 Q) ✓
  PART 3 COMPLETE.

### Part 4 — Trade Models & Sessions (`part-4`)
- [x] asian-session — authored (mirrored bearish/bullish Asian-range charts, 10 Q) ✓
- [x] main-model — authored (mirrored bullish/bearish 3-timeframe charts, 10 Q) ✓
- [x] previous-day-model — authored (bullish reversal + continuation-invalid charts, 10 Q) ✓
  PART 4 COMPLETE. (All 22 transcript lessons + primer authored. Module 0 retrofit + final exam remain.)

### Final exam — DONE
- [x] Bespoke **100-question** exam (`src/content/final-exam.ts`), grouped by source lesson,
  bilingual, MCQ + T/F, covering all 23 lessons.
- [x] Gated route `/exam` (`app/(app)/exam/page.tsx`): unlocks only when ALL lessons complete,
  else `ExamLocked` shows progress. Reuses `quiz_attempts` + `lesson_progress` under reserved
  slug `final-exam` (no migration) via the new `saveExamAttempt` action.
- **THRESHOLD DECIDED (owner):** pass = **100%**, but with a **mastery loop** — every missed
  question is re-asked in review rounds until none are wrong, then it's a clean pass. This
  applies to **ALL quizzes**, not just the exam (see `components/lesson/quiz.tsx`).

## Build order
Phase 1: persist this flow in docs/skills/agents (this file, pipeline, skills, agents, smoke
test). → Phase 2: write the `// COVERAGE` checklist for each lesson from its transcript. →
Phase 3: implement lessons Part by Part (validate each), retrofit Module 0, then the exam.

## Transcript recovery note (do not re-derive)
The original `../TextCourse/Part 1-4/*.txt` were all corrupted duplicates of "States of the
Market" (a bad export on 2026-06-15, confirmed across the f: copy, the OneDrive master, and a
prior session's logs — not caused by this project). They were **re-transcribed from the
owner's videos** with Whisper `large-v3` (Tagalog) and verified title‑vs‑content. The good
transcripts are in `../TextCourse/_recovered/`. The transcription tooling is in
`scripts/transcribe-videos.py` + `scripts/colab-transcribe.ipynb` (+ `videos-*.tsv`).

## Tooling commands
`npm run validate:charts` · `npm run check:coverage` · `npm run typecheck` · `npm run lint`.
