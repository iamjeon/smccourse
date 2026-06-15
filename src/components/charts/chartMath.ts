import type { Annotation, ChartSpec, Tone } from "@/content/schema";

/** Inner padding of the SVG viewBox (units = SVG user units). */
export const PAD = { top: 18, right: 70, bottom: 30, left: 14 };

export type Layout = {
  width: number;
  height: number;
  slot: number;
  candleWidth: number;
  priceMin: number;
  priceMax: number;
  x: (index: number) => number;
  y: (price: number) => number;
};

/** Collect every price referenced by candles + annotations to size the y-axis. */
function collectPrices(spec: ChartSpec): number[] {
  const prices: number[] = [];
  for (const c of spec.candles) prices.push(c.h, c.l);
  for (const a of spec.annotations ?? []) {
    switch (a.type) {
      case "box":
        prices.push(a.top, a.bottom);
        break;
      case "line":
      case "marker":
      case "label":
        prices.push(a.price);
        break;
      case "path":
        for (const p of a.points) prices.push(p.price);
        break;
    }
  }
  return prices;
}

export function computeLayout(spec: ChartSpec, width = 820): Layout {
  const height = spec.height ?? 360;
  const n = Math.max(spec.candles.length, 1);

  const prices = collectPrices(spec);
  let priceMin = Math.min(...prices);
  let priceMax = Math.max(...prices);
  if (!isFinite(priceMin) || !isFinite(priceMax) || priceMin === priceMax) {
    priceMin = (priceMin || 0) - 1;
    priceMax = (priceMax || 0) + 1;
  }
  // 8% headroom so candles/labels never touch the edges.
  const padPrice = (priceMax - priceMin) * 0.08;
  priceMin -= padPrice;
  priceMax += padPrice;

  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const slot = plotW / n;
  const candleWidth = Math.max(4, Math.min(slot * 0.6, 26));

  const x = (index: number) => PAD.left + (index + 0.5) * slot;
  const y = (price: number) =>
    PAD.top + ((priceMax - price) / (priceMax - priceMin)) * plotH;

  return { width, height, slot, candleWidth, priceMin, priceMax, x, y };
}

/** Map a semantic tone to a CSS color variable. */
export function toneColor(tone: Tone | undefined, fallback = "var(--muted-foreground)") {
  switch (tone) {
    case "bull":
      return "var(--bull)";
    case "bear":
      return "var(--bear)";
    case "gold":
      return "var(--gold)";
    case "zone":
      return "var(--zone)";
    case "neutral":
      return "var(--muted-foreground)";
    default:
      return fallback;
  }
}

/** Default tone per box kind when the author didn't set one. */
export function boxTone(kind: "ob" | "fvg" | "zone", tone?: Tone): Tone {
  if (tone) return tone;
  if (kind === "fvg") return "gold";
  if (kind === "ob") return "zone";
  return "neutral";
}

/** Is this annotation visible at the given step? */
export function visibleAt(a: Annotation, step: number): boolean {
  return (a.appearAtStep ?? 0) <= step;
}

/** Short human label for marker kinds (used when no custom label given). */
export const markerLabel: Record<string, string> = {
  bos: "BOS",
  mss: "MSS",
  entry: "Entry",
  sl: "SL",
  tp: "TP",
  poi: "POI",
  sweep: "Sweep",
};
