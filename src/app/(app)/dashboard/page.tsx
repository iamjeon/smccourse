import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ensureEnrolled, getProgressMap } from "@/lib/progress";
import { getAllLessons } from "@/content/course";
import { DashboardView } from "@/components/dashboard-view";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return <DashboardView data={null} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  if (!user) redirect("/login?next=/dashboard");

  await ensureEnrolled();
  const progress = await getProgressMap();
  const allLessons = getAllLessons();

  const displayName =
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    null;

  const completedSlugs = allLessons
    .filter((l) => progress[l.slug]?.status === "completed")
    .map((l) => l.slug);
  const inProgressSlugs = allLessons
    .filter((l) => progress[l.slug] && progress[l.slug]?.status !== "completed")
    .map((l) => l.slug);

  const nextLesson = allLessons.find(
    (l) => !progress[l.slug] || progress[l.slug]?.status !== "completed",
  );

  const [{ data: quizRows }, { data: journalRows }, { data: recentRows }] =
    await Promise.all([
      supabase!
        .from("quiz_attempts")
        .select("lesson_slug,score,total,attempted_at")
        .eq("user_id", user.id)
        .order("attempted_at", { ascending: false }),
      supabase!
        .from("journal_entries")
        .select("outcome,rr")
        .eq("user_id", user.id),
      supabase!
        .from("lesson_progress")
        .select("lesson_slug,status,last_viewed_at")
        .eq("user_id", user.id)
        .order("last_viewed_at", { ascending: false })
        .limit(5),
    ]);

  const quizAttempts = (quizRows ?? []) as Array<{
    lesson_slug: string;
    score: number;
    total: number;
    attempted_at: string;
  }>;
  const journalEntries = (journalRows ?? []) as Array<{
    outcome: string;
    rr: number | null;
  }>;
  const recentActivity = (recentRows ?? []) as Array<{
    lesson_slug: string;
    status: string;
    last_viewed_at: string;
  }>;

  const examPassed = progress["final-exam"]?.status === "completed";

  return (
    <DashboardView
      data={{
        displayName,
        totalLessons: allLessons.length,
        completedCount: completedSlugs.length,
        inProgressCount: inProgressSlugs.length,
        examPassed,
        nextLesson: nextLesson
          ? { slug: nextLesson.slug, title: nextLesson.title }
          : null,
        quizAttempts,
        journalEntries,
        recentActivity,
      }}
    />
  );
}
