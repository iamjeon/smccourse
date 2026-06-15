---
name: smc-design
description: Brand + mobile-first UI guardrails for Liquidity Lab. Use when building or changing any screen, component, or style — to keep colors, type, spacing, motion, accessibility, and mobile behavior consistent with the brand. Triggers on new pages/components, layout tweaks, "make it look good/on-brand", or styling decisions.
---

# SMC Design skill

Apply this whenever you touch UI. The full brand spec is `BRAND.md`; this is the working
checklist so every screen stays consistent and mobile-first.

## Always-on rules
- **Mobile-first.** Build for 360–414px first, then enhance with `sm:`/`md:`/`lg:`.
  Bottom tab nav on mobile; topbar/sidebar on desktop. Tap targets ≥ 44px.
- **Use tokens, not raw hex.** Colors come from CSS vars via Tailwind:
  `bg-background text-foreground bg-card border-border text-primary` etc. Never hardcode
  colors in components.
- **One accent.** `--primary` (teal) drives attention. `.glow-primary` only on the single
  most important CTA per view.
- **Green/red = market meaning only.** Bull/bear/up/down. For UI success use teal; for
  errors use `--destructive`. Don't blur these — learners read color as price direction.
- **Type:** Space Grotesk for headings (`font-display`), Inter for body, JetBrains Mono for
  numbers/prices (`font-mono`). Lessons use `leading-relaxed` and comfortable measure.
- **Radius & surfaces:** `rounded-lg` (0.75rem), soft `border-border` over heavy shadows.

## Motion
- Purposeful, 200–500ms, ease-out. Charts animate to *teach*. Page/section reveals: subtle
  `animate-fade-up`. Honor `prefers-reduced-motion` (handled globally) — never gate meaning
  behind animation.

## Accessibility (required)
- WCAG AA contrast (palette is tuned for dark bg). Visible focus ring (`ring`).
- Everything keyboard-operable. Charts/quizzes convey meaning with text/shape + color.
- Real labels on inputs; `aria-` where needed; semantic HTML first.

## Components
- Reuse primitives in `src/components/ui/`. If a new pattern appears 2+ times, extract it.
- Prefer Server Components; add `"use client"` only for interactivity (charts, quizzes,
  toggles, menus).

## Quick self-check before finishing a screen
- [ ] Looks right at 360px AND desktop
- [ ] Only tokens for color; one primary CTA
- [ ] Green/red used only for market meaning
- [ ] Keyboard + focus + contrast OK
- [ ] Motion subtle and reduced-motion-safe
