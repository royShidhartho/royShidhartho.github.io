# SETUP.md — Personalize this template (guide for an AI assistant)

**You are an AI coding assistant helping a _new user_ turn this portfolio template into their own site.**

This repository currently contains the **original author's example content** (name, bio, publications, talks, blog posts, CV, portrait). Your job is to replace all of it with the user's content, end to end. Read `CLAUDE.md` first for architecture and gotchas, then follow this protocol.

**Working rules:**
- Work in small steps and keep the user in the loop. Confirm before sweeping changes.
- After edits, run `npm run build` (it catches TypeScript errors `npm run dev` tolerates). Fix anything that breaks.
- **Do not commit, push, or deploy unless the user explicitly asks.** Pushing to `master` auto-deploys.
- Never put the user's email in code/JSON-LD unless they explicitly opt in (this template hides email by design; contact goes through a form).

---

## Step 1 — Interview the user

Ask for the following **in one batched message** (not one question at a time). Offer a shortcut: *"Paste your CV, LinkedIn, Google Scholar, or ORCID and I'll extract most of this for you."*

- **Name** and **title/role** (e.g. "PhD Student in Biomedical Engineering", "Senior Software Engineer")
- **Institution / company** (optional)
- **Hero tagline** — one punchy line for under their name
- **About paragraph** — longer bio (offer to draft it from their CV/LinkedIn)
- **Skills / areas of expertise**
- **Social links** — any of: LinkedIn, GitHub, Google Scholar, ResearchGate, ORCID, X/Twitter, personal website. (Ask explicitly whether they want their **email shown** — default is hidden.)
- **Academic or not?** — if not academic, they likely want to **remove the Talks and Publications sections** (and may not need a blog).
- **Publications** and **talks** (if academic) — or a CV/Scholar link to pull from
- **Projects** to feature
- **Experience** and **education** history
- **Blog** — keep it (and write/import posts) or remove it?
- **Accent color** preference
- **Deploy target & final URL** — e.g. GitHub Pages at `username.github.io`, a custom domain, Netlify/Vercel. You need the final URL for canonical links + the sitemap.

## Step 2 — Generate a personalized to-do checklist

From their answers, produce a **markdown checklist** tailored to them, with each item mapped to the file(s) it touches (use the map in Step 3). Show it, then work through it — checking items off as you complete them. Example skeleton:

```markdown
- [ ] Identity & bio → src/config.ts
- [ ] Skills, projects, experience, education → src/config.ts
- [ ] Social links → src/config.ts (+ src/lib/seo.ts sameAs)
- [ ] Publications → src/components/Publications.astro
- [ ] Talks → src/components/Talks.astro   (or remove section)
- [ ] Blog posts → src/posts/*.md           (or remove blog)
- [ ] Replace CV / portrait / favicon / og-image → public/
- [ ] Set site URL → astro.config.mjs
- [ ] Accent color → src/styles/global.css
- [ ] Contact form endpoint → src/components/Contact.astro
- [ ] SEO: titles, keywords, Person schema, llms.txt
- [ ] Rewrite CLAUDE.md + README live-example link for the new owner
- [ ] npm run build → verify
```

## Step 3 — Make the edits (file map + gotchas)

**Content lives in three places** (the single most important thing — see `CLAUDE.md`):

1. **`src/config.ts`** (`siteConfig`): `name`, `title`, `description`, `social`, `aboutMe`, `skills`, `projects`, `experience`, `education`.
   - ⚠️ `social` has **no `email` key** by default (privacy). Add one only if the user opts in — and warn that it exposes the address to scrapers.
   - ⚠️ `config.ts` also still contains `publications` and `accentColor`, but **neither is used**. Publications render from the component (below); the accent comes from CSS. Either ignore them or delete them to avoid confusion — do **not** edit them expecting an effect.
   - Empty/removed `projects`/`experience`/`education` arrays auto-hide those sections and their nav links.

2. **Hard-coded arrays inside components:**
   - `src/components/Talks.astro` → the `talks` array (with `COLLAPSE_AFTER`).
   - `src/components/Publications.astro` → the `publications` array **and** the `domains` filter config. Update the domain buckets to fit the user's fields, or simplify the filter.
   - **Non-academic users:** remove `<Talks />` and/or `<Publications />` from `src/pages/index.astro`, and their nav links from `src/components/Header.astro` and `src/components/Footer.astro`.

3. **`src/posts/*.md`** → blog posts. Delete the example posts and add the user's, or remove the blog. If you keep it, update `featuredSlug` in `src/pages/blog/index.astro` (it currently points at an example post).

**Assets to replace (in `public/`):**
- `files/` → user's CV PDF; update the **"Download CV"** link in `src/components/Hero.astro`.
- `images/blog/potrait_card.jpeg` → user's portrait (referenced in `Hero.astro` **and** `src/lib/seo.ts`).
- `favicon.svg`.
- `og-image.png` → the 1200×630 social card. It **must be a static raster** (PNG/JPG — not SVG). Regenerate it with the user's name/title if you can render an image; otherwise tell the user to replace it with their own 1200×630 image.

**Site-wide settings:**
- `astro.config.mjs` → set `site` to the user's final URL (lowercase). For a **project** (sub-path) site, also set `base`.
- `src/styles/global.css` → `--accent` / `--accent-2` (and the dark-theme `--accent` under `[data-theme="dark"]`) for the accent color. (Not `siteConfig.accentColor`.)
- `src/components/Contact.astro` → the Formspree endpoint (or swap in another form/contact method).
- `public/robots.txt` → keep it AI-crawler-friendly, or remove the explicit AI-bot lines if the user wants to **block** AI crawlers.
- `public/llms.txt` → rewrite with the user's bio, links, and key work.

**SEO / metadata:**
- Page titles + default `description` live in `src/pages/index.astro`, `src/pages/blog/index.astro`, and `src/pages/blog/[slug].astro` (they feed `<Seo />`). Update them to the user's name.
- `src/components/Seo.astro` → update the default `baseKeywords`.
- `src/lib/seo.ts` → update the `Person` schema: `jobTitle`, `affiliation`, `alumniOf`, `knowsAbout`, `sameAs` (the social links), and the portrait path. **Never include email.**

**Docs (do this last):**
- Rewrite `CLAUDE.md`'s Project Overview and content references so they describe the **new owner's** site (it currently describes the original author). Keep the architecture/theming/SEO/gotcha sections — they still apply.
- In `README.md`, update the **"Live example"** link to the user's URL. Keep the **MIT attribution** to the original DevPortfolio author (license requires it).

## Step 4 — Verify & deploy

1. `npm run build` — fix any errors. Optionally `npm run dev` (port 4321) and have the user review.
2. **GitHub Pages:** name the repo `<username>.github.io`, push to `master`, and set **Settings → Pages → Source** to **GitHub Actions** (a workflow is included). Confirm `site` in `astro.config.mjs` matches the live URL. (Other hosts: see the Astro deploy guides — it's a plain static build.)
3. Remind the user that pushing to `master` publishes immediately, and to hard-refresh to clear cached CSS.

## Conventions to keep

- Preserve the minimalist, light/dark editorial aesthetic. Use the **CSS color variables** so both themes work — never hard-code colors.
- Add new icons as **inline SVG**, matching existing components (no icon library).
- Keep components presentational, reading from `siteConfig` (or, for Talks/Publications, their in-component arrays).
- New pages must include the no-flash theme `<script>` and use `<Seo />` for head metadata.
