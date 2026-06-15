"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import type { Lesson } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { LocaleToggle } from "@/components/locale-toggle";
import { LessonContent } from "@/components/lesson/lesson-content";
import { Quiz } from "@/components/lesson/quiz";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { recordView, completeLesson } from "@/app/actions";

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
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  // Record the view and load completion state (client-side, keeps the page static).
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
        .then(({ data }) => setCompleted(data?.status === "completed"));
    });
  }, [lesson.slug]);

  async function markComplete() {
    setSaving(true);
    const res = await completeLesson(lesson.slug);
    if (res.ok) setCompleted(true);
    setSaving(false);
  }

  return (
    <article className="mx-auto max-w-3xl">
      {/* top bar */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {locale === "tl" ? "Balik sa kurso" : "Back to course"}
        </Link>
        <LocaleToggle />
      </div>

      <header className="border-b border-border pb-5">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {t(lesson.title, locale)}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" />
            {lesson.estMinutes} {locale === "tl" ? "minuto" : "min"}
          </span>
          {completed && (
            <span className="inline-flex items-center gap-1 text-bull">
              <CheckCircle2 className="size-4" />
              {locale === "tl" ? "Tapos na" : "Completed"}
            </span>
          )}
        </div>
        <p className="mt-3 text-muted-foreground">{t(lesson.summary, locale)}</p>
      </header>

      <div className="mt-6">
        <LessonContent blocks={lesson.blocks} />
      </div>

      <Quiz quiz={lesson.quiz} lessonSlug={lesson.slug} />

      {/* mark complete */}
      <div className="mt-8 flex items-center justify-center">
        {completed ? (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-bull">
            <CheckCircle2 className="size-5" />
            {locale === "tl"
              ? "Natapos mo na ang lesson na ito!"
              : "You've completed this lesson!"}
          </p>
        ) : (
          <Button variant="secondary" onClick={markComplete} disabled={saving}>
            <CheckCircle2 className="size-4" />
            {saving
              ? locale === "tl"
                ? "Sini-save…"
                : "Saving…"
              : locale === "tl"
                ? "Markahan bilang tapos"
                : "Mark as complete"}
          </Button>
        )}
      </div>

      {/* prev / next */}
      <nav className="mt-10 grid grid-cols-2 gap-3 border-t border-border pt-6">
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/50"
          >
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <ChevronLeft className="size-3.5" />
              {locale === "tl" ? "Nakaraan" : "Previous"}
            </span>
            <span className="mt-1 text-sm font-medium">
              {t(prev.title, locale)}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-muted-foreground/50"
          >
            <span className="inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
              {locale === "tl" ? "Susunod" : "Next"}
              <ChevronRight className="size-3.5" />
            </span>
            <span className="mt-1 text-sm font-medium">
              {t(next.title, locale)}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
