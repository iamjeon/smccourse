# SMC Performance — multi-layer caching & scalability

Guidelines for scaling the platform on free tiers through caching, not infrastructure upgrades.

## Architecture: 5-layer cache

Every read should pass through as many cache layers as possible before hitting the DB:

```
Layer 1: SWR in-memory         (src/lib/hooks/use-user-data.ts)
Layer 2: localStorage + TTL    (src/lib/cache.ts)
Layer 3: CDN edge / s-w-r      (next.config.mjs Cache-Control headers)
Layer 4: Supabase REST API     (browser SDK, NOT server pooled connections)
Layer 5: Server Actions → DB   (writes only, rate-limited)
```

## Key principle: reads go client-side, writes go server-side

- **Reads** (progress, dashboard stats, journal list, profile) use SWR hooks that call
  the browser Supabase client. This uses the PostgREST REST API over HTTPS, which does
  NOT consume server-side pooled DB connections. RLS still applies.
- **Writes** (quiz save, journal CRUD, notes, chat) go through Server Actions with zod
  validation + per-user rate limiting. After a write succeeds, call `mutate("key")` from
  `swr` to revalidate the affected SWR cache keys.

## SWR hooks (`src/lib/hooks/use-user-data.ts`)

| Hook | Key | TTL | What it fetches |
|------|-----|-----|-----------------|
| `useProgress()` | `progress` | 5 min | lesson_progress map |
| `useDashboardStats()` | `dashboard-stats` | 2 min | quiz attempts + journal stats + recent activity |
| `useJournalEntries()` | `journal-entries` | 3 min | full journal entry list |
| `useUserProfile()` | `user-profile` | 10 min | user id + display name + email |

**Adding a new hook:** follow the pattern — create a fetcher that uses `createClient()`
(browser), calls `cacheSet()` after fetching, and returns fallback from `cacheGet()`.

## localStorage cache (`src/lib/cache.ts`)

- `cacheGet<T>(key)` — checks in-memory map first, then localStorage. Returns `undefined`
  on miss or expired TTL.
- `cacheSet<T>(key, data, ttlMs)` — writes to both memory and localStorage.
- `cacheDelete(key)` / `cacheInvalidatePrefix(prefix)` — for manual invalidation.
- TTL presets in `TTL` constant. Adjust per data type.

## Cache invalidation rules

| Write event | Invalidate keys |
|-------------|----------------|
| Quiz passed | `progress`, `dashboard-stats` |
| Journal add/update/delete | `journal-entries`, `dashboard-stats` |
| Note create/delete | (none — notes are fetched separately in the panel) |
| Chat message | (none — real-time via WebSocket) |

Use `import { mutate } from "swr"` and call `void mutate("key")` after a successful
server action. Do NOT clear localStorage on invalidation — SWR will refetch and update it.

## HTTP caching headers (next.config.mjs)

- `/learn/*` and `/tools/(calculator|glossary)`: `s-maxage=3600, stale-while-revalidate=86400`
- `/_next/static/*`: `max-age=31536000, immutable`
- Dynamic pages (admin, exam, certificate): no cache headers (default).

## Performance checklist (before any new page)

- [ ] Is the page authenticated + user-specific? → Use SWR hook, not server component DB fetch
- [ ] Does it read from DB? → Use browser Supabase client, not server client
- [ ] Does it write to DB? → Server Action + `mutate()` affected SWR keys
- [ ] Is it static content? → Keep it SSG with Cache-Control headers
- [ ] Heavy component? → `next/dynamic` with lazy loading

## Anti-patterns

- ❌ `force-dynamic` on pages that show user data → ✅ client-side SWR + static shell
- ❌ Server component DB reads for dashboard/progress → ✅ browser SDK REST API
- ❌ Full page reload after a write → ✅ `mutate()` the SWR key
- ❌ No cache fallback on page reload → ✅ localStorage with TTL
- ❌ Fetching the same data on every navigation → ✅ SWR dedupes within 10s window
