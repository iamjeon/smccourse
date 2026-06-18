"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart,
  Languages,
  ListChecks,
  Gift,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  GaugeCircle,
  Sparkles,
  ShieldCheck,
  PlayCircle,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/supabase/env";
import { useLocale } from "@/components/locale-provider";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import dynamic from "next/dynamic";

const SmcChart = dynamic(
  () => import("@/components/charts/SmcChart").then((m) => m.SmcChart),
  { ssr: false },
);
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { BrowserFrame } from "@/components/marketing/browser-frame";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  getCourse,
  getCourseCurriculum,
  getCourseLessons,
  totalLessons,
} from "@/content/course";
import { t, type ChartSpec } from "@/content/schema";

const previewChart: ChartSpec = {
  id: "preview",
  height: 230,
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
    { type: "box", kind: "fvg", from: 1, to: 6, top: 108, bottom: 104, tone: "gold", label: { en: "FVG", tl: "FVG" } },
    { type: "marker", kind: "entry", index: 5, price: 108, tone: "bull", label: { en: "Entry", tl: "Entry" } },
  ],
};

const demoChart: ChartSpec = {
  id: "demo",
  title: { en: "Bullish Order Block + FVG", tl: "Bullish Order Block + FVG" },
  height: 360,
  candles: [
    { o: 112, h: 113, l: 107, c: 108 },
    { o: 108, h: 109, l: 103, c: 105 },
    { o: 105, h: 106, l: 101, c: 103 },
    { o: 103, h: 111, l: 103, c: 110 },
    { o: 110, h: 117, l: 109, c: 116 },
    { o: 116, h: 118, l: 109, c: 114 },
    { o: 114, h: 115, l: 104, c: 108 },
    { o: 108, h: 114, l: 105, c: 113 },
    { o: 113, h: 121, l: 112, c: 119 },
    { o: 119, h: 126, l: 118, c: 124 },
  ],
  annotations: [
    { type: "box", kind: "ob", from: 2, to: 7, top: 105, bottom: 103, tone: "bull", label: { en: "OB", tl: "OB" }, appearAtStep: 0 },
    { type: "box", kind: "fvg", from: 2, to: 6, top: 109, bottom: 106, tone: "gold", label: { en: "FVG", tl: "FVG" }, appearAtStep: 1 },
    { type: "marker", kind: "entry", index: 6, price: 105, tone: "bull", appearAtStep: 2, label: { en: "Entry", tl: "Entry" } },
    { type: "line", kind: "level", price: 100, tone: "bear", dashed: true, appearAtStep: 3, label: { en: "SL", tl: "SL" } },
  ],
  steps: [
    { caption: { en: "The last down-close candle before the rally is the Order Block.", tl: "Ang huling down-close candle bago ang rally ay ang Order Block." }, revealCandles: 3 },
    { caption: { en: "The impulsive move leaves an FVG: a high-probability setup.", tl: "May naiwang FVG ang impulsive move: high-probability setup." }, revealCandles: 5 },
    { caption: { en: "Price returns and reacts: that's our entry.", tl: "Bumalik ang price at nag-react: yan ang entry." }, revealCandles: 7 },
    { caption: { en: "Continuation. Stop below, target 1:2.", tl: "Continuation. Stop sa baba, target 1:2." }, revealCandles: 10 },
  ],
};

function FloatBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -8, 0] }
      }
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { locale } = useLocale();
  const router = useRouter();
  const curriculum = getCourseCurriculum("smc");
  const tl = locale === "tl";

  // Logged-in users shouldn't see the marketing page — send them to the dashboard.
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });
  }, [router]);

  const stats = [
    { value: "5", label: { en: "Modules", tl: "Modules" }, icon: BookOpen },
    { value: String(totalLessons()), label: { en: "Lessons", tl: "Lessons" }, icon: LineChart },
    { value: "100%", label: { en: "Free", tl: "Libre" }, icon: Gift },
    { value: "EN/TL", label: { en: "Bilingual", tl: "Bilingual" }, icon: Languages },
  ];

  const features = [
    {
      icon: LineChart,
      title: { en: "Interactive charts", tl: "Interactive charts" },
      body: {
        en: "Animated, step-through SMC charts that move as the concept is explained. Not static images, not boring video.",
        tl: "Animated, step-through na SMC charts na gumagalaw habang ipinapaliwanag. Hindi static, hindi nakakaantok na video.",
      },
      span: true,
    },
    {
      icon: Languages,
      title: { en: "English + Taglish", tl: "English + Taglish" },
      body: {
        en: "Every lesson in both languages. Switch with one tap.",
        tl: "Bawat lesson sa dalawang wika. Isang tap lang.",
      },
    },
    {
      icon: ListChecks,
      title: { en: "Quiz every lesson", tl: "Quiz bawat lesson" },
      body: {
        en: "Instant feedback and explanations so concepts actually stick.",
        tl: "Instant feedback at paliwanag para tumatak talaga.",
      },
    },
    {
      icon: GaugeCircle,
      title: { en: "Track progress", tl: "Track progress" },
      body: {
        en: "Your completion and scores are saved across devices.",
        tl: "Naka-save ang progreso at scores mo sa lahat ng device.",
      },
    },
    {
      icon: Smartphone,
      title: { en: "Built for mobile", tl: "Para sa mobile" },
      body: {
        en: "Learn comfortably on the phone you already trade on.",
        tl: "Mag-aral nang komportable sa phone na ginagamit mo.",
      },
    },
  ];

  const steps = [
    {
      icon: Gift,
      title: { en: "Enroll free", tl: "Mag-enroll nang libre" },
      body: {
        en: "Just your email. No password, no credit card.",
        tl: "Email lang. Walang password, walang credit card.",
      },
    },
    {
      icon: PlayCircle,
      title: { en: "Learn interactively", tl: "Mag-aral nang interactive" },
      body: {
        en: "Step through animated charts in English or Taglish.",
        tl: "I-step ang animated charts sa English o Taglish.",
      },
    },
    {
      icon: TrendingUp,
      title: { en: "Prove it & progress", tl: "Patunayan & umusad" },
      body: {
        en: "Pass the quiz, unlock the next lesson, watch your progress grow.",
        tl: "Pasa sa quiz, i-unlock ang susunod, lumago ang progreso.",
      },
    },
  ];

  const faqs = [
    {
      q: { en: "Is it really free?", tl: "Libre ba talaga?" },
      a: {
        en: "Yes, completely free, forever. It runs on free infrastructure so there's no paywall and no catch.",
        tl: "Oo, completely free, habambuhay. Tumatakbo ito sa libreng infrastructure kaya walang paywall, walang catch.",
      },
    },
    {
      q: { en: "Do I need trading experience?", tl: "Kailangan ba ng karanasan sa trading?" },
      a: {
        en: "No. The course starts from the foundations (market structure, liquidity, and the basics) and builds up step by step.",
        tl: "Hindi. Nagsisimula ang kurso sa pundasyon (market structure, liquidity, at basics) at unti-unting lumalalim.",
      },
    },
    {
      q: { en: "English or Tagalog?", tl: "English o Tagalog?" },
      a: {
        en: "Both. Every lesson has an English and a Taglish version. Switch anytime with the EN/TL toggle.",
        tl: "Pareho. May English at Taglish na bersyon bawat lesson. Lipat kahit kailan sa EN/TL toggle.",
      },
    },
    {
      q: { en: "Is this financial advice?", tl: "Financial advice ba ito?" },
      a: {
        en: "No. This is educational content only. Trading involves real risk; always manage it responsibly.",
        tl: "Hindi. Pang-edukasyon lamang ito. May tunay na panganib ang trading; laging mag-manage nang responsable.",
      },
    },
  ];

  // ── Structured data (kept faithful to the visible page) ──────────────────────
  const smc = getCourse("smc");
  const totalMinutes = getCourseLessons("smc").reduce(
    (sum, l) => sum + l.estMinutes,
    0,
  );
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: smc?.title.en ?? brand.name,
    description: smc?.description.en ?? brand.description,
    url: `${siteUrl}/academy`,
    inLanguage: ["en", "tl"],
    isAccessibleForFree: true,
    educationalLevel: "Beginner to Expert",
    provider: { "@type": "Organization", name: brand.name, url: siteUrl },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.max(1, Math.round(totalMinutes / 60))}H`,
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q.en,
      acceptedAnswer: { "@type": "Answer", text: f.a.en },
    })),
  };

  return (
    <>
      <JsonLd data={[courseLd, faqLd]} />
      <SiteHeader />

      {/* ─────────── Hero ─────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-spotlight" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.015]" />

        <div className="container relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="animate-shimmer inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" />
                {tl ? "Libreng SMC course · habambuhay" : "Free SMC course · forever"}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {tl ? "Mag-trade na parang " : "Trade like the "}
                <span className="text-gradient">
                  {tl ? "smart money" : "smart money"}
                </span>
                {tl ? "." : "."}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {tl
                  ? "Isang interactive na Smart Money Concepts course na may animated charts, bilingual na lessons, at quizzes. Walang video, walang bayad."
                  : "An interactive Smart Money Concepts course with animated charts, bilingual lessons, and quizzes. No video, no cost."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/login">
                    {tl ? "Mag-enroll nang libre" : "Enroll free"}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#demo">
                    <PlayCircle className="size-4" />
                    {tl ? "Panoorin ang demo" : "See the demo"}
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" />
                  {tl ? "Walang credit card" : "No credit card"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" />
                  {tl ? "Email lang" : "Just an email"}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Product preview */}
          <Reveal delay={0.2} className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 bg-glow-bottom" />
            <BrowserFrame url="freesmartmoneycourse.online/learn/fair-value-gap">
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-sm font-semibold">
                    {tl ? "Lesson · Fair Value Gap" : "Lesson · Fair Value Gap"}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-[10px] font-medium">
                    <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">EN</span>
                    <span className="px-2 py-0.5 text-muted-foreground">TL</span>
                  </span>
                </div>
                <SmcChart spec={previewChart} />
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 rounded-md border border-bull/40 bg-bull/10 px-3 py-2 text-xs">
                    <CheckCircle2 className="size-4 text-bull" />
                    {tl
                      ? "Tama! Gap sa pagitan ng candle 1 at candle 3."
                      : "Correct! Gap between candle 1 and candle 3."}
                  </div>
                </div>
              </div>
            </BrowserFrame>

            <FloatBadge
              delay={0.3}
              className="absolute -left-3 top-16 hidden rounded-xl border border-border glass px-3 py-2 shadow-elevated sm:block"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {tl ? "Quiz" : "Quiz"}
              </p>
              <p className="font-mono text-sm font-semibold text-bull">4/4 ✓</p>
            </FloatBadge>
            <FloatBadge
              delay={0.8}
              className="absolute -right-3 bottom-10 hidden rounded-xl border border-border glass px-3 py-2 shadow-elevated sm:block"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {tl ? "Progreso" : "Progress"}
              </p>
              <p className="font-mono text-sm font-semibold text-primary">+1 lesson</p>
            </FloatBadge>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="container relative border-t border-border/70 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="font-display text-2xl font-bold sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t(s.label, locale)}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Features (bento) ─────────── */}
      <section className="container py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {tl ? "Mga tampok" : "Features"}
          </p>
          <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {tl
              ? "Lahat ng kailangan mo para matuto, nasa isang lugar."
              : "Everything you need to learn, in one place."}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isHero = f.span;
            return (
              <Reveal
                key={i}
                delay={i * 0.05}
                className={isHero ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <div className={cn(
                  "group h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-1",
                  isHero
                    ? "ring-gradient shadow-elevated hover:shadow-lg"
                    : "border border-border bg-card shadow-card hover:border-primary/40 hover:shadow-elevated/30",
                )}>
                  <div className={cn(
                    "inline-flex rounded-lg p-2.5 transition-colors",
                    isHero
                      ? "bg-primary/15 text-primary"
                      : "border border-border bg-secondary/50 text-primary group-hover:bg-primary/10",
                  )}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className={cn(
                    "mt-4 font-display font-semibold",
                    isHero ? "text-xl" : "text-lg",
                  )}>
                    {t(f.title, locale)}
                  </h3>
                  <p className={cn(
                    "mt-2 leading-relaxed text-muted-foreground",
                    isHero ? "text-sm sm:text-base" : "text-sm",
                  )}>
                    {t(f.body, locale)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─────────── How it works ─────────── */}
      <section className="border-y border-border bg-card/30">
        <div className="container py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {tl ? "Paano gumagana" : "How it works"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {tl ? "Tatlong hakbang lang" : "Just three steps"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="relative h-full rounded-xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated/30">
                    <span className="absolute right-5 top-5 font-display text-5xl font-bold text-border/60">
                      {i + 1}
                    </span>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">
                      {t(s.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(s.body, locale)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Live demo ─────────── */}
      <section id="demo" className="relative scroll-mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-spotlight opacity-50" />
        <div className="container relative grid gap-10 py-24 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {tl ? "Subukan mo mismo" : "Try it yourself"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {tl
                ? "Hindi panonood. Pag-aralan mo ito."
                : "Don't watch. Work through it."}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {tl
                ? "Bawat konsepto ay nasa malinaw at tamang chart: order block, fair value gap, entry, at stop, lahat naka-mark. Ganito ang bawat lesson sa loob."
                : "Every concept is shown on a clean, accurate chart: order block, fair value gap, entry, and stop, all marked. This is what every lesson looks like inside."}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/login">
                  {tl ? "I-unlock lahat ng lessons" : "Unlock all lessons"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="pointer-events-none absolute -inset-8 -z-10 bg-glow-bottom opacity-70" />
            <div className="rounded-xl border border-border bg-card p-4 shadow-elevated sm:p-5">
              <SmcChart spec={demoChart} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── Curriculum ─────────── */}
      <section id="curriculum" className="border-t border-border scroll-mt-16">
        <div className="container py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {tl ? "Ang kurikulum" : "The curriculum"}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {tl
                ? "Mula sa pundasyon hanggang sa buong trade models. Tapusin ang bawat lesson at quiz para umusad."
                : "From the foundations to full trade models. Finish each lesson and quiz to progress."}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {curriculum.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 2) * 0.06}>
                <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated/30">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                      {m.lessons.length > 0
                        ? `${m.lessons.length} ${tl ? "lessons" : "lessons"}`
                        : tl
                          ? "Malapit na"
                          : "Coming soon"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">
                    {t(m.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(m.description, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="border-t border-border bg-card/30">
        <div className="container py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {tl ? "Mga tanong" : "FAQ"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {tl ? "Mga madalas itanong" : "Frequently asked"}
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <details className="group rounded-xl border border-border bg-background p-5 transition-all duration-200 open:shadow-card hover:border-primary/30 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 font-medium marker:content-none">
                    {t(f.q, locale)}
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-secondary text-sm text-muted-foreground transition-all duration-200 group-open:rotate-45 group-open:bg-primary/10 group-open:text-primary">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(f.a, locale)}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute inset-0 bg-glow-bottom" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="container relative py-28 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold tracking-tight sm:text-5xl">
              {tl
                ? "Simulan ang iyong SMC journey ngayon."
                : "Start your SMC journey today."}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              {tl
                ? "Libre habambuhay. Mag-aral sa sariling bilis, kahit anong device."
                : "Free forever. Learn at your own pace, on any device."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="animate-glow-pulse">
                <Link href="/login">
                  {tl ? "Mag-enroll nang libre" : "Enroll free"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
          <p className="font-display font-semibold text-foreground">{brand.name}</p>
          <p>{brand.tagline}</p>
          <p className="mt-2 max-w-xl text-xs">
            {tl
              ? "Para sa edukasyon lamang. Ang trading ay may panganib; hindi ito financial advice."
              : "For education only. Trading involves risk; this is not financial advice."}
          </p>
        </div>
      </footer>
    </>
  );
}
