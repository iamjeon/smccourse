/**
 * Course taxonomy. Module metadata lives here; lessons are registered in
 * ./lessons/index.ts. This is static data compiled into the build (cacheable) — the DB
 * only stores per-user progress keyed by lesson `slug`.
 */
import type { Lesson, ModuleMeta } from "./schema";
import { lessons } from "./lessons";

export const modules: ModuleMeta[] = [
  {
    slug: "basics",
    order: 0,
    title: { en: "Basic Trading Course", tl: "Basic Trading Course" },
    description: {
      en: "The foundation: market structure, liquidity, fair value gaps, and order blocks.",
      tl: "Ang pundasyon: market structure, liquidity, fair value gaps, at order blocks.",
    },
  },
  {
    slug: "part-1",
    order: 1,
    title: { en: "Part 1 · Market Foundations", tl: "Part 1 · Market Foundations" },
    description: {
      en: "How price really moves: states of the market, OHLC, and liquidity pools.",
      tl: "Paano talaga gumagalaw ang presyo: states of the market, OHLC, at liquidity pools.",
    },
  },
  {
    slug: "part-2",
    order: 2,
    title: { en: "Part 2 · Order Flow & Structure", tl: "Part 2 · Order Flow & Structure" },
    description: {
      en: "Order flow, generated liquidity, ERL/IRL, structure, SMT, and projections.",
      tl: "Order flow, generated liquidity, ERL/IRL, structure, SMT, at projections.",
    },
  },
  {
    slug: "part-3",
    order: 3,
    title: { en: "Part 3 · Models & Entries", tl: "Part 3 · Models & Entries" },
    description: {
      en: "MMXMs, catching expansions, entry patterns, and combining it all.",
      tl: "MMXMs, pag-catch ng expansions, entry patterns, at pagsasama-sama ng lahat.",
    },
  },
  {
    slug: "part-4",
    order: 4,
    title: { en: "Part 4 · Trade Models & Sessions", tl: "Part 4 · Trade Models & Sessions" },
    description: {
      en: "Session highs/lows, the main model, and the previous-day high/low model.",
      tl: "Session highs/lows, ang main model, at ang previous-day high/low model.",
    },
  },
];

/** All lessons, in curriculum order. */
export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getModule(slug: string): ModuleMeta | undefined {
  return modules.find((m) => m.slug === slug);
}

/** Lessons for a module, in curriculum order. */
export function getModuleLessons(moduleSlug: string): Lesson[] {
  return lessons.filter((l) => l.moduleSlug === moduleSlug);
}

/** Modules sorted, each with its lessons attached. */
export function getCurriculum(): Array<ModuleMeta & { lessons: Lesson[] }> {
  return [...modules]
    .sort((a, b) => a.order - b.order)
    .map((m) => ({ ...m, lessons: getModuleLessons(m.slug) }));
}

/** Previous/next lesson across the whole curriculum (for lesson nav). */
export function getNeighbors(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const i = lessons.findIndex((l) => l.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? lessons[i - 1] : undefined,
    next: i < lessons.length - 1 ? lessons[i + 1] : undefined,
  };
}

export const totalLessons = () => lessons.length;
