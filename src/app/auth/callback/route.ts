import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth callback for magic-link + OAuth (PKCE). Supabase redirects here with a `code`,
 * which we exchange for a session (cookies are set by the server client). Then we send
 * the user to `next` (default /dashboard).
 */
const ALLOWED_REDIRECTS = [
  "/dashboard",
  "/academy",
  "/learn/",
  "/courses/",
  "/tools",
  "/community",
  "/exam",
  "/certificate",
  "/admin",
];

function isSafeRedirect(path: string): boolean {
  if (!path.startsWith("/")) return false;
  return ALLOWED_REDIRECTS.some((prefix) => path === prefix || path.startsWith(prefix));
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/dashboard";
  const next = isSafeRedirect(rawNext) ? rawNext : "/dashboard";

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
