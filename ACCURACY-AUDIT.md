# Accuracy Audit — Module 0 (2026-06-15)

> **UPDATE (same day):** All flagged items resolved. The 4 broken charts were rebuilt and
> `npm run validate:charts` now reports **0 errors** (only benign "first pivot" warnings).
> The validator was extended to machine-check **BOS/MSS markers**. The 2 optional text
> enrichments (liquidity RTS/STR, FVG volume-imbalance/opening-gap) were added. The original
> findings below are kept for the record.

---


Reviews every lesson's **text** (vs. its transcript), **charts** (mechanical validator +
manual logic), and **quiz** (answers/explanations + quiz charts). Charts checked with
`npm run validate:charts` (rules in `src/content/chart-validate.ts`).

**Headline:** Text and quizzes are accurate across all 6 lessons. **3 main charts have real
structural errors and must be rebuilt; 1 needs manual review.** Quiz charts all pass.

Legend: ✅ accurate · ⚠ minor/optional · ❌ must fix

---

## 1. Market Structure (Part 1) — `market-structure-1`
- **Text:** ✅ Faithful — 3 market types, swing-point naming (HH/HL/LH/LL), the "bullish makes
  new HH / bearish makes new LL" rule, ranging avoidance, "less is more".
- **Charts:**
  - `ms1-bullish` ❌ The final **HH is on the last candle** (can't be a confirmed pivot — no
    candle after it). Needs a trailing candle. (Plus first-pivot warnings.)
  - `ms1-bearish` ❌ **Mislabeled pivots:** "LH" is placed at candles 4 and 9, but the real
    swing highs are the NEXT candles (5 and 10, which print higher highs). The final "LL" is
    on the last candle (not confirmable). This chart misteaches pivot reading.
- **Quiz:** ✅ All 4 correct; `q-ms1` chart valid (the "?" is a true higher low).

## 2. Market Structure (Part 2) — `market-structure-2`
- **Text:** ✅ Faithful — apply structure to real price, identify swings first, ranging trap,
  1:2 / psychology.
- **Charts:**
  - `ms2-applied` ❌ The core teaching chart is wrong: the labeled **"HL" at candle 8 is not a
    swing low** (price keeps falling straight through it — no bounce), and the earlier "HL" at
    candle 4 only **equals** the prior low (not *higher*). So "a higher low breaks → reversal"
    is illustrated by a structure that never forms a valid higher low. Must rebuild: drop to
    HL, **bounce up** (lower high under the last HH), then close below the HL.
- **Quiz:** ✅ All 4 correct. (Could add a chart-based question later.)

## 3. Market Structure Break & Shift — `msb-mss`
- **Text:** ✅ Faithful — MSB (continuation) vs MSS (reversal), "a break only counts once taken
  out", POI/wall analogy.
- **Charts:**
  - `msb-mss` ⚠/❌ **Needs manual rebuild.** The validator can't yet structurally check
    BOS/MSS *markers* and "Last HL" *level lines* (only HH/HL labels, FVG, OB, liquidity). On
    manual review, the MSB markers (breaks of 112 then 124) are fine, but the **"Last HL" at
    116 is not a clean swing low** (candle 6's low isn't a pivot — candle 5 is lower), so the
    MSS "break of the higher low" rests on a muddled pivot. Rebuild with a clear, confirmed
    higher low before the MSS.
- **Quiz:** ✅ All 4 correct.

## 4. Liquidity — `liquidity`
- **Text:** ✅ Faithful. ⚠ Optional enrichment: the transcript explains retail
  **resistance-turn-support / support-turn-resistance** in more detail than the lesson does.
- **Charts:** ✅ `liq-bsl-sweep` valid (BSL on two equal highs at 120, sweep at 124, reversal).
- **Quiz:** ✅ All 4 correct; `q-liq` chart valid.

## 5. Fair Value Gap — `fair-value-gap`
- **Text:** ✅ Faithful — formation, BISI/SIBI, entry/SL/target, inversion, "don't blindly set
  limits". ⚠ Optional: transcript also distinguishes **volume imbalance / opening gap** from
  FVG (briefly) — not yet in the lesson.
- **Charts:** ✅ `fvg-bullish` valid (real gap 104–108).
- **Quiz:** ✅ All 4 correct; `q-fvg` chart valid.

## 6. Order Blocks — `order-blocks`
- **Text:** ✅ Faithful — OB = last opposite-close candle (body only), combine consecutive,
  high-prob needs an FVG, entry/SL/target, "OBs often unmitigated → FVG fills more".
- **Charts:** ✅ `ob-bullish` valid (OB body on a down-close candle + real FVG).
- **Quiz:** ✅ All 4 correct; `q-ob` chart valid.

---

## Summary
| Lesson | Text | Charts | Quiz |
|---|---|---|---|
| Market Structure 1 | ✅ | ❌ rebuild both | ✅ |
| Market Structure 2 | ✅ | ❌ rebuild | ✅ |
| MSB & MSS | ✅ | ❌ rebuild + review | ✅ |
| Liquidity | ✅ (⚠ optional) | ✅ | ✅ |
| Fair Value Gap | ✅ (⚠ optional) | ✅ | ✅ |
| Order Blocks | ✅ | ✅ | ✅ |

## Fix plan (proposed, not yet done)
1. Rebuild the 3 structure charts (MS1 bullish + bearish, MS2, MSB/MSS) via the
   `smc-chart-builder` agent / `smc-chart` skill until `npm run validate:charts` = 0 errors.
2. Optional text enrichment: liquidity RTS/STR; FVG volume-imbalance/opening-gap note.
3. **Validator roadmap:** extend it to structurally verify BOS/MSS markers and level/break
   lines (currently author-asserted, manually reviewed) so structure charts are 100% machine-checked.
