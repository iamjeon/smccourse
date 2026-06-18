"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/require-user";
import { checkActionRate } from "@/lib/action-rate-limit";

const entrySchema = z.object({
  pair: z.string().trim().min(1).max(40),
  direction: z.enum(["long", "short"]),
  setup: z.string().trim().max(120).optional().nullable(),
  lessonSlug: z.string().trim().max(80).optional().nullable(),
  entry: z.number().finite().optional().nullable(),
  stop: z.number().finite().optional().nullable(),
  target: z.number().finite().optional().nullable(),
  rr: z.number().finite().optional().nullable(),
  outcome: z.enum(["win", "loss", "breakeven", "open"]),
  notes: z.string().trim().max(2000).optional().nullable(),
  tradedAt: z.string().optional(),
});

type EntryInput = z.input<typeof entrySchema>;

function toRow(d: z.infer<typeof entrySchema>) {
  return {
    pair: d.pair,
    direction: d.direction,
    setup: d.setup ?? null,
    lesson_slug: d.lessonSlug ?? null,
    entry: d.entry ?? null,
    stop: d.stop ?? null,
    target: d.target ?? null,
    rr: d.rr ?? null,
    outcome: d.outcome,
    notes: d.notes ?? null,
    traded_at: d.tradedAt ? new Date(d.tradedAt).toISOString() : new Date().toISOString(),
  };
}

export async function addJournalEntry(
  input: EntryInput,
): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!checkActionRate(ctx.user.id, "journal", 20, 60_000))
    return { ok: false, reason: "Too many entries. Try again in a moment." };
  const parsed = entrySchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("journal_entries")
    .insert({ user_id: ctx.user.id, ...toRow(parsed.data) });
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/tools/journal");
  return { ok: true };
}

export async function updateJournalEntry(
  input: EntryInput & { id: string },
): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!z.string().uuid().safeParse(input.id).success)
    return { ok: false, reason: "invalid" };
  const parsed = entrySchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("journal_entries")
    .update(toRow(parsed.data))
    .eq("id", input.id)
    .eq("user_id", ctx.user.id);
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/tools/journal");
  return { ok: true };
}

export async function deleteJournalEntry(input: {
  id: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!z.string().uuid().safeParse(input.id).success)
    return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("journal_entries")
    .delete()
    .eq("id", input.id)
    .eq("user_id", ctx.user.id);
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/tools/journal");
  return { ok: true };
}
