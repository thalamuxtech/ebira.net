# Ebira.net — web app

The digital home for the Ebira language, its people, and its diaspora.
A Haleyouth Foundation programme. This app implements **Milestone M1**
(flagship landing page + waitlist) of the
[Web App Implementation Plan](../implementation_plan/WEB_APP_IMPLEMENTATION_PLAN.md),
with working previews of the Dictionary, Translator, and Contribute pillars
and designed placeholders for the rest.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## What’s inside

| Route | Pillar | State |
|---|---|---|
| `/` | Landing — hero, stats, nine pillars, roadmap, partners, waitlist | Live |
| `/dictionary` (+ `/dictionary/[id]`) | Searchable demo seed (16 draft entries), dialect filters, `/` keyboard shortcut | Preview |
| `/translate` | Dictionary-backed EN↔Ebira lookup with confidence badges | Preview |
| `/contribute` | 3-step submit flow (kind → words → consent), offline queue | Preview |
| `/heritage` | Riddle answer-reveal demo + content types | In design |
| `/learn` | Beginner-track curriculum preview | In design |
| `/history`, `/people`, `/diaspora` | Editorial previews + waitlist | Coming soon |

- **Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · Framer Motion · Firebase (Firestore)
- **Design tokens** live in `app/globals.css` (light + dark, CSS variables). Fonts (Fraunces + Inter,
  Latin-Extended for tone marks) are self-hosted via `next/font`.
- **Waitlist & contributions** write to Firestore (`waitlist`, `submissions`) and fall back to a
  localStorage queue that syncs on a later visit — capture works offline.
- **Seed lexicon** (`lib/dictionary.ts`) is demo data, every entry marked `draft` pending
  verification by the Chief Language Advisor (EDP). Replace with the 800+ word import.
- Theme: toggle in the navbar, persisted; `?theme=dark|light` overrides per visit.
- Motion respects `prefers-reduced-motion` everywhere (canvas draws a static frame).

## Before going live

1. Deploy Firestore security rules: public may **create** into `waitlist`/`submissions` only;
   published content world-readable; content writes require editor/admin claims (plan §8).
2. Point `ebira.net` DNS at Firebase Hosting; wire GitHub Actions (preview per PR, prod on main).
3. Import the 800+ word collection into `entries` and swap the demo seed for live data.
4. Add Analytics behind a cookie-consent banner (`initAnalytics` pattern in plan §3).
