"use client";

import Link from "next/link";
import {
  LineChart,
  Languages,
  ListChecks,
  Gift,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { useLocale } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import { SmcChart } from "@/components/charts/SmcChart";
import { Button } from "@/components/ui/button";
import { getCurriculum } from "@/content/course";
import { t, type ChartSpec } from "@/content/schema";

const heroChart: ChartSpec = {
  id: "hero",
  height: 300,
  candles: [
    { o: 100, h: 103, l: 99, c: 101 },
    { o: 101, h: 104, l: 100, c: 103 },
    { o: 103, h: 113, l: 103, c: 112 },
    { o: 112, h: 116, l: 108, c: 115 },
    { o: 115, h: 117, l: 112, c: 113 },
    { o: 113, h: 114, l: 107, c: 109 },
    { o: 109, h: 116, l: 108, c: 115 },
    { o: 115, h: 123, l: 114, c: 121 },
    { o: 121, h: 128, l: 120, c: 126 },
  ],
  annotations: [
    { type: "box", kind: "fvg", from: 1, to: 6, top: 108, bottom: 104, tone: "gold", label: { en: "FVG", tl: "FVG" }, appearAtStep: 1 },
    { type: "marker", kind: "entry", index: 5, price: 108, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
  ],
  steps: [
    { caption: { en: "An impulsive move leaves an imbalance.", tl: "May impulsive move na nag-iwan ng imbalance." }, revealCandles: 4 },
    { caption: { en: "That gap is a Fair Value Gap.", tl: "Ang gap na yan ay Fair Value Gap." }, revealCandles: 4 },
    { caption: { en: "Price returns, taps it, and continues.", tl: "Bumalik ang price, tina-tap, tuloy ulit." }, revealCandles: 9 },
  ],
};

export default function Home() {
  const { locale } = useLocale();
  const curriculum = getCurriculum();

  const features = [
    {
      icon: LineChart,
      title: { en: "Interactive charts", tl: "Interactive charts" },
      body: {
        en: "Animated, step-through SMC charts — not boring videos. See each concept move.",
        tl: "Animated, step-through na SMC charts — hindi nakakaantok na video. Makikita mo gumalaw.",
      },
    },
    {
      icon: Languages,
      title: { en: "English + Taglish", tl: "English + Taglish" },
      body: {
        en: "Every lesson in both languages. Switch anytime with one tap.",
        tl: "Bawat lesson sa dalawang wika. Lipat kahit kailan, isang tap lang.",
      },
    },
    {
      icon: ListChecks,
      title: { en: "Quiz every lesson", tl: "Quiz bawat lesson" },
      body: {
        en: "Check what you learned with instant feedback and explanations.",
        tl: "I-check ang natutunan mo — may instant feedback at paliwanag.",
      },
    },
    {
      icon: Gift,
      title: { en: "100% free", tl: "100% libre" },
      body: {
        en: "No paywall, no catch. Learn at your own pace, on any device.",
        tl: "Walang bayad, walang catch. Mag-aral sa sariling bilis, kahit anong device.",
      },
    },
  ];

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-grid">
        <div className="container grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Gift className="size-3.5" />
              {locale === "tl" ? "Libre habambuhay" : "Free forever"}
            </span>
            <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {locale === "tl"
                ? "Matutunan ang Smart Money Concepts — libre."
                : "Master Smart Money Concepts — for free."}
            </h1>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {locale === "tl"
                ? "Self-paced na SMC trading course na may interactive charts, bilingual na lessons, at quizzes. Walang video, walang bayad."
                : "A self-paced SMC trading course with interactive charts, bilingual lessons, and quizzes. No video, no cost."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/login">
                  {locale === "tl" ? "Mag-enroll nang libre" : "Enroll free"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#curriculum">
                  {locale === "tl" ? "Tingnan ang kurso" : "Browse curriculum"}
                </Link>
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 className="size-4 text-primary" />
              {locale === "tl"
                ? "Walang credit card. Email lang."
                : "No credit card. Just an email."}
            </p>
          </div>

          <div className="animate-fade-up">
            <SmcChart spec={heroChart} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-5"
              >
                <Icon className="size-6 text-primary" />
                <h3 className="mt-3 font-display text-base font-semibold">
                  {t(f.title, locale)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(f.body, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="container scroll-mt-16 pb-20">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {locale === "tl" ? "Ang kurikulum" : "The curriculum"}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {locale === "tl"
            ? "Mula sa pundasyon hanggang sa mga trade model. Tapusin ang bawat lesson at quiz para mag-unlock ng progreso."
            : "From the foundations to full trade models. Finish each lesson and quiz to build your progress."}
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {curriculum.map((m) => (
            <div
              key={m.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">
                  {t(m.title, locale)}
                </h3>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                  {m.lessons.length > 0
                    ? `${m.lessons.length} ${locale === "tl" ? "lessons" : "lessons"}`
                    : locale === "tl"
                      ? "Malapit na"
                      : "Coming soon"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(m.description, locale)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
          <h3 className="font-display text-xl font-bold sm:text-2xl">
            {locale === "tl"
              ? "Handa nang mag-aral?"
              : "Ready to start learning?"}
          </h3>
          <Button asChild size="lg">
            <Link href="/login">
              {locale === "tl" ? "Mag-enroll nang libre" : "Enroll free"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container flex flex-col items-center gap-2 py-8 text-center text-sm text-muted-foreground">
          <p>
            {brand.name} · {brand.tagline}
          </p>
          <p className="max-w-xl text-xs">
            {locale === "tl"
              ? "Para sa edukasyon lamang. Ang trading ay may panganib; hindi ito financial advice."
              : "For education only. Trading involves risk; this is not financial advice."}
          </p>
        </div>
      </footer>
    </>
  );
}
