import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllLessons,
  getLesson,
  getNeighbors,
  getCourseOfLesson,
} from "@/content/course";
import { LessonView } from "@/components/lesson/lesson-view";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/supabase/env";

// Pre-render every lesson shell as static HTML (content is the same for everyone;
// per-user progress is handled client-side). Lessons are publicly readable.
export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson" };
  const description = lesson.summary.en;
  return {
    title: lesson.title.en,
    description,
    alternates: { canonical: `/learn/${slug}` },
    openGraph: {
      type: "article",
      title: `${lesson.title.en} · ${brand.name}`,
      description,
      url: `/learn/${slug}`,
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const { prev, next } = getNeighbors(slug);
  const course = getCourseOfLesson(slug);
  const url = `${siteUrl}/learn/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lesson.title.en,
            description: lesson.summary.en,
            url,
            inLanguage: ["en", "tl"],
            isAccessibleForFree: true,
            learningResourceType: "Lesson",
            timeRequired: `PT${lesson.estMinutes}M`,
            provider: { "@type": "Organization", name: brand.name, url: siteUrl },
            ...(course
              ? {
                  isPartOf: {
                    "@type": "Course",
                    name: course.title.en,
                    url: `${siteUrl}/courses/${course.slug}`,
                  },
                }
              : {}),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Academy", item: `${siteUrl}/academy` },
              ...(course
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: course.title.en,
                      item: `${siteUrl}/courses/${course.slug}`,
                    },
                    { "@type": "ListItem", position: 4, name: lesson.title.en, item: url },
                  ]
                : [{ "@type": "ListItem", position: 3, name: lesson.title.en, item: url }]),
            ],
          },
        ]}
      />
      <LessonView
        lesson={lesson}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
      />
    </>
  );
}
