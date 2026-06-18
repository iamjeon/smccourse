"use client";

/**
 * Client-side data hooks using SWR + localStorage cache.
 *
 * These fetch via the browser Supabase client (REST API over HTTPS), which
 * does NOT consume server-side pooled DB connections. This is the key scaling
 * trick: reads go browser → Supabase REST API, not browser → Vercel function
 * → DB pool. Combined with SWR's in-memory cache and our localStorage layer,
 * most page navigations never touch the database at all.
 */

import useSWR, { type SWRConfiguration } from "swr";
import { createClient } from "@/lib/supabase/client";
import { cacheGet, cacheSet, TTL } from "@/lib/cache";
import type { ProgressMap } from "@/lib/progress";

// ── Shared SWR config ────────────────────────────────────────────────────────

const swrDefaults: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 10_000,
  errorRetryCount: 2,
};

// ── Fetcher helpers ──────────────────────────────────────────────────────────

async function getUserId(): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

// ── useProgress ──────────────────────────────────────────────────────────────

async function fetchProgress(): Promise<ProgressMap> {
  const supabase = createClient();
  if (!supabase) return {};
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_slug,status,completed_at")
    .eq("user_id", user.id);

  const map: ProgressMap = {};
  for (const row of data ?? []) {
    map[row.lesson_slug] = {
      status: row.status,
      completed_at: row.completed_at,
    };
  }

  cacheSet("progress", map, TTL.PROGRESS);
  return map;
}

export function useProgress() {
  return useSWR<ProgressMap>(
    "progress",
    fetchProgress,
    {
      ...swrDefaults,
      fallbackData: cacheGet<ProgressMap>("progress") ?? {},
    },
  );
}

// ── useDashboardData ─────────────────────────────────────────────────────────

export type DashboardStats = {
  quizAttempts: Array<{
    lesson_slug: string;
    score: number;
    total: number;
    attempted_at: string;
  }>;
  journalEntries: Array<{
    outcome: string;
    rr: number | null;
  }>;
  recentActivity: Array<{
    lesson_slug: string;
    status: string;
    last_viewed_at: string;
  }>;
};

async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();
  if (!supabase) return { quizAttempts: [], journalEntries: [], recentActivity: [] };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { quizAttempts: [], journalEntries: [], recentActivity: [] };

  const [quizRes, journalRes, activityRes] = await Promise.all([
    supabase
      .from("quiz_attempts")
      .select("lesson_slug,score,total,attempted_at")
      .eq("user_id", user.id)
      .order("attempted_at", { ascending: false }),
    supabase
      .from("journal_entries")
      .select("outcome,rr")
      .eq("user_id", user.id),
    supabase
      .from("lesson_progress")
      .select("lesson_slug,status,last_viewed_at")
      .eq("user_id", user.id)
      .order("last_viewed_at", { ascending: false })
      .limit(5),
  ]);

  const stats: DashboardStats = {
    quizAttempts: (quizRes.data ?? []) as DashboardStats["quizAttempts"],
    journalEntries: (journalRes.data ?? []) as DashboardStats["journalEntries"],
    recentActivity: (activityRes.data ?? []) as DashboardStats["recentActivity"],
  };

  cacheSet("dashboard-stats", stats, TTL.DASHBOARD);
  return stats;
}

export function useDashboardStats() {
  return useSWR<DashboardStats>(
    "dashboard-stats",
    fetchDashboardStats,
    {
      ...swrDefaults,
      fallbackData: cacheGet<DashboardStats>("dashboard-stats") ?? {
        quizAttempts: [],
        journalEntries: [],
        recentActivity: [],
      },
    },
  );
}

// ── useJournalEntries ────────────────────────────────────────────────────────

export type JournalEntryRow = {
  id: string;
  pair: string;
  direction: string;
  setup: string | null;
  lesson_slug: string | null;
  entry: number | null;
  stop: number | null;
  target: number | null;
  rr: number | null;
  outcome: string;
  notes: string | null;
  traded_at: string;
};

async function fetchJournalEntries(): Promise<JournalEntryRow[]> {
  const supabase = createClient();
  if (!supabase) return [];
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("journal_entries")
    .select("id,pair,direction,setup,lesson_slug,entry,stop,target,rr,outcome,notes,traded_at")
    .eq("user_id", user.id)
    .order("traded_at", { ascending: false });

  const entries = (data ?? []) as JournalEntryRow[];
  cacheSet("journal", entries, TTL.JOURNAL);
  return entries;
}

export function useJournalEntries() {
  return useSWR<JournalEntryRow[]>(
    "journal-entries",
    fetchJournalEntries,
    {
      ...swrDefaults,
      fallbackData: cacheGet<JournalEntryRow[]>("journal") ?? [],
    },
  );
}

// ── useUserProfile ───────────────────────────────────────────────────────────

export type UserProfile = {
  id: string;
  displayName: string | null;
  email: string | null;
};

async function fetchProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const profile: UserProfile = {
    id: user.id,
    displayName:
      (user.user_metadata?.name as string | undefined) ??
      user.email?.split("@")[0] ??
      null,
    email: user.email ?? null,
  };

  cacheSet("profile", profile, TTL.PROFILE);
  return profile;
}

export function useUserProfile() {
  return useSWR<UserProfile | null>(
    "user-profile",
    fetchProfile,
    {
      ...swrDefaults,
      fallbackData: cacheGet<UserProfile | null>("profile") ?? null,
    },
  );
}

// ── Cache invalidation helpers (call after writes) ───────────────────────────

export { cacheInvalidatePrefix } from "@/lib/cache";

export function invalidateProgress() {
  cacheSet("progress", undefined, 0);
}

export function invalidateDashboard() {
  cacheSet("dashboard-stats", undefined, 0);
}

export function invalidateJournal() {
  cacheSet("journal", undefined, 0);
}
