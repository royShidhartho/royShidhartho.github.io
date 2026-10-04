import { test } from "node:test";
import assert from "node:assert/strict";
import { groupByCategory, groupByYear, type Publication } from "./publications.ts";

const pub = (title: string, year: number): Publication =>
  ({ title, authors: "S. Roy", venue: "V", year, type: "Journal" });

test("groupByYear groups newest year first and keeps input order within a year", () => {
  const input = [pub("a", 2021), pub("b", 2024), pub("c", 2021), pub("d", 2026), pub("e", 2024)];
  const groups = groupByYear(input);
  assert.deepEqual(groups.map((g) => g.year), [2026, 2024, 2021]);
  assert.deepEqual(groups.map((g) => g.items.map((p) => p.title)), [["d"], ["b", "e"], ["a", "c"]]);
  assert.deepEqual(input.map((p) => p.title), ["a", "b", "c", "d", "e"], "input is not mutated");
});

test("groupByYear returns [] for no publications", () => {
  assert.deepEqual(groupByYear([]), []);
});

test("groupByCategory splits journals, conference work (with abstracts), and preprints, each by year", () => {
  const p = (title: string, year: number, type: Publication["type"]): Publication =>
    ({ title, authors: "S. Roy", venue: "V", year, type });
  const input = [
    p("conf21", 2021, "Conference"),
    p("abs26", 2026, "Abstract"),
    p("jour22", 2022, "Journal"),
    p("arx20", 2020, "Preprint"),
    p("conf26", 2026, "Conference"),
  ];
  const groups = groupByCategory(input);
  assert.deepEqual(groups.map((g) => g.label), ["Journal Articles", "Conference Papers & Abstracts", "Preprints"]);
  assert.deepEqual(
    groups.map((g) => g.years.map((y) => [y.year, y.items.map((x) => x.title)])),
    [
      [[2022, ["jour22"]]],
      [[2026, ["abs26", "conf26"]], [2021, ["conf21"]]],
      [[2020, ["arx20"]]],
    ],
  );
});

test("groupByCategory omits empty categories", () => {
  const groups = groupByCategory([pub("only", 2024)]);
  assert.deepEqual(groups.map((g) => g.label), ["Journal Articles"]);
  assert.deepEqual(groupByCategory([]), []);
});
