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
  revalidatePath("/academy");
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
  if (error) {
    console.error("[recordView] lesson_progress upsert failed:", error.message);
    return { ok: false, reason: error.message };
  }
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
  if (error) {
    console.error("[completeLesson] lesson_progress upsert failed:", error.message);
    return { ok: false, reason: error.message };
  }
  revalidatePath("/dashboard");
  revalidatePath("/academy");
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
  if (error) {
    console.error("[saveQuizAttempt] quiz_attempts insert failed:", error.message);
    return { ok: false, reason: error.message };
  }

  // Pass requires a perfect score; only then is the lesson marked complete.
  // Propagate a completion failure instead of silently swallowing it.
  if (score === total) {
    const done = await completeLesson(lessonSlug);
    if (!done.ok) return { ok: false, reason: done.reason };
  }
  revalidatePath("/dashboard");
  revalidatePath("/academy");
  return { ok: true };
}

const EXAM_SLUG = "final-exam";
const examSchema = z.object({
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  answers: z.record(z.string(), z.string()),
});

/**
 * Save the final-exam attempt. The exam isn't a real lesson, so it bypasses the
 * getLesson() check and records under the reserved `final-exam` slug (no migration:
 * quiz_attempts.lesson_slug and lesson_progress.lesson_slug are plain text). The exam's
 * mastery loop only finishes at a perfect score, so a finished attempt marks it passed.
 */
export async function saveExamAttempt(input: {
  lessonSlug: string;
  score: number;
  total: number;
  answers: Record<string, string>;
}): Promise<ActionResult> {
  const parsed = examSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };

  const { score, total, answers } = parsed.data;
  const { error } = await ctx.supabase.from("quiz_attempts").insert({
    user_id: ctx.user.id,
    lesson_slug: EXAM_SLUG,
    score,
    total,
    answers,
  });
  if (error) {
    console.error("[saveExamAttempt] quiz_attempts insert failed:", error.message);
    return { ok: false, reason: error.message };
  }

  if (score === total) {
    const now = new Date().toISOString();
    const { error: progErr } = await ctx.supabase.from("lesson_progress").upsert(
      {
        user_id: ctx.user.id,
        lesson_slug: EXAM_SLUG,
        status: "completed",
        completed_at: now,
        last_viewed_at: now,
      },
      { onConflict: "user_id,lesson_slug" },
    );
    if (progErr) return { ok: false, reason: progErr.message };
  }
  revalidatePath("/dashboard");
  revalidatePath("/academy");
  revalidatePath("/exam");
  return { ok: true };
}
