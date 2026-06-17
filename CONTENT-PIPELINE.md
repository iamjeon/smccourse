# Content Pipeline — transcript → beginner-first lesson

The repeatable, accuracy-first process for turning a raw transcript into a published
bilingual lesson with **guided** interactive charts and a 10-question quiz. Driven by the
`smc-content` + `smc-chart` skills and the `smc-lesson-builder` agent. The master plan and
lesson inventory live in [COURSE-BUILD.md](COURSE-BUILD.md) — read it first.

## Inputs & outputs
- **Input:** one verified `.txt` transcript (Taglish, from `../TextCourse/_recovered/…` for
  Parts 1–4, or `../TextCourse/Basic TradingCourse/…` for Module 0).
- **Output:** one `src/content/lessons/<slug>.ts` exporting a typed `Lesson` (a `// COVERAGE`
  checklist, EN+TL blocks, guided chart specs, 10-question quiz) + registration in
  `src/content/lessons/index.ts`.

## Audience: absolute beginners
The learner cannot read a chart yet. Spoon-feed. Point at the exact candles. Explain every
element. Re-explain concepts each time (never assume memory) and tell it as one continuous
story that calls back to earlier lessons.

## The 6 steps (every lesson)
### 1. Verify (never skip)
Read the transcript fully. Confirm its **content matches its title** (some were historically
mislabeled). If wrong, stop and flag. Record the source path in the file header comment.

### 2. Coverage checklist (the completeness guarantee)
Extract **every** distinct teaching point, tip, and worked example from the transcript into a
`// COVERAGE (source: <path>)` comment block at the top of the lesson file. Coverage bar is
**EVERYTHING** — do not summarize away tips or examples. Mark each `[x]` once mapped to a
block/step/quiz. `npm run check:coverage` enforces this (fails on a missing block or any
unchecked `[ ]`).

### 3. Clean & structure (EN + TL, story-style)
Rewrite into clear bilingual blocks (Intro → Key Concepts → Worked Examples → Common Mistakes
→ Summary/Key Takeaways). Two variants per block: `en` (clean English) and `tl` (readable
Taglish that keeps the instructor's voice). **No em-dashes.** Re-explain reused concepts in
plain words and add callbacks to earlier lessons.

### 4. Spec the visuals as GUIDED charts (see `smc-chart` skill)
Charts illustrating a process use `steps` so they render as a **guided walkthrough**
(`GuidedChart`): reveal candles beat-by-beat via `revealCandles`, gate annotations with
`appearAtStep`, and give each step a plain `caption` PLUS a `tip` ("how to spot it"). Prove
*why* with structural visuals (trendlines, BOS/MSS markers, liquidity lines) reused from prior
lessons. Idealized OHLC; obvious swings; labels never merge; `npm run validate:charts` = 0
errors. Quiz charts stay static (no steps).

### 5. Generate the quiz (10 questions, 100% to pass)
Exactly **10** questions per lesson — the best 10, MCQ + true/false, bilingual, each with an
explanation, all answerable from the lesson. Pass requires **100%**.

### 6. Verify & review
Run `npm run check:coverage`, `npm run validate:charts`, `npm run typecheck`, `npm run lint`
(all clean), register in `index.ts`, then the owner spot-checks against the transcript.

## Quality bar
Faithful & complete (every tip/example) · coverage checklist passes · beginner-readable guided
charts with "Spot it" tips & callbacks · 10-question quiz answerable from the lesson · charts
0 errors · bilingual · no em-dashes · mobile-first · slugs stable & unique.

## Lesson file shape (types in `src/content/schema.ts`)
```ts
// Source: <Part>/<file>.txt (verified: matches title)
// COVERAGE (source: <Part>/<file>.txt) — every transcript point mapped:
// [x] <point/tip/example> -> <block/step/quiz where it's taught>
// [x] ...
export const lesson: Lesson = {
  slug, moduleSlug, title, summary, estMinutes, sourceFile,
  blocks: [ /* heading | paragraph | list | callout | chart(steps+tip) | imageSlot */ ],
  quiz: [ /* 10 QuizQuestion */ ],
};
```
