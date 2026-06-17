"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookA,
  Calculator,
  NotebookPen,
} from "lucide-react";
import { useLocale } from "@/components/locale-provider";

type Tool = {
  href: string;
  icon: typeof Calculator;
  title: { en: string; tl: string };
  desc: { en: string; tl: string };
};

const tools: Tool[] = [
  {
    href: "/tools/calculator",
    icon: Calculator,
    title: { en: "Risk calculator", tl: "Risk calculator" },
    desc: {
      en: "Size a position from your account, risk percent, entry and stop. See the R:R before you commit.",
      tl: "I-size ang posisyon mula sa account, risk percent, entry at stop. Tingnan ang R:R bago pumasok.",
    },
  },
  {
    href: "/tools/journal",
    icon: NotebookPen,
    title: { en: "Trading journal", tl: "Trading journal" },
    desc: {
      en: "Log your trades, the setup, the R:R, and the outcome. Review your win rate over time.",
      tl: "Itala ang mga trade, ang setup, ang R:R, at ang resulta. Suriin ang win rate sa paglipas ng panahon.",
    },
  },
  {
    href: "/tools/glossary",
    icon: BookA,
    title: { en: "SMC glossary", tl: "SMC glossary" },
    desc: {
      en: "Quick, plain-language definitions of every term in the course. Search BOS, FVG, ERL and more.",
      tl: "Mabilis at simpleng kahulugan ng bawat termino sa course. Hanapin ang BOS, FVG, ERL at iba pa.",
    },
  },
  {
    href: "/certificate",
    icon: Award,
    title: { en: "Certificate", tl: "Certificate" },
    desc: {
      en: "Pass the final exam to unlock a shareable certificate of completion.",
      tl: "Ipasa ang final exam para ma-unlock ang shareable certificate of completion.",
    },
  },
];

export function ToolsHub() {
  const { locale } = useLocale();
  const tl = locale === "tl";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {tl ? "Mga tool ng trader" : "Trader tools"}
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        {tl
          ? "Mga kasangkapan para gamitin ang natutunan mo: mag-size ng risk, mag-journal, at mag-aral muli."
          : "Practical tools to apply what you learn: size your risk, journal your trades, and review concepts."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold">
                {tl ? tool.title.tl : tool.title.en}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {tl ? tool.desc.tl : tool.desc.en}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {tl ? "Buksan" : "Open"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
