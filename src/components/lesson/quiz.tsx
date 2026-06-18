"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";
import type { QuizQuestion } from "@/content/schema";
import { t } from "@/content/schema";
import { useLocale } from "@/components/locale-provider";
import { SmcChart } from "@/components/charts/SmcChart";
import { Button } from "@/components/ui/button";
import { saveQuizAttempt } from "@/app/actions";
import { cn } from "@/lib/utils";

/**
 * One-question-per-page quiz with a mastery loop. The learner answers every question
 * with instant feedback. To pass they must end with 100% correct, but they are never
 * stuck: after a round, every question they missed is asked AGAIN in a review round, and
 * that repeats until none are wrong. Then the quiz is passed and `onPassed` fires.
 * (Owner decision: 100% pass, re-question the misses until all are answered correctly.)
 */
export function Quiz({
  quiz,
  lessonSlug,
  onPassed,
  onSave = saveQuizAttempt,
}: {
  quiz: QuizQuestion[];
  lessonSlug: string;
  onPassed: () => void;
  /** How to persist the passing attempt. Defaults to the per-lesson action; the final
   *  exam passes its own action (the exam slug isn't a real lesson). */
  onSave?: (input: {
    lessonSlug: string;
    score: number;
    total: number;
    answers: Record<string, string>;
  }) => Promise<{ ok: boolean; reason?: string }>;
}) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const total = quiz.length;

  // The questions in the CURRENT round. Round 1 = all; later rounds = only the misses.
  const [round, setRound] = useState<QuizQuestion[]>(quiz);
  const [roundNum, setRoundNum] = useState(1);
  const [pos, setPos] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({}); // current round only
  const [wrong, setWrong] = useState<QuizQuestion[]>([]); // misses accumulating this round
  const [firstScore, setFirstScore] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [saveNote, setSaveNote] = useState<string | null>(null);

  if (total === 0) return null;

  const q = round[pos];
  const picked = chosen[q.id];
  const answered = picked != null;
  const correct = answered && picked === q.correctOptionId;
  const isLast = pos === round.length - 1;
  const roundTotal = round.length;

  function choose(optId: string) {
    if (answered) return; // lock once answered
    setChosen((a) => ({ ...a, [q.id]: optId }));
    if (optId !== q.correctOptionId) {
      setWrong((w) => (w.some((x) => x.id === q.id) ? w : [...w, q]));
    }
  }

  async function saveAndPass() {
    setFinished(true);
    // They end the loop only by answering everything correctly, so the saved score is full.
    const res = await onSave({
      lessonSlug,
      score: total,
      total,
      answers: Object.fromEntries(quiz.map((x) => [x.id, x.correctOptionId])),
    });
    onPassed();
    if (res.ok) {
      toast.success(tl ? "Na-save ang progreso!" : "Progress saved!");
      void mutate("progress");
      void mutate("dashboard-stats");
    }
    if (!res.ok) {
      const reason = res.reason ?? "";
      const dbMissing = /schema cache|does not exist|could not find the table/i.test(
        reason,
      );
      setSaveNote(
        res.reason === "not_signed_in" || res.reason === "not_configured"
          ? tl
            ? "Mag-sign in para ma-save ang progreso."
            : "Sign in to save your progress."
          : dbMissing
            ? tl
              ? "Hindi pa naka-setup ang database, kaya hindi na-save ang progreso."
              : "Progress can't be saved yet: the database tables aren't set up."
            : tl
              ? "Hindi na-save ang score, pero naipasa mo ang quiz."
              : "Couldn't save your score, but you passed the quiz.",
      );
    }
  }

  function next() {
    if (!isLast) {
      setPos((p) => p + 1);
      return;
    }
    // End of the round: gather the misses.
    const missed = wrong;
    if (roundNum === 1) setFirstScore(total - missed.length);
    if (missed.length === 0) {
      void saveAndPass();
    } else {
      // Start a review round containing only the questions they missed.
      setRound(missed);
      setWrong([]);
      setChosen({});
      setPos(0);
      setRoundNum((n) => n + 1);
    }
  }

  function restart() {
    setRound(quiz);
    setRoundNum(1);
    setPos(0);
    setChosen({});
    setWrong([]);
    setFirstScore(null);
    setFinished(false);
    setSaveNote(null);
  }

  // ── Results screen (only reached at a clean 100%) ──
  if (finished) {
    const acedFirstTry = firstScore === total;
    return (
      <section className="mt-6 rounded-xl border border-bull/20 bg-card p-6 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold/10">
            <Trophy className="size-6 text-gold" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-bull">
              {tl ? "Perpekto! 100%" : "Perfect! 100%"}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {tl
                ? "Pwede ka nang pumunta sa susunod."
                : "You can move on to the next one."}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {acedFirstTry
            ? tl
              ? "Tama lahat sa unang subok. Ang galing!"
              : "All correct on the first try. Excellent!"
            : tl
              ? `Naipasa mo lahat pagkatapos i-review ang mga nasagot mong mali (${total - (firstScore ?? 0)} tanong). Ito ang totoong natututo.`
              : `You got everything right after reviewing the ones you missed (${total - (firstScore ?? 0)} question${total - (firstScore ?? 0) === 1 ? "" : "s"}). That's real learning.`}
        </p>
        <Button variant="outline" onClick={restart} className="mt-4">
          <RefreshCw className="size-4" />
          {tl ? "Ulitin ang quiz" : "Take it again"}
        </Button>
        {saveNote && (
          <p className="mt-4 text-xs text-muted-foreground">{saveNote}</p>
        )}
      </section>
    );
  }

  // ── Question screen ──
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
      {/* round banner: only shown during review rounds */}
      {roundNum > 1 && (
        <div className="mb-3 flex items-center gap-2 rounded-md bg-gold/10 px-3 py-2 text-sm text-foreground">
          <RefreshCw className="size-4 text-gold" />
          <span>
            {tl
              ? `Review round ${roundNum}: sagutin ulit ang mga namali (${roundTotal} natitira).`
              : `Review round ${roundNum}: answer the ones you missed (${roundTotal} left).`}
          </span>
        </div>
      )}

      {/* progress */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {tl ? "Tanong" : "Question"} {pos + 1}/{roundTotal}
        </span>
        <div className="flex flex-1 gap-1">
          {round.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                i < pos || (i === pos && answered) ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>

      <p className="font-medium">{t(q.prompt, locale)}</p>

      {q.chart && <SmcChart spec={q.chart} />}

      <div className="mt-4 grid gap-2">
        {q.options.map((opt) => {
          const isChosen = picked === opt.id;
          const isCorrect = opt.id === q.correctOptionId;
          const show = answered && (isChosen || isCorrect);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={answered}
              onClick={() => choose(opt.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-sm transition-all duration-200",
                !answered && "border-border hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm",
                show && isCorrect && "border-bull/60 bg-bull/10",
                show && isChosen && !isCorrect && "border-destructive/60 bg-destructive/10",
                answered && !show && "border-border opacity-50",
              )}
            >
              <span className="flex-1">{t(opt.text, locale)}</span>
              {show && isCorrect && <CheckCircle2 className="size-4 text-bull" />}
              {show && isChosen && !isCorrect && (
                <XCircle className="size-4 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <p
            className={cn(
              "mt-4 rounded-lg px-4 py-3 text-sm leading-relaxed",
              correct ? "border border-bull/20 bg-bull/10 text-foreground" : "border border-border bg-muted/40 text-foreground",
            )}
          >
            <span className="font-semibold">
              {correct
                ? tl
                  ? "Tama! "
                  : "Correct! "
                : tl
                  ? "Mali. Lalabas ulit ito mamaya para sagutin mo muli. "
                  : "Not quite. This one will come back for you to answer again. "}
            </span>
            {t(q.explanation, locale)}
          </p>
          <div className="mt-4 flex justify-end">
            <Button onClick={next}>
              {isLast
                ? tl
                  ? "Tapusin ang round"
                  : "Finish round"
                : tl
                  ? "Susunod na tanong"
                  : "Next question"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
