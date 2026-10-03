import { test } from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, renderInline } from "./inline.ts";

test("escapeHtml escapes the five HTML-significant characters", () => {
  assert.equal(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`),
    "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;");
});

test("renderInline turns ==term== into <mark>", () => {
  assert.equal(renderInline("study ==sickle cell disease== now"),
    "study <mark>sickle cell disease</mark> now");
});

test("renderInline turns **term** into <strong>", () => {
  assert.equal(renderInline("**equitable sensing**"), "<strong>equitable sensing</strong>");
});

test("renderInline makes external links open in a new tab", () => {
  assert.equal(renderInline("[CMU](https://www.cmu.edu/)"),
    '<a href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer">CMU</a>');
});

test("renderInline keeps internal links in the same tab", () => {
  assert.equal(renderInline("[CV](/files/cv.pdf)"), '<a href="/files/cv.pdf">CV</a>');
});

test("renderInline escapes raw HTML before applying markup", () => {
  assert.equal(renderInline("<script>x</script> ==a<b=="),
    "&lt;script&gt;x&lt;/script&gt; <mark>a&lt;b</mark>");
});
