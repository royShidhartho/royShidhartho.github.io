# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal research portfolio for Shidhartho Roy (PhD student, Biomedical Engineering, CMU), forked from the Astro/Tailwind "DevPortfolio" template and redesigned into a single-page, no-animation academic layout (two-column card with an identity sidebar) plus a markdown blog. The repo also doubles as a reusable template — see `README.md`. Note that `.cursor/rules` and `package.json` (`name: devportfolio`) still carry original-template text; treat this file and `README.md` as authoritative where they conflict.

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

- `data-theme="light|dark"` on `<html>`, persisted to `localStorage.theme`, system-aware. A no-flash inline `<script is:inline>` in the `<head>` of all three page entry points sets the theme before paint and adds a `.js` class to `<html>`.
- All colors are **CSS variables** (`--bg`, `--text`, `--text-muted`, `--border`, `--accent`, …) defined in `global.css` and flipped under `[data-theme="dark"]`. Components must use these variables, not hard-coded colors.
- The accent is CMU red, set by `--accent` in `global.css` (light `#a6192e`, dark `#ef7d8c`).
- The theme toggle is the only script in `Header.astro`. There is no reveal-on-scroll, active-section tracking, or animation anywhere; keep `global.css` free of `transition`, `animation`, and hover `transform`.

## Content lives in three different places

Content lives in three distinct places:

1. **`src/config.ts`** (`siteConfig`): `name`, `title`, `subtitle`, `description`, `authorName`, `portrait`, `cv`, `social`, `bio` (paragraphs; inline `[label](url)`, `==highlight==`, `**bold**`), `affiliations`, `skills` (labeled groups), `research`, `experience`, `education` (`note` + `awards` badges).
   - `research` items follow `ResearchItem` in `src/lib/research.ts`: `featured: true` puts an item in the one-row Featured strip (max 3); `materials` keys are `pdf`, `doi`, `poster`, `slides`, `code`, `data`; `video` is `{ youtube: "<id>" }` or `{ src, poster? }`; `bibtex` adds a copy button. Self-hosted files go in `public/files/research/<slug>/`.
   - `social` keys are `linkedin`, `researchgate`, `scholar`, `github`. Email is intentionally not exposed anywhere.
2. **`src/components/Talks.astro`**: the `talks` array, rendered as the scrollable box in the sidebar.
3. **`src/posts/*.md`**: blog posts (frontmatter `title`, `pubDate`, optional `description`, `author`, `image`, `tags`). They live outside `src/pages/` so Astro doesn't auto-route them as unstyled pages.

## Architecture

- **Home page** (`src/pages/index.astro`): `Header` (with `home` prop), then one `.home-card` containing `Sidebar` (portrait, CV, socials, affiliations, `Talks`) and a main column of `Bio`, `Research`, `Experience`, `Education`, `Skills`, `Writing`; then `Footer`. Single page, no section nav.
- **Conditional rendering**: Research, Experience, Education, Skills, and Writing each render nothing when their data is empty.
- **Pure logic lives in `src/lib/`** (`inline.ts`, `research.ts`) and is unit-tested with `npm test` (`node --test`). Components render its output with `set:html` only for strings those helpers escaped.
- **Video**: `VideoDialog.astro` is a shared native `<dialog>`; any `a[data-video]` opens it, and its `href` is the no-JS fallback.
- **CSS layers**: the base `a` rule is in `@layer base` and component classes are in `@layer components`, so component link colors win without overrides.
- **Responsive breakpoints** (in `global.css`): 960px (the card becomes one column; the sidebar sits above the content), 640px (featured cards, date-column rows, and the featured blog post stack), and 480px (tighter gutters).

### SEO / metadata

- **`src/components/Seo.astro`** is the single source of truth for `<head>` metadata: `<title>`, description, canonical link, Open Graph, Twitter cards, and any JSON-LD. Every page passes it props rather than hand-writing meta tags — add new pages this way too.
- **`src/lib/seo.ts`** builds schema.org JSON-LD: `personSchema`/`websiteSchema` (home) and `blogPostingSchema`/`breadcrumbSchema` (blog). It never includes the email.
- `site` is set in `astro.config.mjs` (`https://royshidhartho.github.io`, lowercase) — required for canonical URLs and the sitemap. `@astrojs/sitemap` auto-generates `sitemap-index.xml` at build.
- `public/robots.txt` (explicitly AI-crawler-friendly), `public/llms.txt` (curated AI index), and `public/og-image.png` (1200×630 social card) round out discoverability.

### Blog system

- `src/pages/blog/index.astro` globs `../../posts/*.md` (`eager: true`), sorts by `pubDate` descending, and renders one `FeaturedPost` plus a grid of `BlogCard`s.
- **The featured post is hardcoded by slug**: `const featuredSlug = "cca-consensus-maps"` in `index.astro`. Removing that post falls back to the newest.
- `src/pages/blog/[slug].astro` is the post page — a non-eager `import.meta.glob` inside `getStaticPaths()` (slug derived from filename), rendered via `<Content />`.
- Post body styling uses a **custom `.prose`** block in `global.css`; there is **no** `@tailwindcss/typography` plugin.
- Blog pages render their own `Header`/`Footer`, import `global.css`, and carry the same no-flash theme `<script>` (they are not wrapped by `index.astro`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `master`. Live URL: `https://royshidhartho.github.io`. There is no staging environment — pushing to `master` publishes.

## Conventions when editing

- Style with Tailwind utility classes; keep the formal academic aesthetic with no animation, the Hanken Grotesk / Fraunces type pairing, and existing spacing/responsive patterns. Use the CSS color variables so both light and dark themes work.
- Add new icons as inline SVG consistent with existing components rather than pulling in a library.
- Keep components presentational, reading from `siteConfig` (or, for Talks, its in-component array).
- New pages should include the no-flash theme `<script>` and use `<Seo />` for head metadata.
