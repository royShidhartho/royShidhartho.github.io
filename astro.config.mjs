// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Canonical origin — required for canonical URLs, OpenGraph, and the sitemap.
  // GitHub Pages serves the user site at the lowercase host.
  site: "https://royshidhartho.github.io",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
