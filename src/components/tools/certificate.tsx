"use client";

import Link from "next/link";
import { ArrowLeft, Award, Lock, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { getCourse } from "@/content/course";
import { useLocale } from "@/components/locale-provider";

const courseTitle = getCourse("smc")?.title.en ?? "Smart Money Concepts Course";

export function Certificate({
  name,
  passed,
  preview,
  completedAt,
}: {
  name: string;
  passed: boolean;
  preview: boolean;
  completedAt: string | null;
}) {
  const { locale } = useLocale();
  const tl = locale === "tl";

  if (!passed && !preview) {
    return (
      <section className="mx-auto max-w-2xl">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {tl ? "Mga tool" : "Tools"}
        </Link>
        <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <Lock className="mx-auto size-12 text-muted-foreground" />
          <h1 className="mt-4 font-display text-2xl font-bold">
            {tl ? "Certificate naka-lock" : "Certificate locked"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {tl
              ? "Ipasa muna ang final exam para makuha ang iyong certificate of completion."
              : "Pass the final exam to unlock your certificate of completion."}
          </p>
          <Button asChild className="mt-6">
            <Link href="/exam">{tl ? "Pumunta sa exam" : "Go to the exam"}</Link>
          </Button>
        </div>
      </section>
    );
  }

  const dateStr = (completedAt ? new Date(completedAt) : new Date()).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <section className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {tl ? "Mga tool" : "Tools"}
        </Link>
        <Button onClick={() => window.print()} variant="secondary" size="sm">
          <Printer className="size-4" />
          {tl ? "I-print / I-save" : "Print / Save"}
        </Button>
      </div>

      {preview && (
        <p className="mt-3 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-center text-sm text-gold print:hidden">
          {tl ? "Admin preview" : "Admin preview"}
        </p>
      )}

      {/* The certificate itself */}
      <div className="ring-gradient mt-4 rounded-2xl p-1">
        <div className="rounded-xl bg-card px-6 py-10 text-center sm:px-12 sm:py-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Award className="size-7" />
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {tl ? "Sertipiko ng Pagtatapos" : "Certificate of Completion"}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            {tl ? "Ipinagkakaloob kay" : "Awarded to"}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {tl
              ? "sa matagumpay na pagtatapos ng buong course at pagpasa ng final exam:"
              : "for successfully completing the full course and passing the final exam:"}
          </p>
          <p className="mt-2 font-display text-lg font-semibold text-primary">
            {courseTitle}
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div>
              <div className="font-mono">{dateStr}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {tl ? "Petsa" : "Date"}
              </div>
            </div>
            <div>
              <div className="font-display font-semibold">{brand.name}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {tl ? "Platform" : "Platform"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
