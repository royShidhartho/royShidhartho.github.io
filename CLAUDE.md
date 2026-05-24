# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> ⚠️ **A full visual redesign is in progress (uncommitted).** Read **`HANDOFF.md`** first — it reflects the current state and supersedes details below that predate the redesign (e.g. blog posts now live in `src/posts/`, not `src/pages/blog/`).

## Project Overview

Personal research portfolio for Shidhartho Roy (PhD student, Biomedical Engineering, CMU), forked from the Astro/Tailwind "DevPortfolio" template and extended with academic sections (Publications, Talks) and a markdown blog. Note that `README.md`, `.cursor/rules`, and `package.json` (`name: devportfolio`) still carry the original template's text — treat this CLAUDE.md as the authoritative description where they conflict.

## Tech Stack

- **Astro 5** static site generator, all components in `.astro`
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, not a `tailwind.config.js`). The single global stylesheet is `src/styles/global.css`, imported per-page.
- **TypeScript** for the config and frontmatter types
- **IBM Plex Mono** loaded from Google Fonts; set as the body font in `global.css`
- Icons are **inline SVG** written directly in components — there is no icon library installed (despite what README/.cursor/rules claim about Tabler Icons)

## Development Commands

```bash
npm run dev       # Dev server
npm run build     # Production build to ./dist
npm run preview   # Preview the production build
```

No linting or testing framework is configured.

## Content lives in three different places

This is the most important thing to know. The template's original "everything in `src/config.ts`" model is no longer accurate — content now lives in three distinct places depending on the section:

1. **`src/config.ts`** (`siteConfig`) — the home page sections: `name`, `title`, `description`, `accentColor`, `social`, `aboutMe`, `skills`, `projects`, `publications`, `experience`, `education`. Edit content here, not in components.
   - `social` keys are `email`, `linkedin`, `researchgate`, `scholar`, `github` (the template's `twitter` was replaced).
2. **Hardcoded inside `src/components/Talks.astro`** — the Talks & Presentations list is a `talks` array literal at the top of that component, *not* in config. To add/edit a talk, edit the component.
3. **Markdown files in `src/pages/blog/*.md`** — blog posts. Each needs frontmatter: `title`, `pubDate` (used for sorting; ISO date string), and optionally `description`, `author`, `image`, `tags`.

## Architecture

- **Home page** (`src/pages/index.astro`) is a single page composing section components in a fixed order: Header, Hero, Talks, About, Projects, Publications, Experience, Education, Contact, Footer. It also holds all `<head>` SEO/OpenGraph meta.
- **Conditional rendering**: home sections (and their nav links in `Header.astro`) hide automatically when their config array is empty/absent — e.g. `Header.astro` gates Projects/Publications/Experience/Education on `siteConfig.<section>.length > 0`. Preserve this pattern when adding sections.
- **Accent color**: `siteConfig.accentColor` is applied via inline `style={...}` on themed elements (e.g. section underlines), not via CSS variables. Search for `accentColor` to find usages.

### Blog system

- `src/pages/blog/index.astro` uses `import.meta.glob("./*.md", { eager: true })` to list posts, sorts by `pubDate` descending, and renders one `FeaturedPost` plus a grid of `BlogCard`s.
- **The featured post is hardcoded by slug**: `const featuredSlug = "cca-consensus-maps"` in `index.astro`. Changing/removing that file means updating this constant, or it falls back to the newest post.
- `src/pages/blog/[slug].astro` is the post page. It uses a non-eager `import.meta.glob` inside `getStaticPaths()` (slug derived from filename) and renders the post via `<Content />`. Post body styling relies on Tailwind `prose` utility classes.
- Blog pages render their own `Header`/`Footer` and import `global.css` themselves (they are not wrapped by `index.astro`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `master`. Site URL is `https://royShidhartho.github.io`. There is no staging environment — pushing to `master` publishes.

## Conventions when editing

- Style with Tailwind utility classes; keep the minimalist, monospace (IBM Plex Mono) aesthetic and existing spacing/responsive patterns.
- For new icons, add inline SVG consistent with existing components rather than pulling in a library.
- Components should stay presentational, reading from `siteConfig` (or, for Talks, the in-component array).
