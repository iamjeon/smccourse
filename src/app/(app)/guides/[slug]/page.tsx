import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/content/articles";
import { ArticleView } from "@/components/articles/article-view";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/supabase/env";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Guide" };
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article",
      title: `${a.title} — ${brand.name}`,
      description: a.description,
      url: `/guides/${slug}`,
      publishedTime: a.updated,
      modifiedTime: a.updated,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = `${siteUrl}/guides/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.updated,
            dateModified: a.updated,
            inLanguage: "en",
            isAccessibleForFree: true,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: brand.name, url: siteUrl },
            publisher: {
              "@type": "Organization",
              name: brand.name,
              url: siteUrl,
              logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          },
        ]}
      />
      <ArticleView article={a} />
    </>
  );
}
