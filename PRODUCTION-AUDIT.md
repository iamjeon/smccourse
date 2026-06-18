# Production Readiness Audit — SMC Course

> Created 2026-06-18. This is the durable master plan for production readiness.
> Update status checkboxes as items are completed.

## Phase 1 — Ship blockers (DONE 2026-06-18)

- [x] **1. SEO basics**: SVG favicon (`src/app/icon.svg`), `src/app/sitemap.ts`, `src/app/robots.ts`, OG + Twitter Card meta in layout.tsx
- [x] **2. Error boundaries**: `src/app/global-error.tsx`, `src/app/(app)/error.tsx`, `src/app/not-found.tsx`
- [x] **3. Loading skeletons**: `loading.tsx` for dashboard, academy, lesson, journal, community + `Skeleton` primitive
- [x] **4. Rate limiting**: middleware-level (IP-based, login/auth/api) + server-action-level (user-ID-based, chat 12/min, journal 20/min, quiz 10/min, exam 5/min). Open redirect fixed (allowlist in auth callback + login).
- [x] **5. CSP header**: Content-Security-Policy in `next.config.mjs` (self + Supabase + relay domains)

## Phase 2 — Quality & resilience (DONE 2026-06-18)

- [x] **6. Toast notification system**: Sonner added to root layout; wired into quiz (save success), journal (add/update/delete), chat (send error), notes (delete)
- [x] **7. Dynamic imports**: SmcChart lazy-loaded on landing page; CommunityChat dynamically imported (ssr: false, page went from 5.8kB → 1.3kB first load)
- [x] **8. Open redirect fix**: done in Phase 1
- [x] **9. PWA manifest**: `src/app/manifest.ts` with brand name, start_url, theme, SVG + PNG icons
- [x] **10. Accessibility fixes**: aria-live on chat message list, role="alert" on error messages (chat/login/journal), aria-describedby linking inputs to errors

## Phase 3 — Scale prep (before promoting to 5K users)

- [ ] **11. Upgrade Supabase to Pro** ($25/mo) — 15 pooled connections + connection pooler (owner decision)
- [ ] **12. Upgrade Vercel to Pro** ($20/mo) — unlimited functions, 1TB bandwidth (owner decision)
- [x] **13. Rate limiting on all server actions** — chat 12/min, journal 20/min, quiz 10/min, exam 5/min, notes 30/min
- [x] **14. Dashboard optimization**: parallelized 3 DB queries with Promise.all (dashboard is per-user, ISR not applicable; force-dynamic is correct)

## Detailed findings (reference)

### Security (Grade B+)
- CRITICAL: No rate limiting on chat/auth/quiz
- HIGH: Missing CSP header
- MEDIUM: Open redirect risk in auth callback/login (no allowlist)
- MEDIUM: .env.local not in .gitignore
- OK: RLS on all user tables, Zod validation, admin via JWT claim

### SEO (Grade D)
- No sitemap.xml, robots.txt, OG/Twitter meta, favicon, JSON-LD
- Good: heading hierarchy, SSG lesson pages

### Performance (Grade B)
- Heavy components (SmcChart, chat) not dynamically imported
- No Cache-Control headers for static assets
- No images.formats/remotePatterns in next.config
- Good: font loading, small base bundle

### Scalability (Grade C — fails ~500 users on free tiers)
- Supabase Free = 3 connections, ceiling ~100 users
- Vercel Free = 12 functions, ceiling ~500 users
- No rate limiting on server actions
- Dashboard force-dynamic hits DB every load
- Cost for 5K: ~$45-60/mo (Supabase Pro + Vercel Pro)

### UX & Error Handling (Grade C)
- No error.tsx / global-error.tsx / not-found.tsx
- No loading.tsx skeletons
- No toast system (ad-hoc inline feedback only)
- No PWA manifest/favicon
- Accessibility gaps (aria-live, aria-describedby)
- Empty states mostly good (journal, notes, quiz covered)
