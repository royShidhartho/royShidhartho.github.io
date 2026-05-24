# HANDOFF — Portfolio redesign

_Last updated: 2026-05-24. Read this before touching the site; it reflects work that post-dates `CLAUDE.md`._

## TL;DR

A **complete visual redesign** of this Astro portfolio was done in one session and verified locally. **Nothing has been committed or pushed** — the user wants to keep verifying locally first. Do **not** push or commit without explicit approval. The old design was a monospace / two-column "heading-left" template; it is now a **modern-minimal, light/dark, editorial** design.

## What the site is

Single-page portfolio (`/`) + a small blog (`/blog`, `/blog/[slug]`) for Shidhartho Roy, PhD student in Biomedical Engineering at CMU (EEG / NIRS / pain biomarkers). Astro 5 + Tailwind v4 (via `@tailwindcss/vite`), deploys to GitHub Pages on push to `master`.

## Biggest things to know (gotchas that will bite you)

1. **Component CSS lives in `@layer components`** (in `src/styles/global.css`). This is deliberate: it lets Tailwind utilities (e.g. responsive `hidden`/`flex`) override component classes like `.btn`/`.icon-btn`. If you add component classes that set `display`, put them in that layer or utilities won't win.
2. **`.reveal` and `.rise` animations are gated behind a `.js` class** on `<html>` (added synchronously by the inline `<head>` script). This is so a no-JS visitor still sees all content. Consequence: a full-page screenshot that never scrolls shows blank sections, because `.reveal` starts at `opacity:0` until the IntersectionObserver (in `Header.astro`) fires. To screenshot, **force `.is-visible` on all `.reveal`** (see workflow below).
3. **Blog posts live in `src/posts/*.md`, NOT `src/pages/blog/`.** They were moved out of `pages/` because Astro auto-routes any `src/pages/**/*.md` as its own bare (unstyled) page, which *collided with and beat* `[slug].astro`. Both `blog/index.astro` and `blog/[slug].astro` glob `../../posts/*.md`. Don't move posts back into `pages/`.
4. **Theme**: `data-theme="light|dark"` on `<html>`, persisted to `localStorage.theme`, system-aware. A no-flash inline `<script is:inline>` sits in the `<head>` of all three page entry points (`index.astro`, `blog/index.astro`, `blog/[slug].astro`) and also adds the `.js` class. The toggle button + IntersectionObserver/scrollspy logic is in `Header.astro`'s `<script>`.

## Design system (match this)

All tokens/classes are in `src/styles/global.css`.

- **Fonts** (Google Fonts, loaded in each page `<head>`): **Hanken Grotesk** for everything; **Fraunces** italic used sparingly as an editorial accent (the word "signals" in the hero, blockquotes). Avoid Inter/Roboto.
- **Color**: warm-paper light theme / near-black dark theme, single accent (`--accent`: `#3b53f5` light, `#8094ff` dark). Everything is driven by CSS variables that flip on `[data-theme]` — components should use `var(--text)`, `var(--text-muted)`, `var(--border)`, `var(--accent)`, etc., not hard-coded colors.
- **Reusable classes**: `.shell` (max-width container), `.section`, `.section-head`, `.overline`, `.section-title`, `.lede`, `.card`/`.card-hover`, `.btn`/`.btn-primary`/`.btn-ghost`, `.chip`, `.ul-link`, `.social-link`, `.input`/`.label`, `.filter-chip`, `.list-toggle`/`.list-toggle-wrap` (the "show more" pill), `.pub-peek` (fade-teaser row), signal-trace `.signal`.
- **Signature motif**: a faint animated EEG/oscilloscope "signal trace" SVG at the bottom of the hero.
- **Section header convention**: small uppercase `.overline` label + large `.section-title`. The user explicitly removed the decorative accent **dash/line** from `.overline` — keep it plain text, do not reintroduce lines.
- **Motion**: staggered hero `.rise` on load, `.reveal` on scroll, all disabled under `prefers-reduced-motion`.

## Where content lives (three places — important)

1. **`src/config.ts`** (`siteConfig`): name, title, description, `social` (LinkedIn/ResearchGate/Scholar/GitHub — **email intentionally removed**, see below), `aboutMe`, `skills`, `projects`, `experience`, `education`.
2. **Hard-coded arrays inside components**:
   - `Talks.astro` → the `talks` array.
   - `Publications.astro` → the `publications` array (21 entries) + `domains` filter config.
3. **`src/posts/*.md`** → blog posts (frontmatter: `title`, `pubDate`, optional `description`/`author`/`image`/`tags`). Featured post on `/blog` is hard-coded by slug `cca-consensus-maps` in `blog/index.astro`.

## Section-by-section notes

- **Hero** — name, Fraunces-italic "signals" accent, CTAs (Explore research / Download CV), social icons, portrait (`/images/blog/potrait_card.jpeg`), signal-trace SVG. The envelope icon links to `#contact` (the form), not a `mailto`.
- **Talks** — hard-coded array; **collapsible list**: shows 5, fades the 6th, "Show all N talks" pill expands. `COLLAPSE_AFTER = 5` constant at top of `Talks.astro`. Pure-JS enhancement gated by `.js`.
- **Publications** — 21 papers, **reverse-chronological**, with **domain filter chips** (All / Pain & SCD / NIRS & optics / EEG / Medical imaging & ML / Computer vision / Energy) and the same **collapse pattern as Talks but only on the "All" view** (filtered views show all matches, button hidden). Each entry: year, type tag (Journal/Conference/Preprint/Abstract), authors, venue, expandable abstract, link. Melanin paper has a "★ JBO 2024 Top Paper" badge. ⚠️ **The abstracts for the ~13 non-originally-curated papers are AI-written summaries** (from the user's CV + titles + verified search snippets) and **still need the user's accuracy review** — do not treat them as official text. Two entries have **no link yet** (the 2026 *Journal of Pain* abstract and the OHBM 2024 abstract).
- **Experience** — open timeline (date left, accent dot, vertical rail, bullets), from `config.ts`.
- **Education** — open **hairline-divided list** (just redesigned away from heavy cards to match Talks/Publications), from `config.ts`.
- **Contact** — Formspree form (`https://formspree.io/f/maqpndwp`), honeypot `_gotcha`. No email shown.
- **Blog** — `FeaturedPost` + `BlogCard` grid; `[slug].astro` renders markdown via `.prose` (custom prose styles in `global.css` — there is no `@tailwindcss/typography` plugin).

## Open items / needs user input

- [ ] **User to review the AI-written publication abstract summaries** for accuracy; offer to fetch verbatim official abstracts on request.
- [ ] Two publications missing links (J. Pain 2026, OHBM 2024) — add when the user provides URLs/DOIs.
- [ ] Optional: confirm publication **domain bucket** assignments feel right.
- [ ] **`CLAUDE.md` is partly stale** (it still says posts live in `src/pages/blog/`). Refresh it once the design is locked.
- [ ] **`README.md`** still contains the original "DevPortfolio" template text (Tabler Icons, Twitter, etc.) — not yet reconciled.

## Privacy (email)

The user asked to hide their email. It was removed from `config.ts`, `Contact.astro` (no more `mailto`/visible address), and the Hero/Footer envelope icons now point to `#contact`. **BUT** the address is still in **git history** (commit `7f68213`) and the repo deploys to GitHub Pages, so it is likely already public. Fully purging requires history rewrite (`git filter-repo`/BFG) + force-push — **not done** (destructive; awaiting user). The **CV PDF** (`public/files/shidhartho-roy-cv.pdf`) also contains the email.

## Local verification workflow (no test framework exists)

- `npm run dev` (port 4321) for live; `npm run build` to validate (catches TS errors the dev server tolerates). Always confirm a **clean build** before presenting.
- Screenshots: there is **no Playwright**. The macOS machine has **Brave** at `/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`. The session used **`puppeteer-core`** installed with `npm i --no-save puppeteer-core` (in `node_modules`, not in `package.json` — may need reinstalling). Drive Brave headless via `executablePath`. Patterns that worked:
  - Seed theme with `page.evaluateOnNewDocument(() => localStorage.setItem("theme","dark"))`.
  - **Force reveals before screenshot**: `page.evaluate(() => document.querySelectorAll(".reveal").forEach(e => e.classList.add("is-visible")))`.
  - Use **element screenshots** (`(await page.$("#education")).screenshot(...)`) for sections — manual `window.scrollTo` math was unreliable here.
  - Delete any temp `_*.mjs` scripts when done (keep the tree clean).
- Astro's **dev toolbar** appears as a dark pill in dev-mode screenshots — it is not part of the design and won't be in the build.

## User working style / constraints

- **Do not push or commit** without explicit approval. Verify locally and present first.
- For significant aesthetic decisions, **present options (with previews) and let the user choose** rather than guessing — this has worked well.
- The user iterates section-by-section and reviews screenshots.
