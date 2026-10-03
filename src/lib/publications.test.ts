import { test } from "node:test";
import assert from "node:assert/strict";
import { groupByYear, type Publication } from "./publications.ts";

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
