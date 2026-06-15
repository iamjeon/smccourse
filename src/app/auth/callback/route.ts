import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth callback for magic-link + OAuth (PKCE). Supabase redirects here with a `code`,
 * which we exchange for a session (cookies are set by the server client). Then we send
 * the user to `next` (default /dashboard).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — back to login with a flag.
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
