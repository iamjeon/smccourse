/**
 * Chart accuracy validator. Given a ChartSpec, it checks that the candle data ACTUALLY
 * forms the SMC structures the annotations claim — so a chart can't quietly teach something
 * wrong. Run over every lesson/quiz chart via `npm run validate:charts`.
 *
 * Philosophy: idealized teaching charts must be provably correct. `error` = a definitional
 * violation (must fix). `warn` = a heuristic worth a human glance.
 */
import type { Candle, ChartSpec } from "./schema";

export type Finding = { level: "error" | "warn"; msg: string };

const bodyTop = (k: Candle) => Math.max(k.o, k.c);
const bodyBot = (k: Candle) => Math.min(k.o, k.c);

function tol(c: Candle[]): number {
  const hi = Math.max(...c.map((k) => k.h));
  const lo = Math.min(...c.map((k) => k.l));
  return Math.max(0.5, (hi - lo) * 0.03);
}

/** Swing high: >= both neighbors and strictly greater than at least one (handles plateaus). */
function isSwingHigh(c: Candle[], i: number): boolean {
  if (i <= 0 || i >= c.length - 1) return false;
  return (
    c[i].h >= c[i - 1].h &&
    c[i].h >= c[i + 1].h &&
    (c[i].h > c[i - 1].h || c[i].h > c[i + 1].h)
  );
}
function isSwingLow(c: Candle[], i: number): boolean {
  if (i <= 0 || i >= c.length - 1) return false;
  return (
    c[i].l <= c[i - 1].l &&
    c[i].l <= c[i + 1].l &&
    (c[i].l < c[i - 1].l || c[i].l < c[i + 1].l)
  );
}

const swingHighIdx = (c: Candle[]) =>
  c.map((_, i) => i).filter((i) => isSwingHigh(c, i));
const swingLowIdx = (c: Candle[]) =>
  c.map((_, i) => i).filter((i) => isSwingLow(c, i));

/** A real 3-candle FVG anywhere in the series that matches the given box bounds. */
function fvgMatches(
  c: Candle[],
  top: number,
  bottom: number,
  T: number,
): boolean {
  for (let i = 0; i + 2 < c.length; i++) {
    const a = c[i],
      cc = c[i + 2];
    // bullish gap: a.high < c.low → gap [a.high, c.low]
    if (a.h < cc.l && Math.abs(bottom - a.h) <= T && Math.abs(top - cc.l) <= T)
      return true;
    // bearish gap: a.low > c.high → gap [c.high, a.low]
    if (a.l > cc.h && Math.abs(top - a.l) <= T && Math.abs(bottom - cc.h) <= T)
      return true;
  }
  return false;
}

export function validateChart(spec: ChartSpec): Finding[] {
  const f: Finding[] = [];
  const c = spec.candles;
  if (!c || c.length === 0) {
    f.push({ level: "error", msg: "chart has no candles" });
    return f;
  }
  const T = tol(c);
  const n = c.length;

  // 1) Candle integrity
  c.forEach((k, i) => {
    if (k.h < bodyTop(k) - 1e-9)
      f.push({ level: "error", msg: `candle ${i}: high ${k.h} is below body top ${bodyTop(k)}` });
    if (k.l > bodyBot(k) + 1e-9)
      f.push({ level: "error", msg: `candle ${i}: low ${k.l} is above body bottom ${bodyBot(k)}` });
    if (k.h < k.l)
      f.push({ level: "error", msg: `candle ${i}: high ${k.h} < low ${k.l}` });
  });

  const highs = swingHighIdx(c);
  const lows = swingLowIdx(c);

  for (const a of spec.annotations ?? []) {
    // index bounds
    const idx =
      a.type === "marker" || a.type === "label" ? a.index : undefined;
    if (idx != null && (idx < 0 || idx >= n)) {
      f.push({ level: "error", msg: `${a.type} references candle ${idx} (out of range 0..${n - 1})` });
      continue;
    }

    // Swing structure labels (HH/HL/LH/LL)
    if (a.type === "label") {
      const text = a.text.en.trim().toUpperCase();
      const i = a.index;
      if (["HH", "LH"].includes(text)) {
        if (!isSwingHigh(c, i)) {
          f.push({ level: "error", msg: `label "${text}" at candle ${i} is not a swing high (lows/highs don't pivot there)` });
        } else {
          const pos = highs.indexOf(i);
          const prev = pos > 0 ? highs[pos - 1] : -1;
          if (prev === -1) {
            f.push({ level: "warn", msg: `label "${text}" at candle ${i} is the first swing high — nothing prior to be higher/lower than` });
          } else if (text === "HH" && !(c[i].h > c[prev].h)) {
            f.push({ level: "error", msg: `"HH" at candle ${i} (high ${c[i].h}) is NOT higher than previous swing high at ${prev} (${c[prev].h})` });
          } else if (text === "LH" && !(c[i].h < c[prev].h)) {
            f.push({ level: "error", msg: `"LH" at candle ${i} (high ${c[i].h}) is NOT lower than previous swing high at ${prev} (${c[prev].h})` });
          }
        }
      } else if (["HL", "LL"].includes(text)) {
        if (!isSwingLow(c, i)) {
          f.push({ level: "error", msg: `label "${text}" at candle ${i} is not a swing low (price does not bottom and turn up there)` });
        } else {
          const pos = lows.indexOf(i);
          const prev = pos > 0 ? lows[pos - 1] : -1;
          if (prev === -1) {
            f.push({ level: "warn", msg: `label "${text}" at candle ${i} is the first swing low — nothing prior to compare` });
          } else if (text === "HL" && !(c[i].l > c[prev].l)) {
            f.push({ level: "error", msg: `"HL" at candle ${i} (low ${c[i].l}) is NOT higher than previous swing low at ${prev} (${c[prev].l})` });
          } else if (text === "LL" && !(c[i].l < c[prev].l)) {
            f.push({ level: "error", msg: `"LL" at candle ${i} (low ${c[i].l}) is NOT lower than previous swing low at ${prev} (${c[prev].l})` });
          }
        }
      }
    }

    // FVG boxes
    if (a.type === "box" && a.kind === "fvg") {
      if (!fvgMatches(c, a.top, a.bottom, T)) {
        f.push({ level: "error", msg: `FVG box [${a.bottom}–${a.top}] does not match any real 3-candle gap in the data` });
      }
    }

    // Order block boxes
    if (a.type === "box" && a.kind === "ob") {
      if (a.from === a.to) {
        const k = c[a.from];
        if (Math.abs(a.top - bodyTop(k)) > T || Math.abs(a.bottom - bodyBot(k)) > T) {
          f.push({ level: "error", msg: `OB box at candle ${a.from} doesn't match that candle's body [${bodyBot(k)}–${bodyTop(k)}]` });
        }
        const down = k.c < k.o;
        if (a.tone === "bull" && !down)
          f.push({ level: "error", msg: `bullish OB at candle ${a.from} must be a down-close candle, but it closed up` });
        if (a.tone === "bear" && down)
          f.push({ level: "error", msg: `bearish OB at candle ${a.from} must be an up-close candle, but it closed down` });
      }
    }

    // Liquidity lines should sit on ≥2 equal highs (BSL) or ≥2 equal lows (SSL)
    if (a.type === "line" && a.kind === "liquidity") {
      const highTouches = c.filter((k) => Math.abs(k.h - a.price) <= T).length;
      const lowTouches = c.filter((k) => Math.abs(k.l - a.price) <= T).length;
      if (highTouches < 2 && lowTouches < 2) {
        f.push({ level: "warn", msg: `liquidity line at ${a.price} doesn't align with at least two equal highs or lows` });
      }
    }

    // BOS/MSS markers must actually break the most recent swing in the implied direction.
    if (a.type === "marker" && (a.kind === "bos" || a.kind === "mss")) {
      const K = a.kind.toUpperCase();
      if (a.tone === "bull") {
        const prior = highs.filter((h) => h < a.index).pop();
        if (prior == null)
          f.push({ level: "warn", msg: `${K} (bull) at candle ${a.index}: no prior swing high to break` });
        else if (!(c[a.index].h > c[prior].h))
          f.push({ level: "error", msg: `${K} (bull) at candle ${a.index} (high ${c[a.index].h}) does not break the prior swing high at ${prior} (${c[prior].h})` });
      } else if (a.tone === "bear") {
        const prior = lows.filter((l) => l < a.index).pop();
        if (prior == null)
          f.push({ level: "warn", msg: `${K} (bear) at candle ${a.index}: no prior swing low to break` });
        else if (!(c[a.index].l < c[prior].l))
          f.push({ level: "error", msg: `${K} (bear) at candle ${a.index} (low ${c[a.index].l}) does not break the prior swing low at ${prior} (${c[prior].l})` });
      } else {
        f.push({ level: "warn", msg: `${K} marker at candle ${a.index} has no bull/bear tone — can't verify the break direction` });
      }
    }
  }

  return f;
}
