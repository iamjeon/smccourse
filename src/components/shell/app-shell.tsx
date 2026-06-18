"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookA,
  Calculator,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  NotebookPen,
  Shield,
  StickyNote,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { NotesPanel } from "@/components/floating/notes-panel";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LT = { en: string; tl: string };
type NavItem = { href?: string; action?: "notes"; icon: LucideIcon; label: LT };
type NavGroup = { label: LT; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: { en: "Learn", tl: "Mag-aral" },
    items: [
      { href: "/dashboard", icon: Home, label: { en: "Dashboard", tl: "Dashboard" } },
      { href: "/academy", icon: GraduationCap, label: { en: "Academy", tl: "Academy" } },
    ],
  },
  {
    label: { en: "Tools", tl: "Mga tool" },
    items: [
      { href: "/tools/calculator", icon: Calculator, label: { en: "Risk calculator", tl: "Risk calculator" } },
      { href: "/tools/journal", icon: NotebookPen, label: { en: "Journal", tl: "Journal" } },
      { href: "/tools/glossary", icon: BookA, label: { en: "Glossary", tl: "Glossary" } },
      { href: "/certificate", icon: Award, label: { en: "Certificate", tl: "Certificate" } },
    ],
  },
  {
    label: { en: "Community", tl: "Komunidad" },
    items: [
      { href: "/community", icon: MessageCircle, label: { en: "Chat", tl: "Chat" } },
      { action: "notes", icon: StickyNote, label: { en: "Notes", tl: "Notes" } },
    ],
  },
];

const ADMIN_ITEM: NavItem = {
  href: "/admin",
  icon: Shield,
  label: { en: "Admin", tl: "Admin" },
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/academy")
    return (
      pathname === "/academy" ||
      pathname.startsWith("/courses") ||
      pathname.startsWith("/learn")
    );
  return pathname === href || pathname.startsWith(href + "/");
}

/** The nav body, shared by the desktop sidebar and the mobile drawer. */
function SidebarNav({
  pathname,
  locale,
  admin,
  onNavigate,
  onOpenNotes,
  onSignOut,
}: {
  pathname: string;
  locale: Locale;
  admin: boolean;
  onNavigate: () => void;
  onOpenNotes: () => void;
  onSignOut: () => void;
}) {
  const tl = locale === "tl";
  const groups = admin
    ? [
        ...NAV,
        { label: { en: "Manage", tl: "Pamahalaan" }, items: [ADMIN_ITEM] },
      ]
    : NAV;

  const itemClass = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
      active
        ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
        : "text-muted-foreground hover:bg-accent hover:text-foreground hover:translate-x-0.5",
    );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate} aria-label="Dashboard">
          <Logo />
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group.label.en}>
            <div className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {tl ? group.label.tl : group.label.en}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const label = tl ? item.label.tl : item.label.en;
                if (item.action === "notes") {
                  return (
                    <button
                      key="notes"
                      type="button"
                      onClick={() => {
                        onOpenNotes();
                        onNavigate();
                      }}
                      className={cn(itemClass(false), "w-full text-left")}
                    >
                      <Icon className="size-[18px] shrink-0" />
                      {label}
                    </button>
                  );
                }
                const active = isActive(pathname, item.href!);
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={itemClass(active)}
                  >
                    <Icon className="size-[18px] shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center justify-between px-1 pb-2">
          <ThemeToggle />
          <LocaleToggle />
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-[18px] shrink-0" />
          {tl ? "Mag-logout" : "Sign out"}
        </button>
      </div>
    </div>
  );
}

/** Responsive app shell: persistent sidebar on desktop, hamburger drawer on mobile. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
  const tl = locale === "tl";

  const [admin, setAdmin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    const read = (session: Session | null) =>
      setAdmin(
        (session?.user?.app_metadata as { role?: string } | undefined)?.role ===
          "admin",
      );
    supabase.auth.getSession().then(({ data }) => read(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      read(session),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setDrawerOpen(false), [pathname]);

  async function signOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const navProps = {
    pathname,
    locale,
    admin,
    onOpenNotes: () => setNotesOpen(true),
    onSignOut: signOut,
  };

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card/40 lg:block">
        <SidebarNav {...navProps} onNavigate={() => {}} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label={tl ? "Buksan ang menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Menu className="size-5" />
        </button>
        <Link href="/dashboard" aria-label="Dashboard" className="flex items-center">
          <LogoMark />
        </Link>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setNotesOpen(true)}
          aria-label={tl ? "Mga note" : "Notes"}
          className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <StickyNote className="size-5" />
        </button>
        <ThemeToggle />
      </header>

      {/* Content */}
      <div className="lg:pl-64">
        <AnnouncementBanner />
        <main className="container pt-6 pb-16">{children}</main>
      </div>

      {/* Mobile nav drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" hideClose className="p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Move between learning, tools, and community.
          </SheetDescription>
          <SidebarNav {...navProps} onNavigate={() => setDrawerOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Notes overlay (available from sidebar + top bar) */}
      <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
        <SheetContent className="gap-0">
          <SheetHeader>
            <StickyNote className="size-4 text-primary" />
            <SheetTitle>{tl ? "Aking mga note" : "My notes"}</SheetTitle>
          </SheetHeader>
          <SheetDescription className="sr-only">
            Your private notes, saved to your account.
          </SheetDescription>
          <NotesPanel />
        </SheetContent>
      </Sheet>
    </div>
  );
}
