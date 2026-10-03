import { test } from "node:test";
import assert from "node:assert/strict";
import { authorList, doiOf, scholarlyArticle } from "./schema.ts";
import type { Publication } from "./publications.ts";

const ME = "https://shidhartho.com/#person";

test("doiOf extracts the DOI from a doi.org URL and rejects anything else", () => {
  assert.equal(doiOf("https://doi.org/10.1117/1.JBO.29.S3.S33310"), "10.1117/1.JBO.29.S3.S33310");
  assert.equal(doiOf("http://dx.doi.org/10.1109/ACCESS.2021.3077006"), "10.1109/ACCESS.2021.3077006");
  assert.equal(doiOf("https://arxiv.org/pdf/2109.13200"), undefined);
  assert.equal(doiOf(undefined), undefined);
});

test("authorList links the site owner by @id and keeps everyone else as a named Person", () => {
  assert.deepEqual(authorList("A. Duong, S. Roy, S. Wood", "S. Roy", ME), [
    { "@type": "Person", name: "A. Duong" },
    { "@id": ME },
    { "@type": "Person", name: "S. Wood" },
  ]);
});

test("scholarlyArticle uses the DOI as url and identifier and lists free copies in sameAs", () => {
  const pub: Publication = {
    title: "Melanin and FD-NIRS",
    authors: "S. Roy, S. Wood",
    venue: "Journal of Biomedical Optics",
    year: 2024,
    type: "Journal",
    materials: {
      pdf: "https://pmc.ncbi.nlm.nih.gov/x.pdf",
      doi: "https://doi.org/10.1117/1.JBO.29.S3.S33310",
    },
  };
  assert.deepEqual(scholarlyArticle(pub, "S. Roy", ME), {
    "@type": "ScholarlyArticle",
    name: "Melanin and FD-NIRS",
    headline: "Melanin and FD-NIRS",
    datePublished: "2024",
    author: [{ "@id": ME }, { "@type": "Person", name: "S. Wood" }],
    isPartOf: { "@type": "Periodical", name: "Journal of Biomedical Optics" },
    url: "https://doi.org/10.1117/1.JBO.29.S3.S33310",
    identifier: { "@type": "PropertyValue", propertyID: "DOI", value: "10.1117/1.JBO.29.S3.S33310" },
    sameAs: ["https://pmc.ncbi.nlm.nih.gov/x.pdf"],
  });
});

test("scholarlyArticle falls back to a free copy for url and omits empty fields", () => {
  const pub: Publication = {
    title: "fNIRS abstract",
    authors: "S. Roy",
    venue: "fNIRS 2024",
    year: 2024,
    type: "Abstract",
    materials: { pdf: "https://fnirs.org/a.pdf" },
  };
  const out = scholarlyArticle(pub, "S. Roy", ME);
  assert.equal(out.url, "https://fnirs.org/a.pdf");
  assert.deepEqual(out.isPartOf, { "@type": "CreativeWork", name: "fNIRS 2024" });
  assert.equal("identifier" in out, false);
  assert.equal("sameAs" in out, false);

  const bare = scholarlyArticle({ ...pub, materials: undefined }, "S. Roy", ME);
  assert.equal("url" in bare, false);
});
