"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import type { QuizQuestion } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { saveQuizAttempt } from "@/app/actions";
import { cn } from "@/lib/utils";

export function Quiz({
  quiz,
  lessonSlug,
}: {
  quiz: QuizQuestion[];
  lessonSlug: string;
}) {
  const { locale } = useLocale();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveNote, setSaveNote] = useState<string | null>(null);

  const total = quiz.length;
  const score = quiz.filter((q) => answers[q.id] === q.correctOptionId).length;
  const allAnswered = quiz.every((q) => answers[q.id]);
  const passed = total > 0 && score / total >= 0.7;

  async function handleSubmit() {
    setSubmitted(true);
    const res = await saveQuizAttempt({ lessonSlug, score, total, answers });
    if (!res.ok) {
      setSaveNote(
        res.reason === "not_signed_in" || res.reason === "not_configured"
          ? "Sign in to save your score and track progress."
          : "Couldn't save your score, but here are your results.",
      );
    }
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    setSaveNote(null);
  }

  if (total === 0) return null;

  return (
    <section className="mt-10 rounded-lg border border-border bg-card p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Trophy className="size-5 text-gold" />
        <h2 className="font-display text-xl font-semibold">
          {locale === "tl" ? "Pagsusulit" : "Quiz"}
        </h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {total} {locale === "tl" ? "tanong" : "questions"}
        </span>
      </div>

      <ol className="space-y-6">
        {quiz.map((q, qi) => {
          const chosen = answers[q.id];
          return (
            <li key={q.id}>
              <p className="mb-3 font-medium">
                <span className="mr-2 text-muted-foreground">{qi + 1}.</span>
                {t(q.prompt, locale)}
              </p>
              <div className="grid gap-2">
                {q.options.map((opt) => {
                  const isChosen = chosen === opt.id;
                  const isCorrect = opt.id === q.correctOptionId;
                  const showState = submitted && (isChosen || isCorrect);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={submitted}
                      onClick={() =>
                        setAnswers((a) => ({ ...a, [q.id]: opt.id }))
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors",
                        !submitted &&
                          (isChosen
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-muted-foreground/50"),
                        showState &&
                          isCorrect &&
                          "border-bull/60 bg-bull/10",
                        showState &&
                          isChosen &&
                          !isCorrect &&
                          "border-destructive/60 bg-destructive/10",
                        submitted && !showState && "border-border opacity-70",
                      )}
                    >
                      <span className="flex-1">{t(opt.text, locale)}</span>
                      {showState && isCorrect && (
                        <CheckCircle2 className="size-4 text-bull" />
                      )}
                      {showState && isChosen && !isCorrect && (
                        <XCircle className="size-4 text-destructive" />
                      )}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  {t(q.explanation, locale)}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            {locale === "tl" ? "I-submit" : "Submit answers"}
          </Button>
        ) : (
          <>
            <div
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 font-medium",
                passed ? "bg-bull/15 text-bull" : "bg-destructive/15 text-destructive",
              )}
            >
              {passed ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <XCircle className="size-5" />
              )}
              {score}/{total}{" "}
              {passed
                ? locale === "tl"
                  ? "— Pasado! 🎉"
                  : "— Passed! 🎉"
                : locale === "tl"
                  ? "— Subukan ulit"
                  : "— Try again"}
            </div>
            <Button variant="outline" onClick={reset}>
              {locale === "tl" ? "Ulitin" : "Retake"}
            </Button>
          </>
        )}
        {saveNote && (
          <p className="w-full text-xs text-muted-foreground">{saveNote}</p>
        )}
      </div>
    </section>
  );
}
