# Liquidity Lab — Free SMC Course Platform

A free, mobile-first web platform that turns your SMC trading transcripts into an
interactive course: **Modules → Lessons → Quizzes**, with animated charts, an
English/Taglish toggle, and progress tracking. Built to run on **free tiers** and scale
to thousands of learners.

> New here? You don't need to be a developer. Follow the steps below in order.

---

## 1. Run it on your computer

```bash
npm install      # one time
npm run dev      # start — then open http://localhost:3000
```

That's it — you can already browse the landing page and **Module 0 (Basic Trading
Course)** with its 6 lessons, charts, and quizzes. Sign-in and saved progress need
Supabase (next step), but everything else works offline.

Other commands: `npm run build` (production build), `npm run typecheck`, `npm run lint`.

---

## 2. Turn on sign-in + progress saving (free Supabase)

1. Create a free project at <https://supabase.com>.
2. In the project: **Settings → API**. Copy the **Project URL** and the **anon public** key.
3. In this folder, copy `.env.example` to `.env.local` and paste those two values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
4. In Supabase: **SQL Editor → New query**, paste the contents of
   `supabase/migrations/0001_init.sql`, and **Run**. This creates the tables + security.
5. In Supabase: **Authentication → URL Configuration**, add your redirect URL:
   `http://localhost:3000/auth/callback` (and later your live site's `/auth/callback`).
6. (Optional) Enable **Google** login under **Authentication → Providers**.
7. Restart `npm run dev`. Sign-in (magic link / Google) and progress now work.

---

## 3. Put it online for free (Vercel)

1. Push this folder to a new **GitHub** repo.
2. Go to <https://vercel.com>, **Add New → Project**, import the repo.
3. In Vercel project **Settings → Environment Variables**, add the same three variables
   (set `NEXT_PUBLIC_SITE_URL` to your Vercel URL, e.g. `https://your-app.vercel.app`).
4. Add that `https://your-app.vercel.app/auth/callback` to Supabase redirect URLs.
5. Deploy. Vercel gives you HTTPS, a global CDN, and preview links automatically.

> Vercel's free **Hobby** plan is for non-commercial use — a free course qualifies. If you
> ever charge for it, upgrade to Vercel Pro.

---

## 4. Everyday changes

- **Brand name / tagline:** `src/lib/brand.ts`. **Colors:** `src/app/globals.css` (see `BRAND.md`).
- **Add or fix a lesson:** see `CONTENT-PIPELINE.md`. The easiest way is to ask Claude:
  *"Build the lesson for &lt;transcript name&gt;."* It uses the `smc-lesson-builder` agent to
  produce an accurate bilingual lesson + charts + quiz for you to review.
- **Not sure how to ask Claude for something?** Just describe what you want in plain words —
  the `prompt-helper` skill turns it into a clear request.

## What's built vs. coming
- ✅ Full platform: landing, auth, dashboard, lessons, quizzes, progress, mobile UI, security.
- ✅ **Module 0 (Basic Trading Course)** — all 6 lessons fully authored.
- 🚧 **Parts 1–4** (16 lessons) — added next via the content pipeline; they show as
  "Coming soon" until published.

## Project docs
`CLAUDE.md` (overview) · `ARCHITECTURE.md` · `BRAND.md` · `CONTENT-PIPELINE.md` ·
`DECISIONS.md` (log + status).

---
*For education only. Trading involves risk; nothing here is financial advice.*
