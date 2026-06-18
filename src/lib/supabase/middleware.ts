import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options?: CookieOptions };
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

/**
 * Refreshes the Supabase auth session cookie on each request and guards protected
 * routes. If Supabase isn't configured yet, it passes requests through untouched so the
 * site still works for browsing public content.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: getUser() revalidates the token and rotates cookies. Do not remove.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Gate only per-user / personalized areas behind auth. Lesson content, the course
  // hub, the glossary and the calculator are PUBLIC so search engines and AI crawlers
  // can read them (the actual SEO/GEO value). Saving progress, quizzes, journal,
  // community, exam, and the certificate still require an account.
  const protectedPrefixes = [
    "/dashboard",
    "/tools/journal",
    "/admin",
    "/community",
    "/exam",
    "/certificate",
  ];
  const isProtected = protectedPrefixes.some((p) =>
    request.nextUrl.pathname.startsWith(p),
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // The admin area additionally requires the admin role (a JWT app_metadata claim).
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const role = (user?.app_metadata as { role?: string } | undefined)?.role;
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
