import type { ProgressMap } from "@/lib/progress";

export type LessonState = {
  completed: boolean;
  unlocked: boolean;
  /** Opened/started but the quiz isn't passed yet. */
  inProgress: boolean;
};

/**
 * Sequential gating: a lesson is unlocked if it's the first in its course OR the
 * previous lesson is completed (i.e. its quiz was passed at 100%). Pure + client-safe so
 * the course page and the lesson page agree on what's locked.
 *
 * Pass `unlockAll` (admins) to treat every lesson as unlocked for review/preview, while
 * still reporting real completion/in-progress state.
 */
export function computeLessonStates(
  slugsInOrder: string[],
  progress: ProgressMap,
  opts: { unlockAll?: boolean } = {},
): Record<string, LessonState> {
  const out: Record<string, LessonState> = {};
  slugsInOrder.forEach((slug, i) => {
    const completed = progress[slug]?.status === "completed";
    const inProgress = !completed && progress[slug] != null;
    const prevCompleted =
      i === 0 || progress[slugsInOrder[i - 1]]?.status === "completed";
    out[slug] = {
      completed,
      inProgress,
      unlocked: opts.unlockAll || i === 0 || prevCompleted,
    };
  });
  return out;
}

/** Has the learner started this course at all (any lesson viewed or completed)? */
export function hasStarted(
  slugsInOrder: string[],
  progress: ProgressMap,
): boolean {
  return slugsInOrder.some((s) => progress[s] != null);
}

/** The next lesson the learner should do: first not-completed, unlocked lesson. */
export function nextLessonSlug(
  slugsInOrder: string[],
  progress: ProgressMap,
): string | undefined {
  const states = computeLessonStates(slugsInOrder, progress);
  return slugsInOrder.find((s) => states[s].unlocked && !states[s].completed);
}
