"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, GraduationCap, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

/** Bottom tab bar for the learning area — mobile only (hidden ≥ sm). */
export function MobileTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();

  async function signOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const tabs = [
    { href: "/", label: locale === "tl" ? "Home" : "Home", icon: Home },
    {
      href: "/dashboard",
      label: locale === "tl" ? "Kurso" : "Course",
      icon: GraduationCap,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            tab.href === "/dashboard"
              ? pathname.startsWith("/dashboard") || pathname.startsWith("/learn")
              : pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
              {tab.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={signOut}
          className="flex flex-1 flex-col items-center gap-0.5 py-2 text-xs text-muted-foreground"
        >
          <LogOut className="size-5" />
          {locale === "tl" ? "Logout" : "Sign out"}
        </button>
      </div>
    </nav>
  );
}
