"use client";

import { useEffect, useState } from "react";
import { Megaphone, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const DISMISS_KEY = "ll-ann-dismissed";

/**
 * Shows the latest active announcement as a dismissible banner. Fetched client-side
 * (after mount) so it never deopts the statically cached lesson pages into dynamic
 * rendering. Dismissal is remembered per-announcement in localStorage.
 */
export function AnnouncementBanner() {
  const [ann, setAnn] = useState<{ id: string; body: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    let active = true;
    supabase
      .from("announcements")
      .select("id,body")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!active || !data) return;
        if (window.localStorage.getItem(DISMISS_KEY) === data.id) return;
        setAnn(data);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!ann) return null;

  function dismiss() {
    try {
      if (ann) window.localStorage.setItem(DISMISS_KEY, ann.id);
    } catch {
      /* ignore */
    }
    setAnn(null);
  }

  return (
    <div className="border-b border-primary/20 bg-primary/10">
      <div className="container flex items-center gap-3 py-2 text-sm">
        <Megaphone className="size-4 shrink-0 text-primary" />
        <p className="min-w-0 flex-1">{ann.body}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
