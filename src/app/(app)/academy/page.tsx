"use client";

import { DashboardCourses } from "@/components/dashboard-courses";
import { useProgress } from "@/lib/hooks/use-user-data";

export default function AcademyPage() {
  const { data: progress } = useProgress();
  return <DashboardCourses progress={progress ?? {}} />;
}
