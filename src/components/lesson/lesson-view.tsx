"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Lock,
  ListChecks,
} from "lucide-react";
import type { Lesson } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { LessonContent } from "@/components/lesson/lesson-content";
import { Quiz } from "@/components/lesson/quiz";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { recordView } from "@/app/actions";

type NavLink = { slug: string; title: { en: string; tl: string } } | null;

export function LessonView({
  lesson,
  prev,
  next,
}: {
  lesson: Lesson;
  prev: NavLink;
  next: NavLink;
}) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const [passed, setPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Record the view + load completion (keeps the page static; per-user state client-side).
  useEffect(() => {
    recordView(lesson.slug);
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      supabase
        .from("lesson_progress")
        .select("status")
        .eq("user_id", data.user.id)
        .eq("lesson_slug", lesson.slug)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.status === "completed") setPassed(true);
        });
    });
  }, [lesson.slug]);

  return (
    <article className="mx-auto max-w-3xl">
      {/* top bar — locale toggle lives in the site header, so it's not repeated here */}
      <div className="mb-4">
        <Link
          href="/academy"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {tl ? "Balik sa kurso" : "Back to course"}
        </Link>
      </div>

      <header className="border-b border-border pb-5">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(lesson.title, locale)}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" />
            {lesson.estMinutes} {tl ? "minuto" : "min"}
          </span>
          {passed && (
            <span className="inline-flex items-center gap-1 text-bull">
              <CheckCircle2 className="size-4" />
              {tl ? "Tapos na" : "Completed"}
            </span>
          )}
        </div>
        <p className="mt-3 text-muted-foreground">{t(lesson.summary, locale)}</p>
      </header>

      <div className="mt-6">
        <LessonContent blocks={lesson.blocks} />
      </div>

      {/* Quiz gate */}
      <div className="mt-10 border-t border-border pt-8">
        {!showQuiz ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
            <ListChecks className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 font-display text-xl font-semibold">
              {passed
                ? tl
                  ? "Naipasa mo na ang lesson na ito"
                  : "You've completed this lesson"
                : tl
                  ? "Handa ka na ba?"
                  : "Ready to test yourself?"}
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
              {passed
                ? tl
                  ? "Pwede mong ulitin ang quiz o magpatuloy sa susunod."
                  : "You can retake the quiz or move on to the next lesson."
                : tl
                  ? "Sagutan ang quiz para makumpleto ang lesson. Kailangan ng 100% para magpatuloy."
                  : "Pass the quiz to complete this lesson. You need 100% to continue."}
            </p>
            <Button className="mt-4" onClick={() => setShowQuiz(true)}>
              {passed
                ? tl
                  ? "Ulitin ang quiz"
                  : "Review quiz"
                : tl
                  ? "Sagutan ang quiz"
                  : "Take quiz now"}
            </Button>
          </div>
        ) : (
          <Quiz
            quiz={lesson.quiz}
            lessonSlug={lesson.slug}
            onPassed={() => setPassed(true)}
          />
        )}
      </div>

      {/* prev / next */}
      <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-border pt-6">
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/50"
          >
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <ChevronLeft className="size-3.5" />
              {tl ? "Nakaraan" : "Previous"}
            </span>
            <span className="mt-1 text-sm font-medium">{t(prev.title, locale)}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          passed ? (
            <Link
              href={`/learn/${next.slug}`}
              className="flex flex-col rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-primary/50"
            >
              <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
                {tl ? "Susunod" : "Next"}
                <ChevronRight className="size-3.5" />
              </span>
              <span className="mt-1 text-sm font-medium">{t(next.title, locale)}</span>
            </Link>
          ) : (
            <div
              className="flex cursor-not-allowed flex-col rounded-lg border border-dashed border-border bg-card/50 p-4 text-right opacity-70"
              title={tl ? "Ipasa muna ang quiz" : "Pass the quiz to unlock"}
            >
              <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <Lock className="size-3.5" />
                {tl ? "Naka-lock" : "Locked"}
              </span>
              <span className="mt-1 text-sm font-medium text-muted-foreground">
                {tl ? "Ipasa ang quiz (100%)" : "Pass the quiz (100%)"}
              </span>
            </div>
          )
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
