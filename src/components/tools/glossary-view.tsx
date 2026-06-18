"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BookA, GraduationCap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/content/schema";
import { getLesson } from "@/content/course";
import {
  categoryLabels,
  glossary,
  glossarySlug,
  type GlossaryCategory,
} from "@/content/glossary";
import { cn } from "@/lib/utils";

const categories: (GlossaryCategory | "all")[] = [
  "all",
  "structure",
  "liquidity",
  "zones",
  "models",
  "general",
];

export function GlossaryView() {
  const { locale } = useLocale();
  const tl = locale === "tl";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<GlossaryCategory | "all">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return glossary
      .filter((term) => cat === "all" || term.category === cat)
      .filter((term) => {
        if (!needle) return true;
        const hay = [
          term.term,
          ...(term.aka ?? []),
          term.def.en,
          term.def.tl,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(needle);
      });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {tl ? "Mga tool" : "Tools"}
      </Link>

      <h1 className="mt-3 flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
        <BookA className="size-6 text-primary" />
        {tl ? "SMC glossary" : "SMC glossary"}
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        {tl
          ? "Mabilis na kahulugan ng bawat termino sa course."
          : "Quick definitions of every term in the course."}
      </p>

      <div className="relative mt-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tl ? "Hanapin (hal. FVG, BOS)" : "Search (e.g. FVG, BOS)"}
          className="pl-9"
          aria-label="Search glossary"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              cat === c
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {c === "all"
              ? tl
                ? "Lahat"
                : "All"
              : t(categoryLabels[c], locale)}
          </button>
        ))}
      </div>

      <ul className="mt-5 space-y-3">
        {filtered.map((term) => (
          <li
            key={term.term}
            className="rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-display font-semibold">
                <Link
                  href={`/tools/glossary/${glossarySlug(term.term)}`}
                  className="transition-colors hover:text-primary"
                >
                  {term.term}
                </Link>
              </h2>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                {t(categoryLabels[term.category], locale)}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t(term.def, locale)}
            </p>
            {(term.lessonSlug || (term.related && term.related.length > 0)) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {term.lessonSlug && getLesson(term.lessonSlug) && (
                  <Link
                    href={`/learn/${term.lessonSlug}`}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                  >
                    <GraduationCap className="size-3.5" />
                    {tl ? "Aralin ito" : "Learn it"}: {t(getLesson(term.lessonSlug)!.title, locale)}
                  </Link>
                )}
                {term.related?.map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => {
                      setQ(rel);
                      setCat("all");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {rel}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-10 text-center text-sm text-muted-foreground">
            {tl ? "Walang tugma." : "No matches."}
          </li>
        )}
      </ul>
    </div>
  );
}
