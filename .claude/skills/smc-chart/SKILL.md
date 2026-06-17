---
name: smc-chart
description: How to author 100% accurate SMC teaching charts (ChartSpec candle data + annotations) so the picture provably matches the concept. Use whenever creating, editing, or reviewing any chart in a lesson or quiz — especially market-structure (HH/HL/LL/LH, BOS/MSS), order blocks, FVG, liquidity, AMD, ERL/IRL. A chart is NOT done until `npm run validate:charts` passes with 0 errors.
---

# SMC Chart authoring — accuracy is the product

A teaching chart that is *almost* right teaches the wrong thing. The candle numbers must
**provably** form the structure the labels claim. We enforce this with a validator
(`src/content/chart-validate.ts`, run via `npm run validate:charts`). Never ship a chart
with validator errors.

## Guided step-through (beginner-first DEFAULT for lesson charts)
The audience cannot read a chart. Lesson charts that show a process must be **guided**: add a
`steps` array so they render with `GuidedChart` (reveal candles beat-by-beat, tap Next).
- Each `ChartStep` has `revealCandles` (how many candles are shown at that step), a plain
  `caption` (the teaching, point at the EXACT candles), and a `tip` (the "how to spot it" cue
  shown as a separate gold/eye callout). Keep caption and tip distinct.
- Gate annotations with `appearAtStep` so each concept appears (and is highlighted) on its own
  step; earlier ones dim. Align `appearAtStep` with the step that reveals its candles.
- **Prove *why*** on the relevant step with structural visuals reused from earlier lessons
  (a `line` at the broken level + a `bos`/`mss` marker, a liquidity line, an OB/FVG box) and a
  caption that calls back ("Remember the MSS from the earlier lesson? this break is that").
- Quiz charts stay **static** (no `steps`).

## The process (every chart)
1. **State the one idea** the chart teaches in a sentence (e.g. "a confirmed higher low is
   later broken → reversal signal").
2. **List the exact pivots/zones** in order with target prices BEFORE writing candles
   (e.g. `HL1≈108 → HH1≈116 → HL2≈112 (bounce!) → break of HL2`).
3. **Build candles that produce those pivots** (see definitions + rules below).
4. **Annotate** (labels/boxes/lines/markers) at the exact indices/prices.
5. **Run `npm run validate:charts`** → fix until **0 errors**; review every warning.
6. **Eyeball it** at the lesson page in light AND dark mode: is the structure obvious at a
   glance, and does every label read cleanly with nothing overlapping a line, candle, or
   another label?

## SMC definitions the validator enforces
- **Swing high** = a candle whose `h` is ≥ both neighbors and strictly greater than at least
  one. **Swing low** = mirror with `l`. A pivot REQUIRES a candle on both sides.
- **HH/HL/LH/LL** = a swing high/low compared to the *previous swing of the same type*:
  HH `>` prior high, HL `>` prior low, LH `<` prior high, LL `<` prior low. Equal ≠ higher.
- **FVG** (3 candles a,b,c): bullish gap when `a.high < c.low` → box `[a.high, c.low]`;
  bearish when `a.low > c.high` → box `[c.high, a.low]`. The box bounds must equal the gap.
- **Order block** = the last opposite-close candle before the impulse. Box = that candle's
  **body** (`min(o,c)`..`max(o,c)`). Bullish OB must be a **down-close** candle; bearish OB
  an **up-close** candle.
- **Liquidity line** sits on ≥2 equal highs (BSL) or ≥2 equal lows (SSL).

## Construction rules that prevent the common bugs
- **Bookend rule:** never label the FIRST or LAST candle as a confirmed pivot — a pivot
  needs neighbors on both sides. Add a lead-in candle before the first labeled pivot and a
  trailing candle after the last one so both are confirmable.
- **Confirm a low before you break it:** to teach "HL then break", price must drop to the
  HL, **bounce up** (forming a lower high under the last HH), THEN close below the HL. A
  straight decline does NOT contain a higher low — don't label one.
- **Place the label on the actual extreme candle**, not one before/after it (the real swing
  high is the candle with the highest `h` in that leg).
- **Equal highs/lows are not HH/HL** — make the intended pivot strictly higher/lower.
- **Markers (BOS/MSS/break)** must sit on the candle that actually takes out the named level
  (the first candle whose `l`/`h` crosses it).
- Keep prices idealized and clear (8–18 candles is plenty). Reserve green/red for bull/bear.

## Make the concept OBVIOUS at a glance (clarity rules)
A teaching chart must read instantly. The viewer should spot the structure without hunting
candle-by-candle; subtle differences teach badly and frustrate beginners.
- **Big, unambiguous swings.** Each impulse leg should be clearly larger than the pullback
  around it (aim for impulse ≈ 2–3× the pullback depth). Make every HH/HL/LH/LL differ from
  its prior pivot by a wide, obvious margin — tens of units on a ~100-unit chart, never 1–2.
- **One reading only.** A glance should yield exactly one interpretation of each pivot. If a
  pullback dips only a hair below its neighbor, enlarge it so it is plainly a swing.
- **Give it height.** Use `height` ≈ 360–420 so vertical moves are tall and the pattern
  dominates the frame.

## Draw level lines like a trader (the `——— MSS ———` convention)
A horizontal level (a broken swing, BOS/MSS, a key price) is drawn the way a real analyst
marks a chart: one line at the level, **connecting the candle that defines it to the candle
that breaks it**, with the **label centered ON the line** so the dashes appear to run through
the text. Use it for `line` annotations of kind `level` (BOS/MSS/break levels especially).
- **Connect it.** Set `from` = the index of the pivot candle the line points out, and `to` =
  the index of the breaking candle. A line that floats and stops short of the candle it
  references reads as "broken/unfinished" — connect both ends to real candles.
- **Center the label.** Set `labelPlacement: "center"`. The engine draws the text at the
  line's midpoint with a background halo, masking the dashes behind it → `——— MSS ———`.
  Choose `from`/`to` so the midpoint lands in OPEN space (not on a candle body/wick).
- **Mark the break point.** Add the matching `marker` (`bos`/`mss`) at the breaking candle so
  the validator proves the break, but give it `label: { en: "", tl: "" }` so only the dot
  shows — the centered line label carries the text. Never let a marker's own text land on a
  candle.

## Labels & lines must never merge (legibility rules)
The picture is useless if text overlaps a line, a candle, or another label. This is the most
common review failure — check it every time.
- **Separate every label.** Put HH/LH labels ABOVE the high and HL/LL labels BELOW the low,
  each at a price clearly off the candle. Never place two labels at the same x AND price.
- **Never place a marker's text inside a candle.** Put the marker's price in open space, or
  blank its label and let a centered line label speak (above). (The Market Structure Part 2
  bug: the "Last HL" line label merged with the "MSS (break)" marker, and "MSS" sat inside a
  candle. Fixed with a centered line label + a blank-label break dot.)
- **Keep any visible marker label short** ("MSS", not "MSS (break)"); detail goes in the caption.
- The engine paints a background halo behind all chart text as a safety net — it is NOT a
  licence to overlap. Lay labels out so they would read even without it.
- **Captions are prose:** no em-dashes (`—`). Use periods, colons, or commas (see smc-content).

## Definition of done
`npm run validate:charts` → **0 errors**, warnings consciously reviewed; the chart visually
matches the one-sentence idea from step 1; the structure is **obvious at a glance** (big
swings); and **no label overlaps a line, candle, or other label**. If a real market
screenshot is truly needed instead, use an `imageSlot` (don't fake real-market data).
