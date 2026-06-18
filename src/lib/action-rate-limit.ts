/**
 * In-memory rate limiter for server actions. Keyed by user ID so it
 * doesn't rely on IP (which is unreliable behind proxies for server actions).
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}

export function checkActionRate(
  userId: string,
  action: string,
  limit: number,
  windowMs: number,
): boolean {
  cleanup();
  const now = Date.now();
  const key = `${userId}:${action}`;
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}
