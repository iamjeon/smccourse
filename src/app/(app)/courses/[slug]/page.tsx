"use client";

import { notFound, useParams } from "next/navigation";
import { getCourse, getCourseCurriculum } from "@/content/course";
import { CourseView } from "@/components/course-view";
import { useProgress } from "@/lib/hooks/use-user-data";

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const course = getCourse(slug);
  if (!course) notFound();

  const curriculum = getCourseCurriculum(slug);
  const { data: progress } = useProgress();

  return (
    <CourseView
      course={course}
      curriculum={curriculum}
      progress={progress ?? {}}
      unlockAll={false}
    />
  );
}
