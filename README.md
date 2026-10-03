![Portfolio preview](public/og-image.png)

# Academic Portfolio — Astro + Tailwind

A clean, formal, light/dark portfolio template for **researchers and academics**, built with Astro 5 and Tailwind CSS v4. It extends the developer-focused [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) template with a single-page academic layout (identity sidebar, research projects with materials, publications, Talks), an optional markdown blog (archived in this copy), and a robust, **SEO + LLM-friendly** metadata layer out of the box.

**Live example:** [shidhartho.com](https://shidhartho.com)

> This repository doubles as one person's live site **and** a reusable template — the content you see is a working example. To make it yours, replace the content described in [Make it yours](#make-it-yours).

## Features

- 🎓 **Academic-first layout** — a single page with a two-column card: a sidebar (portrait, CV, socials, affiliations, Talks) beside Bio, Research (a Featured strip plus the full list), Publications (grouped by year), Experience, Education, and Skills.
- 🌗 **Light/dark theme** — system-aware, persisted to `localStorage`, no flash of the wrong theme.
- 🔎 **SEO + LLM ready** — a reusable `<Seo />` component, JSON-LD structured data (`ProfilePage`, `Person`, `WebSite`, `ScholarlyArticle` per publication; `BlogPosting` and `BreadcrumbList` for the archived blog), canonical URLs, Open Graph + Twitter cards, auto-generated sitemap, an AI-crawler-friendly `robots.txt`, and an `llms.txt` index. See [SEO](#seo--llm-discoverability).
- ✍️ **Markdown blog (archived)** — a blog with a featured post and card grid is kept in `_archive/blog/`; follow its README to restore it.
- 🔬 **Research with materials** — each project and publication can link a paper, PDF or preprint, poster, slides, code, and data, and can carry a teaser image, a video (YouTube or self-hosted, opened in a shared dialog), and a BibTeX copy button.
- 📭 **Privacy-conscious** — no contact form and no email address anywhere; visitors reach you through the profiles linked in the sidebar.
- ♿ **No-JS friendly & accessible** — content renders without JavaScript, and there is no animation.
- 🧩 **Conditional sections** — empty config arrays hide their section automatically.

## Tech stack

- **[Astro 5](https://astro.build/)** — static site generator; every component is `.astro`.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — via the `@tailwindcss/vite` plugin (configured in `astro.config.mjs`; there is **no** `tailwind.config.js`). All tokens/classes live in `src/styles/global.css`.
- **TypeScript** — for config and frontmatter types.
- **Fonts** — [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) for everything, [Fraunces](https://fonts.google.com/specimen/Fraunces) italic as a sparing accent (loaded from Google Fonts).
- **Icons** — inline SVG written directly in components (no icon library).

## Quick start

Use the green **“Use this template”** button on GitHub (recommended), or clone directly:

```bash
git clone https://github.com/royShidhartho/royShidhartho.github.io.git
cd royShidhartho.github.io
npm install
npm run dev        # dev server at http://localhost:4321
```

Other commands:

```bash
npm run build      # production build to ./dist
npm run preview    # preview the production build
npm test           # unit tests for the src/lib helpers (node --test)
```

There is no linter configured.

## Make it yours

This template is built to be personalized **with an AI coding assistant** (Claude Code, Cursor, Copilot, etc.). The fastest path:

1. Open the project in your assistant.
2. Paste this kickoff prompt:

   > Read `SETUP.md` and `CLAUDE.md`, then help me make this portfolio my own. Ask me for my details, generate a personalized to-do checklist, and make the edits for me as we go.

3. Answer its questions — it fills in your content, replaces the example assets, and ticks off the list as it goes.

The full assistant protocol lives in **[`SETUP.md`](SETUP.md)** (interview → checklist → edits → verify). Claude Code also loads `CLAUDE.md` automatically for architecture context.

### Prefer to do it by hand?

Content lives in **two** places (plus the archived blog) — this is the most important thing to know:

1. **`src/config.ts`** (`siteConfig`) — the home-page content: `name`, `title`, `subtitle`, `description`, `authorName`, `portrait`, `cv`, `social` links, `bio` (paragraphs; inline `[label](url)`, `==highlight==`, `**bold**`), `affiliations`, `skills` (labeled groups), `research`, `publications`, `experience`, `education`. The sidebar shows icons for four `social` keys (`linkedin`, `researchgate`, `scholar`, `github`); another platform needs an icon block added in `src/components/Sidebar.astro`, and every `social` value is also listed in the JSON-LD `sameAs`. Emptying a section's array hides that section automatically (there is no nav).
   - **`research`** holds your projects, typed by `ResearchItem` in `src/lib/research.ts`. Set `featured: true` on up to three to show them in the Featured strip. `materials` keys are `pdf`, `preprint` (labeled Preprint: a free arXiv copy of a paywalled paper), `doi` (labeled Paper), `poster`, `slides`, `code`, `data`; `video` is `{ youtube: "<id>" }` or `{ src, poster? }`; `bibtex` adds a copy button. Put self-hosted files in `public/files/research/<slug>/`.
   - **`publications`** holds your full paper list, typed by `Publication` in `src/lib/publications.ts`; the section groups it by year and links Google Scholar at the end. Only add a `pdf` link for a legal free copy.
2. **A hard-coded array inside a component** — the **Talks** list lives in a `talks` array at the top of `src/components/Talks.astro` and renders as a scrollable box in the sidebar. Edit that file directly.
3. **The blog is archived** — posts, blog pages, and the home page's Writing section are in `_archive/blog/` and are not built. To bring the blog back, follow `_archive/blog/README.md`.

Also replace these example assets / settings:

| What | Where |
|------|-------|
| Site origin (for canonical URLs + sitemap) | `site:` in `astro.config.mjs` |
| CV PDF | `public/files/`, then set `siteConfig.cv` |
| Portrait image | `public/images/blog/`, then set `siteConfig.portrait` (also used by the JSON-LD in `src/lib/seo.ts`) |
| Favicon | `public/favicon.ico`, `favicon-48.png`, `favicon-192.png`, `apple-touch-icon.png` |
| Social share image | `public/og-image.png` — a 1200×630 PNG (see [SEO](#seo--llm-discoverability)) |
| Accent color | `--accent`, `--accent-soft`, and `--mark` in `src/styles/global.css`, in both the `:root` (light) and `[data-theme="dark"]` blocks |
| Research projects | `siteConfig.research` in `src/config.ts` |
| Publications | `siteConfig.publications` in `src/config.ts` |

## SEO & LLM discoverability

This template ships with a metadata layer designed for both search engines and AI answer engines:

- **`src/components/Seo.astro`** — a single component that emits `<title>`, description, canonical link, full Open Graph + Twitter Card tags, and any JSON-LD passed to it. Every page feeds it props, so there's one source of truth.
- **`src/lib/seo.ts`** — builders for [schema.org](https://schema.org) JSON-LD: one linked graph on the home page (`WebSite`, `ProfilePage`, `Person`, and a `ScholarlyArticle` per publication, tied to the person by `@id` and to each paper by DOI), `BlogPosting` + `BreadcrumbList` (used by the archived blog pages).
- **`@astrojs/sitemap`** — generates `sitemap-index.xml` automatically from your routes (requires `site` to be set in `astro.config.mjs`).
- **`public/robots.txt`** — open to all crawlers, and explicitly welcomes AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …). Remove those lines if you'd rather *block* AI crawlers.
- **`public/llms.txt`** — a curated markdown summary of who you are and your key links, an emerging convention for AI tools. Edit it to match your content.

**Updating the social card:** `public/og-image.png` must be a static 1200×630 raster image (PNG/JPG — SVG isn't supported by most platforms). Replace it with your own; the included one was produced by rendering an HTML card to PNG.

## Project structure

```
├── _archive/blog/              # archived blog (pages, posts, Writing); README explains restore
├── public/
│   ├── files/                  # CV PDF; research/<slug>/ for self-hosted materials
│   ├── images/blog/            # portrait, research teasers, post images
│   ├── favicon.ico, favicon-*.png, apple-touch-icon.png   # site icons
│   ├── og-image.png            # social share card (1200×630)
│   ├── robots.txt              # AI-crawler-friendly
│   └── llms.txt                # AI index
├── src/
│   ├── components/             # Astro components (Sidebar, Bio, Research, Publications, Seo, …)
│   ├── lib/
│   │   ├── seo.ts              # JSON-LD structured-data builders
│   │   ├── schema.ts           # pure publication → ScholarlyArticle builders
│   │   ├── inline.ts           # inline-markup helper for bio text
│   │   ├── research.ts         # research types, sorting, and material links
│   │   ├── publications.ts     # publication type and year grouping
│   │   └── *.test.ts           # unit tests (npm test)
│   ├── pages/
│   │   └── index.astro         # home page (sidebar + main column)
│   ├── styles/
│   │   └── global.css          # design tokens + component classes
│   └── config.ts               # site content
├── astro.config.mjs            # Astro config (site URL, Tailwind, sitemap)
└── CLAUDE.md                   # guidance for AI coding tools
```

## Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to **GitHub Pages** on every push to `master`.

To deploy your own copy to GitHub Pages:

1. Name your repo `<your-username>.github.io` (for a root user site) and push.
2. Set `site:` in `astro.config.mjs` to your Pages URL (e.g. `https://<your-username>.github.io`). For a *project* site served from a sub-path, also set `base:`.
3. In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
4. *(Optional)* For a custom domain, point its DNS at GitHub Pages (four `A`/`AAAA` records on the apex and a `www` CNAME to `<your-username>.github.io`), enter it under **Settings → Pages → Custom domain**, enable **Enforce HTTPS**, and set `site:` to the custom domain. See [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

It's a static Astro build, so it also deploys cleanly to Netlify, Vercel, Cloudflare Pages, etc. — see the [Astro deployment guides](https://docs.astro.build/en/guides/deploy/).

## Credits

Forked from and built on top of **[DevPortfolio](https://github.com/RyanFitzgerald/devportfolio)** by [Ryan Fitzgerald](https://github.com/RyanFitzgerald), with an academic single-page layout, a light/dark redesign, and the SEO/LLM layer added.

## License

[MIT](LICENSE.md). The original template's MIT copyright (Ryan Fitzgerald) is preserved per the license terms.
