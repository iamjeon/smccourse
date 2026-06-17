import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isAdmin } from "@/lib/auth";
import { getProgressMap } from "@/lib/progress";
import { getAllLessons } from "@/content/course";
import { ExamView, ExamLocked } from "@/components/exam-view";

export const metadata = { title: "Final Exam" };
export const dynamic = "force-dynamic";

/**
 * Final exam route. Gated: unlocks only once every lesson is completed. The exam itself
 * is a 100-question mastery-loop quiz (100% to pass; misses are re-asked until correct),
 * saved under the reserved "final-exam" slug via saveExamAttempt.
 */
export default async function ExamPage() {
  const lessons = getAllLessons();
  const total = lessons.length;

  if (!isSupabaseConfigured) {
    return <ExamLocked done={0} total={total} />;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/login?next=/exam");

  const progress = await getProgressMap();
  const done = lessons.filter((l) => progress[l.slug]?.status === "completed").length;
  // Admins can preview the exam without finishing every lesson.
  if (done < total && !isAdmin(user)) {
    return <ExamLocked done={done} total={total} />;
  }

  const alreadyPassed = progress["final-exam"]?.status === "completed";
  return <ExamView alreadyPassed={alreadyPassed} />;
}
