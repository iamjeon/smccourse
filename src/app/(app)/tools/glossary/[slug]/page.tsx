import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  glossary,
  glossarySlug,
  getGlossaryTerm,
  plainTermName,
} from "@/content/glossary";
import { GlossaryTermView } from "@/components/tools/glossary-term-view";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/supabase/env";

// One static page per glossary term.
export function generateStaticParams() {
  return glossary.map((t) => ({ slug: glossarySlug(t.term) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return { title: "Glossary" };
  const name = plainTermName(term.term);
  const description = term.def.en;
  return {
    title: `${term.term}: meaning in SMC trading`,
    description,
    keywords: [name, term.term, "SMC", "Smart Money Concepts", ...(term.aka ?? [])],
    alternates: { canonical: `/tools/glossary/${slug}` },
    openGraph: {
      type: "article",
      title: `${term.term} — ${brand.name}`,
      description,
      url: `/tools/glossary/${slug}`,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const name = plainTermName(term.term);
  const url = `${siteUrl}/tools/glossary/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            name: term.term,
            alternateName: term.aka,
            description: term.def.en,
            inDefinedTermSet: `${siteUrl}/tools/glossary`,
            url,
            inLanguage: ["en", "tl"],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "SMC Glossary", item: `${siteUrl}/tools/glossary` },
              { "@type": "ListItem", position: 3, name, item: url },
            ],
          },
        ]}
      />
      <GlossaryTermView term={term} />
    </>
  );
}
