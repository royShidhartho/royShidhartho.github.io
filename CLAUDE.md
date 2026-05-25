# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal research portfolio for Shidhartho Roy (PhD student, Biomedical Engineering, CMU), forked from the Astro/Tailwind "DevPortfolio" template and substantially redesigned into a modern, light/dark, editorial layout with academic sections (Publications, Talks) and a markdown blog. The repo also doubles as a reusable template — see `README.md`. Note that `.cursor/rules` and `package.json` (`name: devportfolio`) still carry original-template text; treat this file and `README.md` as authoritative where they conflict.

## Tech Stack

- **Astro 5** static site generator; all components in `.astro`.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, **not** a `tailwind.config.js`). The single global stylesheet `src/styles/global.css` is imported per-page and defines design tokens plus component classes in an `@layer components` block.
- **TypeScript** for the config, frontmatter types, and `src/lib/seo.ts`.
- **Fonts** (Google Fonts, loaded in each page `<head>`): **Hanken Grotesk** for body/UI (`--font-sans`) and **Fraunces** italic as a sparing editorial accent (`--font-serif`). (The pre-redesign IBM Plex Mono is gone.)
- Icons are **inline SVG** written directly in components — there is no icon library installed.
- **`@astrojs/sitemap`** integration generates the sitemap.

## Development Commands

```bash
npm run dev       # Dev server (port 4321)
npm run build     # Production build to ./dist (also catches TS errors the dev server tolerates)
npm run preview   # Preview the production build
```

No linting or testing framework is configured.

## Theming (light/dark)

- `data-theme="light|dark"` on `<html>`, persisted to `localStorage.theme`, system-aware. A no-flash inline `<script is:inline>` in the `<head>` of all three page entry points sets the theme before paint and adds a `.js` class to `<html>`.
- All colors are **CSS variables** (`--bg`, `--text`, `--text-muted`, `--border`, `--accent`, …) defined in `global.css` and flipped under `[data-theme="dark"]`. Components must use these variables, not hard-coded colors.
- **`siteConfig.accentColor` is currently vestigial** — the accent is driven by the `--accent` CSS variable, not that config value. Change the accent in `global.css`.
- The theme toggle, scroll-reveal, and scrollspy logic all live in `Header.astro`'s `<script>`. `.reveal` elements start hidden and are shown by an IntersectionObserver (with a no-JS / no-IntersectionObserver fallback that reveals everything, so content is never lost). Motion respects `prefers-reduced-motion`.

## Content lives in three different places

The template's original "everything in `src/config.ts`" model no longer holds. Content lives in three distinct places:

1. **`src/config.ts`** (`siteConfig`) — home-page content: `name`, `title`, `description`, `social`, `aboutMe`, `skills`, `projects`, `experience`, `education`.
   - `social` keys are `linkedin`, `researchgate`, `scholar`, `github`. The template's `twitter` and the `email` were both removed — email is intentionally not exposed; contact happens via the form.
   - ⚠️ `config.ts` also still contains `publications` and `accentColor`, but **neither is currently used** — publications are hardcoded in the component (see below) and the accent comes from CSS variables. Editing them has no effect.
2. **Hardcoded arrays inside components:**
   - `src/components/Talks.astro` — the `talks` array (with a `COLLAPSE_AFTER = 5` "show all" collapse behavior).
   - `src/components/Publications.astro` — the `publications` array plus the `domains` filter config. **This, not `config.ts`, is the source of truth for publications.**
3. **`src/posts/*.md`** — blog posts. They live in `src/posts/`, **not** `src/pages/blog/`, so Astro doesn't auto-route them as bare unstyled pages. Frontmatter: `title`, `pubDate` (ISO date; sorts the list), and optional `description`, `author`, `image`, `tags`.

## Architecture

- **Home page** (`src/pages/index.astro`) composes section components in a fixed order: Header, Hero, Talks, About, Projects, Publications, Experience, Education, Contact, Footer.
- **Conditional rendering**: **Projects, Experience, and Education** self-hide (both the nav link in `Header.astro` and the section itself, e.g. `Projects.astro` wraps its `<section>` in `hasProjects && (...)`) when their `siteConfig` array is empty. Talks, About, Publications, and Contact are always shown. Preserve this pattern when adding config-driven sections.
- **Component CSS in `@layer components`** (in `global.css`) is deliberate: it lets Tailwind utilities (e.g. responsive `hidden`/`flex`) override component classes like `.btn`/`.icon-btn`. Put any component class that sets `display` in that layer, or utilities won't win.
- **Accent**: see Theming above — driven by the `--accent` CSS variable, not `siteConfig.accentColor`.

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

- Style with Tailwind utility classes; keep the minimalist editorial aesthetic, the Hanken Grotesk / Fraunces type pairing, and existing spacing/responsive patterns. Use the CSS color variables so both light and dark themes work.
- Add new icons as inline SVG consistent with existing components rather than pulling in a library.
- Keep components presentational, reading from `siteConfig` (or, for Talks/Publications, their in-component arrays).
- New pages should include the no-flash theme `<script>` and use `<Seo />` for head metadata.
