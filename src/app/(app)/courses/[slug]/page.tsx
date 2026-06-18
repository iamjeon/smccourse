"use client";

import { notFound, useParams } from "next/navigation";
import { getCourse, getCourseCurriculum } from "@/content/course";
import { CourseView } from "@/components/course-view";
import { useProgress, useUserProfile } from "@/lib/hooks/use-user-data";

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const course = getCourse(slug);
  if (!course) notFound();

  const curriculum = getCourseCurriculum(slug);
  const { data: progress } = useProgress();
  const { data: profile } = useUserProfile();
  // Signed-out visitors (incl. crawlers) browse freely: every lesson is a real link.
  // Signed-in learners keep the sequential "pass the quiz to unlock" mechanic.
  const authed = !!profile;

  return (
    <CourseView
      course={course}
      curriculum={curriculum}
      progress={progress ?? {}}
      unlockAll={!authed}
    />
  );
}
