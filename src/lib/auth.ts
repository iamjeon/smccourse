/**
 * Admin role helpers. The role is a NON-user-editable JWT claim stored in
 * Supabase `auth.users.app_metadata` ({"role":"admin"}) and mirrored in RLS via
 * `public.is_admin()`. Set it once per account via the Supabase MCP / dashboard.
 */
import type { User } from "@supabase/supabase-js";
import { getUser } from "@/lib/supabase/server";

/** Is this user an admin? Reads the app_metadata claim embedded in the JWT. */
export function isAdmin(user: User | null | undefined): boolean {
  return user?.app_metadata?.role === "admin";
}

/** Current user + admin flag, for guarding server components and pages. */
export async function getAuth(): Promise<{ user: User | null; admin: boolean }> {
  const user = await getUser();
  return { user, admin: isAdmin(user) };
}
