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

test("renderInline does not apply markup inside link URLs", () => {
  assert.equal(renderInline("==see [x](https://u.com/?q=z==) now=="),
    '<mark>see <a href="https://u.com/?q=z==" target="_blank" rel="noopener noreferrer">x</a> now</mark>');
});

test("renderInline rejects unsafe URL schemes", () => {
  assert.equal(renderInline("[x](javascript:alert(1))"), "[x](javascript:alert(1))");
  assert.equal(renderInline("[x](data:text/html,<script>)"), "[x](data:text/html,&lt;script&gt;)");
});

test("renderInline does not expand $ patterns in link HTML", () => {
  assert.equal(renderInline("[a $& b](https://u.com/?p=$&)"),
    '<a href="https://u.com/?p=$&amp;" target="_blank" rel="noopener noreferrer">a $&amp; b</a>');
});
