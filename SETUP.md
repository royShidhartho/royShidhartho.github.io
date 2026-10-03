# SETUP.md — Personalize this template (guide for an AI assistant)

**You are an AI coding assistant helping a _new user_ turn this portfolio template into their own site.**

This repository currently contains the **original author's example content** (name, bio, research, publications, talks, CV, portrait; plus archived blog posts in `_archive/blog/`). Your job is to replace all of it with the user's content, end to end. Read `CLAUDE.md` first for architecture and gotchas, then follow this protocol.

**Working rules:**
- Work in small steps and keep the user in the loop. Confirm before sweeping changes.
- After edits, run `npm run build` (it catches TypeScript errors `npm run dev` tolerates). Fix anything that breaks.
- **Do not commit, push, or deploy unless the user explicitly asks.** Pushing to `master` auto-deploys.
- Never put the user's email in code/JSON-LD unless they explicitly opt in (this template hides email by design; there is no contact form, and visitors use the linked profiles).

---

## Step 1 — Interview the user

Ask for the following **in one batched message** (not one question at a time). Offer a shortcut: *"Paste your CV, LinkedIn, Google Scholar, or ORCID and I'll extract most of this for you."*

- **Name** and **title/role** (e.g. "PhD Student in Biomedical Engineering", "Senior Software Engineer")
- **Institution / company** (optional)
- **Subtitle** — one line under their name in the header (e.g. "PhD Student, Biomedical Engineering · Carnegie Mellon University")
- **Bio** — a few short paragraphs (offer to draft them from their CV/LinkedIn)
- **Affiliations** — labs or groups to link in the sidebar
- **Skills / areas of expertise**, grouped under labels
- **Social links** — the sidebar supports LinkedIn, GitHub, Google Scholar, and ResearchGate. Any other platform (ORCID, X/Twitter, a personal website) needs an icon block added to `src/components/Sidebar.astro`; say so if they ask for one. (Ask explicitly whether they want their **email shown** — default is hidden.)
- **Academic or not?** — if not academic, they likely want to **remove the Research and Talks sections** (and may not need a blog).
- **Research projects** (if academic) — title, summary, year, citation, and any materials (paper, PDF, poster, slides, code, data), video, or BibTeX; ask which up to three to feature — or a CV/Scholar link to pull from
- **Publications** (if academic) — the full paper list (title, authors, venue, year, type) with DOI links and any legal free PDFs or arXiv preprints; a Google Scholar profile is the easiest source
- **Talks** (if academic)
- **Experience** and **education** history
- **Blog** — the blog is archived in `_archive/blog/`. Restore it (and write/import posts) or leave it out?
- **Accent color** preference
- **Deploy target & final URL** — e.g. GitHub Pages at `username.github.io`, a custom domain, Netlify/Vercel. You need the final URL for canonical links + the sitemap.

## Step 2 — Generate a personalized to-do checklist

From their answers, produce a **markdown checklist** tailored to them, with each item mapped to the file(s) it touches (use the map in Step 3). Show it, then work through it — checking items off as you complete them. Example skeleton:

```markdown
- [ ] Identity, subtitle, bio, affiliations → src/config.ts
- [ ] Skills, experience, education → src/config.ts
- [ ] Social links → src/config.ts (sameAs in JSON-LD follows automatically; a new platform also needs an icon in src/components/Sidebar.astro)
- [ ] Research projects, featured picks, materials, videos → siteConfig.research in src/config.ts
- [ ] Publications (DOI, legal PDF/preprint, BibTeX) → siteConfig.publications in src/config.ts
- [ ] Talks → src/components/Talks.astro   (or remove section)
- [ ] Blog: leave archived, or restore per _archive/blog/README.md and replace the posts
- [ ] Replace CV / portrait / favicon / og-image → public/
- [ ] Set site URL → astro.config.mjs
- [ ] Accent color → --accent, --accent-soft, --mark in src/styles/global.css (light and dark blocks)
- [ ] SEO: titles, keywords, Person schema, llms.txt
- [ ] Rewrite CLAUDE.md + README live-example link for the new owner
- [ ] npm run build → verify
```

## Step 3 — Make the edits (file map + gotchas)

**Content lives in three places** (the single most important thing — see `CLAUDE.md`):

1. **`src/config.ts`** (`siteConfig`): `name`, `title`, `subtitle`, `description`, `authorName`, `portrait`, `cv`, `social`, `bio`, `affiliations`, `skills` (labeled groups), `research`, `publications`, `experience`, `education`.
   - `social` supports four keys: `linkedin`, `researchgate`, `scholar`, `github`. `Sidebar.astro` hardcodes one icon block per key, so a new key renders nothing until you add a matching block there.
   - ⚠️ `social` has **no `email` key** by default (privacy). `src/lib/seo.ts` builds JSON-LD `sameAs` from `Object.values(siteConfig.social)`, so an `email` key would be published in the structured data as well as exposed to scrapers. Add one only if the user opts in, warn them of both, and add Sidebar markup if they want it shown.
   - `bio` is an array of paragraphs; inline marks are `[label](url)`, `==highlight==`, and `**bold**`. `authorName` (e.g. "S. Roy") is bolded in research citations and publication author lists.
   - `research` items follow `ResearchItem` in `src/lib/research.ts`: `featured: true` puts an item in the Featured strip (max 3); `materials` keys are `pdf`, `preprint` (labeled Preprint: a free arXiv copy of a paywalled paper), `doi` (labeled Paper), `poster`, `slides`, `code`, `data`; `video` is `{ youtube: "<id>" }` or `{ src, poster? }`; `bibtex` adds a copy button. Self-hosted files go in `public/files/research/<slug>/`.
   - `publications` items follow `Publication` in `src/lib/publications.ts`; set `type` to Journal, Conference, Abstract, or Preprint. Only add a `pdf` for a legal free copy (open-access publisher, PubMed Central, arXiv, organizer-hosted abstract); use `preprint` for an arXiv copy of a paywalled paper. Never re-host publisher PDFs.
   - Empty `research`/`publications`/`experience`/`education`/`skills` arrays auto-hide those sections (there is no nav).

2. **A hard-coded array inside a component:** `src/components/Talks.astro` → the `talks` array, rendered as a scrollable box in the sidebar.
   - **Non-academic users:** remove `<Research />` and `<Publications />` from `src/pages/index.astro`, and/or `<Talks />` from `src/components/Sidebar.astro`.

3. **Blog (archived)**: `_archive/blog/` holds the blog pages, the Writing section, and the example posts. If the user wants a blog, follow `_archive/blog/README.md` to restore it, then replace the example posts and update `featuredSlug` in `src/pages/blog/index.astro`. Otherwise leave it archived (or delete `_archive/`).

**Assets to replace (in `public/`):**
- `files/` → user's CV PDF; set `siteConfig.cv` to its path.
- `images/blog/` → user's portrait; set `siteConfig.portrait` to its path (also used by the JSON-LD in `src/lib/seo.ts`).
- `favicon.svg`.
- `og-image.png` → the 1200×630 social card. It **must be a static raster** (PNG/JPG — not SVG). Regenerate it with the user's name/title if you can render an image; otherwise tell the user to replace it with their own 1200×630 image.

**Site-wide settings:**
- `astro.config.mjs` → set `site` to the user's final URL (lowercase). For a **project** (sub-path) site, also set `base`.
- `src/styles/global.css` → the accent color. The default is CMU red. Change `--accent`, `--accent-soft`, and `--mark` together, in both the `:root` (light) block and the `[data-theme="dark"]` block. `--accent-soft` is a translucent tint of the accent and `--mark` is the highlight background, so leaving them red will clash with a new accent.
- `public/robots.txt` → keep it AI-crawler-friendly, or remove the explicit AI-bot lines if the user wants to **block** AI crawlers.
- `public/llms.txt` → rewrite with the user's bio, links, and key work.

**SEO / metadata:**
- Page titles + default `description` live in `src/pages/index.astro` (and, if the blog is restored, `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro`); they feed `<Seo />`. Update them to the user's name.
- `src/components/Seo.astro` → update the default `baseKeywords`.
- `src/lib/seo.ts` → update the `Person` schema: `jobTitle`, `affiliation`, `alumniOf`, `knowsAbout`, the portrait path (it reads `siteConfig.portrait`), and `sameAs`, which is derived from `siteConfig.social` automatically (no separate edit). Publications become `ScholarlyArticle` entries automatically, matched to the user by `siteConfig.authorName`. **Never include email.**

**Docs (do this last):**
- Rewrite `CLAUDE.md`'s Project Overview and content references so they describe the **new owner's** site (it currently describes the original author). Keep the architecture/theming/SEO/gotcha sections — they still apply.
- In `README.md`, update the **"Live example"** link to the user's URL. Keep the **MIT attribution** to the original DevPortfolio author (license requires it).

## Step 4 — Verify & deploy

1. `npm test` and `npm run build` — fix any errors. Optionally `npm run dev` (port 4321) and have the user review.
2. **GitHub Pages:** name the repo `<username>.github.io`, push to `master`, and set **Settings → Pages → Source** to **GitHub Actions** (a workflow is included). Confirm `site` in `astro.config.mjs` matches the live URL. (Other hosts: see the Astro deploy guides — it's a plain static build.)
3. Remind the user that pushing to `master` publishes immediately, and to hard-refresh to clear cached CSS.

## Conventions to keep

- Preserve the formal academic, light/dark aesthetic with no animation. Use the **CSS color variables** so both themes work — never hard-code colors.
- Add new icons as **inline SVG**, matching existing components (no icon library).
- Keep components presentational, reading from `siteConfig` (or, for Talks, its in-component array).
- New pages must include the no-flash theme `<script>` and use `<Seo />` for head metadata.
