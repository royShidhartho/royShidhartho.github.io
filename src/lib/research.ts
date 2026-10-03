import { escapeHtml } from "./inline.ts";

/** `preprint` is a free copy (e.g. arXiv) of a paper whose published version is paywalled. */
export type MaterialKey = "pdf" | "preprint" | "doi" | "poster" | "slides" | "code" | "data";

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

export const MATERIAL_ORDER: readonly MaterialKey[] = ["pdf", "preprint", "doi", "poster", "slides", "code", "data"];

export const MATERIAL_LABELS: Record<MaterialKey, string> = {
  pdf: "PDF",
  preprint: "Preprint",
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
