# Academic Single-Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio-style home page with a single-page, no-animation academic page (two-column card, three featured research cards in one row, materials per project, click-to-load video), and restyle the blog to match.

**Architecture:** Content stays in `src/config.ts` (now typed for research, education, skills, bio) and the Talks array in `Talks.astro`. Pure formatting logic (inline markup, material ordering, sorting, author bolding, video URLs) moves into two small TypeScript modules in `src/lib/` that are unit-tested with Node's built-in test runner. Astro components are presentational and render from those helpers; one rewritten `global.css` holds every token and component class.

**Tech Stack:** Astro 5, Tailwind CSS v4 (via `@tailwindcss/vite`, used here only for its preflight reset), TypeScript, Node 24 (`node --test` with native type stripping), Google Fonts (Hanken Grotesk + Fraunces).

**Spec:** `docs/superpowers/specs/2026-10-03-academic-redesign-design.md`

## Global Constraints

- Single page, no section nav, no tabs. Publications and Contact sections are removed.
- No motion: `global.css` must contain no `transition`, `animation`, `@keyframes`, or hover `transform`; no `.reveal`, `.rise`, scrollspy, glass, or gradient-wash styles. (The striped placeholder for a missing teaser figure is the one allowed `repeating-linear-gradient`.)
- Theme: `data-theme="light|dark"` on `<html>`, persisted to `localStorage.theme`, system-aware no-flash inline script on all three page entry points (`src/pages/index.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`).
- Accent: CMU red, `#a6192e` light / `#ef7d8c` dark. All colors come from CSS variables in `global.css`.
- Fonts: Hanken Grotesk (400/500/600/700) for body/UI; Fraunces italic (400/500) for accents.
- Featured research: exactly the items with `featured: true` (max 3), rendered in **one row** on desktop; stacked below 820px.
- Video: never autoplays on page load; loads only on click, in a native `<dialog>`; works as a plain link without JS.
- Copy and code comments in American English. Never assume pronouns; the bio is first person.
- Email is never exposed (no `mailto:`, not in JSON-LD).
- Git: work on `redesign/academic` (created from `master`). Stage explicit paths only — never `git add -A` / `git add .`. Never commit to or push `master`. No amend/rebase/reset/force-push. Per project memory, commits and pushes need Sid's explicit OK; each task's commit step runs only once Sid has approved committing for this plan.
- `npm run build` must pass at the end of every task.

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `src/lib/inline.ts` | create | `escapeHtml`, `renderInline` (`==mark==`, `**strong**`, `[label](url)`) |
| `src/lib/inline.test.ts` | create | Unit tests for `inline.ts` |
| `src/lib/research.ts` | create | `ResearchItem` types, `materialLinks`, `sortResearch`, `featuredResearch`, `boldAuthor`, `videoHref`, `videoEmbed` |
| `src/lib/research.test.ts` | create | Unit tests for `research.ts` |
| `package.json` | modify | add `"test"` script |
| `src/styles/global.css` | rewrite | Tokens, base, every component class, `.prose`, responsive rules |
| `src/config.ts` | rewrite | New content model and data |
| `src/lib/seo.ts` | modify | `personSchema.description` → `siteConfig.description`; portrait path from config |
| `src/components/Header.astro` | rewrite | Name, subtitle, Blog link, theme toggle |
| `src/components/Footer.astro` | rewrite | One-line footer |
| `src/components/Sidebar.astro` | create | Portrait, CV, socials, affiliations, `<Talks />` |
| `src/components/Talks.astro` | rewrite markup | Same data; scrollable sidebar box |
| `src/components/Bio.astro` | create | Bio paragraphs |
| `src/components/Materials.astro` | create | Material buttons, Video link, BibTeX copy |
| `src/components/FeaturedCard.astro` | create | One featured card |
| `src/components/VideoDialog.astro` | create | Shared `<dialog>` player |
| `src/components/Research.astro` | create | Featured row + full list |
| `src/components/Experience.astro` | rewrite | Row layout |
| `src/components/Education.astro` | rewrite | Row layout with award badges |
| `src/components/Skills.astro` | create | Grouped `<dl>` |
| `src/components/Writing.astro` | create | Latest blog posts |
| `src/pages/index.astro` | rewrite | Page composition |
| `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro` | modify | New header usage, fonts, classes |
| `src/components/BlogCard.astro`, `src/components/FeaturedPost.astro` | rewrite | New classes, no hover motion |
| `src/components/Hero.astro`, `About.astro`, `Projects.astro`, `Publications.astro`, `Contact.astro` | delete | Superseded |
| `CLAUDE.md`, `README.md`, `SETUP.md`, `public/llms.txt` | modify | Match the new site |

---

### Task 0: Branch setup

**Files:**
- Modify: `.gitignore`
- Delete (untracked, throwaway): `public/_mockup.html`, `public/_featured.html`

**Interfaces:**
- Consumes: nothing
- Produces: branch `redesign/academic` based on `master`, containing the spec and this plan

- [ ] **Step 1: Park the aurora-glass work on its own branch**

```bash
git switch redesign/aurora-glass
git add .gitignore src/components/Header.astro src/components/Hero.astro src/components/Projects.astro "src/pages/blog/[slug].astro" src/pages/blog/index.astro src/pages/index.astro src/styles/global.css
git commit -m "Park aurora-glass restyle work in progress

Glass nav, gradient name, and dark-first styling explored before the
academic redesign. Kept on this branch for reference; not merged.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git status --short
```

Expected: status lists only untracked `.claude/`, `_screens/`, `docs/`, `public/_featured.html`, `public/_mockup.html`.

- [ ] **Step 2: Create the build branch from master and remove mockups**

```bash
git switch -c redesign/academic master
rm public/_mockup.html public/_featured.html
git status --short
```

Expected: untracked `.claude/`, `_screens/`, `docs/`; `HANDOFF.md` also appears because `master`'s `.gitignore` lacks it.

- [ ] **Step 3: Ignore HANDOFF.md on this branch**

Append to `.gitignore`:

```gitignore

# session handoff scaffolding — never ship in the public template
HANDOFF.md
```

- [ ] **Step 4: Commit spec and plan, then the ignore rule (two commits)**

```bash
git add docs/superpowers/specs/2026-10-03-academic-redesign-design.md docs/superpowers/plans/2026-10-03-academic-redesign.md
git commit -m "Add academic redesign spec and implementation plan

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git add .gitignore
git commit -m "Ignore HANDOFF.md session scaffolding

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 1: Pure helpers with unit tests

**Files:**
- Create: `src/lib/inline.ts`, `src/lib/inline.test.ts`, `src/lib/research.ts`, `src/lib/research.test.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: nothing
- Produces:
  - `escapeHtml(text: string): string`
  - `renderInline(text: string): string` — escapes, then `[label](url)` → `<a>` (http(s) links get `target="_blank" rel="noopener noreferrer"`), `==x==` → `<mark>x</mark>`, `**x**` → `<strong>x</strong>`
  - `type MaterialKey = "pdf" | "doi" | "poster" | "slides" | "code" | "data"`
  - `type ResearchVideo = { youtube: string } | { src: string; poster?: string }`
  - `type ResearchItem` (fields below)
  - `type MaterialLink = { key: MaterialKey; label: string; href: string }`
  - `type VideoEmbed = { kind: "youtube" | "file"; src: string; poster?: string }`
  - `materialLinks(materials?: Partial<Record<MaterialKey, string>>): MaterialLink[]`
  - `sortResearch(items: readonly ResearchItem[]): ResearchItem[]`
  - `featuredResearch(items: readonly ResearchItem[], limit?: number): ResearchItem[]`
  - `boldAuthor(authors: string, name: string): string`
  - `videoHref(video: ResearchVideo): string`
  - `videoEmbed(video: ResearchVideo): VideoEmbed`

- [ ] **Step 1: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "node --test \"src/lib/*.test.ts\""
```

- [ ] **Step 2: Write the failing tests for `inline.ts`**

`src/lib/inline.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, renderInline } from "./inline.ts";

test("escapeHtml escapes the five HTML-significant characters", () => {
  assert.equal(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`),
    "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;");
});

test("renderInline turns ==term== into <mark>", () => {
  assert.equal(renderInline("study ==sickle cell disease== now"),
    "study <mark>sickle cell disease</mark> now");
});

test("renderInline turns **term** into <strong>", () => {
  assert.equal(renderInline("**equitable sensing**"), "<strong>equitable sensing</strong>");
});

test("renderInline makes external links open in a new tab", () => {
  assert.equal(renderInline("[CMU](https://www.cmu.edu/)"),
    '<a href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer">CMU</a>');
});

test("renderInline keeps internal links in the same tab", () => {
  assert.equal(renderInline("[CV](/files/cv.pdf)"), '<a href="/files/cv.pdf">CV</a>');
});

test("renderInline escapes raw HTML before applying markup", () => {
  assert.equal(renderInline("<script>x</script> ==a<b=="),
    "&lt;script&gt;x&lt;/script&gt; <mark>a&lt;b</mark>");
});
```

- [ ] **Step 3: Write the failing tests for `research.ts`**

`src/lib/research.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  boldAuthor, featuredResearch, materialLinks, sortResearch, videoEmbed, videoHref,
  type ResearchItem,
} from "./research.ts";

const item = (slug: string, year: ResearchItem["year"], featured = false): ResearchItem =>
  ({ slug, title: slug, summary: "", year, featured });

test("materialLinks returns links in fixed order and skips missing keys", () => {
  const links = materialLinks({ data: "d", pdf: "p", doi: "x" });
  assert.deepEqual(links.map((l) => l.label), ["PDF", "Paper", "Data"]);
  assert.deepEqual(links.map((l) => l.href), ["p", "x", "d"]);
});

test("materialLinks returns [] when materials are absent", () => {
  assert.deepEqual(materialLinks(undefined), []);
});

test("sortResearch puts in-progress first, then newest year, keeping ties in input order", () => {
  const input = [item("a", 2024), item("b", 2026), item("c", "In progress"), item("d", 2026)];
  assert.deepEqual(sortResearch(input).map((i) => i.slug), ["c", "b", "d", "a"]);
  assert.deepEqual(input.map((i) => i.slug), ["a", "b", "c", "d"], "input is not mutated");
});

test("featuredResearch keeps config order and caps at the limit", () => {
  const input = [item("a", 2024, true), item("b", 2026), item("c", 2026, true),
    item("d", 2025, true), item("e", 2025, true)];
  assert.deepEqual(featuredResearch(input).map((i) => i.slug), ["a", "c", "d"]);
  assert.deepEqual(featuredResearch(input, 2).map((i) => i.slug), ["a", "c"]);
});

test("boldAuthor bolds the author's name and escapes the rest", () => {
  assert.equal(boldAuthor("S. Roy, J. Wu & S. Wood", "S. Roy"),
    "<b>S. Roy</b>, J. Wu &amp; S. Wood");
});

test("videoHref and videoEmbed handle YouTube ids", () => {
  const v = { youtube: "abc123" };
  assert.equal(videoHref(v), "https://www.youtube.com/watch?v=abc123");
  assert.deepEqual(videoEmbed(v),
    { kind: "youtube", src: "https://www.youtube-nocookie.com/embed/abc123?autoplay=1&rel=0" });
});

test("videoHref and videoEmbed handle self-hosted files", () => {
  const v = { src: "/files/research/x/video.mp4", poster: "/images/x.jpg" };
  assert.equal(videoHref(v), "/files/research/x/video.mp4");
  assert.deepEqual(videoEmbed(v),
    { kind: "file", src: "/files/research/x/video.mp4", poster: "/images/x.jpg" });
});
```

- [ ] **Step 4: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '.../src/lib/inline.ts'` (and `research.ts`).

- [ ] **Step 5: Implement `inline.ts`**

`src/lib/inline.ts`:

```ts
const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/**
 * Render a config string to safe HTML. Supports three inline marks:
 * [label](url) links, ==highlight==, and **strong**. Everything else is escaped.
 */
export function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, url: string) => {
      const external = /^https?:\/\//.test(url)
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";
      return `<a href="${url}"${external}>${label}</a>`;
    })
    .replace(/==(.+?)==/g, "<mark>$1</mark>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
```

- [ ] **Step 6: Implement `research.ts`**

`src/lib/research.ts`:

```ts
import { escapeHtml } from "./inline.ts";

export type MaterialKey = "pdf" | "doi" | "poster" | "slides" | "code" | "data";

export type ResearchVideo = { youtube: string } | { src: string; poster?: string };

export type ResearchItem = {
  /** Also the folder name under public/files/research/ for self-hosted materials. */
  slug: string;
  title: string;
  /** 1–2 sentences. Shown on featured cards, and in the list when there is no citation. */
  summary: string;
  year: number | "In progress";
  citation?: { authors: string; venue: string; year: number };
  award?: string;
  featured?: boolean;
  /** 16:9 teaser figure. */
  image?: string;
  video?: ResearchVideo;
  materials?: Partial<Record<MaterialKey, string>>;
  bibtex?: string;
};

export type MaterialLink = { key: MaterialKey; label: string; href: string };

export type VideoEmbed = { kind: "youtube" | "file"; src: string; poster?: string };

export const MATERIAL_ORDER: readonly MaterialKey[] = ["pdf", "doi", "poster", "slides", "code", "data"];

export const MATERIAL_LABELS: Record<MaterialKey, string> = {
  pdf: "PDF",
  doi: "Paper",
  poster: "Poster",
  slides: "Slides",
  code: "Code",
  data: "Data",
};

export function materialLinks(materials?: Partial<Record<MaterialKey, string>>): MaterialLink[] {
  if (!materials) return [];
  return MATERIAL_ORDER.flatMap((key) => {
    const href = materials[key];
    return href ? [{ key, label: MATERIAL_LABELS[key], href }] : [];
  });
}

const yearRank = (year: ResearchItem["year"]) => (year === "In progress" ? Infinity : year);

/** In-progress work first, then newest year first; equal years keep config order. */
export function sortResearch(items: readonly ResearchItem[]): ResearchItem[] {
  return [...items].sort((a, b) => {
    const ra = yearRank(a.year);
    const rb = yearRank(b.year);
    return ra === rb ? 0 : rb - ra;
  });
}

export function featuredResearch(items: readonly ResearchItem[], limit = 3): ResearchItem[] {
  return items.filter((i) => i.featured).slice(0, limit);
}

/** Escape an author list and wrap every occurrence of `name` in <b>. */
export function boldAuthor(authors: string, name: string): string {
  const safeName = escapeHtml(name);
  return escapeHtml(authors).split(safeName).join(`<b>${safeName}</b>`);
}

export function videoHref(video: ResearchVideo): string {
  return "youtube" in video
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.youtube)}`
    : video.src;
}

export function videoEmbed(video: ResearchVideo): VideoEmbed {
  if ("youtube" in video) {
    return {
      kind: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtube)}?autoplay=1&rel=0`,
    };
  }
  return video.poster
    ? { kind: "file", src: video.src, poster: video.poster }
    : { kind: "file", src: video.src };
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test`
Expected: `# pass 13`, `# fail 0`.

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: completes with "Complete!" and no errors (helpers are not imported yet; this confirms nothing else broke).

- [ ] **Step 9: Commit**

```bash
git add package.json src/lib/inline.ts src/lib/inline.test.ts src/lib/research.ts src/lib/research.test.ts
git commit -m "Add tested helpers for inline markup and research items

renderInline powers the bio's highlights and links; research.ts orders
materials, sorts and features projects, bolds the author, and builds
video URLs. Tested with node --test.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Rewrite the stylesheet

**Files:**
- Rewrite: `src/styles/global.css`

**Interfaces:**
- Consumes: nothing
- Produces: CSS classes used by Tasks 3–6: `.page`, `.site-header`, `.site-name`, `.site-sub`, `.hdr-actions`, `.pill-link`, `.icon-btn`, `.theme-toggle`, `.home-card`, `.home-main`, `.sidebar`, `.sidebar-id`, `.portrait`, `.cv-link`, `.socials`, `.affil`, `.affil-h`, `.talks-box`, `.talks-h`, `.talks-list`, `.talk-meta`, `.tag`, `.tag-talk`, `.tag-poster`, `.bio`, `.home-section`, `.section-h`, `.section-note`, `.sub-h`, `.feat-row`, `.feat-card`, `.media`, `.media-ph`, `.play`, `.media-badge`, `.is-muted`, `.feat-body`, `.award`, `.feat-title`, `.feat-summary`, `.feat-cite`, `.mats`, `.mat`, `.mat-none`, `.bib-btn`, `.research-list`, `.entry-title`, `.entry-cite`, `.when`, `.rows`, `.row`, `.row-title`, `.row-org`, `.badges`, `.badge`, `.skills`, `.posts`, `.all-posts`, `.site-footer`, `.video-dialog`, `.video-frame`, `.video-close`, `.blog-intro`, `.blog-title`, `.blog-lede`, `.post-grid`, `.post-card`, `.post-card-body`, `.post-desc`, `.post-meta`, `.featured-post`, `.featured-post-body`, `.chips`, `.chip`, `.article`, `.back-link`, `.article-title`, `.article-meta`, `.article-hero`, `.prose`

Note: the base `a` rule lives in `@layer base`, so component link colors in `@layer components` win without the unlayered override hack the old stylesheet needed.

- [ ] **Step 1: Replace `src/styles/global.css` with:**

```css
@import "tailwindcss";

/* ============================================================
   Design tokens
   Layout: warm page ground, one white card with a CMU-red top rule,
   260px identity sidebar + reading column.
   ============================================================ */
:root {
  --font-sans: "Hanken Grotesk", ui-sans-serif, system-ui, -apple-system,
    "Segoe UI", Roboto, sans-serif;
  --font-serif: "Fraunces", ui-serif, Georgia, "Times New Roman", serif;

  --bg: #f6f5f1;
  --card: #ffffff;
  --text: #1b1c1e;
  --text-muted: #5e6166;
  --text-faint: #8a8d92;
  --border: #e4e2dc;
  --soft: #f1f0eb;
  --accent: #a6192e;
  --accent-soft: rgba(166, 25, 46, 0.08);
  --mark: #f6dfe2;
  --poster: #a15c07;
  --poster-soft: rgba(161, 92, 7, 0.1);
  --overlay: rgba(0, 0, 0, 0.72);

  color-scheme: light;
}

[data-theme="dark"] {
  --bg: #111315;
  --card: #181b1e;
  --text: #e7e6e2;
  --text-muted: #a3a6aa;
  --text-faint: #7b7f84;
  --border: #2a2e33;
  --soft: #1f2327;
  --accent: #ef7d8c;
  --accent-soft: rgba(239, 125, 140, 0.12);
  --mark: rgba(239, 125, 140, 0.2);
  --poster: #e2a356;
  --poster-soft: rgba(226, 163, 86, 0.13);
  --overlay: rgba(0, 0, 0, 0.8);

  color-scheme: dark;
}

/* ============================================================
   Base
   ============================================================ */
@layer base {
  * {
    border-color: var(--border);
  }
  html {
    scroll-padding-top: 1rem;
  }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::selection {
    background: var(--mark);
    color: var(--text);
  }
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 3px;
  }
  a {
    color: var(--accent);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  img {
    display: block;
    max-width: 100%;
  }
  mark {
    background: var(--mark);
    color: inherit;
    padding: 1px 3px;
    border-radius: 3px;
    font-weight: 600;
  }
  strong,
  b {
    font-weight: 700;
  }
}

@layer components {
/* ============================================================
   Shell, header, footer
   ============================================================ */
.page {
  max-width: 1080px;
  margin-inline: auto;
  padding-inline: 20px;
}
.site-header {
  padding-block: 34px 22px;
}
.site-header .page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.site-name {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.site-name a {
  color: var(--text);
}
.site-name a:hover {
  text-decoration: none;
}
.site-sub {
  display: block;
  margin-top: 4px;
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0;
  text-transform: none;
  color: var(--text-muted);
}
.hdr-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pill-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--card);
  color: var(--text);
  font-size: 13.5px;
  font-weight: 500;
}
.pill-link:hover {
  text-decoration: none;
  border-color: var(--accent);
  color: var(--accent);
}
.icon-btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--card);
  color: var(--text);
  cursor: pointer;
}
.icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.theme-toggle .moon {
  display: none;
}
[data-theme="dark"] .theme-toggle .sun {
  display: none;
}
[data-theme="dark"] .theme-toggle .moon {
  display: block;
}
.site-footer {
  padding-block: 26px 40px;
  text-align: center;
  font-size: 13px;
  color: var(--text-faint);
}

/* ============================================================
   Home card + sidebar
   ============================================================ */
.home-card {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 36px;
  padding: 30px;
  background: var(--card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 6px;
}
.home-main {
  min-width: 0;
}
.sidebar {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.sidebar-id {
  display: flex;
  flex-direction: column;
}
.portrait {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--border);
}
.cv-link {
  margin-top: 12px;
  text-align: center;
  font-size: 13.5px;
  font-weight: 600;
}
.socials {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 8px;
}
.socials a {
  color: var(--text-muted);
}
.socials a:hover {
  color: var(--accent);
}
.socials svg {
  width: 19px;
  height: 19px;
  display: block;
}
.affil {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-muted);
}
.affil-h {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
.affil ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.talks-box {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--soft);
}
.talks-h {
  margin: 0;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}
.talks-list {
  list-style: none;
  margin: 0;
  padding: 4px 12px 8px;
  max-height: 300px;
  overflow-y: auto;
}
.talks-list li {
  padding-block: 9px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  line-height: 1.45;
}
.talks-list li:last-child {
  border-bottom: 0;
}
.talk-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
.tag {
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.tag-talk {
  color: var(--accent);
  background: var(--accent-soft);
}
.tag-poster {
  color: var(--poster);
  background: var(--poster-soft);
}

/* ============================================================
   Main column sections
   ============================================================ */
.bio p {
  margin: 0 0 14px;
  max-width: 70ch;
}
.home-section {
  margin-top: 34px;
}
.section-h {
  margin: 0 0 14px;
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 19px;
  font-weight: 700;
  text-wrap: balance;
}
.section-h::before {
  content: "";
  flex: 0 0 14px;
  height: 3px;
  position: relative;
  top: -5px;
  border-radius: 2px;
  background: var(--accent);
}
.section-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  color: var(--text-faint);
}
.sub-h {
  margin: 22px 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.section-h + .sub-h {
  margin-top: 0;
}
.when {
  font-size: 13.5px;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

/* Featured research */
.feat-row {
  display: grid;
  grid-template-columns: repeat(var(--feat-cols, 3), minmax(0, 1fr));
  gap: 14px;
}
.feat-card {
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card);
}
.media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  max-width: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: var(--soft);
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-ph {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-style: italic;
  color: var(--text-faint);
  background: repeating-linear-gradient(45deg, var(--soft), var(--soft) 8px, var(--card) 8px, var(--card) 16px);
}
/* Overlays sit on photographs, so they use fixed colors in both themes. */
.play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  padding-left: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111111;
  font-size: 13px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}
.media-badge {
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
}
.media-badge.is-muted {
  background: rgba(0, 0, 0, 0.45);
}
.feat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 2px 2px;
}
.award {
  align-self: flex-start;
  margin-bottom: 6px;
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--poster);
  background: var(--poster-soft);
}
.feat-title {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.35;
  font-weight: 700;
  text-wrap: balance;
}
.feat-summary {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
}
.feat-cite {
  margin: auto 0 0;
  padding-top: 6px;
  font-size: 12.5px;
  font-style: italic;
}

/* Materials */
.mats {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}
.mat {
  display: inline-flex;
  align-items: center;
  padding: 1px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--card);
  color: var(--accent);
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.6;
  cursor: pointer;
}
.mat:hover {
  text-decoration: none;
  border-color: var(--accent);
  background: var(--accent-soft);
}
.mat-none,
.mat-none:hover {
  border-style: dashed;
  border-color: var(--border);
  background: var(--card);
  color: var(--text-faint);
  font-weight: 500;
  font-style: italic;
  cursor: default;
}
.bib-btn {
  display: none;
}
.js .bib-btn {
  display: inline-flex;
}

/* Full research list */
.research-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.research-list li {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 14px;
  padding-block: 12px;
  border-top: 1px solid var(--border);
}
.research-list li:first-child {
  border-top: 0;
  padding-top: 0;
}
.entry-title {
  font-weight: 600;
}
.entry-cite {
  font-size: 13.5px;
  color: var(--text-muted);
}
.entry-cite b {
  color: var(--text);
}

/* Experience and education rows */
.rows {
  display: flex;
  flex-direction: column;
}
.row {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 18px;
  padding-block: 10px;
  border-top: 1px solid var(--border);
}
.row:first-child {
  border-top: 0;
  padding-top: 0;
}
.row-title {
  font-weight: 600;
}
.row-org {
  font-size: 14px;
  color: var(--text-muted);
}
.row ul {
  margin: 4px 0 0;
  padding-left: 18px;
  list-style: disc;
  font-size: 14px;
}
.row li {
  margin-block: 2px;
}
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.badge {
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
}

/* Skills */
.skills {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 6px 18px;
  margin: 0;
  font-size: 14px;
}
.skills dt {
  color: var(--text-muted);
}
.skills dd {
  margin: 0;
}

/* Writing */
.posts {
  list-style: none;
  margin: 0;
  padding: 0;
}
.posts li {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 18px;
  padding-block: 10px;
  border-top: 1px solid var(--border);
}
.posts li:first-child {
  border-top: 0;
  padding-top: 0;
}
.all-posts {
  display: inline-block;
  margin-top: 10px;
  font-size: 13.5px;
  font-weight: 600;
}

/* Video dialog (Tailwind preflight zeroes margins, so re-center it) */
.video-dialog {
  width: min(960px, calc(100vw - 32px));
  max-width: none;
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: 6px;
  overflow: visible;
  background: #000000;
}
.video-dialog::backdrop {
  background: var(--overlay);
}
.video-frame {
  aspect-ratio: 16 / 9;
}
.video-frame iframe,
.video-frame video {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-close {
  position: absolute;
  top: -42px;
  right: 0;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: var(--card);
  color: var(--text);
  font-size: 16px;
  cursor: pointer;
}

/* ============================================================
   Blog
   ============================================================ */
.blog-intro {
  margin-bottom: 22px;
}
.blog-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
}
.blog-lede {
  margin: 4px 0 0;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-muted);
}
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}
.post-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 6px;
}
.post-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
.post-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.post-card h2,
.featured-post h2 {
  margin: 0;
  font-size: 17px;
  line-height: 1.35;
  text-wrap: balance;
}
.featured-post h2 {
  font-size: 22px;
}
.post-card h2 a,
.featured-post h2 a {
  color: var(--text);
}
.post-desc {
  flex: 1;
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--text-muted);
}
.post-meta {
  margin-top: 10px;
  font-size: 13px;
  color: var(--text-faint);
}
.featured-post {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  margin-bottom: 18px;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 6px;
}
.featured-post img {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.featured-post-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
.chip {
  padding: 1px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
}
.article {
  max-width: 760px;
  margin-inline: auto;
  padding: clamp(20px, 5vw, 44px);
  background: var(--card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 6px;
}
.back-link {
  font-size: 13.5px;
  font-weight: 600;
}
.article-title {
  margin: 18px 0 0;
  font-size: clamp(26px, 4.5vw, 38px);
  line-height: 1.15;
  font-weight: 700;
  text-wrap: balance;
}
.article-meta {
  margin-top: 10px;
  font-size: 13.5px;
  color: var(--text-faint);
}
.article-hero {
  width: 100%;
  margin-top: 24px;
  border-radius: 6px;
  border: 1px solid var(--border);
}

/* ============================================================
   Prose (blog body — no typography plugin)
   ============================================================ */
.prose {
  margin-top: 28px;
  font-size: 1.06rem;
  line-height: 1.8;
  color: var(--text);
}
.prose > * + * {
  margin-top: 1.3em;
}
.prose p {
  color: var(--text-muted);
}
.prose h2 {
  margin-top: 1.8em;
  margin-bottom: 0.5em;
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--text);
}
.prose h3 {
  margin-top: 1.5em;
  margin-bottom: 0.4em;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}
.prose a {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.prose strong {
  color: var(--text);
  font-weight: 600;
}
.prose blockquote {
  padding-left: 1.1rem;
  border-left: 2px solid var(--accent);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--text);
}
.prose ul,
.prose ol {
  padding-left: 1.3em;
  color: var(--text-muted);
}
.prose ul {
  list-style: disc;
}
.prose ol {
  list-style: decimal;
}
.prose li + li {
  margin-top: 0.4em;
}
.prose code {
  padding: 0.15em 0.4em;
  border-radius: 0.35em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em;
  background: var(--soft);
}
.prose img {
  border-radius: 6px;
}

/* ============================================================
   Responsive
   ============================================================ */
@media (max-width: 820px) {
  .home-card {
    grid-template-columns: minmax(0, 1fr);
    gap: 26px;
    padding: 20px;
  }
  .sidebar {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }
  .sidebar .talks-box {
    grid-column: 1 / -1;
  }
  .affil {
    border-top: 0;
    padding-top: 0;
  }
  .feat-row,
  .featured-post {
    grid-template-columns: minmax(0, 1fr);
  }
  .row,
  .posts li,
  .skills,
  .research-list li {
    grid-template-columns: minmax(0, 1fr);
    gap: 2px;
  }
  .skills dd {
    margin-bottom: 8px;
  }
}
@media (max-width: 480px) {
  .page {
    padding-inline: 16px;
  }
  .site-name {
    font-size: 22px;
  }
}
} /* end @layer components */
```

- [ ] **Step 2: Verify no motion survived**

Run: `grep -nE "transition|animation|@keyframes|transform|\.reveal|\.rise|scrollspy|radial-gradient" src/styles/global.css`
Expected: no output.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: "Complete!" with no errors. (The old home page components still render but look unstyled until Task 3 replaces them.)

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "Rewrite stylesheet for the academic single-page design

CMU-red tokens for light and dark, card-and-sidebar layout classes, and
no transitions, animations, or gradient washes. The base link rule moves
into @layer base so component link colors win without overrides.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Content model and page shell

Replaces the old home page with the new header, card, sidebar, bio, and footer. Deletes the superseded components in the same change, because the config fields they read are removed here.

**Files:**
- Rewrite: `src/config.ts`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Talks.astro` (markup and script only; the `talks` array is unchanged), `src/pages/index.astro`
- Create: `src/components/Sidebar.astro`, `src/components/Bio.astro`
- Modify: `src/lib/seo.ts` (two lines)
- Delete: `src/components/Hero.astro`, `src/components/About.astro`, `src/components/Projects.astro`, `src/components/Publications.astro`, `src/components/Contact.astro`

**Interfaces:**
- Consumes: `renderInline` (Task 1), `ResearchItem` (Task 1), CSS classes (Task 2)
- Produces:
  - `siteConfig` fields: `name`, `title`, `subtitle`, `description`, `authorName`, `portrait`, `cv`, `social`, `bio: string[]`, `affiliations: { name: string; url: string }[]`, `skills: { label: string; items: string[] }[]`, `research: ResearchItem[]`, `experience`, `education`
  - `Header.astro` prop `home?: boolean`
  - Page skeleton in `index.astro` where later tasks insert `<Research />`, `<Experience />`, `<Education />`, `<Skills />`, `<Writing />` after `<Bio />`

- [ ] **Step 1: Rewrite `src/config.ts`**

```ts
import type { ResearchItem } from "./lib/research";

const research: ResearchItem[] = [
  {
    slug: "melanin-fd-nirs",
    title: "Melanin-Induced Bias in Frequency-Domain NIRS",
    summary:
      "How melanin degrades signal quality and biases oxygenation estimates in FD-NIRS, with implications for equitable optical devices.",
    year: 2024,
    citation: {
      authors:
        "S. Roy, J. Wu, J. Cao, J. Disu, S. Bharadwaj, E. Meinert-Spyker, P. Grover, J. M. Kainerstorfer, S. Wood",
      venue: "Journal of Biomedical Optics",
      year: 2024,
    },
    award: "JBO 2024 Top Paper",
    featured: true,
    materials: { doi: "https://doi.org/10.1117/1.JBO.29.S3.S33310" },
  },
  {
    slug: "eeg-pain-scd",
    title: "EEG Biomarkers of Pain Dysregulation in Sickle Cell Disease",
    summary:
      "EEG signatures of central sensitization in adults with SCD as thermal stimuli shift from detection to pain.",
    year: 2026,
    citation: {
      authors: "S. Roy, J. Disu, N. Mossazghi, L. Abdelmohsen, E. Meinert-Spyker, S. Wood",
      venue: "The Journal of Pain",
      year: 2026,
    },
    featured: true,
    image: "/images/blog/cca-placeholder.jpg",
  },
  {
    slug: "optode-curly-hair",
    title: "Optode Sensor Development for Dark, Coarse, and Curly Hair",
    summary:
      "An optode holder and sensor design that improves NIRS signal quality for participants with dark, coarse, and curly hair.",
    year: 2026,
    citation: {
      authors:
        "S. Roy, A. Duong, E. Meinert-Spyker, J. Cao, J. Kwasa, J. M. Kainerstorfer, P. Grover, S. Wood",
      venue: "SPIE Photonics West",
      year: 2026,
    },
    featured: true,
    image: "/images/blog/optode-placeholder.jpg",
    materials: {
      doi: "https://spie.org/photonics-west/presentation/Novel-optode-sensor-development-for-functional-near-infrared-spectroscopy-systems/13834-19",
    },
  },
  {
    slug: "xr-pain-paradigm",
    title: "Extended Reality Pain Paradigm for Neurophysiology",
    summary:
      "An XR-based EEG protocol with immersive, haptically synchronized pain stimulation for studying chronic pain under realistic conditions.",
    year: "In progress",
  },
  {
    slug: "cognitive-load-scd",
    title: "Cognitive Load Biomarkers in Sickle Cell Disease",
    summary:
      "Cognitive load-induced hemodynamic changes in adults with SCD, measured with FD-NIRS during the Digit Symbol Substitution Task.",
    year: 2024,
    citation: {
      authors:
        "S. Roy, N. Mossazghi, E. Bulger, J. Lin, C. Saber, B. Shinn-Cunningham, J. M. Kainerstorfer, J. Z. Xu, S. Wood",
      venue: "SfNIRS",
      year: 2024,
    },
    materials: {
      pdf: "https://fnirs.org/wp-content/uploads/2024/fNIRS2024BiennialMeeting/blitz/Su-088-768-Roy-Shidhartho.pdf",
    },
  },
];

export const siteConfig = {
  name: "Shidhartho Roy",
  title: "PhD Student in Biomedical Engineering, Carnegie Mellon University",
  subtitle: "PhD Student, Biomedical Engineering · Carnegie Mellon University",
  description:
    "Academic website of Shidhartho Roy, PhD student at Carnegie Mellon University working on EEG, near-infrared spectroscopy, pain biomarkers, and extended reality.",
  // Bolded wherever it appears in a research citation's author list.
  authorName: "S. Roy",
  portrait: "/images/blog/potrait_card.jpeg",
  cv: "/files/shidhartho-roy-cv.pdf",
  social: {
    // Email intentionally omitted so the address is not exposed to scrapers.
    linkedin: "https://www.linkedin.com/in/shidhartho/",
    researchgate: "https://www.researchgate.net/profile/Shidhartho-Roy?ev=hdr_xprf",
    scholar: "https://scholar.google.com/citations?user=ExMye5IAAAAJ&hl=en",
    github: "https://github.com/royShidhartho",
  },
  // Inline marks: [label](url), ==highlight==, **bold**.
  bio: [
    "I am a Ph.D. student in [Biomedical Engineering](https://www.cmu.edu/bme/) at [Carnegie Mellon University](https://www.cmu.edu/), working in the [Wood Neuro Research Group](https://www.cmu.edu/bme/woodneurolab/).",
    "My research focuses on ==neuroimaging and physiological biomarkers of pain dysregulation==, with emphasis on electroencephalography, near-infrared spectroscopy, and multimodal experimental design. I currently study pain-related neural and hemodynamic responses in ==sickle cell disease==, including the development of ==extended reality paradigms== for more realistic cognitive and sensory assessment.",
    "More broadly, I am interested in rigorous computational methods for biomedical signal analysis, **equitable sensing technologies**, and translational neuroengineering.",
  ],
  affiliations: [
    { name: "Wood Neuro Research Group", url: "https://www.cmu.edu/bme/woodneurolab/" },
    { name: "Augmented Perception Lab", url: "https://augmented-perception.org/" },
  ],
  skills: [
    { label: "Modalities", items: ["EEG", "fMRI", "NIRS", "FD-NIRS"] },
    {
      label: "Analysis",
      items: ["Biomedical signal processing", "Machine learning", "Monte Carlo simulations"],
    },
    { label: "Programming", items: ["Python", "MATLAB", "R", "C", "C++", "C#", "Java"] },
    {
      label: "Libraries & tools",
      items: ["TensorFlow", "Keras", "Scikit-learn", "NLTK", "Unity", "Simulink", "GitHub"],
    },
    { label: "Fabrication", items: ["Arduino", "3D printing", "Laser cutting"] },
  ],
  research,
  experience: [
    {
      company: "Carnegie Mellon University",
      title: "PhD Student, Biomedical Engineering",
      dateRange: "Aug 2024 – Present",
      bullets: [
        "Conducting PhD research on EEG-based biomarkers of pain dysregulation in sickle cell disease.",
        "Comparing thermal pain-evoked neural responses between sickle cell disease patients and healthy controls using EEG and NIRS-based methods.",
        "Designing an extended reality-based EEG protocol with immersive and haptically synchronized pain stimulation.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Research Associate, Electrical and Computer Engineering",
      dateRange: "Aug 2023 – Aug 2024",
      bullets: [
        "Investigated cognitive load-induced hemodynamic changes in sickle cell disease using frequency-domain near-infrared spectroscopy.",
        "Studied neurovascular responses during Digit Symbol Substitution Task performance.",
        "Generated evidence relevant to cognitive workload-aware interface design for clinical populations.",
      ],
    },
    {
      company: "Carnegie Mellon University",
      title: "Graduate Research Assistant, Biomedical Engineering",
      dateRange: "Jan 2022 – Aug 2023",
      bullets: [
        "Characterized the relationship between melanin concentration and near-infrared spectroscopy signals across human participants.",
        "Showed reduced arterial oxygen saturation estimates and reduced signal-to-noise ratio in participants with higher melanin index.",
        "Conceptualized a novel optode holder design to improve measurement quality in participants with curly hair.",
      ],
    },
    {
      company: "Khulna University of Engineering and Technology",
      title: "Researcher, Artificial Intelligence in Medical Image Computing Lab",
      dateRange: "Mar 2020 – Dec 2021",
      bullets: [
        "Worked on medical image segmentation and localization using convolutional neural networks.",
        "Designed residual and skip-connection based methods to recover local information from shallower layers.",
        "Applied these methods to heart segmentation in computed tomography and magnetic resonance imaging data.",
      ],
    },
  ],
  education: [
    {
      degree: "Ph.D., Biomedical Engineering",
      school: "Carnegie Mellon University",
      dateRange: "2024 – Present",
      note: "Research focus: EEG-based biomarkers of pain dysregulation in sickle cell disease",
      awards: ["BME Mentorship Award"],
    },
    {
      degree: "M.S., Biomedical Engineering (Research)",
      school: "Carnegie Mellon University",
      dateRange: "2023",
      note: "GPA 3.69/4.0",
      awards: ["BME Research Excellence Award"],
    },
    {
      degree: "B.Sc., Electrical and Electronic Engineering",
      school: "Khulna University of Engineering and Technology",
      dateRange: "2020",
      note: "GPA 3.64/4.0",
    },
  ] as { degree: string; school: string; dateRange: string; note?: string; awards?: string[] }[],
};
```

- [ ] **Step 2: Update `src/lib/seo.ts`**

In `personSchema`, replace:

```ts
    image: abs("/images/blog/potrait_card.jpeg", site),
```
with
```ts
    image: abs(siteConfig.portrait, site),
```
and replace
```ts
    description: siteConfig.aboutMe,
```
with
```ts
    description: siteConfig.description,
```

- [ ] **Step 3: Rewrite `src/components/Header.astro`**

```astro
---
import { siteConfig } from "../config";

interface Props {
  /** True on the home page: the name is the page's h1 and Blog opens in a new tab. */
  home?: boolean;
}
const { home = false } = Astro.props;
const NameTag = home ? "h1" : "p";
---

<header class="site-header">
  <div class="page">
    <NameTag class="site-name">
      <a href="/">{siteConfig.name}</a>
      <span class="site-sub">{siteConfig.subtitle}</span>
    </NameTag>

    <div class="hdr-actions">
      {
        home ? (
          <a class="pill-link" href="/blog/" target="_blank" rel="noopener">
            Blog <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a class="pill-link" href="/blog/">Blog</a>
        )
      }
      <button id="theme-toggle" class="icon-btn theme-toggle" type="button" aria-label="Toggle color theme">
        <svg class="sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
        <svg class="moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  </div>
</header>

<script>
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
</script>
```

- [ ] **Step 4: Rewrite `src/components/Footer.astro`**

```astro
---
import { siteConfig } from "../config";

const built = new Date();
const updated = built.toLocaleDateString("en-US", { month: "long", year: "numeric" });
---

<footer class="site-footer">
  <div class="page">© {built.getFullYear()} {siteConfig.name} · Last updated {updated}</div>
</footer>
```

- [ ] **Step 5: Rewrite the markup and script of `src/components/Talks.astro`**

Keep the frontmatter's `TalkItem` type, the `talks` array, and `sortedTalks` exactly as they are. Delete the `COLLAPSE_AFTER` and `collapsible` constants, and replace everything after the closing `---` (the `<section>` and the `<script>`) with:

```astro
<div class="talks-box" id="talks">
  <h3 class="talks-h">Talks &amp; Presentations</h3>
  <ul class="talks-list">
    {
      sortedTalks.map((talk) => (
        <li>
          <div class="talk-meta">
            <span>{talk.dateLabel}</span>
            {talk.type && (
              <span class={`tag ${talk.type === "Poster" ? "tag-poster" : "tag-talk"}`}>
                {talk.type}
              </span>
            )}
          </div>
          {talk.link && talk.link !== "#" ? (
            <a href={talk.link} target="_blank" rel="noopener noreferrer">
              {talk.title}
            </a>
          ) : (
            <span>{talk.title}</span>
          )}
        </li>
      ))
    }
  </ul>
</div>
```

The file now has no `<script>`.

- [ ] **Step 6: Create `src/components/Sidebar.astro`**

```astro
---
import { siteConfig } from "../config";
import Talks from "./Talks.astro";

const { social } = siteConfig;
---

<aside class="sidebar">
  <div class="sidebar-id">
    <img
      class="portrait"
      src={siteConfig.portrait}
      alt={`Portrait of ${siteConfig.name}`}
      width="520"
      height="520"
    />
    <a class="cv-link" href={siteConfig.cv} target="_blank" rel="noopener">Curriculum Vitae (PDF)</a>
    <div class="socials">
      {
        social.scholar && (
          <a href={social.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" title="Google Scholar">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3L1 9l11 6l9-4.91V17h2V9L12 3zm0 13L5.74 12.73V16.5c0 2.49 2.97 4.5 6.26 4.5s6.26-2.01 6.26-4.5v-3.77L12 16z" />
            </svg>
          </a>
        )
      }
      {
        social.researchgate && (
          <a href={social.researchgate} target="_blank" rel="noopener noreferrer" aria-label="ResearchGate" title="ResearchGate">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
              <text x="12" y="16.2" text-anchor="middle" font-size="10" font-weight="700" font-family="Georgia, serif" style="fill: var(--card)">RG</text>
            </svg>
          </a>
        )
      }
      {
        social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
            </svg>
          </a>
        )
      }
      {
        social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </a>
        )
      }
    </div>
  </div>

  {
    siteConfig.affiliations.length > 0 && (
      <div class="affil">
        <span class="affil-h">Affiliations</span>
        <ul>
          {siteConfig.affiliations.map((a) => (
            <li>
              <a href={a.url} target="_blank" rel="noopener noreferrer">{a.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  <Talks />
</aside>
```

- [ ] **Step 7: Create `src/components/Bio.astro`**

```astro
---
import { siteConfig } from "../config";
import { renderInline } from "../lib/inline";
---

<div class="bio" id="about">
  {siteConfig.bio.map((paragraph) => <p set:html={renderInline(paragraph)} />)}
</div>
```

- [ ] **Step 8: Rewrite `src/pages/index.astro`**

```astro
---
import Header from "../components/Header.astro";
import Sidebar from "../components/Sidebar.astro";
import Bio from "../components/Bio.astro";
import Footer from "../components/Footer.astro";
import Seo from "../components/Seo.astro";
import { siteConfig } from "../config";
import { personSchema, websiteSchema } from "../lib/seo";
import "../styles/global.css";
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />

    <Seo
      title="Shidhartho Roy — Biomedical Engineering PhD, CMU"
      description={siteConfig.description}
      jsonLd={[personSchema(Astro.site), websiteSchema(Astro.site)]}
    />

    <!-- Apply theme before paint to avoid flash -->
    <script is:inline>
      (function () {
        document.documentElement.classList.add("js");
        try {
          var t = localStorage.getItem("theme");
          if (!t)
            t = window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";
          document.documentElement.setAttribute("data-theme", t);
        } catch (e) {}
      })();
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <Header home />
    <div class="page">
      <div class="home-card">
        <Sidebar />
        <main class="home-main" id="top">
          <Bio />
        </main>
      </div>
    </div>
    <Footer />
  </body>
</html>
```

- [ ] **Step 9: Delete superseded components**

```bash
git rm src/components/Hero.astro src/components/About.astro src/components/Projects.astro src/components/Publications.astro src/components/Contact.astro
```

- [ ] **Step 10: Check nothing still references removed names**

Run: `grep -rnE "Hero|About\.astro|Projects|Publications|Contact|aboutMe|accentColor|siteConfig\.projects|siteConfig\.publications" src/components src/pages src/lib src/config.ts`
Expected: no output.

- [ ] **Step 11: Build and test**

Run: `npm test && npm run build`
Expected: tests pass; build completes. Experience/Education still exist but are not rendered yet.

- [ ] **Step 12: Browser check (dev server, http://localhost:4321)**

Light and dark: name in capitals with italic subtitle; Blog ↗ pill opens `/blog/` in a new tab; theme toggle switches and persists after reload; card has a red top rule; sidebar shows portrait, CV link, four icons, affiliations, and a Talks box that scrolls internally; bio shows three highlighted phrases and links. At 375px: sidebar becomes portrait + affiliations row with Talks below; no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`).

- [ ] **Step 13: Commit**

```bash
git add src/config.ts src/lib/seo.ts src/components/Header.astro src/components/Footer.astro src/components/Talks.astro src/components/Sidebar.astro src/components/Bio.astro src/pages/index.astro
git commit -m "Replace home page with academic card layout and sidebar

New content model (bio, affiliations, grouped skills, research items,
education notes and awards). Header keeps only the name, Blog link, and
theme toggle. Hero, About, Projects, Publications, and Contact are
removed; the publication list remains in git history.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

(The `git rm` in Step 9 already staged the deletions.)

---

### Task 4: Research section with featured cards, materials, and video

**Files:**
- Create: `src/components/Materials.astro`, `src/components/FeaturedCard.astro`, `src/components/VideoDialog.astro`, `src/components/Research.astro`
- Modify: `src/pages/index.astro` (import and render `<Research />`)

**Interfaces:**
- Consumes: `materialLinks`, `videoHref`, `videoEmbed`, `featuredResearch`, `sortResearch`, `boldAuthor`, `ResearchItem` (Task 1); `siteConfig.research`, `siteConfig.authorName` (Task 3)
- Produces: `Materials` (prop `item: ResearchItem`), `FeaturedCard` (prop `item: ResearchItem`), `VideoDialog` (no props), `Research` (no props). Elements with `data-video`, `data-video-kind`, `data-video-src`, `data-video-poster`, `data-video-title` open the dialog.

- [ ] **Step 1: Create `src/components/Materials.astro`**

```astro
---
import { materialLinks, videoEmbed, videoHref, type ResearchItem } from "../lib/research";

interface Props {
  item: ResearchItem;
}
const { item } = Astro.props;
const links = materialLinks(item.materials);
const embed = item.video ? videoEmbed(item.video) : null;
const hasNothing = links.length === 0 && !item.video && !item.bibtex;
---

<div class="mats">
  {
    links.map((link) => (
      <a class="mat" href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    ))
  }
  {
    item.video && embed && (
      <a
        class="mat"
        href={videoHref(item.video)}
        target="_blank"
        rel="noopener noreferrer"
        data-video
        data-video-kind={embed.kind}
        data-video-src={embed.src}
        data-video-poster={embed.poster}
        data-video-title={item.title}
      >
        Video
      </a>
    )
  }
  {
    item.bibtex && (
      <button type="button" class="mat bib-btn" data-bibtex={item.bibtex}>
        BibTeX
      </button>
    )
  }
  {hasNothing && <span class="mat mat-none">Materials when published</span>}
</div>

<script>
  document.querySelectorAll<HTMLButtonElement>("[data-bibtex]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.bibtex ?? "";
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const area = document.createElement("textarea");
        area.value = text;
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "BibTeX"), 2000);
    });
  });
</script>
```

- [ ] **Step 2: Create `src/components/FeaturedCard.astro`**

```astro
---
import Materials from "./Materials.astro";
import { videoEmbed, videoHref, type ResearchItem } from "../lib/research";

interface Props {
  item: ResearchItem;
}
const { item } = Astro.props;
const embed = item.video ? videoEmbed(item.video) : null;
---

<article class="feat-card">
  {
    item.video && embed ? (
      <a
        class="media"
        href={videoHref(item.video)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Play video: ${item.title}`}
        data-video
        data-video-kind={embed.kind}
        data-video-src={embed.src}
        data-video-poster={embed.poster}
        data-video-title={item.title}
      >
        {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span class="media-ph">Teaser figure</span>}
        <span class="play" aria-hidden="true">▶</span>
        <span class="media-badge">Video</span>
      </a>
    ) : (
      <div class="media">
        {item.image ? (
          <img src={item.image} alt={`Teaser figure for ${item.title}`} loading="lazy" />
        ) : (
          <span class="media-ph">Teaser figure</span>
        )}
        <span class="media-badge is-muted">Video coming soon</span>
      </div>
    )
  }
  <div class="feat-body">
    {item.award && <span class="award">★ {item.award}</span>}
    <h4 class="feat-title">{item.title}</h4>
    <p class="feat-summary">{item.summary}</p>
    {item.citation && <p class="feat-cite">{item.citation.venue}, {item.citation.year}</p>}
    <Materials item={item} />
  </div>
</article>
```

- [ ] **Step 3: Create `src/components/VideoDialog.astro`**

```astro
<dialog id="video-dialog" class="video-dialog" aria-label="Project video">
  <div class="video-frame" data-video-frame></div>
  <button type="button" class="video-close" data-video-close aria-label="Close video">✕</button>
</dialog>

<script>
  const dialog = document.getElementById("video-dialog") as HTMLDialogElement | null;
  const frame = dialog?.querySelector<HTMLElement>("[data-video-frame]");

  if (dialog && frame && typeof dialog.showModal === "function") {
    document.querySelectorAll<HTMLAnchorElement>("a[data-video]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const { videoKind, videoSrc = "", videoPoster, videoTitle } = link.dataset;
        if (videoKind === "youtube") {
          const iframe = document.createElement("iframe");
          iframe.src = videoSrc;
          iframe.title = videoTitle ?? "Video";
          iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
          iframe.allowFullscreen = true;
          frame.replaceChildren(iframe);
        } else {
          const video = document.createElement("video");
          video.src = videoSrc;
          video.controls = true;
          video.autoplay = true;
          video.playsInline = true;
          if (videoPoster) video.poster = videoPoster;
          frame.replaceChildren(video);
        }
        dialog.showModal();
      });
    });

    // Removing the player on close stops playback.
    dialog.addEventListener("close", () => frame.replaceChildren());
    dialog.querySelector("[data-video-close]")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
</script>
```

- [ ] **Step 4: Create `src/components/Research.astro`**

```astro
---
import FeaturedCard from "./FeaturedCard.astro";
import Materials from "./Materials.astro";
import VideoDialog from "./VideoDialog.astro";
import { siteConfig } from "../config";
import { boldAuthor, featuredResearch, sortResearch } from "../lib/research";

const featured = featuredResearch(siteConfig.research);
const all = sortResearch(siteConfig.research);
---

{
  all.length > 0 && (
    <section id="research" class="home-section">
      <h2 class="section-h">Research</h2>

      {featured.length > 0 && (
        <>
          <h3 class="sub-h">Featured</h3>
          <div class="feat-row" style={`--feat-cols:${featured.length}`}>
            {featured.map((item) => (
              <FeaturedCard item={item} />
            ))}
          </div>
          <h3 class="sub-h">All research</h3>
        </>
      )}

      <ol class="research-list">
        {all.map((item) => (
          <li>
            <div class="when">{item.year}</div>
            <div>
              <div class="entry-title">{item.title}</div>
              {item.citation ? (
                <div class="entry-cite">
                  <Fragment set:html={boldAuthor(item.citation.authors, siteConfig.authorName)} />.{" "}
                  <i>{item.citation.venue}</i>, {item.citation.year}.
                </div>
              ) : (
                <div class="entry-cite">{item.summary}</div>
              )}
              <Materials item={item} />
            </div>
          </li>
        ))}
      </ol>

      <VideoDialog />
    </section>
  )
}
```

- [ ] **Step 5: Render it on the home page**

In `src/pages/index.astro`, add the import after the `Bio` import:

```astro
import Research from "../components/Research.astro";
```

and render it after `<Bio />`:

```astro
          <Bio />
          <Research />
```

- [ ] **Step 6: Build and test**

Run: `npm test && npm run build`
Expected: pass; build completes.

- [ ] **Step 7: Temporary video check**

Temporarily add `video: { youtube: "aqz-KE-bpKQ" },` to the melanin item in `src/config.ts` (a public Blender demo video). In the dev server at desktop width:
- Featured row shows three cards on one line (`[...document.querySelectorAll('.feat-card')].map(c => c.getBoundingClientRect().top)` returns three equal values).
- Melanin card shows a play button and "Video" badge; the other two show "Video coming soon"; melanin's materials row ends with a Video button.
- Clicking the play button opens the dialog with the player; Esc, ✕, and a backdrop click each close it, and `#video-dialog [data-video-frame]` is empty afterward.
- With JavaScript disabled (or before hydration), the play link's `href` is `https://www.youtube.com/watch?v=aqz-KE-bpKQ`.

Then remove the temporary `video` line and confirm `git diff src/config.ts` is empty.

- [ ] **Step 8: Browser check without the video**

All research list order: XR (In progress), EEG 2026, Optode 2026, Melanin 2024, Cognitive load 2024. "S. Roy" is bold in each citation. XR and EEG rows show the dashed "Materials when published" note. At 375px, featured cards stack and the page does not scroll horizontally. Dark theme: award badge, materials, and placeholder stripes stay legible.

- [ ] **Step 9: Commit**

```bash
git add src/components/Materials.astro src/components/FeaturedCard.astro src/components/VideoDialog.astro src/components/Research.astro src/pages/index.astro
git commit -m "Add research section with featured cards and click-to-load video

Three featured projects sit in one row with teaser, award, citation,
and materials; the full list follows newest first. Videos open in a
shared dialog only when clicked and fall back to plain links.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Experience, Education, Skills, and Writing

**Files:**
- Rewrite: `src/components/Experience.astro`, `src/components/Education.astro`
- Create: `src/components/Skills.astro`, `src/components/Writing.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `siteConfig.experience`, `siteConfig.education`, `siteConfig.skills` (Task 3); `src/posts/*.md` frontmatter `title`, `pubDate`
- Produces: four section components with no props

- [ ] **Step 1: Rewrite `src/components/Experience.astro`**

```astro
---
import { siteConfig } from "../config";
---

{
  siteConfig.experience.length > 0 && (
    <section id="experience" class="home-section">
      <h2 class="section-h">Experience</h2>
      <div class="rows">
        {siteConfig.experience.map((exp) => (
          <div class="row">
            <div class="when">{exp.dateRange}</div>
            <div>
              <div class="row-title">{exp.title}</div>
              <div class="row-org">{exp.company}</div>
              {exp.bullets.length > 0 && (
                <ul>
                  {exp.bullets.map((bullet) => (
                    <li>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite `src/components/Education.astro`**

```astro
---
import { siteConfig } from "../config";
---

{
  siteConfig.education.length > 0 && (
    <section id="education" class="home-section">
      <h2 class="section-h">Education</h2>
      <div class="rows">
        {siteConfig.education.map((edu) => (
          <div class="row">
            <div class="when">{edu.dateRange}</div>
            <div>
              <div class="row-title">{edu.degree}</div>
              <div class="row-org">
                {edu.school}
                {edu.note && <> · {edu.note}</>}
              </div>
              {edu.awards && edu.awards.length > 0 && (
                <div class="badges">
                  {edu.awards.map((award) => (
                    <span class="badge">{award}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/Skills.astro`**

```astro
---
import { siteConfig } from "../config";
---

{
  siteConfig.skills.length > 0 && (
    <section id="skills" class="home-section">
      <h2 class="section-h">Skills &amp; Methods</h2>
      <dl class="skills">
        {siteConfig.skills.map((group) => (
          <Fragment>
            <dt>{group.label}</dt>
            <dd>{group.items.join(", ")}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/Writing.astro`**

```astro
---
import type { MarkdownInstance } from "astro";

type Frontmatter = { title?: string; pubDate?: string };

const modules = import.meta.glob<MarkdownInstance<Frontmatter>>("../posts/*.md", { eager: true });

const posts = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/").pop()?.replace(/\.md$/, "") ?? "",
    title: mod.frontmatter.title ?? "Untitled Post",
    pubDate: mod.frontmatter.pubDate ?? "",
  }))
  .filter((post) => post.slug !== "")
  .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
  .slice(0, 5);

const formatDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    : "";
---

{
  posts.length > 0 && (
    <section id="writing" class="home-section">
      <h2 class="section-h">
        Writing <span class="section-note">from the blog</span>
      </h2>
      <ul class="posts">
        {posts.map((post) => (
          <li>
            <div class="when">{formatDate(post.pubDate)}</div>
            <a href={`/blog/${post.slug}/`} target="_blank" rel="noopener">
              {post.title} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <a class="all-posts" href="/blog/" target="_blank" rel="noopener">
        All posts <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}
```

- [ ] **Step 5: Render them on the home page**

In `src/pages/index.astro`, add imports after the `Research` import:

```astro
import Experience from "../components/Experience.astro";
import Education from "../components/Education.astro";
import Skills from "../components/Skills.astro";
import Writing from "../components/Writing.astro";
```

and make `<main>` read:

```astro
        <main class="home-main" id="top">
          <Bio />
          <Research />
          <Experience />
          <Education />
          <Skills />
          <Writing />
        </main>
```

- [ ] **Step 6: Build and test**

Run: `npm test && npm run build`
Expected: pass; build completes.

- [ ] **Step 7: Browser check**

Experience shows four rows with dates in a left column and full bullets; Education shows three rows with the GPA/research-focus note after the school and red award badges on the Ph.D. and M.S. rows; Skills shows five labeled rows; Writing lists both posts as "Nov 2025" with ↗ and an "All posts ↗" link, all opening new tabs. At 375px each row stacks (date above content) with no horizontal scroll. Check light and dark.

- [ ] **Step 8: Commit**

```bash
git add src/components/Experience.astro src/components/Education.astro src/components/Skills.astro src/components/Writing.astro src/pages/index.astro
git commit -m "Add experience, education, skills, and writing sections

Date-column rows replace the timeline styling; education awards render
as badges, skills as labeled groups, and the latest blog posts link out
in new tabs.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Blog pages in the new style

**Files:**
- Modify: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`
- Rewrite: `src/components/BlogCard.astro`, `src/components/FeaturedPost.astro`

**Interfaces:**
- Consumes: `Header` (no `home` prop → name is a `<p>`, Blog link same-tab), `Footer`, CSS classes from Task 2
- Produces: nothing new

- [ ] **Step 1: Rewrite `src/components/BlogCard.astro`**

```astro
---
const { post } = Astro.props;

const formattedDate = post.data.pubDate
  ? new Date(post.data.pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  : "";
---

<article class="post-card">
  {
    post.data.image && (
      <a href={`/blog/${post.slug}/`}>
        <img src={post.data.image} alt="" loading="lazy" />
      </a>
    )
  }
  <div class="post-card-body">
    {
      post.data.tags && post.data.tags.length > 0 && (
        <div class="chips">
          {post.data.tags.slice(0, 2).map((tag: string) => (
            <span class="chip">{tag}</span>
          ))}
        </div>
      )
    }
    <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
    {post.data.description && <p class="post-desc">{post.data.description}</p>}
    <div class="post-meta">{[post.data.author, formattedDate].filter(Boolean).join(" · ")}</div>
  </div>
</article>
```

- [ ] **Step 2: Rewrite `src/components/FeaturedPost.astro`**

```astro
---
const { post } = Astro.props;

const formattedDate = post.data.pubDate
  ? new Date(post.data.pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  : "";
---

<article class="featured-post">
  <div class="featured-post-body">
    <span class="sub-h" style="margin-top:0">Featured</span>
    <h2><a href={`/blog/${post.slug}/`}>{post.data.title}</a></h2>
    {post.data.description && <p class="post-desc">{post.data.description}</p>}
    <div class="post-meta">{[post.data.author, formattedDate].filter(Boolean).join(" · ")}</div>
  </div>
  {
    post.data.image && (
      <a href={`/blog/${post.slug}/`}>
        <img src={post.data.image} alt="" />
      </a>
    )
  }
</article>
```

- [ ] **Step 3: Update `src/pages/blog/index.astro`**

1. Replace the Google Fonts `<link href=...>` with the same one as `index.astro`:

```astro
    <link
      href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&display=swap"
      rel="stylesheet"
    />
```

2. Replace everything between `<Header />` and `<Footer />` with:

```astro
    <main class="page">
      <div class="blog-intro">
        <h1 class="blog-title">Blog</h1>
        <p class="blog-lede">Research updates, ongoing work, and selected ideas worth sharing.</p>
      </div>

      {
        featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <p class="blog-lede">No blog posts yet. Add a post in <code>src/posts/</code>.</p>
        )
      }

      {
        remainingPosts.length > 0 && (
          <div class="post-grid">
            {remainingPosts.map((post) => (
              <BlogCard post={post} />
            ))}
          </div>
        )
      }
    </main>
```

- [ ] **Step 4: Update `src/pages/blog/[slug].astro`**

1. Replace the Google Fonts `<link href=...>` with the one shown in Step 3.
2. In `formattedDate`, add `timeZone: "UTC",` to the options object (prevents the date shifting a day in US time zones).
3. Replace everything between `<Header />` and `<Footer />` with:

```astro
    <main class="page">
      <article class="article">
        <a href="/blog/" class="back-link"><span aria-hidden="true">←</span> Back to blog</a>

        {
          frontmatter.tags && frontmatter.tags.length > 0 && (
            <div class="chips" style="margin-top:18px">
              {frontmatter.tags.map((tag) => (
                <span class="chip">{tag}</span>
              ))}
            </div>
          )
        }
        <h1 class="article-title">{frontmatter.title}</h1>
        <div class="article-meta">{[frontmatter.author, formattedDate].filter(Boolean).join(" · ")}</div>

        {frontmatter.image && <img class="article-hero" src={frontmatter.image} alt="" />}

        <div class="prose">
          <Content />
        </div>
      </article>
    </main>
```

- [ ] **Step 5: Confirm no old utility or motion classes remain in blog files**

Run: `grep -nE "reveal|card-hover|group-hover|transition|section-head|overline|shell|btn|ul-link|t-muted|t-faint|t-accent" src/pages/blog/*.astro src/components/BlogCard.astro src/components/FeaturedPost.astro`
Expected: no output.

- [ ] **Step 6: Build and browser check**

Run: `npm run build`, then in the dev server: `/blog/` shows the header (name links home, "Blog" pill without ↗, theme toggle), the featured CCA post with its image, and the optode post card; a post page shows the bordered article with tags, title, date, hero image, and readable prose. Theme chosen on the home page carries over. Check 375px for horizontal scroll. Check light and dark.

- [ ] **Step 7: Commit**

```bash
git add src/pages/blog/index.astro "src/pages/blog/[slug].astro" src/components/BlogCard.astro src/components/FeaturedPost.astro
git commit -m "Restyle blog pages to match the academic design

Blog index and posts use the new header, tokens, and card styling
without hover motion; post dates are formatted in UTC so they no longer
shift a day.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Docs and AI index

**Files:**
- Modify: `CLAUDE.md`, `README.md`, `SETUP.md`, `public/llms.txt`

**Interfaces:**
- Consumes: final file layout from Tasks 1–6
- Produces: docs that match the code

- [ ] **Step 1: Update `CLAUDE.md`**

Make these exact replacements:

1. Project Overview, first sentence: replace "substantially redesigned into a modern, light/dark, editorial layout with academic sections (Publications, Talks) and a markdown blog" with "redesigned into a single-page, no-animation academic layout (two-column card with an identity sidebar) plus a markdown blog".
2. Theming section: replace the bullet beginning "**`siteConfig.accentColor` is currently vestigial**" with "- The accent is CMU red, set by `--accent` in `global.css` (light `#a6192e`, dark `#ef7d8c`)." Replace the bullet beginning "The theme toggle, scroll-reveal, and scrollspy logic" with "- The theme toggle is the only script in `Header.astro`. There is no scroll-reveal, scrollspy, or animation anywhere; keep `global.css` free of `transition`, `animation`, and hover `transform`."
3. Replace the whole "## Content lives in three different places" section body with:

```markdown
1. **`src/config.ts`** (`siteConfig`): `name`, `title`, `subtitle`, `description`, `authorName`, `portrait`, `cv`, `social`, `bio` (paragraphs; inline `[label](url)`, `==highlight==`, `**bold**`), `affiliations`, `skills` (labeled groups), `research`, `experience`, `education` (`note` + `awards` badges).
   - `research` items follow `ResearchItem` in `src/lib/research.ts`: `featured: true` puts an item in the one-row Featured strip (max 3); `materials` keys are `pdf`, `doi`, `poster`, `slides`, `code`, `data`; `video` is `{ youtube: "<id>" }` or `{ src, poster? }`; `bibtex` adds a copy button. Self-hosted files go in `public/files/research/<slug>/`.
   - `social` keys are `linkedin`, `researchgate`, `scholar`, `github`. Email is intentionally not exposed anywhere.
2. **`src/components/Talks.astro`**: the `talks` array, rendered as the scrollable box in the sidebar.
3. **`src/posts/*.md`**: blog posts (frontmatter `title`, `pubDate`, optional `description`, `author`, `image`, `tags`). They live outside `src/pages/` so Astro doesn't auto-route them as unstyled pages.
```

4. Architecture, first two bullets: replace with:

```markdown
- **Home page** (`src/pages/index.astro`): `Header` (with `home` prop), then one `.home-card` containing `Sidebar` (portrait, CV, socials, affiliations, `Talks`) and a main column of `Bio`, `Research`, `Experience`, `Education`, `Skills`, `Writing`; then `Footer`. Single page, no section nav.
- **Conditional rendering**: Research, Experience, Education, Skills, and Writing each render nothing when their data is empty.
- **Pure logic lives in `src/lib/`** (`inline.ts`, `research.ts`) and is unit-tested with `npm test` (`node --test`). Components render its output with `set:html` only for strings those helpers escaped.
- **Video**: `VideoDialog.astro` is a shared native `<dialog>`; any `a[data-video]` opens it, and its `href` is the no-JS fallback.
```

5. Replace the "Accent" architecture bullet and the `@layer components` bullet with: "- **CSS layers**: the base `a` rule is in `@layer base` and component classes are in `@layer components`, so component link colors win without overrides."
6. Development Commands block: add the line `npm test          # Unit tests for src/lib helpers (node --test)` and change "No linting or testing framework is configured." to "No linting is configured."
7. Conventions: replace "(or, for Talks/Publications, their in-component arrays)" with "(or, for Talks, its in-component array)". Replace "keep the minimalist editorial aesthetic" with "keep the formal academic aesthetic with no animation".

- [ ] **Step 2: Update `README.md` and `SETUP.md`**

Run: `grep -n -iE "publication|contact|formspree|projects|hero|about|aboutMe|accentColor|accent-2|reveal|nav link" README.md SETUP.md`

Apply these facts to every hit, rewriting each sentence so it is true:

| Old claim | New fact |
|---|---|
| Sections: Hero, Talks, About, Projects, Publications, Experience, Education, Contact | Sections: sidebar (portrait, CV, socials, affiliations, Talks), Bio, Research (Featured + full list), Experience, Education, Skills, Writing |
| Publications live in `Publications.astro` with domain filters | Removed; research projects with materials live in `siteConfig.research` |
| Contact form via Formspree in `Contact.astro` | Removed; no contact form; profiles are linked in the sidebar |
| `aboutMe`, flat `skills`, `projects` in config | `bio`, grouped `skills`, `research` |
| Portrait referenced in `Hero.astro` | Portrait path is `siteConfig.portrait` (also used by JSON-LD) |
| "Download CV" link in `Hero.astro` | CV path is `siteConfig.cv` |
| Accent via `--accent` / `--accent-2` | Accent via `--accent` (light and `[data-theme="dark"]`) in `global.css` |
| Empty arrays hide sections and nav links | Empty arrays hide sections (there is no nav) |
| Non-academic users remove `<Publications />` | Non-academic users can remove `<Research />` or `<Talks />` |

In `SETUP.md`'s checklist, replace the Publications and Contact items with: `- [ ] Research projects, featured picks, materials, videos → siteConfig.research in src/config.ts`.

- [ ] **Step 3: Update `public/llms.txt`**

1. Replace the "Home / portfolio" line with:

```
- [Home](https://royshidhartho.github.io/): bio, research (featured projects with papers and materials), talks, experience, education, skills
```

2. Replace the whole "## Contact" section with:

```
## Contact
- Through the profiles above (email intentionally not published)
```

- [ ] **Step 4: Verify docs no longer describe removed parts**

Run: `grep -n -iE "Publications\.astro|Contact\.astro|Hero\.astro|About\.astro|formspree|scroll-reveal|scrollspy|#contact|aboutMe|accentColor" CLAUDE.md README.md SETUP.md public/llms.txt`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md README.md SETUP.md public/llms.txt
git commit -m "Update docs and llms.txt for the academic redesign

Describe the single-page layout, research model, materials, video,
and tests; drop references to the removed Publications, Contact, Hero,
and About sections and to the contact form.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Final verification and push

**Files:** none changed unless a check fails.

- [ ] **Step 1: Full automated checks**

```bash
npm test
npm run build
grep -nE "transition|animation|@keyframes|transform|\.reveal|\.rise|radial-gradient" src/styles/global.css
grep -rnE "Hero|About\.astro|Projects\.astro|Publications|Contact\.astro|aboutMe|accentColor|reveal" src/components src/pages src/lib src/styles src/config.ts
ls dist/index.html dist/blog/index.html dist/sitemap-index.xml
```

Expected: tests pass; build completes; both greps print nothing; the three files exist.

- [ ] **Step 2: Production preview checks**

Run `npm run preview` and check http://localhost:4321 at desktop width and 375px, light and dark:
- Three featured cards on one row (desktop); stacked on mobile.
- No horizontal page scroll at 375px on `/`, `/blog/`, and a post page.
- Theme persists across reload and between `/` and `/blog/`.
- Talks box scrolls internally; Blog ↗ and Writing links open new tabs.
- View source of `/` contains the `Person` JSON-LD with `"description"` set and no email address.

- [ ] **Step 3: Screenshots for review**

Capture desktop light, desktop dark, and 375px light of `/` into `_screens/academic-*.png` (untracked; do not commit) and show them to Sid.

- [ ] **Step 4: Push the feature branch (only with Sid's OK)**

```bash
git push -u origin redesign/academic
```

Report one line: `<short-sha> Academic single-page redesign (pushed to redesign/academic)`. Do not open a PR; Sid reviews and merges to `master` (which deploys).
