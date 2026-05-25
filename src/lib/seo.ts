import { siteConfig } from "../config";

/**
 * JSON-LD structured-data builders.
 *
 * These power both Google rich results and AI/LLM answer engines, which parse
 * schema.org markup more reliably than prose. Each builder returns a plain
 * object that <Seo /> serializes into a <script type="application/ld+json">.
 *
 * Privacy: email is intentionally never included (see config.ts / HANDOFF.md).
 */

const FALLBACK_SITE = "https://royshidhartho.github.io";

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

/** schema.org/Person — the homepage's primary entity. */
export function personSchema(site: string | URL = FALLBACK_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: abs("/", site),
    image: abs("/images/blog/potrait_card.jpeg", site),
    jobTitle: "PhD Student in Biomedical Engineering",
    description: siteConfig.aboutMe,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Carnegie Mellon University",
      url: "https://www.cmu.edu",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Carnegie Mellon University" },
      {
        "@type": "CollegeOrUniversity",
        name: "Khulna University of Engineering and Technology",
      },
    ],
    knowsAbout: [
      "Electroencephalography (EEG)",
      "Near-infrared spectroscopy (NIRS)",
      "Frequency-domain near-infrared spectroscopy",
      "Pain biomarkers",
      "Neuroimaging",
      "Biomedical signal processing",
      "Machine learning",
      "Extended reality",
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
    name: `${siteConfig.name} — Research Portfolio`,
    url: abs("/", site),
    description: siteConfig.description,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name },
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
