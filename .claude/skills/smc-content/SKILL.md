---
name: smc-content
description: The method, templates, and accuracy rules for transforming SMC trading transcripts into bilingual (English + Taglish) platform lessons with interactive chart specs and quizzes. Use whenever writing, editing, reviewing, or translating lesson content in src/content/lessons/, or when deciding how a transcript becomes a lesson.
---

# SMC Content skill

Use this when authoring or reviewing lesson content. It encodes *how* we transform
transcripts so every lesson is faithful, bilingual, complete, and beginner-readable. The
master plan + lesson inventory is **[COURSE-BUILD.md](../../../COURSE-BUILD.md)**; the
end-to-end flow is **[CONTENT-PIPELINE.md](../../../CONTENT-PIPELINE.md)**; the runner is the
`smc-lesson-builder` agent. Read COURSE-BUILD.md first — it is the durable source of truth.

## Non-negotiables
1. **Faithful to the transcript.** Never add SMC rules, numbers, or claims not present in
   the source. Garbled passage → omit + `// TODO: verify`, never guess.
2. **Verify the label.** Some transcripts were mislabeled/duplicated. Confirm content
   matches the title before writing (CONTENT-PIPELINE.md step 1).
3. **Coverage = EVERYTHING.** Capture every concept, tip, and worked example from the video.
   Each lesson file carries a `// COVERAGE (source: …)` checklist (every point → block/step/
   quiz, marked `[x]`). `npm run check:coverage` must pass. Do NOT summarize away tips.
4. **Beginner-first, spoon-fed.** The learner cannot read a chart. Point at exact candles,
   explain every element in plain words, re-explain reused concepts every time (never assume
   memory). Charts are **guided step-throughs** (see `smc-chart`): caption + a "Spot it" tip
   per step.
5. **Story, not blocks.** Tell it as one continuous story with callbacks to earlier lessons
   ("Remember the MSS from the earlier lesson? this break is exactly that"); prove *why* with
   structural visuals reused from prior lessons.
6. **Bilingual, always.** Each block has `en` and `tl` (cleaned Taglish in the instructor's
   voice). **No em-dashes.**
7. **10-question quiz, 100% to pass.** Answerable purely from the lesson.

## Lesson skeleton (sections, in order)
Intro → Key Concepts → Worked Examples → Common Mistakes → Summary → Key Takeaways.
Keep paragraphs short (mobile). Lead with the idea, then the example, then the caveat.
Start each file with the `// Source:` line and the `// COVERAGE` checklist.

## Voice
Mentor-like, calm, risk-aware. No hype, no "guaranteed profit." Mirror the instructor's
warmth ("Okay?", "Let's go") sparingly in the `tl` variant. Always frame setups as
probabilities, never certainties. The source does this; preserve it.

## Writing style & punctuation (professional, not "AI-sounding")
- **No em-dashes (`—`).** They read as AI filler. Recast with a period, colon, comma, or
  parentheses: definition/expansion → colon; aside → commas or parentheses; two related
  statements → split into two sentences. Applies to EN and TL, in every block, caption,
  summary, title, option, and explanation.
- Prefer short, clean sentences over long ones spliced with dashes. One idea per sentence.
- Arrows (`→`) for ordered sequences (e.g. `HH → HL → HH`) are fine; they are notation, not
  punctuation. Keep `&`/`·` in short labels as-is.

## Block types (see src/content/schema.ts)
`heading` · `paragraph` · `list` · `callout` (tip/warning/key) · `chart` (ChartSpec) ·
`imageSlot` (real screenshot needed). Compose a lesson as an ordered array of these.

## Chart authoring quick rules
- **Guided by default.** Charts that show a process use `steps` (each with `caption` + a
  `tip`) and `appearAtStep` on annotations, so they render as a beginner walkthrough
  (`GuidedChart`). Quiz charts stay static. Full construction rules: the **`smc-chart` skill**.
- **Obvious at a glance.** Big swing legs, wide pivot separation, enough height. A beginner
  should instantly see the HH/HL, not squint at a 1-unit difference.
- **Prove why.** Use structural visuals (trendlines, BOS/MSS markers, liquidity lines) reused
  from prior lessons to show *why* something is a reversal/break/sweep.
- Annotate with the concept's own vocabulary; reserve green/red for bull/bear (see BRAND.md).
- Always finish with `npm run validate:charts` at **0 errors**.

## Quiz rules
**Exactly 10 questions** per lesson — the best 10. Mix MCQ + true/false, bilingual text +
options, one correct answer, a short explanation each. Answerable purely from the lesson.
**Pass = 100%.** Prefer "what would price most likely do / which is valid" over pure
definitions, but cover every key concept and tip from the coverage checklist.

## Review checklist (output this for the human)
- [ ] Content matches the transcript (note any mislabel handled)
- [ ] `// COVERAGE` checklist present, all `[x]`; `npm run check:coverage` passes
- [ ] EN + TL present for every block; no em-dashes
- [ ] Charts are guided (caption + Spot-it tip per step), obvious, labels don't overlap, with
      callbacks/structural proof; `npm run validate:charts` passes (0 errors)
- [ ] 10 questions, answerable from the lesson, explanations correct (100% pass)
- [ ] Slug stable & unique; registered in `lessons/index.ts`; `typecheck` + `lint` clean
- [ ] Any `TODO: verify` spots listed for owner review
