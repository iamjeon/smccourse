"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getLesson } from "@/content/course";

type ActionResult = { ok: boolean; reason?: string };

const slug = z.string().min(1).max(80);

/** Resolve the current user + client, or a friendly reason why we can't act. */
async function requireUser() {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured" as const };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "not_signed_in" as const };
  return { supabase, user };
}

/** Enroll the current user in the (single) course. Idempotent. */
export async function enroll(): Promise<ActionResult> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  const { error } = await ctx.supabase
    .from("enrollments")
    .upsert({ user_id: ctx.user.id }, { onConflict: "user_id" });
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/dashboard");
  return { ok: true };
}

/** Record that the user opened a lesson (creates an in_progress row if new). */
export async function recordView(lessonSlug: string): Promise<ActionResult> {
  const parsed = slug.safeParse(lessonSlug);
  if (!parsed.success || !getLesson(parsed.data))
    return { ok: false, reason: "bad_slug" };
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };

  const { error } = await ctx.supabase.from("lesson_progress").upsert(
    {
      user_id: ctx.user.id,
      lesson_slug: parsed.data,
      last_viewed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_slug" },
  );
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

/** Mark a lesson complete. */
export async function completeLesson(lessonSlug: string): Promise<ActionResult> {
  const parsed = slug.safeParse(lessonSlug);
  if (!parsed.success || !getLesson(parsed.data))
    return { ok: false, reason: "bad_slug" };
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };

  const now = new Date().toISOString();
  const { error } = await ctx.supabase.from("lesson_progress").upsert(
    {
      user_id: ctx.user.id,
      lesson_slug: parsed.data,
      status: "completed",
      completed_at: now,
      last_viewed_at: now,
    },
    { onConflict: "user_id,lesson_slug" },
  );
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/dashboard");
  revalidatePath(`/learn/${parsed.data}`);
  return { ok: true };
}

const quizSchema = z.object({
  lessonSlug: slug,
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  answers: z.record(z.string(), z.string()),
});

/** Save a quiz attempt and mark the lesson complete if passed (>= 70%). */
export async function saveQuizAttempt(input: {
  lessonSlug: string;
  score: number;
  total: number;
  answers: Record<string, string>;
}): Promise<ActionResult> {
  const parsed = quizSchema.safeParse(input);
  if (!parsed.success || !getLesson(parsed.data.lessonSlug))
    return { ok: false, reason: "invalid" };
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };

  const { lessonSlug, score, total, answers } = parsed.data;
  const { error } = await ctx.supabase.from("quiz_attempts").insert({
    user_id: ctx.user.id,
    lesson_slug: lessonSlug,
    score,
    total,
    answers,
  });
  if (error) return { ok: false, reason: error.message };

  if (score / total >= 0.7) await completeLesson(lessonSlug);
  revalidatePath("/dashboard");
  return { ok: true };
}
