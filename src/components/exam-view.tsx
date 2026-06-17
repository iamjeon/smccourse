"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Lock } from "lucide-react";
import { Quiz } from "@/components/lesson/quiz";
import { Button } from "@/components/ui/button";
import { finalExam } from "@/content/final-exam";
import { saveExamAttempt } from "@/app/actions";
import { useLocale } from "@/components/locale-provider";

/** Locked state: shown until every lesson is completed. */
export function ExamLocked({ done, total }: { done: number; total: number }) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8">
        <Lock className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl font-bold">
          {tl ? "Final Exam" : "Final Exam"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {tl
            ? `Tapusin muna ang lahat ng lessons para ma-unlock ang final exam. Natapos mo na ang ${done} sa ${total}.`
            : `Complete every lesson to unlock the final exam. You've finished ${done} of ${total}.`}
        </p>
        <div className="mx-auto mt-4 h-2 w-full max-w-sm overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
        <Button asChild className="mt-6">
          <Link href="/academy">{tl ? "Bumalik sa lessons" : "Back to lessons"}</Link>
        </Button>
      </div>
    </section>
  );
}

/** The unlocked exam: an intro screen, then the 100-question mastery-loop quiz. */
export function ExamView({ alreadyPassed }: { alreadyPassed: boolean }) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <section className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8">
          <GraduationCap className="mx-auto size-12 text-gold" />
          <h1 className="mt-4 font-display text-2xl font-bold">
            {tl ? "Final Exam" : "Final Exam"}
          </h1>
          {alreadyPassed && (
            <p className="mt-3">
              <span className="inline-block rounded-full bg-bull/10 px-3 py-1 text-sm font-medium text-bull">
                {tl ? "Naipasa mo na ito. Pwede mong ulitin." : "Already passed. You can retake it."}
              </span>
            </p>
          )}
          <p className="mt-3 text-muted-foreground">
            {tl
              ? `${finalExam.length} tanong na sumasaklaw sa buong course. Kailangan ng 100% para makapasa, pero hindi ka maiiwan: anumang namali ay babalik para sagutin mong muli hanggang tama na lahat.`
              : `${finalExam.length} questions covering the whole course. You need 100% to pass, but you can't get stuck: any you miss come back for you to answer again until they're all correct.`}
          </p>
          <Button className="mt-6" size="lg" onClick={() => setStarted(true)}>
            {tl ? "Simulan ang exam" : "Start the exam"}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="font-display text-xl font-bold">
        {tl ? "Final Exam" : "Final Exam"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {tl
          ? "Sagutin lahat. Babalik ang mga namali hanggang tama na lahat."
          : "Answer them all. The ones you miss will come back until they're all correct."}
      </p>
      <Quiz
        quiz={finalExam}
        lessonSlug="final-exam"
        onSave={saveExamAttempt}
        onPassed={() => {}}
      />
    </section>
  );
}
