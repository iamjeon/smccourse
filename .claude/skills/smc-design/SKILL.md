---
name: smc-design
description: Senior-grade brand + UI/UX standards for Liquidity Lab, including the authenticated app shell (sidebar + mobile drawer) and information architecture. Use when building or changing any screen, component, navigation, marketing section, or style — to keep the product at a polished, professional, product-demo level (think Linear / Vercel / Stripe), not a generic "vibe-coded" template. Triggers on new pages/components, navigation/layout/IA changes, landing/marketing work, motion changes, "make it look good / modern / professional", and styling decisions.
---

# SMC Design — build like a senior product designer

Hold the bar of a **best-in-class product site** (Linear, Vercel, Stripe, Framer). The full
brand spec is `BRAND.md`; the implemented design system lives in `src/app/globals.css`
(tokens + utilities) and the primitives in `src/components/marketing/` and
`src/components/ui/`. Reuse them — don't reinvent.

## Design principles (the senior mindset)
1. **Hierarchy first.** One clear focal point per view. Size, weight, and spacing do the
   talking before color does. A confident `text-4xl/5xl` display headline anchors a section.
2. **Restraint.** One accent (`--primary`). Lots of breathing room. Remove before you add.
   If everything is emphasized, nothing is.
3. **Depth, intentionally.** Use the layered shadow/glow utilities to create a sense of
   surface and elevation: `shadow-card` (resting), `shadow-elevated` (lifted/hero),
   `glow-accent` (one hero/CTA), `bg-spotlight` / `bg-glow-bottom` (section backdrops),
   `glass` (sticky/overlay), `ring-gradient` (premium card edge).
4. **Motion that means something.** Reveal content on scroll with `<Reveal>` (fade + rise,
   once), stagger lists by ~0.05–0.1s, hover-lift interactive cards
   (`hover:-translate-y-1 hover:border-primary/40`), and animate charts to *teach*. Easing
   ~`[0.21,0.5,0.3,1]`, durations 0.3–0.7s. Always honor `prefers-reduced-motion`.
5. **Consistency via tokens.** Never hardcode hex. Spacing on a rhythm (4/6/8/12/16/20/24).
   Radii from the scale. Reuse primitives; extract a component once a pattern repeats.

## Avoid the "vibe-coded" look (anti-patterns)
- ❌ Emoji used as UI icons → ✅ use `lucide-react`. (A tasteful emoji in copy is fine.)
- ❌ Flat, identical cards in a plain grid → ✅ vary scale (bento), add depth + hover, number them.
- ❌ Random/competing colors, gradient soup → ✅ one accent; gradients subtle and purposeful.
- ❌ Everything centered, walls of same-size text → ✅ real type hierarchy, left-aligned body.
- ❌ No motion, or janky/over-the-top motion → ✅ choreographed, subtle, reduced-motion-safe.
- ❌ Generic hero ("Welcome to X") → ✅ a sharp value prop + a real **product preview**
  (use `<BrowserFrame>`), with floating proof chips.
- ❌ Duplicated global controls on a page (a second EN/TL or theme toggle inside a view) → ✅
  rely on the single set in the shell: the `AppShell` sidebar footer for `(app)` routes, the
  `SiteHeader` for public pages. Don't repeat them inside a view.
- ❌ Em-dashes (`—`) in UI copy → ✅ periods/colons/commas. Keep product text clean (see
  `smc-content`).

## App shell & navigation (the authenticated area)
All `(app)` routes are wrapped by **`AppShell`** (`src/components/shell/app-shell.tsx`):
- **Desktop (`lg:`):** a persistent **left sidebar** (256px) with grouped nav (Learn / Tools /
  Community / Manage), brand at top, and the single global controls (theme, locale, sign out)
  in the footer. Content sits in `lg:pl-64` inside the centered `container`.
- **Mobile:** the sidebar is hidden; a slim top bar shows a **hamburger** that opens the same
  nav as a left **drawer** (`Sheet side="left"`), plus a quick notes button. No bottom tab bar.
- **Surfaces:** Community **chat is a page** (`/community`); **Notes is a slide-over**
  (`Sheet`, default panel side) opened from the sidebar/top bar. Don't reintroduce floating FABs
  or per-view nav. Active state via `aria-current`; close the drawer on route change.
- New `(app)` screens render their content only (a back link + heading + body); the shell owns
  the chrome. Reuse `Sheet`/`Input`/`Textarea`/`Badge`/`Card`/`Button` from `src/components/ui/`.

## Landing / marketing pages specifically
Treat the landing as a **product demo**: Hero (value prop + live product preview + CTA) →
proof/stats strip → feature bento → how-it-works → an **interactive live demo** (real
`<SmcChart>`) → curriculum → FAQ (`<details>`) → glowing final CTA → footer. Every section
wrapped in `<Reveal>`. Spotlight/grid/noise backdrops on the hero and CTA.

## Always-on rules
- **Mobile-first.** Design 360–414px first, enhance with `sm:`/`md:`/`lg:`. Tap targets ≥ 44px.
- **Tokens only** for color (`bg-background text-foreground bg-card text-primary` …).
- **Green/red = market meaning only** (bull/bear). UI success = teal; error = `--destructive`.
- **Type:** Space Grotesk display, Inter body, JetBrains Mono for numbers/prices.
- **A11y:** WCAG AA contrast, visible focus ring, keyboard operable, meaning never by color alone.
- **Performance:** prefer Server Components; `"use client"` only where interactive. Don't
  animate huge subtrees; keep scroll listeners passive.

## Self-check before finishing a screen
- [ ] Clear focal point + real hierarchy (not uniform text)
- [ ] Looks intentional at 360px AND desktop
- [ ] Depth used (shadow/glow), one accent, tokens only
- [ ] Motion is subtle, choreographed, reduced-motion-safe
- [ ] Icons are lucide (no emoji-as-icon); cards have hover states
- [ ] Green/red only for market meaning; AA contrast + focus rings
