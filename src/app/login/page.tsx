"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, MailCheck, AlertCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { siteUrl } from "@/lib/supabase/env";
import { useLocale } from "@/components/locale-provider";

function LoginInner() {
  const { locale } = useLocale();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "unconfigured"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) return setStatus("unconfigured");
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setError(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  async function google() {
    const supabase = createClient();
    if (!supabase) return setStatus("unconfigured");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center py-10">
      <Link href="/" className="mb-8" aria-label="Home">
        <Logo />
      </Link>

      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {locale === "tl" ? "Mag-enroll / Mag-log in" : "Enroll / Log in"}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {locale === "tl"
            ? "Libre lahat. Email lang ang kailangan — walang password."
            : "Everything is free. Just your email — no password."}
        </p>

        {status === "sent" ? (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
            <MailCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                {locale === "tl" ? "Tingnan ang email mo" : "Check your email"}
              </p>
              <p className="mt-1 text-muted-foreground">
                {locale === "tl"
                  ? `Nagpadala kami ng magic link sa ${email}. I-click yun para makapasok.`
                  : `We sent a magic link to ${email}. Click it to sign in.`}
              </p>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={sendMagicLink} className="mt-6 space-y-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={locale === "tl" ? "Email mo" : "you@email.com"}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={status === "sending"}
              >
                <Mail className="size-4" />
                {status === "sending"
                  ? locale === "tl"
                    ? "Pinapadala…"
                    : "Sending…"
                  : locale === "tl"
                    ? "Padalhan ng magic link"
                    : "Send magic link"}
              </Button>
            </form>

            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              {locale === "tl" ? "o" : "or"}
              <span className="h-px flex-1 bg-border" />
            </div>

            <Button variant="outline" className="w-full" onClick={google}>
              {locale === "tl" ? "Magpatuloy gamit ang Google" : "Continue with Google"}
            </Button>
          </>
        )}

        {status === "error" && (
          <p className="mt-4 flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            {error}
          </p>
        )}
        {status === "unconfigured" && (
          <p className="mt-4 flex items-start gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {locale === "tl"
              ? "Hindi pa naka-connect ang sign-in. Idagdag ang Supabase keys sa .env.local (tingnan ang README)."
              : "Sign-in isn't connected yet. Add your Supabase keys to .env.local (see README)."}
          </p>
        )}
      </div>

      <p className="mt-6 max-w-xs text-center text-xs text-muted-foreground">
        {locale === "tl"
          ? "Para sa edukasyon lamang. Hindi ito financial advice."
          : "For education only. This is not financial advice."}
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
