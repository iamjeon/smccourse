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

/**
 * Public base URL of the site. Drives auth redirects, canonical URLs, sitemap,
 * robots, and OG tags — so it MUST be set per-environment.
 *   • Local dev: `.env.local` sets http://localhost:3000
 *   • Production (Vercel): set NEXT_PUBLIC_SITE_URL=https://freesmartmoneycourse.online
 * The fallback below is the production domain so SEO output is never wrong if the
 * env var is missing in prod.
 */
// Note: `??` only catches null/undefined, but a Vercel env var can be set to an
// EMPTY string — which would otherwise yield an invalid base URL. Guard for that.
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl =
  envSiteUrl && envSiteUrl.length > 0
    ? envSiteUrl
    : "https://freesmartmoneycourse.online";
