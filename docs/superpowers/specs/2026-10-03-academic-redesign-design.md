# Academic single-page redesign — design spec

_Date: 2026-10-03 · Status: approved in brainstorming, pending spec review_

## Goal

Replace the current portfolio-style home page with a stripped-down, formal academic page modeled on
[hyunsungcho.com](https://hyunsungcho.com/): a single page, no animation, a two-column card layout,
and a slightly more upbeat palette than the reference. The light/dark theme switcher stays. The
blog stays a separate page.

Reference mockups (throwaway, not part of the build): `public/_mockup.html` (overall layout) and
`public/_featured.html` (featured research, layout A).

## Decisions

| Topic | Decision |
|---|---|
| Structure | Single page, no section nav, no tabs |
| Motion | None: no scroll reveal, no hover transforms, no gradients, no animated overlay |
| Removed sections | Publications, Contact |
| Kept sections | Talks, bio (About), Research (Projects), Experience, Education, Skills, blog links |
| Blog | Separate pages at `/blog`; home links to it with a ↗ sign and `target="_blank"` |
| Theme | Light/dark switcher kept; system-aware, no-flash script kept |
| Accent | CMU red: `#a6192e` light, `#ef7d8c` dark |
| Fonts | Hanken Grotesk (body/UI) + Fraunces italic (accents), per `CLAUDE.md` |
| Featured research | 3 cards in **one row** (layout A), then the full list of 5 projects |
| Full list | The 5 research projects, each with its main paper citation; not all 21 papers |
| Video | Click-to-load in a full-width overlay (native `<dialog>`); no autoplay |
| Portrait | `public/images/blog/potrait_card.jpeg` (already used by the JSON-LD) |

## Page layout

```
┌───────────────────────────────────────────────────────────────┐
│ SHIDHARTHO ROY                               [Blog ↗]  [☀/☾] │
│ PhD Student, Biomedical Engineering · CMU (Fraunces italic)   │
├═══════════════════════════ accent top rule ═══════════════════┤
│ ┌ aside (260px) ─┐  ┌ main ────────────────────────────────┐  │
│ │ portrait       │  │ Bio (3 paragraphs, highlighted terms)│  │
│ │ CV (PDF)       │  │ — Research                           │  │
│ │ social icons   │  │   FEATURED  [card][card][card]       │  │
│ │ Affiliations   │  │   ALL RESEARCH  (5 rows)             │  │
│ │ ┌ Talks box ─┐ │  │ — Experience                         │  │
│ │ │ scrollable │ │  │ — Education                          │  │
│ │ └────────────┘ │  │ — Skills & Methods                   │  │
│ └────────────────┘  │ — Writing (from the blog ↗)          │  │
│                     └──────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
                 © 2026 Shidhartho Roy · Last updated …
```

- Warm off-white page background; a single white card with a 3px accent top border.
- Below 820px: the card becomes one column; the aside becomes a portrait-plus-links row with the
  Talks box below it; the featured cards stack; date columns collapse above their content.
- The page body never scrolls horizontally at 375px.

## Visual tokens (in `src/styles/global.css`)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f6f5f1` | `#111315` |
| `--card` | `#ffffff` | `#181b1e` |
| `--text` | `#1b1c1e` | `#e7e6e2` |
| `--text-muted` | `#5e6166` | `#a3a6aa` |
| `--text-faint` | `#8a8d92` | `#7b7f84` |
| `--border` | `#e4e2dc` | `#2a2e33` |
| `--soft` | `#f1f0eb` | `#1f2327` |
| `--accent` | `#a6192e` | `#ef7d8c` |
| `--accent-soft` | `rgba(166,25,46,.08)` | `rgba(239,125,140,.12)` |
| `--mark` (bio highlight) | `#f6dfe2` | `rgba(239,125,140,.20)` |
| `--poster` / `--poster-soft` (Poster tag, award badge) | `#a15c07` / `rgba(161,92,7,.10)` | `#e2a356` / `rgba(226,163,86,.13)` |

Upbeat touches: highlighted key phrases in the bio, colored Talk/Poster tags, accent dash before
each `h2`, Fraunces italic numerals and subtitles, accent top rule on the card.

## Content model (`src/config.ts`)

New or changed fields on `siteConfig`:

```ts
subtitle: "PhD Student, Biomedical Engineering · Carnegie Mellon University",
authorName: "S. Roy",            // bolded wherever it appears in an author list
portrait: "/images/blog/potrait_card.jpeg",
cv: "/files/shidhartho-roy-cv.pdf",
bio: string[],                   // paragraphs; ==term== → <mark>, **term** → <strong>
affiliations: { name: string; url: string }[],
skills: { label: string; items: string[] }[],   // grouped rows, replaces the flat list
research: ResearchItem[],        // replaces `projects`
education: { degree: string; school: string; dateRange: string; note?: string; awards?: string[] }[],
                                 // `achievements` split into a one-line note (e.g. GPA) and award badges
```

`experience` keeps its current shape and full bullet text.

```ts
type MaterialKey = "pdf" | "doi" | "poster" | "slides" | "code" | "data";

type ResearchItem = {
  slug: string;                  // also the folder name under public/files/research/
  title: string;                 // project title, shown in the full list and cards
  summary: string;               // 1–2 sentences; cards show it, the list shows it only if there is no citation
  year: number | "In progress";
  citation?: { authors: string; venue: string; year: number };
  award?: string;                // e.g. "JBO 2024 Top Paper"
  featured?: boolean;            // exactly 3 items should be featured
  image?: string;                // teaser figure (16:9), required for a good-looking featured card
  video?: { youtube: string } | { src: string; poster?: string };
  materials?: Partial<Record<MaterialKey, string>>;
  bibtex?: string;
};
```

- Removed from `siteConfig`: `projects`, `publications`, `accentColor`, `skills` (flat), `aboutMe`.
  `personSchema` in `src/lib/seo.ts` switches its `description` from `aboutMe` to `description`.
- Talks stay in `Talks.astro`'s in-component array (unchanged data, new presentation).
- Self-hosted material files live in `public/files/research/<slug>/`.
- Initial featured set: melanin FD-NIRS (JBO 2024, award), EEG pain biomarkers in SCD (J. Pain 2026),
  optode sensor (SPIE 2026). XR paradigm is "In progress" with no materials.

## Components

| Component | Status | Responsibility |
|---|---|---|
| `Header.astro` | rewrite | Name, subtitle, Blog ↗ link, theme toggle. Only script: theme toggle. On blog pages the name links home. |
| `Sidebar.astro` | new | Portrait, CV link, social icons, affiliations, `<Talks />` |
| `Talks.astro` | restyle | Same data; renders as the scrollable sidebar box with Talk/Poster tags; `COLLAPSE_AFTER` and its script removed |
| `Bio.astro` | new | Renders `siteConfig.bio` with the `==`/`**` inline markup |
| `Research.astro` | new | "Featured" row (3-column grid) + "All research" list |
| `FeaturedCard.astro` | new | Media (image + play button or "Video coming soon"), award, title, summary, citation, materials |
| `Materials.astro` | new | Material buttons in fixed order PDF · Paper · Poster · Slides · Code · Data · Video · BibTeX; renders only those present |
| `VideoDialog.astro` | new | One shared `<dialog>`; opening sets the iframe/video source; closing (Esc, ✕, backdrop) clears it |
| `Experience.astro`, `Education.astro` | restyle | Date column + content rows; education awards as small badges |
| `Skills.astro` | new | `<dl>` of grouped skills |
| `Writing.astro` | new | Up to 5 latest posts from `src/posts/*.md` (newest first) plus an "All posts ↗" link; all links open in a new tab |
| `Footer.astro` | rewrite | One centered line: © year, name, last-updated month |
| `Hero`, `About`, `Projects`, `Publications`, `Contact` | delete | Superseded; the 21-paper list remains in git history |
| `BlogCard`, `FeaturedPost`, blog pages | restyle | New tokens; no animation; keep `.prose` |

## Behavior

- **Materials:** each is an `<a>` opening in a new tab. "Paper" is the DOI link. Missing keys
  render nothing; an item with no materials shows a dashed "Materials when published" note.
- **BibTeX:** a `<button>` that copies `bibtex` to the clipboard and changes its label to
  "Copied" for 2 s. Hidden without JS (uses the existing `.js` class on `<html>`).
- **Video:** the play button is an `<a>` whose `href` is the YouTube watch URL or the MP4 file, so
  it works without JS. With JS it opens the shared `<dialog>` (max-width 960px, 16:9) and loads a
  `youtube-nocookie.com/embed/<id>?autoplay=1` iframe or a `<video controls autoplay>`; closing
  removes the source so playback stops. No CSS transitions.
- **Video placeholder:** featured items without `video` show the teaser image with a
  "Video coming soon" badge and no play button. Items without `image` show a striped placeholder.
- **Theme:** unchanged mechanism (`data-theme`, `localStorage.theme`, no-flash inline script on all
  three page entry points).
- **Motion:** `global.css` contains no `transition`, `animation`, or `transform` on hover;
  `.reveal`, `.rise`, scrollspy, and glass/gradient styles are deleted.

## Docs and discoverability

- Update `CLAUDE.md`, `README.md`, and `SETUP.md` to describe the new sections, the `research`
  model, materials, and video, and to drop Publications/Contact.
- `public/llms.txt`: replace the "Contact" section (the form no longer exists) with profile links;
  keep "Selected publications".
- `Seo.astro` and JSON-LD otherwise unchanged.

## Branching

1. Commit the in-progress aurora-glass work on `redesign/aurora-glass` as-is (explicit paths), so it
   is preserved and the working tree is clean.
2. Create `redesign/academic` from `master` and build there. This spec and the plan are its first
   commit.
3. Delete the throwaway `public/_mockup.html` and `public/_featured.html` before the first build.

## Verification

- `npm run build` passes with no TypeScript errors.
- Browser checks at desktop width and 375px, in light and dark: three featured cards on one row on
  desktop, no horizontal page scroll on mobile, theme persists across reload and onto `/blog`.
- Video dialog opens, plays, and closes with Esc, ✕, and backdrop click; playback stops on close.
  BibTeX copy works. With JS disabled, every material and video link still navigates.
- `grep` confirms no `transition`/`animation`/`.reveal` in `global.css` and no imports of deleted
  components.

## Open items (do not block the build)

- Real material links/files and BibTeX for each project; teaser figure for the optode project.
- Videos for the three featured projects (later).
