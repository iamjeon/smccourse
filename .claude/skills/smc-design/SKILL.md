---
name: smc-design
description: Senior-grade brand + UI/UX standards for SMC Course, including research-backed UX principles, the authenticated app shell (sidebar + mobile drawer), spatial composition, and information architecture. Use when building or changing any screen, component, navigation, marketing section, or style — to keep the product at a polished, professional, product-demo level (think Linear / Vercel / Stripe), not a generic "vibe-coded" template. Triggers on new pages/components, navigation/layout/IA changes, landing/marketing work, motion changes, "make it look good / modern / professional", and styling decisions.
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
4. **Motion that means something.** One well-orchestrated page entrance with staggered
   reveals beats ten scattered hover effects. Use `<Reveal>` (fade + rise, once) for scroll
   entry, stagger lists by ~0.05-0.1s, hover-lift interactive cards
   (`hover:-translate-y-1 hover:border-primary/40`), and animate charts to *teach*. Easing
   ~`[0.21,0.5,0.3,1]`, durations 0.3-0.7s. Always honor `prefers-reduced-motion`.
5. **Consistency via tokens.** Never hardcode hex. Spacing on a rhythm (4/6/8/12/16/20/24).
   Radii from the scale. Reuse primitives; extract a component once a pattern repeats.

## Research-backed UX principles
Apply these when laying out any screen. They are not theory; they are measured human behavior.

- **F-Pattern scanning.** 79% of users scan, 16% read word-by-word (Nielsen Norman Group).
  Put key info (headings, CTAs, navigation) along the top bar and the left edge. Don't bury
  important actions in the right column on desktop or the center of a long paragraph.
- **Left-side bias.** Users spend 69% more time viewing the left half of screens. Place
  primary navigation, key labels, and the most important content on the left. On mobile,
  left-aligned text always outperforms centered body text.
- **Hick's Law.** Decision time increases logarithmically with the number of choices. Group
  related nav items (Learn / Tools / Community / Manage), limit quiz options to 4, and keep
  CTAs to one primary + one secondary per view.
- **Fitts's Law.** Larger, closer targets are easier to hit. Tap targets >= 44px (already
  enforced in `globals.css`). Make primary CTAs the biggest interactive element on screen.
- **Mobile thumb zones.** 49% of users hold their phone one-handed. Keep primary actions in
  the natural thumb reach (center-bottom to bottom-right). Secondary actions go top-left.
  This is why the sidebar drawer opens from the left (hamburger is top-left, reachable).
- **Recognition over recall.** Use clear labels, icons with text, and visible state (active
  nav item, progress bars) so users never have to remember where they are. Rely on
  `aria-current` and visual active states in the shell.
- **Banner blindness.** Users ignore anything that looks like an ad. Avoid right-rail boxes
  with busy borders, decorative banners above content, or floating promotional bars.

## Typography: distinctive, not default
The font stack (Space Grotesk display, Inter body, JetBrains Mono numbers) is deliberately
chosen. Use it with confidence and contrast:
- **Dramatic size jumps (3x+).** A `text-sm` label above a `text-4xl` heading creates visual
  authority. Timid jumps (e.g. `text-lg` to `text-xl`) look like a mistake, not a choice.
- **Weight as hierarchy.** `font-bold` for headings, `font-medium` for labels, `font-normal`
  for body. Never use more than three weights on one view.
- **Monospace for credibility.** Show prices, percentages, lesson counts, and quiz scores in
  `font-mono` (JetBrains Mono). Numbers in a proportional font look amateur in a trading app.

## Spatial composition (break the grid intentionally)
Flat, uniform grids look generated. When building marketing sections or feature showcases:
- **Bento layout.** Vary card sizes (span-2 + span-1, tall + wide) instead of identical cards.
  The eye needs landmarks.
- **Overlap and offset.** A product screenshot overlapping a section boundary, a floating stat
  chip offset from its card, a decorative glow bleeding past a container. These signal that a
  human made choices.
- **Asymmetric balance.** A large visual left + tight text block right (or vice versa) is more
  dynamic than centered-everything. Center alignment is reserved for short hero headlines and
  CTAs only.
- **Negative space as a feature.** An empty 120px+ gap between sections says "this is premium."
  Cramped spacing says "we ran out of ideas and crammed things in."

## Avoid the "AI slop" look (anti-patterns)
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
- ❌ Em-dashes in UI copy → ✅ periods/colons/commas. Keep product text clean.
- ❌ Centered navigation → ✅ left-aligned nav (left-side bias; centered nav hides structure).
- ❌ Auto-playing carousels → ✅ static bento or tabbed content (carousels have <1% interaction).
- ❌ Glassmorphism/parallax for decoration → ✅ only use `glass` utility for functional overlays
  (sticky headers, modals). Parallax only if it teaches (e.g. a chart scrolling into view).
- ❌ Timid type sizing (everything `text-base`) → ✅ bold size jumps that create instant hierarchy.
- ❌ Color as sole information carrier → ✅ always pair color with labels, icons, or shapes
  (critical for chart annotations and quiz feedback).

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
wrapped in `<Reveal>`. Spotlight/grid/noise backdrops on the hero and CTA. Apply bento layout
and asymmetric composition in feature sections. Use negative space generously between sections.

## Always-on rules
- **Mobile-first.** Design 360-414px first, enhance with `sm:`/`md:`/`lg:`. Tap targets >= 44px.
- **Tokens only** for color (`bg-background text-foreground bg-card text-primary` ...).
- **Green/red = market meaning only** (bull/bear). UI success = teal; error = `--destructive`.
- **Type:** Space Grotesk display, Inter body, JetBrains Mono for numbers/prices. Bold size jumps.
- **A11y:** WCAG AA contrast, visible focus ring, keyboard operable, meaning never by color alone.
- **Performance:** prefer Server Components; `"use client"` only where interactive. Don't
  animate huge subtrees; keep scroll listeners passive.

## Design review checklist (before finishing any screen)
Run through all five checks. If any fails, fix it before shipping.

**1. Visual hierarchy**
- [ ] One clear focal point per view (not uniform text)
- [ ] Dramatic type size jumps create instant scannable structure
- [ ] Key info on the left edge and top (F-pattern compliant)

**2. Responsiveness & touch**
- [ ] Looks intentional at 360px AND desktop (not just "it fits")
- [ ] Tap targets >= 44px; primary CTA is the largest interactive element
- [ ] Primary actions within mobile thumb reach zone

**3. Brand consistency**
- [ ] Depth used (shadow/glow), one accent, tokens only (no hardcoded hex)
- [ ] Icons are lucide (no emoji-as-icon); cards have hover states
- [ ] Green/red only for market meaning; AA contrast + focus rings
- [ ] Monospace for numbers, prices, scores

**4. Motion & composition**
- [ ] Motion is choreographed (staggered reveals, not scattered effects)
- [ ] Reduced-motion-safe (`prefers-reduced-motion` honored)
- [ ] Spatial variation used (bento/asymmetry, not flat identical grids)
- [ ] Negative space is generous between sections

**5. Usability (research-backed)**
- [ ] Navigation left-aligned; no centered nav or buried actions
- [ ] Choices are grouped and limited (Hick's Law: max 4 quiz options, 1-2 CTAs)
- [ ] State is visible (active nav, progress, current lesson) not from memory
- [ ] No banner-blind zones; no decorative-only glassmorphism/parallax
