"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/require-user";

type ActionResult = { ok: boolean; reason?: string };

const uuid = z.string().uuid();

/** Post a community announcement (shown as a banner to all signed-in users). */
export async function postAnnouncement(input: { body: string }): Promise<ActionResult> {
  const ctx = await requireAdmin();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  const parsed = z.string().trim().min(1).max(1000).safeParse(input.body);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("announcements")
    .insert({ body: parsed.data, created_by: ctx.user.id });
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/academy");
  return { ok: true };
}

/** Activate/deactivate an announcement (deactivated ones stop showing in the banner). */
export async function setAnnouncementActive(input: {
  id: string;
  active: boolean;
}): Promise<ActionResult> {
  const ctx = await requireAdmin();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!uuid.safeParse(input.id).success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("announcements")
    .update({ active: input.active })
    .eq("id", input.id);
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/academy");
  return { ok: true };
}

/** Soft-delete (hide) a chat message. */
export async function deleteChatMessage(input: { id: string }): Promise<ActionResult> {
  const ctx = await requireAdmin();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!uuid.safeParse(input.id).success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("chat_messages")
    .update({ deleted_at: new Date().toISOString(), deleted_by: ctx.user.id })
    .eq("id", input.id);
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

const banSchema = z.object({
  userId: z.string().uuid(),
  reason: z.string().max(300).optional(),
  days: z.number().int().min(1).max(3650).optional(),
});

/** Ban a user from chat (permanent if `days` is omitted). */
export async function banChatUser(input: {
  userId: string;
  reason?: string;
  days?: number;
}): Promise<ActionResult> {
  const ctx = await requireAdmin();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  const parsed = banSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const until = parsed.data.days
    ? new Date(Date.now() + parsed.data.days * 86_400_000).toISOString()
    : null;

  const { error } = await ctx.supabase.from("chat_bans").upsert(
    {
      user_id: parsed.data.userId,
      reason: parsed.data.reason ?? null,
      until,
      created_by: ctx.user.id,
    },
    { onConflict: "user_id" },
  );
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

/** Lift a chat ban. */
export async function unbanChatUser(input: { userId: string }): Promise<ActionResult> {
  const ctx = await requireAdmin();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!uuid.safeParse(input.userId).success) return { ok: false, reason: "invalid" };

  const { error } = await ctx.supabase
    .from("chat_bans")
    .delete()
    .eq("user_id", input.userId);
  if (error) return { ok: false, reason: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
