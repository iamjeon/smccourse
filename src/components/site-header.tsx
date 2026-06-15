"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { LocaleToggle } from "@/components/locale-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";

/**
 * Top bar. Auth state is detected client-side (via the browser Supabase client) so that
 * static pages stay static and CDN-cacheable. Falls back to "Log in" when unknown.
 */
export function SiteHeader() {
  const { locale } = useLocale();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setSignedIn(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setSignedIn(!!session),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between gap-3">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleToggle />
          {signedIn ? (
            <Button asChild size="sm" variant="secondary">
              <Link href="/dashboard">
                {locale === "tl" ? "Dashboard" : "Dashboard"}
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">
                {locale === "tl" ? "Mag-log in" : "Log in"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
