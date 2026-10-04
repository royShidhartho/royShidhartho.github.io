import type { MaterialKey } from "./research.ts";

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  /** Volume, issue, pages, or article number, as printed after the venue. */
  details?: string;
  year: number;
  type: "Journal" | "Conference" | "Abstract" | "Preprint";
  award?: string;
  materials?: Partial<Record<MaterialKey, string>>;
  bibtex?: string;
};

export type YearGroup = { year: number; items: Publication[] };

/** Newest year first; papers within a year keep their config order. */
export function groupByYear(pubs: readonly Publication[]): YearGroup[] {
  const groups = new Map<number, Publication[]>();
  for (const pub of pubs) {
    const items = groups.get(pub.year) ?? [];
    items.push(pub);
    groups.set(pub.year, items);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, items]) => ({ year, items }));
}

export type CategoryGroup = { label: string; years: YearGroup[] };

/** Section order and membership; meeting abstracts sit with conference papers. */
const CATEGORIES: { label: string; types: Publication["type"][] }[] = [
  { label: "Journal Articles", types: ["Journal"] },
  { label: "Conference Papers & Abstracts", types: ["Conference", "Abstract"] },
  { label: "Preprints", types: ["Preprint"] },
];

/** Journal, conference, and preprint groups, each split by year; empty groups are dropped. */
export function groupByCategory(pubs: readonly Publication[]): CategoryGroup[] {
  return CATEGORIES.map(({ label, types }) => ({
    label,
    years: groupByYear(pubs.filter((pub) => types.includes(pub.type))),
  })).filter((group) => group.years.length > 0);
}
