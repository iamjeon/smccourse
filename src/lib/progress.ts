import { createClient } from "@/lib/supabase/server";

export type ProgressMap = Record<
  string,
  { status: "in_progress" | "completed"; completed_at: string | null }
>;

/** Ensure the current user has an enrollment row (idempotent). No-op if not signed in. */
export async function ensureEnrolled(): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from("enrollments")
    .upsert({ user_id: user.id }, { onConflict: "user_id" });
}

/** Fetch the current user's lesson progress as a slug → status map. */
export async function getProgressMap(): Promise<ProgressMap> {
  const supabase = await createClient();
  if (!supabase) return {};
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug,status,completed_at")
    .eq("user_id", user.id);

  const map: ProgressMap = {};
  for (const row of data ?? []) {
    map[row.lesson_slug] = {
      status: row.status,
      completed_at: row.completed_at,
    };
  }
  return map;
}

/** Whether a given lesson is completed for the current user. */
export async function isLessonCompleted(slug: string): Promise<boolean> {
  const map = await getProgressMap();
  return map[slug]?.status === "completed";
}
