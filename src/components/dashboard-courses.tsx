"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getCourses, getCourseLessons } from "@/content/course";
import { t } from "@/content/schema";
import type { ProgressMap } from "@/lib/progress";

export function DashboardCourses({
  progress,
}: {
  progress: ProgressMap;
}) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const courses = getCourses();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {tl ? "Academy" : "Academy"}
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        {tl ? "Piliin ang kurso at ipagpatuloy ang pag-aaral." : "Choose a course and continue learning."}
      </p>

      <h2 className="mt-8 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        <GraduationCap className="size-4" />
        {tl ? "Mga kurso" : "Courses"}
      </h2>

      <div className="mt-4 grid gap-4">
        {courses.map((course) => {
          const lessons = getCourseLessons(course.slug);
          const completed = lessons.filter(
            (l) => progress[l.slug]?.status === "completed",
          ).length;
          const inProgress = lessons.filter(
            (l) => progress[l.slug] && progress[l.slug]?.status !== "completed",
          ).length;
          const started = lessons.some((l) => progress[l.slug]);
          const pct = lessons.length
            ? Math.round((completed / lessons.length) * 100)
            : 0;
          return (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                  {t(course.level, locale)}
                </span>
                <BookOpen className="size-5 text-primary" />
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">
                {t(course.title, locale)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(course.subtitle, locale)}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {completed}/{lessons.length}{" "}
                  {tl ? "lessons tapos" : "lessons done"}
                  {completed === 0 && inProgress > 0 && (
                    <span className="text-primary">
                      {tl
                        ? ` · ${inProgress} itinutuloy`
                        : ` · ${inProgress} in progress`}
                    </span>
                  )}
                </span>
                <span className="font-mono">{pct}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {!started
                  ? tl
                    ? "Simulan ang kurso"
                    : "Start course"
                  : tl
                    ? "Ipagpatuloy"
                    : "Continue"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
