# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal research portfolio for Shidhartho Roy (PhD student, Biomedical Engineering, CMU), forked from the Astro/Tailwind "DevPortfolio" template and redesigned into a single-page, no-animation academic layout (two-column card with an identity sidebar). The markdown blog is currently archived in `_archive/blog/` and not built. The repo also doubles as a reusable template — see `README.md`. Note that `.cursor/rules` and `package.json` (`name: devportfolio`) still carry original-template text; treat this file and `README.md` as authoritative where they conflict.

> **Setting this up as a new user?** If you're an AI assistant helping someone turn this template into *their own* portfolio, follow **`SETUP.md`** — it's the step-by-step onboarding protocol (interview → checklist → edits → verify). This `CLAUDE.md` describes the current example content (the original author's); `SETUP.md` tells you what to replace.

## Tech Stack

- **Astro 5** static site generator; all components in `.astro`.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, **not** a `tailwind.config.js`). The single global stylesheet `src/styles/global.css` is imported per-page and defines design tokens plus component classes in an `@layer components` block.
- **TypeScript** for the config, frontmatter types, and `src/lib/seo.ts`.
- **Fonts** (Google Fonts, loaded in each page `<head>`): **Hanken Grotesk** (upright 400–700 and italic 400/500) for body/UI (`--font-sans`) and **Fraunces** italic as a sparing editorial accent (`--font-serif`). (The pre-redesign IBM Plex Mono is gone.)
- Icons are **inline SVG** written directly in components — there is no icon library installed.
- **`@astrojs/sitemap`** integration generates the sitemap.

## Development Commands

```bash
npm run dev       # Dev server (port 4321)
npm run build     # Production build to ./dist (also catches TS errors the dev server tolerates)
npm run preview   # Preview the production build
npm test          # Unit tests for src/lib helpers (node --test)
```

No linting is configured.

## Theming (light/dark)

- `data-theme="light|dark"` on `<html>`, persisted to `localStorage.theme`. Light by default regardless of the OS setting; dark only after the visitor picks it with the toggle. A no-flash inline `<script is:inline>` in the `<head>` of all three page entry points sets the theme before paint and adds a `.js` class to `<html>`.
- All colors are **CSS variables** (`--bg`, `--text`, `--text-muted`, `--border`, `--accent`, …) defined in `global.css` and flipped under `[data-theme="dark"]`. Components must use these variables, not hard-coded colors.
- The accent is CMU red, set by `--accent` in `global.css` (light `#a6192e`, dark `#ef7d8c`). `--accent-soft` and `--mark` are derived from it (except dark `--mark`, which is a neutral white tint), so change them together. In dark mode, bio links use the text color with an accent underline instead of red text.
- The theme toggle is the only script in `Header.astro`. There is no reveal-on-scroll, active-section tracking, or animation anywhere; keep `global.css` free of `transition`, `animation`, and hover `transform`.

## Content lives in three different places

Content lives in two places (plus the archived blog):

1. **`src/config.ts`** (`siteConfig`): `name`, `title`, `subtitle`, `description`, `authorName`, `portrait` (full size, used by JSON-LD), `portraitSizes` (square 280 px and 560 px copies for the sidebar `srcset`), `cv`, `social`, `bio` (paragraphs; inline `[label](url)`, `==highlight==`, `**bold**`), `affiliations`, `skills` (labeled groups), `research`, `publications`, `experience`, `education` (`note` + `awards` badges).
   - `research` items follow `ResearchItem` in `src/lib/research.ts`: `featured: true` puts an item in the one-row Featured strip (max 3); `materials` keys are `pdf`, `preprint` (labeled Preprint: a free arXiv copy of a paywalled paper), `doi` (labeled Paper), `poster`, `slides`, `code`, `data`; `video` is `{ youtube: "<id>" }` or `{ src, poster? }`; `bibtex` adds a copy button. Self-hosted files go in `public/files/research/<slug>/`.
   - `publications` items follow `Publication` in `src/lib/publications.ts` (`title`, `authors`, `venue`, optional `details`, `year`, `type` of Journal/Conference/Abstract/Preprint, optional `award`, `materials`, `bibtex`). The Publications section shows them as one list grouped by year (`groupByYear`), newest first, keeping config order within a year, so recent work leads; the pill (`pubCategory`) tells the kinds apart: Journal (accent color), Conference (which includes `Abstract`), or Preprint. Only link a `pdf` when it is a legal free copy (open-access publisher, PubMed Central, arXiv, or an organizer-hosted abstract).
   - `social` keys are `linkedin`, `researchgate`, `scholar`, `github`; `Sidebar.astro` hardcodes one icon block per key, so a new key needs a matching block there. Every value also flows into JSON-LD `sameAs` via `Object.values(siteConfig.social)`. Email is intentionally not exposed anywhere (an `email` key would land in `sameAs`).
2. **`src/components/Talks.astro`**: the `talks` array, rendered as the scrollable box in the sidebar.
3. **Archived blog**: posts, blog pages, and the home page's Writing section are in `_archive/blog/` (same folder layout as before) and are not built. `_archive/blog/README.md` lists the restore steps.

## Architecture

- **Home page** (`src/pages/index.astro`): `Header` (with `home` prop), then one `.home-card` containing `Sidebar` (portrait, CV, socials, affiliations, `Talks`) and a main column of `Bio`, `Research`, `Publications`, `Experience`, `Education`, `Skills`; then `Footer`. Single page, no section nav.
- **404 page** (`src/pages/404.astro`): same header, card, and footer with links home; `<Seo noindex />` emits `robots: noindex` instead of a canonical link. GitHub Pages serves it for any unknown path, including old `/blog/…` links.
- **Conditional rendering**: Research, Publications, Experience, Education, and Skills each render nothing when their data is empty.
- **Pure logic lives in `src/lib/`** (`inline.ts`, `research.ts`, `publications.ts`) and is unit-tested with `npm test` (`node --test`). Components render its output with `set:html` only for strings those helpers escaped.
- **Video**: `VideoDialog.astro` is a shared native `<dialog>`; any `a[data-video]` opens it, and its `href` is the no-JS fallback.
- **CSS layers**: the base `a` rule is in `@layer base` and component classes are in `@layer components`, so component link colors win without overrides.
- **Responsive breakpoints** (in `global.css`): 960px (the card becomes one column; the sidebar sits above the content), 640px (featured cards, date-column rows, and the (archived) featured blog post stack), and 480px (tighter gutters).

### SEO / metadata

- **`src/components/Seo.astro`** is the single source of truth for `<head>` metadata: `<title>`, description, canonical link, Open Graph, Twitter cards, and any JSON-LD. Every page passes it props rather than hand-writing meta tags — add new pages this way too.
- **`src/lib/seo.ts`** builds schema.org JSON-LD. The home page emits one `@graph` from `homeGraph()`: `WebSite`, `ProfilePage`, the `Person` (stable `@id` `https://shidhartho.com/#person`, with the lab affiliations from `siteConfig.affiliations`), and one `ScholarlyArticle` per publication whose author list references that `@id` and whose identifier is the DOI. The publication builders are pure and tested in `src/lib/schema.ts`. `blogPostingSchema`/`breadcrumbSchema` are `blogPostingSchema`/`breadcrumbSchema` (used only by the archived blog pages). `sameAs` comes from `siteConfig.social`, which deliberately has no email.
- `site` is set in `astro.config.mjs` (`https://shidhartho.com`, lowercase) — required for canonical URLs and the sitemap. `@astrojs/sitemap` auto-generates `sitemap-index.xml` at build.
- `public/robots.txt` (explicitly AI-crawler-friendly), `public/llms.txt` (curated AI index), and `public/og-image.png` (1200×630 social card) round out discoverability.

### Blog (archived)

- The blog is off the live site. Its pages (`src/pages/blog/`), `BlogCard`, `FeaturedPost`, `Writing`, and the posts (`src/posts/*.md`) live under `_archive/blog/` with their original relative paths; `_archive/blog/README.md` has the restore commands and the Header/index/`global.css`/`llms.txt` edits to undo.
- While archived: `_archive` is excluded from TypeScript (`tsconfig.json`) and from Tailwind's source scan (`@source not "../../_archive";`). The blog CSS (`.blog-*`, `.post-*`, `.article*`, `.prose`) and the blog JSON-LD builders stay in place, unused.
- When restored: the listing's featured post is hardcoded by slug (`featuredSlug = "cca-consensus-maps"`), post pages use `getStaticPaths()` over `../../posts/*.md`, and post bodies use the custom `.prose` styles (no typography plugin).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `master`. Live URL: `https://shidhartho.com`. There is no staging environment — pushing to `master` publishes.

The custom domain is set in the repo's **Settings → Pages → Custom domain** (not a `CNAME` file, which GitHub ignores for Actions deployments). DNS lives at Cloudflare: four `A` and four `AAAA` records for the apex pointing at GitHub Pages, a `www` CNAME to `royshidhartho.github.io`, and the `_github-pages-challenge-royshidhartho` TXT record that verifies the domain. All are **DNS only** (not proxied) so GitHub can issue the HTTPS certificate. `royshidhartho.github.io` 301-redirects to the custom domain.

## Conventions when editing

- Style with the component classes defined in `src/styles/global.css` (`@layer components`); the markup uses no Tailwind utility classes. Keep the formal academic aesthetic with no animation, the Hanken Grotesk / Fraunces type pairing, and existing spacing/responsive patterns. Use the CSS color variables so both light and dark themes work.
- Add new icons as inline SVG consistent with existing components rather than pulling in a library.
- Keep components presentational, reading from `siteConfig` (or, for Talks, its in-component array).
- New pages should include the no-flash theme `<script>` and use `<Seo />` for head metadata.
