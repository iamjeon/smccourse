---
name: smc-content
description: The method, templates, and accuracy rules for transforming SMC trading transcripts into bilingual (English + Taglish) platform lessons with interactive chart specs and quizzes. Use whenever writing, editing, reviewing, or translating lesson content in src/content/lessons/, or when deciding how a transcript becomes a lesson.
---

# SMC Content skill

Use this when authoring or reviewing lesson content. It encodes *how* we transform
transcripts so every lesson is faithful, bilingual, and engaging. The end-to-end runner is
the `smc-lesson-builder` agent; this skill is the reference it (and you) follow.

## Non-negotiables
1. **Faithful to the transcript.** Never add SMC rules, numbers, or claims not present in
   the source. Garbled passage → omit + `// TODO: verify`, never guess.
2. **Verify the label.** Some transcripts are mislabeled/duplicated. Confirm content
   matches the title before writing (see CONTENT-PIPELINE.md step 1).
3. **Bilingual, always.** Each text block has `en` and `tl`. `tl` is *cleaned* Taglish that
   keeps the instructor's natural voice — not a stiff translation, not raw transcript.
4. **Charts teach one idea.** Each chart illustrates exactly one concept with idealized,
   hand-authored candles + annotations + animation steps.
5. **Quizzes are answerable from the lesson.** No outside knowledge required.

## Lesson skeleton (sections, in order)
Intro → Key Concepts → Worked Examples → Common Mistakes → Summary → Key Takeaways.
Keep paragraphs short (mobile). Lead with the idea, then the example, then the caveat.

## Voice
Mentor-like, calm, risk-aware. No hype, no "guaranteed profit." Mirror the instructor's
warmth ("Okay?", "Let's go") sparingly in the `tl` variant. Always frame setups as
probabilities, never certainties — the source does this; preserve it.

## Block types (see src/content/schema.ts)
`heading` · `paragraph` · `list` · `callout` (tip/warning/key) · `chart` (ChartSpec) ·
`imageSlot` (real screenshot needed). Compose a lesson as an ordered array of these.

## Chart authoring quick rules
- Idealized OHLC arrays — clarity over realism. 8–20 candles is usually enough.
- Annotate with the concept's own vocabulary: OB box, FVG zone, BSL/SSL liquidity line,
  BOS/MSS marker, AMD phase label, ERL/IRL, premium/discount.
- Provide `steps` so the chart animates as the text explains it (reveal candles, then the
  zone, then price reaction).
- Reserve green/red strictly for bull/bear meaning (see BRAND.md).

## Quiz rules
4–6 questions, mix MCQ + true/false, bilingual text + options, one correct answer, short
explanation each. Prefer "what would price most likely do / which is the valid OB" style
questions over definitions. Mine the transcript's built-in assignments for ideas.

## Review checklist (output this for the human)
- [ ] Content matches the transcript (note any mislabel handled)
- [ ] EN + TL present for every block
- [ ] Each chart teaches one clear idea; annotations correct
- [ ] Quiz answerable from the lesson; explanations correct
- [ ] Slug stable & unique; `course.ts` updated
- [ ] Any `TODO: verify` spots listed for owner review
