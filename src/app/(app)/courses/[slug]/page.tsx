import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourse, getCourseCurriculum } from "@/content/course";
import { getProgressMap } from "@/lib/progress";
import { getAuth } from "@/lib/auth";
import { CourseView } from "@/components/course-view";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return { title: course ? course.title.en : "Course" };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const curriculum = getCourseCurriculum(slug);
  const progress = await getProgressMap();
  const { admin } = await getAuth();

  return (
    <CourseView
      course={course}
      curriculum={curriculum}
      progress={progress}
      unlockAll={admin}
    />
  );
}
