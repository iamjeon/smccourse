/**
 * Multi-layer client-side cache: in-memory → localStorage.
 *
 * Every read checks memory first (instant), then localStorage (survives
 * page reloads), then falls through to a network fetch (SWR handles this).
 * Writes go to both layers. Entries have a TTL; stale entries are served
 * optimistically while SWR revalidates in the background.
 */

const STORAGE_PREFIX = "smc:";

const mem = new Map<string, { data: unknown; expires: number }>();

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function cacheGet<T>(key: string): T | undefined {
  const fullKey = STORAGE_PREFIX + key;

  const memEntry = mem.get(fullKey);
  if (memEntry) {
    if (memEntry.expires > Date.now()) return memEntry.data as T;
    mem.delete(fullKey);
  }

  if (!isClient()) return undefined;

  try {
    const raw = localStorage.getItem(fullKey);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as { data: T; expires: number };
    if (parsed.expires > Date.now()) {
      mem.set(fullKey, parsed);
      return parsed.data;
    }
    localStorage.removeItem(fullKey);
  } catch {
    // Corrupted or quota exceeded
  }
  return undefined;
}

export function cacheSet<T>(key: string, data: T, ttlMs: number): void {
  const fullKey = STORAGE_PREFIX + key;
  const entry = { data, expires: Date.now() + ttlMs };

  mem.set(fullKey, entry);

  if (!isClient()) return;
  try {
    localStorage.setItem(fullKey, JSON.stringify(entry));
  } catch {
    // Quota exceeded — memory cache still works
  }
}

export function cacheDelete(key: string): void {
  const fullKey = STORAGE_PREFIX + key;
  mem.delete(fullKey);
  if (isClient()) {
    try {
      localStorage.removeItem(fullKey);
    } catch {
      // Ignore
    }
  }
}

export function cacheInvalidatePrefix(prefix: string): void {
  const fullPrefix = STORAGE_PREFIX + prefix;

  for (const k of mem.keys()) {
    if (k.startsWith(fullPrefix)) mem.delete(k);
  }

  if (!isClient()) return;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(fullPrefix)) localStorage.removeItem(k);
    }
  } catch {
    // Ignore
  }
}

/** TTL presets (milliseconds) */
export const TTL = {
  PROGRESS: 5 * 60_000,
  DASHBOARD: 2 * 60_000,
  JOURNAL: 3 * 60_000,
  PROFILE: 10 * 60_000,
} as const;
