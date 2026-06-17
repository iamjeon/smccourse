"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

/**
 * Top bar. Becomes a frosted, shadowed bar once the page is scrolled. Auth state is
 * detected client-side so static pages stay CDN-cacheable.
 */
export function SiteHeader() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border glass shadow-card"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href={signedIn ? "/dashboard" : "/"} aria-label="Home">
          <Logo />
        </Link>

        {isLanding && (
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link href="#demo" className="transition-colors hover:text-foreground">
              {locale === "tl" ? "Demo" : "Demo"}
            </Link>
            <Link
              href="#curriculum"
              className="transition-colors hover:text-foreground"
            >
              {locale === "tl" ? "Kurikulum" : "Curriculum"}
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LocaleToggle />
          {signedIn ? (
            <Button asChild size="sm" variant="secondary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href={isLanding ? "/login" : "/login"}>
                {locale === "tl" ? "Mag-enroll" : "Enroll free"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
