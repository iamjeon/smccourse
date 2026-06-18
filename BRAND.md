# Brand Guidelines — SMC Course

> Single source of truth for look & feel. Tokens are implemented in
> `src/app/globals.css` and `tailwind.config.ts`; the name/tagline live in
> `src/lib/brand.ts`. Change them in one place, they update everywhere.

## 1. Name & positioning
**Name:** SMC Course
**Subtitle:** Smart Money Concepts

**Tagline:** "Learn Smart Money Concepts — for free."
**Voice:** Direct, mentor-like, no hype, no "get rich quick." Bilingual-friendly
(English + Taglish). Speak to traders as peers. Always risk-aware.

## 2. Logo
The logo is `public/logo.png` — a book-globe-candlestick-coin illustration.
It is rendered via the `<Logo>` / `<LogoMark>` components using `next/image`.

## 3. Color system (dark-first)
| Token | Hex | Use |
|-------|-----|-----|
| `--background` | `#0A0D14` | App background (near-black navy) |
| `--foreground` | `#E8EBF2` | Primary text |
| `--card` | `#111620` | Cards, panels |
| `--muted-foreground` | `#8A93A6` | Secondary text |
| `--primary` | `#2DE0B6` | Brand / CTAs (electric teal) |
| `--border` | `#222A38` | Hairlines, dividers |
| `--bull` | `#22C55E` | Bullish candles / "up" |
| `--bear` | `#F0506E` | Bearish candles / "down" |
| `--liquidity` / `--gold` | `#F5B82E` | Liquidity levels, highlights |
| `--zone` | `#6366F1` | FVG / order-block zones (use ~15% opacity fill) |
| `--destructive` | `#EF4444` | Errors, wrong answers |

Rules: one accent (teal) drives attention — don't introduce competing brand hues.
Green/red are reserved for **market meaning only**, never for generic UI success/error
(use teal for success, `--destructive` for error) to avoid confusing learners.

## 4. Typography
- **Display / headings:** Space Grotesk (`--font-display`).
- **Body / UI:** Inter (`--font-sans`).
- **Numbers / code / prices:** JetBrains Mono (`--font-mono`).
- Scale: hero `text-5xl/6xl`, h1 `text-3xl`, h2 `text-2xl`, body `text-base`,
  small `text-sm`. Line-height generous for lessons (`leading-relaxed`).

## 5. Layout & motion
- **Mobile-first.** Design for 360–414px first, enhance upward. Bottom tab nav on
  mobile, sidebar/topbar on desktop. Min tap target 44px (enforced in globals.css).
- Radius `0.75rem`; soft borders over heavy shadows. Use `.glow-primary` sparingly
  for the primary CTA only.
- Motion: purposeful, 200–500ms, ease-out. Respect `prefers-reduced-motion`
  (already handled globally). Charts animate to *teach*, not to decorate.

## 6. Accessibility
- Maintain WCAG AA contrast (the palette is tuned for it on dark bg).
- Every interactive element keyboard-focusable with a visible `--ring` focus.
- Charts must convey meaning with labels/shapes, not color alone.
