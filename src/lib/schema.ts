import type { Publication } from "./publications.ts";

/**
 * Pure schema.org builders for publications. Kept free of `siteConfig` so
 * they can be unit-tested with `node --test`; `seo.ts` wires them to config.
 */

type Ref = { "@id": string };
type NamedPerson = { "@type": "Person"; name: string };

/** The bare DOI ("10.x/…") from a doi.org URL, or undefined for any other link. */
export function doiOf(url: string | undefined): string | undefined {
  const m = url?.match(/^https?:\/\/(?:dx\.)?doi\.org\/(10\..+)$/);
  return m?.[1];
}

/** Comma-separated author string → schema.org authors; the site owner becomes a reference. */
export function authorList(authors: string, ownerName: string, ownerId: string): (Ref | NamedPerson)[] {
  return authors
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => (name === ownerName ? { "@id": ownerId } : { "@type": "Person", name }));
}

/** One ScholarlyArticle, linked to the site owner by @id and to the paper by DOI. */
export function scholarlyArticle(pub: Publication, ownerName: string, ownerId: string) {
  const { doi, pdf, preprint } = pub.materials ?? {};
  const url = doi ?? pdf ?? preprint;
  const doiValue = doiOf(doi);
  const sameAs = [pdf, preprint].filter((u): u is string => Boolean(u) && u !== url);

  return {
    "@type": "ScholarlyArticle",
    name: pub.title,
    headline: pub.title,
    datePublished: String(pub.year),
    author: authorList(pub.authors, ownerName, ownerId),
    isPartOf: { "@type": pub.type === "Journal" ? "Periodical" : "CreativeWork", name: pub.venue },
    ...(url ? { url } : {}),
    ...(doiValue ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: doiValue } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
