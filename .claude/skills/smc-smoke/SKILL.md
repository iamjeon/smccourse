---
name: smc-smoke
description: The debug + smoke-test procedure to run after ANY code or schema change in SMC Course, before reporting work as done. Defines the exact checks (typecheck, lint, validate:charts, check:coverage, production build), the known-benign warnings to ignore, the Windows .next cache pitfall, runtime route checks, and the DB security-advisor step after migrations. Use whenever you finish editing the codebase, when asked to "smoke test", "debug", "verify the build", or "make sure nothing broke".
---

# SMC Smoke Test — prove the change didn't break anything

Run this after **every** change set, before saying "done". Report faithfully: if a check
fails, show the real output and fix the root cause. A change is only "smoke-tested" when the
required checks below pass. Never claim success on a step you skipped or that errored.

## 1. Static checks (ALWAYS, every change)
Run from the repo root (`f:\SMC COURSE\SMC WEB`):
```
npm run typecheck      # tsc --noEmit — 0 errors
npm run lint           # ESLint — "No ESLint warnings or errors"
npm run validate:charts # chart accuracy — 0 errors
npm run check:coverage  # every lesson has a passing // COVERAGE block — 0 failing
```
**Known-benign (NOT failures):**
- `validate:charts`: a few `⚠ warn ... is the first swing high/low — nothing prior to compare`
  ("first pivot" warnings). 0 **errors** is the bar; these warnings are expected.
- `next lint` prints a deprecation notice ("`next lint` is deprecated ...") — that is not a lint error.
- Fix every real lint warning (e.g. unused imports) before finishing.

## 2. Build smoke (UI / route / layout / dependency / config changes)
```
npm run build          # must compile + generate all static pages with 0 type errors
```
Confirm in the route table:
- **`/learn/[slug]` stays `●` (SSG).** Lesson pages MUST remain statically prerendered (free-tier
  golden rule). If they flip to `ƒ` (Dynamic), a server fetch leaked into the `(app)` layout —
  anything mounted in `src/app/(app)/layout.tsx` must be a **client** component, never a server fetch.
- Per-user routes (`/dashboard`, `/admin`, `/tools/journal`, `/certificate`, `/courses/[slug]`,
  `/exam`) are correctly `ƒ` (Dynamic). Static tools/landing stay `○`.
- Watch for client/server boundary errors ("use client", importing server-only code into a client).

### Windows `.next` cache pitfall (important)
`next build` writes production output into `.next`, which **corrupts a running `next dev`**
(symptoms: `Cannot find module './611.js'`, missing `pages-manifest.json`/`routes-manifest.json`,
`ENOENT rename ...pack.gz_`). So:
- Don't run `npm run build` against a live dev server's `.next`.
- **After building, delete `.next`** so the next `npm run dev` starts clean:
  `Remove-Item -Recurse -Force .next` (PowerShell) or `rm -rf .next` (bash).

## 3. Runtime smoke (when the change is user-facing and you can run the app)
Start the app (`npm run dev`, or `next start` after a build) and load the touched routes; expect
no 500s and no console/runtime errors. Key routes:
`/`, `/login`, `/dashboard`, `/courses/smc`, `/learn/how-to-read-charts`, `/exam`, `/community`,
`/tools`, `/tools/calculator`, `/tools/glossary`, `/tools/journal`, `/certificate`, `/admin` (admin).
- Signed-out access to gated routes must redirect to `/login`.
- For realtime (chat presence/reactions), open two sessions and confirm messages/reactions sync.

## 4. DB / security smoke (after ANY migration / DDL / RLS change)
- Apply via the **Supabase MCP**, then run the **security advisor** (`get_advisors`, type `security`).
  Expected: no new errors/warnings. The only standing warning is `auth_leaked_password_protection`
  (an Auth dashboard toggle, owner's choice) — not introduced by code.
- Confirm RLS is still own-row on user tables; admin cross-user reads go through the "admin read all"
  policies + `public.is_admin()`. Keep `supabase/migrations/` matching the live DB.

## What to run when
- **Content only** (lesson/chart/glossary text): static checks (1). Build is optional.
- **UI / component / route / shell / dependency**: static (1) + build (2) + runtime (3) for touched routes.
- **DB / migration**: static (1) + build (2) + advisor (4).

## Definition of "smoke-tested"
typecheck + lint + validate:charts + check:coverage pass; `npm run build` passes with `/learn`
still SSG; advisor clean if the DB changed; `.next` cleaned afterward. Then, and only then, report done.
