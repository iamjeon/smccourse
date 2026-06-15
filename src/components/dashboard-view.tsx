"use client";

import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle, Clock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { getCurriculum, getAllLessons } from "@/content/course";
import { t } from "@/content/schema";
import type { ProgressMap } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function DashboardView({
  progress,
  displayName,
}: {
  progress: ProgressMap;
  displayName?: string | null;
}) {
  const { locale } = useLocale();
  const curriculum = getCurriculum();
  const all = getAllLessons();

  const completedCount = all.filter(
    (l) => progress[l.slug]?.status === "completed",
  ).length;
  const pct = all.length ? Math.round((completedCount / all.length) * 100) : 0;

  const nextLesson =
    all.find((l) => progress[l.slug]?.status !== "completed") ?? all[0];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {locale === "tl" ? "Maligayang pagbabalik" : "Welcome back"}
        {displayName ? `, ${displayName}` : ""} 👋
      </h1>

      {/* Progress + continue */}
      <div className="mt-5 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {locale === "tl" ? "Iyong progreso" : "Your progress"}
          </span>
          <span className="font-mono text-foreground">
            {completedCount}/{all.length} · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        {nextLesson && (
          <Button asChild className="mt-4 w-full sm:w-auto">
            <Link href={`/learn/${nextLesson.slug}`}>
              <PlayCircle className="size-4" />
              {completedCount === 0
                ? locale === "tl"
                  ? "Simulan ang kurso"
                  : "Start the course"
                : locale === "tl"
                  ? "Ipagpatuloy"
                  : "Continue"}
              : {t(nextLesson.title, locale)}
            </Link>
          </Button>
        )}
      </div>

      {/* Modules */}
      <div className="mt-8 space-y-6">
        {curriculum.map((m) => (
          <section key={m.slug}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">
                {t(m.title, locale)}
              </h2>
              {m.lessons.length === 0 && (
                <span className="text-xs text-muted-foreground">
                  {locale === "tl" ? "Malapit na" : "Coming soon"}
                </span>
              )}
            </div>

            {m.lessons.length > 0 ? (
              <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
                {m.lessons.map((l) => {
                  const st = progress[l.slug]?.status;
                  const done = st === "completed";
                  const started = st === "in_progress";
                  return (
                    <li key={l.slug}>
                      <Link
                        href={`/learn/${l.slug}`}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/50"
                      >
                        {done ? (
                          <CheckCircle2 className="size-5 shrink-0 text-bull" />
                        ) : started ? (
                          <PlayCircle className="size-5 shrink-0 text-primary" />
                        ) : (
                          <Circle className="size-5 shrink-0 text-muted-foreground/50" />
                        )}
                        <span
                          className={cn(
                            "flex-1 text-sm",
                            done && "text-muted-foreground",
                          )}
                        >
                          {t(l.title, locale)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3.5" />
                          {l.estMinutes}m
                        </span>
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="rounded-lg border border-dashed border-border bg-card/50 px-4 py-6 text-center text-sm text-muted-foreground">
                {t(m.description, locale)}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
