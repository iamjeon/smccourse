"use client";

import Link from "next/link";
import { ArrowLeft, BookA, GraduationCap, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/content/schema";
import { getLesson } from "@/content/course";
import {
  categoryLabels,
  glossarySlug,
  plainTermName,
  getTermByName,
  type GlossaryTerm,
} from "@/content/glossary";
import { Button } from "@/components/ui/button";

export function GlossaryTermView({ term }: { term: GlossaryTerm }) {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const name = plainTermName(term.term);
  const lesson = term.lessonSlug ? getLesson(term.lessonSlug) : undefined;
  const related = (term.related ?? [])
    .map((r) => getTermByName(r))
    .filter((x): x is GlossaryTerm => Boolean(x));

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        href="/tools/glossary"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {tl ? "Buong glossary" : "Full glossary"}
      </Link>

      <header className="mt-3 border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <BookA className="size-5 text-primary" />
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs uppercase tracking-wide text-muted-foreground">
            {t(categoryLabels[term.category], locale)}
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{term.term}</h1>
        {term.aka && term.aka.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            {tl ? "Kilala rin bilang" : "Also known as"}: {term.aka.join(", ")}
          </p>
        )}
      </header>

      <div className="mt-6 space-y-4">
        <p className="text-lg leading-relaxed">
          {tl
            ? `Sa Smart Money Concepts (SMC) trading, ang ${name} ay tumutukoy sa:`
            : `In Smart Money Concepts (SMC) trading, ${name} refers to:`}
        </p>
        <p className="rounded-xl border border-border bg-card p-5 text-base leading-relaxed shadow-card">
          {t(term.def, locale)}
        </p>
      </div>

      {lesson && (
        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-sm font-medium text-muted-foreground">
            {tl ? "Matutunan ito nang buo sa lesson:" : "Learn this in full in the lesson:"}
          </p>
          <Button asChild className="mt-3">
            <Link href={`/learn/${term.lessonSlug}`}>
              <GraduationCap className="size-4" />
              {t(lesson.title, locale)}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {tl ? "Kaugnay na termino" : "Related terms"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.term}
                href={`/tools/glossary/${glossarySlug(r.term)}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {r.term}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          {tl
            ? "Gusto mong matutunan ang buong Smart Money Concepts nang libre?"
            : "Want to learn the whole Smart Money Concepts method for free?"}
        </p>
        <Button asChild variant="outline" className="mt-3">
          <Link href="/academy">
            {tl ? "Simulan ang libreng SMC course" : "Start the free SMC course"}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
