"use server";

import { z } from "zod";
import { requireUser } from "@/lib/supabase/require-user";
import { checkActionRate } from "@/lib/action-rate-limit";

const bodySchema = z.string().trim().min(1).max(500);

async function broadcastToRelay(message: Record<string, unknown>) {
  const url = process.env.RELAY_BROADCAST_URL;
  const secret = process.env.RELAY_SECRET;
  if (!url || !secret) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify(message),
    });
  } catch {
    // Non-critical: message is already persisted in Supabase
  }
}

export async function sendChatMessage(input: {
  body: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const ctx = await requireUser();
  if ("error" in ctx) return { ok: false, reason: ctx.error };
  if (!checkActionRate(ctx.user.id, "chat", 12, 60_000))
    return { ok: false, reason: "Slow down. Try again in a moment." };
  const parsed = bodySchema.safeParse(input.body);
  if (!parsed.success)
    return { ok: false, reason: "Message must be 1 to 500 characters." };

  const { data, error } = await ctx.supabase
    .from("chat_messages")
    .insert({
      user_id: ctx.user.id,
      display_name: "Trader",
      body: parsed.data,
    })
    .select("id,user_id,display_name,body,created_at")
    .single();

  if (error) return { ok: false, reason: error.message };

  if (data) broadcastToRelay(data);

  return { ok: true };
}
