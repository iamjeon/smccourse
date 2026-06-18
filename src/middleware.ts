import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { rateLimit } from "@/lib/rate-limit";

const RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "/login": { limit: 10, windowMs: 60_000 },
  "/auth/callback": { limit: 10, windowMs: 60_000 },
  "/api/": { limit: 30, windowMs: 60_000 },
};

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(prefix)) {
      const key = `${ip}:${prefix}`;
      const { allowed, remaining } = rateLimit(key, config.limit, config.windowMs);
      if (!allowed) {
        return new NextResponse("Too many requests. Please try again later.", {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Remaining": String(remaining),
          },
        });
      }
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
