"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  NotebookPen,
  PlayCircle,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { getLesson } from "@/content/course";
import { t } from "@/content/schema";
import type { LocaleText } from "@/content/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DashboardData = {
  displayName: string | null;
  totalLessons: number;
  completedCount: number;
  inProgressCount: number;
  examPassed: boolean;
  nextLesson: { slug: string; title: LocaleText } | null;
  quizAttempts: Array<{
    lesson_slug: string;
    score: number;
    total: number;
    attempted_at: string;
  }>;
  journalEntries: Array<{
    outcome: string;
    rr: number | null;
  }>;
  recentActivity: Array<{
    lesson_slug: string;
    status: string;
    last_viewed_at: string;
  }>;
};

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string | number;
  sub?: string;
  tone?: "primary" | "bull" | "gold";
}) {
  const toneColor = tone === "bull" ? "bull" : tone === "gold" ? "gold" : "primary";
  return (
    <div className="group rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:border-border/80 hover:shadow-elevated/30">
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className={cn(
          "flex size-7 items-center justify-center rounded-md transition-colors",
          toneColor === "primary" && "bg-primary/10 text-primary",
          toneColor === "bull" && "bg-bull/10 text-bull",
          toneColor === "gold" && "bg-gold/10 text-gold",
        )}>
          <Icon className="size-3.5" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function DashboardView({ data }: { data: DashboardData | null }) {
  const { locale } = useLocale();
  const tl = locale === "tl";

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center text-muted-foreground">
        {tl ? "Mag-login para makita ang dashboard." : "Sign in to view your dashboard."}
      </div>
    );
  }

  const {
    displayName,
    totalLessons,
    completedCount,
    inProgressCount,
    examPassed,
    nextLesson,
    quizAttempts,
    journalEntries,
    recentActivity,
  } = data;

  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Quiz stats
  const totalQuizzes = quizAttempts.length;
  const perfectQuizzes = quizAttempts.filter((q) => q.score === q.total).length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          (quizAttempts.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) /
            totalQuizzes),
        )
      : 0;

  // Journal stats
  const totalTrades = journalEntries.length;
  const closedTrades = journalEntries.filter((j) => j.outcome !== "open");
  const wins = closedTrades.filter((j) => j.outcome === "win").length;
  const winRate = closedTrades.length > 0 ? Math.round((wins / closedTrades.length) * 100) : 0;
  const netR = journalEntries.reduce((sum, j) => {
    if (!j.rr || j.outcome === "open") return sum;
    return sum + (j.outcome === "win" ? j.rr : -j.rr);
  }, 0);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {tl ? "Maligayang pagbabalik" : "Welcome back"}
        {displayName ? `, ${displayName}` : ""}
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        {tl
          ? "Tingnan ang iyong progreso at aktibidad."
          : "Your progress and activity at a glance."}
      </p>

      {/* Course progress bar */}
      <div className="mt-6 rounded-xl ring-gradient p-5 shadow-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-primary" />
            <span className="text-sm font-medium">
              {tl ? "Progreso ng kurso" : "Course progress"}
            </span>
          </div>
          <span className="font-mono text-sm">
            {completedCount}/{totalLessons} · {progressPct}%
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {nextLesson && (
            <Button asChild size="sm">
              <Link href={`/learn/${nextLesson.slug}`}>
                <PlayCircle className="size-4" />
                {completedCount === 0
                  ? tl ? "Magsimula" : "Start learning"
                  : tl ? "Ipagpatuloy" : "Continue"}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <Link href="/academy">
              <BookOpen className="size-4" />
              {tl ? "Tingnan ang kurso" : "View course"}
            </Link>
          </Button>
          {examPassed && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <Trophy className="size-3.5" />
              {tl ? "Naipasa ang Final Exam" : "Final Exam passed"}
            </span>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={CheckCircle2}
          label={tl ? "Tapos" : "Completed"}
          value={completedCount}
          sub={`${inProgressCount} ${tl ? "itinutuloy" : "in progress"}`}
          tone="bull"
        />
        <StatCard
          icon={BookOpen}
          label={tl ? "Quizzes" : "Quizzes"}
          value={perfectQuizzes}
          sub={`${totalQuizzes} ${tl ? "kabuuang pagsubok" : "total attempts"}`}
          tone="primary"
        />
        <StatCard
          icon={TrendingUp}
          label={tl ? "Avg score" : "Avg score"}
          value={totalQuizzes > 0 ? `${avgScore}%` : "--"}
          sub={tl ? "Lahat ng quiz" : "Across all quizzes"}
          tone="primary"
        />
        <StatCard
          icon={NotebookPen}
          label={tl ? "Trades" : "Trades"}
          value={totalTrades}
          sub={
            closedTrades.length > 0
              ? `${winRate}% ${tl ? "panalo" : "win rate"}`
              : tl ? "Walang naka-close" : "No closed trades"
          }
          tone="gold"
        />
      </div>

      {/* Journal performance (only if they have closed trades) */}
      {closedTrades.length > 0 && (
        <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NotebookPen className="size-4 text-gold" />
              <span className="text-sm font-medium">
                {tl ? "Journal performance" : "Journal performance"}
              </span>
            </div>
            <Link
              href="/tools/journal"
              className="text-xs text-primary hover:underline"
            >
              {tl ? "Tingnan lahat" : "View all"}
            </Link>
          </div>
          <div className="mt-3 flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">{tl ? "Panalo" : "Wins"}</span>
              <span className="ml-1.5 font-mono font-medium text-bull">{wins}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{tl ? "Talo" : "Losses"}</span>
              <span className="ml-1.5 font-mono font-medium text-bear">
                {closedTrades.filter((j) => j.outcome === "loss").length}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Net R</span>
              <span
                className={cn(
                  "ml-1.5 font-mono font-medium",
                  netR >= 0 ? "text-bull" : "text-bear",
                )}
              >
                {netR >= 0 ? "+" : ""}
                {netR.toFixed(1)}R
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent activity */}
      {recentActivity.length > 0 && (
        <div className="mt-6">
          <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Clock className="size-4" />
            {tl ? "Kamakailang aktibidad" : "Recent activity"}
          </h2>
          <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-card">
            {recentActivity.map((row) => {
              const lesson = getLesson(row.lesson_slug);
              const completed = row.status === "completed";
              return (
                <Link
                  key={row.lesson_slug}
                  href={`/learn/${row.lesson_slug}`}
                  className="group/row flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-accent/50 hover:pl-5"
                >
                  {completed ? (
                    <CheckCircle2 className="size-4 shrink-0 text-bull" />
                  ) : (
                    <PlayCircle className="size-4 shrink-0 text-primary" />
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {lesson ? t(lesson.title, locale) : row.lesson_slug}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(row.last_viewed_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/row:translate-x-1 group-hover/row:text-primary" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
