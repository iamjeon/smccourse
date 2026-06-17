import { createClient } from "./server";
import { isAdmin } from "@/lib/auth";

/**
 * Resolve the current user + Supabase client for a server action, or a friendly
 * reason why we can't act. Mirrors the helper in src/app/actions.ts so community
 * and admin actions share one auth gate.
 */
export async function requireUser() {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured" as const };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "not_signed_in" as const };
  return { supabase, user };
}

/** Like requireUser, but also requires the admin role (server-side enforcement). */
export async function requireAdmin() {
  const ctx = await requireUser();
  if ("error" in ctx) return ctx;
  if (!isAdmin(ctx.user)) return { error: "forbidden" as const };
  return ctx;
}
