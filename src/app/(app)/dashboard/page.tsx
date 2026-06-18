"use client";

import { DashboardView } from "@/components/dashboard-view";
import { useProgress, useDashboardStats, useUserProfile } from "@/lib/hooks/use-user-data";
import { getAllLessons } from "@/content/course";

export default function DashboardPage() {
  const { data: progress } = useProgress();
  const { data: stats } = useDashboardStats();
  const { data: profile } = useUserProfile();

  const allLessons = getAllLessons();

  if (!profile) {
    return <DashboardView data={null} />;
  }

  const completedSlugs = allLessons.filter(
    (l) => progress?.[l.slug]?.status === "completed",
  );
  const inProgressSlugs = allLessons.filter(
    (l) => progress?.[l.slug] && progress[l.slug]?.status !== "completed",
  );
  const nextLesson = allLessons.find(
    (l) => !progress?.[l.slug] || progress[l.slug]?.status !== "completed",
  );
  const examPassed = progress?.["final-exam"]?.status === "completed";

  return (
    <DashboardView
      data={{
        displayName: profile.displayName,
        totalLessons: allLessons.length,
        completedCount: completedSlugs.length,
        inProgressCount: inProgressSlugs.length,
        examPassed: examPassed ?? false,
        nextLesson: nextLesson
          ? { slug: nextLesson.slug, title: nextLesson.title }
          : null,
        quizAttempts: stats?.quizAttempts ?? [],
        journalEntries: stats?.journalEntries ?? [],
        recentActivity: stats?.recentActivity ?? [],
      }}
    />
  );
}
