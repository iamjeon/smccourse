import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { articles } from "@/content/articles";
import { JsonLd } from "@/components/seo/json-ld";
import { siteUrl } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Smart Money Concepts Guides",
  description:
    "Free beginner guides to Smart Money Concepts trading: order blocks, fair value gaps, liquidity, market structure, and more — in plain English.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Smart Money Concepts Guides",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteUrl}/guides/${a.slug}`,
            name: a.title,
          })),
        }}
      />

      <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        <BookOpen className="size-6 text-primary" />
        SMC Guides
      </h1>
      <p className="mt-1.5 text-muted-foreground">
        Free, beginner-friendly guides to Smart Money Concepts. Read here, then go deeper in
        the full course.
      </p>

      <div className="mt-6 grid gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/guides/${a.slug}`}
            className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated/30"
          >
            <h2 className="font-display text-lg font-semibold group-hover:text-primary">
              {a.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {a.readMinutes} min read
              </span>
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
