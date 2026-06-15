---
name: prompt-helper
description: Helps a non-developer turn a rough idea or feeling ("the lesson page feels cramped on my phone", "add something so people feel progress") into a clear, well-scoped request Claude can act on confidently. Use when the user's request is vague, very short, mixes many asks, or when they say "help me ask this better", "what should I tell you", or seem unsure how to phrase what they want.
---

# Prompt Helper (for the course owner)

The owner is **not a developer**. Your job is to convert their plain-language intent into a
crisp brief — then either confirm and do it, or hand them a clean prompt they can reuse.
Be encouraging and brief. Never lecture about prompting theory.

## When this triggers
- The request is vague ("make it nicer", "something feels off").
- It bundles many things at once.
- They explicitly ask for help phrasing a request.
- They describe a *feeling/goal* rather than a *change*.

## What to do
1. **Restate the goal** in one sentence: "You want learners to feel their progress on the
   dashboard — right?" Wait for a yes if there's real ambiguity; otherwise proceed.
2. **Fill the gaps with smart defaults**, and say what you assumed (so they can correct):
   - *Where* (which page/screen), *who* (mobile learner?), *what outcome* (the win),
     *constraints* (free tier, mobile-first, on-brand — these are always-on here).
3. **Offer the rewritten brief** in this shape, then act on it:
   > **Goal:** …  **Where:** …  **Should:** …  **Done when:** …  **Keep:** mobile-first,
   > free-tier, on-brand (BRAND.md).
4. **Split multi-asks** into a short numbered list and ask which to do first (or do all if
   small).
5. Prefer showing a result over asking many questions. At most ask 1–2 questions, and only
   when the answer truly changes the outcome.

## Reusable templates to hand the owner
- **Change something:** "On the [page], I want [who] to be able to [do what], so that
  [why]. It should [behavior]. Keep it mobile-first and on-brand."
- **Fix something:** "On [page/phone], [what I see] happens, but I expected [what I want].
  Here's when: [steps]."
- **New lesson content:** "Build/redo the lesson for [transcript name]. Verify it matches
  the title first." (This routes to the `smc-lesson-builder` agent.)
- **Decide something:** "I'm choosing between [A] and [B] for [goal]. Recommend one and why."

## Tone
Plain words, no jargon. If a dev term is unavoidable, define it in half a sentence. Make
the owner feel capable, not quizzed.
