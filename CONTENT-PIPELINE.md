# Content Pipeline — transcript → lesson

The repeatable, accuracy-first process for turning a raw transcript in `../TextCourse`
into a published bilingual lesson with interactive charts and a quiz. Driven by the
`smc-content` skill and the `smc-lesson-builder` agent.

## Inputs & outputs
- **Input:** one `.txt` transcript (Taglish, auto-transcribed, references off-screen charts).
- **Output:** one file in `src/content/lessons/<slug>.ts` exporting a typed `Lesson`
  (EN + TL blocks, chart specs, quiz) + an entry in `src/content/course.ts`.

## The 5 steps
### 1. Verify (never skip)
Read the transcript fully. Confirm its **actual content matches the lesson title**.
Known issues: `Part 4 Lesson 2 - Main Model.txt` actually contains *States of the Market*;
`Part 4 Lesson 3` is duplicated across folders. If mislabeled, flag it and map to the
correct lesson before continuing. Record the mapping in the lesson file's comment.

### 2. Clean & structure (EN + TL)
Rewrite the messy transcript into a clear lesson, preserving the instructor's meaning:
- Sections: **Intro → Key Concepts → Worked Examples → Common Mistakes → Summary →
  Key Takeaways**.
- Produce **two language variants per text block**: `en` (clean English) and
  `tl` (cleaned, readable Taglish that keeps the instructor's voice).
- Do NOT add SMC claims that aren't in the transcript. If the transcript is garbled,
  prefer omission over guessing; leave a `// TODO: verify` note.

### 3. Spec the visuals
For each chart the instructor points at, author a precise `ChartSpec`:
- Hand-author OHLC candles that **illustrate the concept** (idealized, not real market
  data → accurate and controllable).
- Add annotations: order-block boxes, FVG zones, liquidity lines (BSL/SSL), BOS/MSS
  markers, AMD phase labels, ERL/IRL.
- Add `steps` so the chart can animate beat-by-beat as the lesson explains it.
- If a *real* market screenshot is truly needed, use an `imageSlot` placeholder and note
  what the owner should capture.

### 4. Generate the quiz
4–6 questions drawn from the lesson + the transcript's built-in assignments
("bigay kayo ng 5 example..."). Mix MCQ and true/false. Each question: bilingual text,
options, correct answer, and a short **explanation** shown after answering. Questions must
test understanding, not trivia, and be answerable purely from the lesson.

### 5. Review (human-in-the-loop)
Before publishing, the owner spot-checks the lesson against the transcript for accuracy
(especially anything flagged in step 1). Only then mark it active in `course.ts`.

## Quality bar
- Faithful to source · no invented rules · bilingual complete · every chart teaches one
  idea · quiz answerable from the lesson · mobile-readable · slugs stable & unique.

## Lesson file shape (see `src/content/schema.ts` for the types)
```ts
export const lesson: Lesson = {
  slug: "order-blocks",
  moduleSlug: "basics",
  title: { en: "Order Blocks", tl: "Order Blocks" },
  estMinutes: 12,
  blocks: [ /* heading | paragraph | list | callout | chart | imageSlot */ ],
  quiz: [ /* QuizQuestion[] */ ],
  sourceFile: "Basic TradingCourse/Order Blocks.txt",
};
```
