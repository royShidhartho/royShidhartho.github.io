# Archived blog

The blog was taken off the live site on 2026-10-03. Everything it needs is kept here, in the
same folder layout it had under the repo root, so restoring is a move back.

| Archived file | Restore to |
|---|---|
| `src/pages/blog/index.astro` | `src/pages/blog/index.astro` (blog listing at `/blog/`) |
| `src/pages/blog/[slug].astro` | `src/pages/blog/[slug].astro` (one page per post) |
| `src/components/BlogCard.astro`, `FeaturedPost.astro` | `src/components/` (used by the listing) |
| `src/components/Writing.astro` | `src/components/` (the home page's "Writing" section) |
| `src/posts/*.md` | `src/posts/` (the two posts) |

Still in place and unused while archived: the blog styles in `src/styles/global.css`
(`.blog-*`, `.post-*`, `.featured-post*`, `.article*`, `.chip*`, `.prose`), the `blogPostingSchema`
and `breadcrumbSchema` builders in `src/lib/seo.ts`, and the post images in `public/images/blog/`.

## Restore

```bash
git mv _archive/blog/src/pages/blog src/pages/blog
git mv _archive/blog/src/components/BlogCard.astro _archive/blog/src/components/FeaturedPost.astro _archive/blog/src/components/Writing.astro src/components/
mkdir -p src/posts && git mv _archive/blog/src/posts/*.md src/posts/
```

Then:

1. In `src/pages/index.astro`, import `Writing` and render `<Writing />` after `<Skills />`.
2. In `src/components/Header.astro`, add the Blog link back inside `.hdr-actions`, before the
   theme toggle:

   ```astro
   {
     home ? (
       <a class="pill-link" href="/blog/" target="_blank" rel="noopener">
         Blog <span aria-hidden="true">↗</span>
       </a>
     ) : (
       <a class="pill-link" href="/blog/">Blog</a>
     )
   }
   ```

3. In `src/styles/global.css`, change `@source not "../../_archive";` back to
   `@source not "../posts";` (post text otherwise makes Tailwind emit unused utilities).
4. Add the Blog line back to `public/llms.txt`, and run `npm run build`.
