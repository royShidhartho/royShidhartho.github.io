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
