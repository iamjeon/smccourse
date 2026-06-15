import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllLessons, getLesson, getNeighbors } from "@/content/course";
import { LessonView } from "@/components/lesson/lesson-view";

// Pre-render every lesson shell as static HTML (content is the same for everyone;
// per-user progress is handled client-side). Access is gated by middleware.
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
  return { title: lesson ? lesson.title.en : "Lesson" };
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

  return (
    <LessonView
      lesson={lesson}
      prev={prev ? { slug: prev.slug, title: prev.title } : null}
      next={next ? { slug: next.slug, title: next.title } : null}
    />
  );
}
