/**
 * Content types for the whole platform. Lessons are authored as typed TS objects
 * (see DECISIONS.md for why, not MDX). Everything is bilingual via `LocaleText`.
 */
import type { Locale } from "@/lib/brand";

/** A string in both supported languages. */
export type LocaleText = { en: string; tl: string };

/** Pick the right language, falling back to English. */
export function t(text: LocaleText, locale: Locale): string {
  return text[locale] || text.en;
}

// ── Chart engine types ───────────────────────────────────────────────────────

/** One candlestick. Prices are in arbitrary chart units (idealized, not real market). */
export type Candle = { o: number; h: number; l: number; c: number };

export type Tone = "bull" | "bear" | "neutral" | "gold" | "zone";

/** A shaded rectangle: order block, fair value gap, or generic zone. */
export type BoxAnnotation = {
  type: "box";
  id?: string;
  /** candle index range (inclusive) the box spans horizontally */
  from: number;
  to: number;
  /** price range vertically */
  top: number;
  bottom: number;
  kind: "ob" | "fvg" | "zone";
  tone?: Tone;
  label?: LocaleText;
  appearAtStep?: number;
  /** extend the box to the right edge of the chart */
  extend?: boolean;
};

/** A horizontal level: liquidity (BSL/SSL) or a key price. */
export type LineAnnotation = {
  type: "line";
  id?: string;
  price: number;
  from?: number;
  to?: number;
  kind: "liquidity" | "level" | "eq";
  tone?: Tone;
  dashed?: boolean;
  label?: LocaleText;
  appearAtStep?: number;
};

/** A point marker: BOS, MSS, entry, stop, target, point-of-interest. */
export type MarkerAnnotation = {
  type: "marker";
  id?: string;
  index: number;
  price: number;
  kind: "bos" | "mss" | "entry" | "sl" | "tp" | "poi" | "sweep";
  tone?: Tone;
  label?: LocaleText;
  appearAtStep?: number;
};

/** A free text label anchored at a point (e.g. AMD phase, ERL/IRL). */
export type TextAnnotation = {
  type: "label";
  id?: string;
  index: number;
  price: number;
  text: LocaleText;
  tone?: Tone;
  appearAtStep?: number;
};

/** A polyline drawn over the chart (idealized price path / projection). */
export type PathAnnotation = {
  type: "path";
  id?: string;
  points: { index: number; price: number }[];
  tone?: Tone;
  dashed?: boolean;
  label?: LocaleText;
  appearAtStep?: number;
};

export type Annotation =
  | BoxAnnotation
  | LineAnnotation
  | MarkerAnnotation
  | TextAnnotation
  | PathAnnotation;

/** One animation step: a caption + how many candles are revealed. */
export type ChartStep = { caption: LocaleText; revealCandles: number };

export type ChartSpec = {
  id: string;
  title?: LocaleText;
  caption?: LocaleText;
  candles: Candle[];
  annotations?: Annotation[];
  /** If present, the chart becomes a step-through explainer. */
  steps?: ChartStep[];
  height?: number;
};

// ── Lesson content blocks ────────────────────────────────────────────────────

export type Block =
  | { kind: "heading"; level?: 2 | 3; text: LocaleText }
  | { kind: "paragraph"; text: LocaleText }
  | { kind: "list"; ordered?: boolean; items: LocaleText[] }
  | {
      kind: "callout";
      tone: "tip" | "warning" | "key";
      title?: LocaleText;
      text: LocaleText;
    }
  | { kind: "chart"; spec: ChartSpec }
  | { kind: "imageSlot"; note: LocaleText; suggestedCapture?: string };

// ── Quiz ─────────────────────────────────────────────────────────────────────

export type QuizOption = { id: string; text: LocaleText };

export type QuizQuestion = {
  id: string;
  type: "mcq" | "truefalse";
  prompt: LocaleText;
  options: QuizOption[];
  correctOptionId: string;
  explanation: LocaleText;
};

// ── Lesson & taxonomy ────────────────────────────────────────────────────────

export type Lesson = {
  slug: string;
  moduleSlug: string;
  title: LocaleText;
  summary: LocaleText;
  estMinutes: number;
  blocks: Block[];
  quiz: QuizQuestion[];
  /** Path of the source transcript under ../TextCourse, for traceability. */
  sourceFile: string;
};

export type ModuleMeta = {
  slug: string;
  order: number;
  title: LocaleText;
  description: LocaleText;
};
