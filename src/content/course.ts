/**
 * Course taxonomy: Courses → Modules → Lessons. Module/course metadata lives here;
 * lessons are registered in ./lessons/index.ts. All static (cacheable) — the DB only
 * stores per-user progress keyed by lesson `slug`.
 *
 * The platform is multi-course by design. Today there is ONE course
 * ("SMC Beginner to Expert Course"); add more by extending `courses` + tagging modules
 * with the new `courseSlug`.
 */
import type { Course, Lesson, ModuleMeta } from "./schema";
import { lessons } from "./lessons";

export const courses: Course[] = [
  {
    slug: "smc",
    order: 0,
    title: {
      en: "SMC Beginner to Expert Course",
      tl: "SMC Beginner to Expert Course",
    },
    subtitle: {
      en: "Smart Money Concepts, from the ground up",
      tl: "Smart Money Concepts, mula sa pinaka-basic",
    },
    description: {
      en: "Learn how price really moves through market structure, liquidity, order blocks, fair value gaps, models, and entries, with interactive charts and quizzes.",
      tl: "Matutunan kung paano talaga gumagalaw ang presyo sa pamamagitan ng market structure, liquidity, order blocks, fair value gaps, models, at entries, gamit ang interactive charts at quizzes.",
    },
    level: { en: "Beginner → Expert", tl: "Beginner → Expert" },
  },
];

export const modules: ModuleMeta[] = [
  {
    slug: "basics",
    courseSlug: "smc",
    order: 0,
    title: { en: "Basic Trading Course", tl: "Basic Trading Course" },
    description: {
      en: "The foundation: market structure, liquidity, fair value gaps, and order blocks.",
      tl: "Ang pundasyon: market structure, liquidity, fair value gaps, at order blocks.",
    },
  },
  {
    slug: "part-1",
    courseSlug: "smc",
    order: 1,
    title: { en: "Part 1 · Market Foundations", tl: "Part 1 · Market Foundations" },
    description: {
      en: "How price really moves: states of the market, OHLC, and liquidity pools.",
      tl: "Paano talaga gumagalaw ang presyo: states of the market, OHLC, at liquidity pools.",
    },
  },
  {
    slug: "part-2",
    courseSlug: "smc",
    order: 2,
    title: { en: "Part 2 · Order Flow & Structure", tl: "Part 2 · Order Flow & Structure" },
    description: {
      en: "Order flow, generated liquidity, ERL/IRL, structure, SMT, and projections.",
      tl: "Order flow, generated liquidity, ERL/IRL, structure, SMT, at projections.",
    },
  },
  {
    slug: "part-3",
    courseSlug: "smc",
    order: 3,
    title: { en: "Part 3 · Models & Entries", tl: "Part 3 · Models & Entries" },
    description: {
      en: "MMXMs, catching expansions, entry patterns, and combining it all.",
      tl: "MMXMs, pag-catch ng expansions, entry patterns, at pagsasama-sama ng lahat.",
    },
  },
  {
    slug: "part-4",
    courseSlug: "smc",
    order: 4,
    title: { en: "Part 4 · Trade Models & Sessions", tl: "Part 4 · Trade Models & Sessions" },
    description: {
      en: "Session highs/lows, the main model, and the previous-day high/low model.",
      tl: "Session highs/lows, ang main model, at ang previous-day high/low model.",
    },
  },
];

// ── Courses ──────────────────────────────────────────────────────────────────
export const getCourses = (): Course[] =>
  [...courses].sort((a, b) => a.order - b.order);

export const getCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);

// ── Lessons ──────────────────────────────────────────────────────────────────
export function getAllLessons(): Lesson[] {
  return lessons;
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

// ── Modules ──────────────────────────────────────────────────────────────────
export function getModule(slug: string): ModuleMeta | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getModuleLessons(moduleSlug: string): Lesson[] {
  return lessons.filter((l) => l.moduleSlug === moduleSlug);
}

// ── Course composition ───────────────────────────────────────────────────────
export function getCourseModules(courseSlug: string): ModuleMeta[] {
  return modules
    .filter((m) => m.courseSlug === courseSlug)
    .sort((a, b) => a.order - b.order);
}

/** All lessons in a course, in curriculum order. */
export function getCourseLessons(courseSlug: string): Lesson[] {
  return getCourseModules(courseSlug).flatMap((m) => getModuleLessons(m.slug));
}

/** Modules of a course, each with its lessons attached (for accordions/dashboards). */
export function getCourseCurriculum(
  courseSlug: string,
): Array<ModuleMeta & { lessons: Lesson[] }> {
  return getCourseModules(courseSlug).map((m) => ({
    ...m,
    lessons: getModuleLessons(m.slug),
  }));
}

/** The course a given lesson belongs to (via its module). */
export function getCourseOfLesson(lessonSlug: string): Course | undefined {
  const lesson = getLesson(lessonSlug);
  if (!lesson) return undefined;
  const mod = getModule(lesson.moduleSlug);
  if (!mod) return undefined;
  return getCourse(mod.courseSlug);
}

/** Previous/next lesson WITHIN the same course (drives lesson nav + gating). */
export function getNeighbors(slug: string): { prev?: Lesson; next?: Lesson } {
  const course = getCourseOfLesson(slug);
  const list = course ? getCourseLessons(course.slug) : lessons;
  const i = list.findIndex((l) => l.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? list[i - 1] : undefined,
    next: i < list.length - 1 ? list[i + 1] : undefined,
  };
}

export const totalLessons = () => lessons.length;
