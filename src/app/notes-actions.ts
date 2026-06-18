"use server";

import { z } from "zod";
import { requireUser } from "@/lib/supabase/require-user";
import { checkActionRate } from "@/lib/action-rate-limit";

const content = z.string().max(10_000);
const slug = z.string().max(80).optional().nullable();

export type NoteRow = {
  id: string;
  content: string;
  lesson_slug: string | null;
  updated_at: string;
  created_at: string;
};

type NoteResult =
  | { ok: true; note: NoteRow }
  | { ok: false; reason?: string };

/** Create a new note (optionally tagged with the lesson the user was on). */
export async function createNote(input: {
  content?: string;
  lessonSlug?: string | null;
}): Promise<NoteResult> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!checkActionRate(ctx.user.id, "notes", 30, 60_000))
    return { ok: false, reason: "Too many notes. Try again in a moment." };
  const parsed = content.safeParse(input.content ?? "");
  const lesson = slug.safeParse(input.lessonSlug ?? null);
  if (!parsed.success || !lesson.success) return { ok: false, reason: "invalid" };

  const { data, error } = await ctx.supabase
    .from("notes")
    .insert({
      user_id: ctx.user.id,
      content: parsed.data,
      lesson_slug: lesson.data ?? null,
    })
    .select("id,content,lesson_slug,updated_at,created_at")
    .single();
  if (error || !data) return { ok: false, reason: error?.message ?? "failed" };
  return { ok: true, note: data as NoteRow };
}

/** Update a note's content (RLS also restricts to the owner). */
export async function saveNote(input: {
  id: string;
  content: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  const parsed = content.safeParse(input.content);
  if (!parsed.success || !z.string().uuid().safeParse(input.id).success)
    return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("notes")
    .update({ content: parsed.data, updated_at: new Date().toISOString() })
    .eq("id", input.id)
    .eq("user_id", ctx.user.id);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}

/** Delete a note. */
export async function deleteNote(input: {
  id: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!z.string().uuid().safeParse(input.id).success)
    return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("notes")
    .delete()
    .eq("id", input.id)
    .eq("user_id", ctx.user.id);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}
