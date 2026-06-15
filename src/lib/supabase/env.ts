/**
 * Supabase env access + a "configured?" check.
 *
 * The whole app must run locally even before the owner sets up Supabase. So instead of
 * crashing when keys are missing, we expose `isSupabaseConfigured` and let call sites
 * degrade gracefully (e.g. show "connect Supabase to enable sign-in").
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 20;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
