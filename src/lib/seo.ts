import { siteConfig } from "../config";
import { scholarlyArticle } from "./schema";

/**
 * JSON-LD structured-data builders.
 *
 * These power both Google rich results and AI/LLM answer engines, which parse
 * schema.org markup more reliably than prose. Each builder returns a plain
 * object that <Seo /> serializes into a <script type="application/ld+json">.
 *
 * Privacy: email is intentionally never included (see config.ts).
 */

const FALLBACK_SITE = "https://shidhartho.com";

/** Resolve a path to an absolute URL against the configured site origin. */
export function abs(path: string, site: string | URL = FALLBACK_SITE): string {
  return new URL(path, site.toString()).href;
}

export type PostMeta = {
  slug: string;
  title: string;
  description?: string;
  pubDate: string;
  author?: string;
  image?: string;
  tags?: string[];
};

export type Crumb = { name: string; path: string };

/** Stable identifiers that tie the home page's entities together. */
export const personId = (site: string | URL = FALLBACK_SITE) => abs("/#person", site);
export const websiteId = (site: string | URL = FALLBACK_SITE) => abs("/#website", site);

/** schema.org/Person — the homepage's primary entity. */
export function personSchema(site: string | URL = FALLBACK_SITE) {
  const [givenName, ...rest] = siteConfig.name.split(" ");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(site),
    name: siteConfig.name,
    givenName,
    familyName: rest.join(" "),
    alternateName: [siteConfig.authorName, "Sid Roy"],
    url: abs("/", site),
    image: abs(siteConfig.portrait, site),
    jobTitle: "PhD Student in Biomedical Engineering",
    description: siteConfig.description,
    affiliation: [
      {
        "@type": "CollegeOrUniversity",
        name: "Carnegie Mellon University",
        url: "https://www.cmu.edu",
      },
      ...siteConfig.affiliations.map((a) => ({
        "@type": "ResearchOrganization",
        name: a.name,
        url: a.url,
      })),
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Carnegie Mellon University" },
      {
        "@type": "CollegeOrUniversity",
        name: "Khulna University of Engineering and Technology",
      },
    ],
    knowsAbout: [
      "Virtual reality",
      "Human-computer interaction",
      "Translational biomedical devices",
      "Wearable physiological sensing",
      "Electroencephalography (EEG)",
      "Near-infrared spectroscopy (NIRS)",
      "Frequency-domain near-infrared spectroscopy",
      "Pain biomarkers",
      "Thermal pain testing",
      "Biomedical signal processing",
      "Machine learning",
      "Sickle cell disease",
    ],
    // LinkedIn / ResearchGate / Google Scholar / GitHub (no email).
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

/** schema.org/WebSite — sitewide site identity. */
export function websiteSchema(site: string | URL = FALLBACK_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(site),
    name: `${siteConfig.name} — Research Portfolio`,
    url: abs("/", site),
    description: siteConfig.description,
    inLanguage: "en",
    author: { "@id": personId(site) },
    publisher: { "@id": personId(site) },
  };
}

/** schema.org/ProfilePage — Google's documented type for a page about one person. */
export function profilePageSchema(site: string | URL = FALLBACK_SITE, modified: Date = new Date()) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": abs("/", site),
    url: abs("/", site),
    name: `${siteConfig.name} — ${siteConfig.title}`,
    isPartOf: { "@id": websiteId(site) },
    mainEntity: { "@id": personId(site) },
    // Google requires a full ISO 8601 datetime with a time zone, not a bare date.
    dateModified: modified.toISOString().replace(/\.\d{3}Z$/, "Z"),
    inLanguage: "en",
  };
}

/**
 * Everything on the home page as one linked @graph: the site, the profile
 * page, the person, and each publication with the person as an author.
 */
export function homeGraph(site: string | URL = FALLBACK_SITE, modified: Date = new Date()) {
  const strip = ({ "@context": _ctx, ...rest }: Record<string, unknown>) => rest;
  return {
    "@context": "https://schema.org",
    "@graph": [
      strip(websiteSchema(site)),
      strip(profilePageSchema(site, modified)),
      strip(personSchema(site)),
      ...siteConfig.publications.map((pub) =>
        scholarlyArticle(pub, siteConfig.authorName, personId(site)),
      ),
    ],
  };
}

/** schema.org/BlogPosting — one per blog post. */
export function blogPostingSchema(post: PostMeta, site: string | URL = FALLBACK_SITE) {
  const url = abs(`/blog/${post.slug}/`, site);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.title,
    datePublished: post.pubDate,
    dateModified: post.pubDate,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.name,
      url: abs("/", site),
    },
    publisher: { "@type": "Person", name: siteConfig.name },
    image: post.image ? abs(post.image, site) : abs("/og-image.png", site),
    url,
    mainEntityOfPage: url,
    ...(post.tags && post.tags.length
      ? { keywords: post.tags.join(", ") }
      : {}),
  };
}

/** schema.org/BreadcrumbList — navigational trail for blog pages. */
export function breadcrumbSchema(items: Crumb[], site: string | URL = FALLBACK_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path, site),
    })),
  };
}
