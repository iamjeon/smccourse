"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  Lock,
  Clock,
  ChevronDown,
  ArrowRight,
  Trophy,
} from "lucide-react";
import type { Course, Lesson, ModuleMeta } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import type { ProgressMap } from "@/lib/progress";
import { computeLessonStates, hasStarted, nextLessonSlug } from "@/lib/lesson-state";
import { cn } from "@/lib/utils";

type ModuleWithLessons = ModuleMeta & { lessons: Lesson[] };

export function CourseView({
  course,
  curriculum,
  progress,
  unlockAll = false,
}: {
  course: Course;
  curriculum: ModuleWithLessons[];
  progress: ProgressMap;
  /** Admin preview: show every lesson unlocked for review. */
  unlockAll?: boolean;
}) {
  const { locale } = useLocale();
  const tl = locale === "tl";

  const orderedSlugs = curriculum.flatMap((m) => m.lessons.map((l) => l.slug));
  const states = computeLessonStates(orderedSlugs, progress, { unlockAll });
  const nextSlug = nextLessonSlug(orderedSlugs, progress);
  const started = hasStarted(orderedSlugs, progress);
  const completedCount = orderedSlugs.filter((s) => states[s]?.completed).length;
  const pct = orderedSlugs.length
    ? Math.round((completedCount / orderedSlugs.length) * 100)
    : 0;

  const allLessonsDone = completedCount === orderedSlugs.length && orderedSlugs.length > 0;
  const examUnlocked = unlockAll || allLessonsDone;
  const examPassed = progress["final-exam"]?.status === "completed";

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/academy"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {tl ? "Mga kurso" : "All courses"}
      </Link>

      {/* Course header */}
      <div className="mt-3">
        <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
          {t(course.level, locale)}
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t(course.title, locale)}
        </h1>
        <p className="mt-2 text-muted-foreground">{t(course.subtitle, locale)}</p>
      </div>

      {/* Progress + continue */}
      <div className="mt-5 rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {tl ? "Iyong progreso" : "Your progress"}
          </span>
          <span className="font-mono">
            {completedCount}/{orderedSlugs.length} · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        {nextSlug && (
          <Button asChild className="mt-4">
            <Link href={`/learn/${nextSlug}`}>
              <PlayCircle className="size-4" />
              {!started
                ? tl
                  ? "Simulan"
                  : "Start"
                : tl
                  ? "Ipagpatuloy"
                  : "Continue"}
            </Link>
          </Button>
        )}
      </div>

      {/* Module accordion */}
      <div className="mt-8 space-y-3">
        {curriculum.map((m, mi) => {
          const hasNext = m.lessons.some((l) => l.slug === nextSlug);
          const moduleDone = m.lessons.filter(
            (l) => states[l.slug]?.completed,
          ).length;
          return (
            <details
              key={m.slug}
              open={hasNext || (mi === 0 && !nextSlug)}
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 marker:content-none">
                <span className="font-mono text-xs text-primary">
                  {String(mi + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{t(m.title, locale)}</span>
                  <span className="block text-xs text-muted-foreground">
                    {m.lessons.length > 0
                      ? `${moduleDone}/${m.lessons.length} ${tl ? "tapos" : "done"}`
                      : tl
                        ? "Malapit na"
                        : "Coming soon"}
                  </span>
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>

              {m.lessons.length > 0 ? (
                <ul className="border-t border-border">
                  {m.lessons.map((l) => {
                    const st = states[l.slug];
                    const locked = !st?.unlocked;
                    const done = st?.completed;
                    const inProgress = st?.inProgress;
                    const inner = (
                      <div
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm",
                          locked && "opacity-55",
                          !locked && "transition-colors hover:bg-accent/50",
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="size-5 shrink-0 text-bull" />
                        ) : locked ? (
                          <Lock className="size-4 shrink-0 text-muted-foreground" />
                        ) : l.slug === nextSlug ? (
                          <PlayCircle className="size-5 shrink-0 text-primary" />
                        ) : (
                          <Circle className="size-5 shrink-0 text-muted-foreground/50" />
                        )}
                        <span className={cn("flex-1", done && "text-muted-foreground")}>
                          {t(l.title, locale)}
                        </span>
                        {inProgress && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {tl ? "Itinutuloy" : "In progress"}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" />
                          {l.estMinutes}m
                        </span>
                        {!locked && (
                          <ArrowRight className="size-4 text-muted-foreground" />
                        )}
                      </div>
                    );
                    return (
                      <li key={l.slug} className="border-t border-border first:border-t-0">
                        {locked ? (
                          <div
                            title={
                              tl
                                ? "Tapusin muna ang nakaraang lesson"
                                : "Complete the previous lesson first"
                            }
                          >
                            {inner}
                          </div>
                        ) : (
                          <Link href={`/learn/${l.slug}`}>{inner}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="border-t border-border px-4 py-5 text-sm text-muted-foreground">
                  {t(m.description, locale)}
                </p>
              )}
            </details>
          );
        })}

        {/* Final exam: appears as the last item in the course */}
        <Link
          href="/exam"
          className={cn(
            "group flex items-center gap-4 rounded-xl border p-5 transition-all duration-300",
            examUnlocked
              ? "border-gold/40 bg-card hover:-translate-y-1 hover:border-gold/70"
              : "border-border bg-card",
          )}
        >
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full",
              examPassed
                ? "bg-bull/15 text-bull"
                : examUnlocked
                  ? "bg-gold/15 text-gold"
                  : "bg-secondary text-muted-foreground",
            )}
          >
            {examPassed ? (
              <CheckCircle2 className="size-5" />
            ) : examUnlocked ? (
              <Trophy className="size-5" />
            ) : (
              <Lock className="size-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium">
              {examPassed
                ? tl
                  ? "Final Exam (naipasa)"
                  : "Final Exam (passed)"
                : tl
                  ? "100-tanong na Final Exam"
                  : "100-question Final Exam"}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {examPassed
                ? tl
                  ? "Tapos na ang buong course. Pwede mong ulitin."
                  : "Course complete. You can retake it."
                : examUnlocked
                  ? tl
                    ? "Bukas na. Subukan ang exam."
                    : "Unlocked. Take the final exam."
                  : tl
                    ? `Tapusin lahat ng lessons para mabuksan (${completedCount}/${orderedSlugs.length}).`
                    : `Complete all lessons to unlock (${completedCount}/${orderedSlugs.length}).`}
            </p>
          </div>
          {examUnlocked && (
            <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
          )}
        </Link>
      </div>
    </div>
  );
}
