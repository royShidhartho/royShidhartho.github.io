# Custom domain (shidhartho.com) — plan

_Date: 2026-10-03 · Status: proposed_

**Goal:** serve the site at `https://shidhartho.com` instead of `https://royshidhartho.github.io`.

**Approach:** keep GitHub Pages as the host and point the new domain at it. Pages is free, already
deploys on every push to `master`, and issues the HTTPS certificate itself. Visitors never see
`github.io`, and the old address 301-redirects to the new one automatically, so existing links
(Scholar, LinkedIn, the CV, search results) keep working. Nothing about the repo or workflow moves.

Moving to another host (Cloudflare Pages, Netlify) is possible later but buys nothing for a static
one-page site.

## Who does what

| Step | Who | Where |
|---|---|---|
| 1. Merge `redesign/academic` → `master` | You | GitHub (compare/PR) |
| 2. Buy the domain | You | Registrar |
| 3. Verify the domain with GitHub | You (I can walk you through it) | GitHub account settings + registrar DNS |
| 4. Add DNS records | You | Registrar DNS |
| 5. Set the custom domain and enforce HTTPS | You | Repo Settings → Pages |
| 6. Change the site URL in the code | Me, on a feature branch | Repo |
| 7. Search engines and profile links | You | Search Console, Scholar, LinkedIn, CV |

Steps 1 and 2 can happen in any order. Do step 6 only after step 5 works, so the canonical URLs
never point at an address that doesn't resolve yet.

## 1. Merge the redesign

Merge `redesign/academic` into `master` (you do this). The deploy workflow publishes it to
`royshidhartho.github.io`, and everything below then carries over to the new domain.

## 2. Buy the domain

- **The GoDaddy $0.01 offer requires a 3-year term.** Expect to pay roughly $0.01 + 2 × $22.99 at
  checkout (≈ $46 plus an ICANN fee), then about $23/yr or more at renewal.
- **Cheaper long-term alternatives:** Cloudflare Registrar (sells at cost, roughly $10–11/yr for
  `.com`, no markup on renewal) or Porkbun (similar). Over three years, either costs about $32–35.
- **At checkout, decline the add-ons:** website builder, email, "full domain protection", SSL
  certificate (GitHub provides HTTPS free), and the premium DNS. Keep free WHOIS privacy on.
- **Turn on auto-renew.** If the domain lapses, the site goes down and the name can be bought by
  a squatter.

## 3. Verify the domain with GitHub (prevents takeover)

1. GitHub → your avatar → **Settings → Pages → Add a domain** → `shidhartho.com`.
2. GitHub shows a TXT record. At the registrar, add:

   | Type | Name/Host | Value |
   |---|---|---|
   | TXT | `_github-pages-challenge-royShidhartho` | the code GitHub shows |

3. Wait a few minutes, then click **Verify**. You can leave the TXT record in place.

## 4. DNS records at the registrar

First delete the registrar's default records for `@` and `www` (GoDaddy adds a "Parked" A record
and a `www` CNAME to its parking page). Then add:

| Type | Name/Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `royshidhartho.github.io` |

If you use Cloudflare, set these records to **DNS only** (grey cloud), not proxied, so GitHub can
issue the certificate.

Check propagation from a terminal:

```bash
dig +short shidhartho.com
```

```bash
dig +short www.shidhartho.com
```

The first should list the four `185.199.x.153` addresses; the second should end in
`royshidhartho.github.io`.

## 5. Point the repo at the domain

1. Repo **Settings → Pages → Custom domain** → `shidhartho.com` → **Save**.
2. Wait for "DNS check successful" (minutes to an hour).
3. Tick **Enforce HTTPS** once it becomes available (the certificate can take up to 24 h).

No `CNAME` file is needed: the site deploys with a GitHub Actions workflow, and GitHub ignores
that file for workflow deployments; the Settings field is the source of truth. `www.shidhartho.com`
redirects to `shidhartho.com` automatically, and so does `royshidhartho.github.io`.

## 6. Code changes (I do these on a feature branch)

Replace `https://royshidhartho.github.io` with `https://shidhartho.com` in:

- `astro.config.mjs` — `site` (drives canonical links, Open Graph URLs, JSON-LD, the sitemap)
- `src/components/Seo.astro` and `src/lib/seo.ts` — the fallback site URL
- `public/robots.txt` — the `Sitemap:` line
- `public/llms.txt` — the Home and CV links
- `README.md` (the "Live example" link only; the clone URL stays, since the repo name doesn't
  change) and `CLAUDE.md` (the `site` and Live URL lines)

Then build and check that the canonical URL, `og:url`, and sitemap show the new domain. You merge
that branch the same way as step 1.

## 7. After it's live

- **Google Search Console:** add a **Domain** property for `shidhartho.com` (verified by a DNS TXT
  record), submit `https://shidhartho.com/sitemap-index.xml`, then use **Change of address** from
  the old `royshidhartho.github.io` property. Keep `public/google25975d4a2e33b645.html`, which
  verifies the old property.
- **Update your links:** Google Scholar homepage, LinkedIn, ResearchGate, ORCID, the GitHub profile
  website field, the CV PDF, and your email signature. The old URL keeps redirecting, so this is
  cleanup, not an emergency.
- **Optional email:** `you@shidhartho.com` forwarding to your inbox is free with Cloudflare Email
  Routing or ImprovMX. Skip the registrar's paid mailbox.

## Checklist

- [ ] Merge `redesign/academic` → `master`
- [ ] Buy `shidhartho.com` (3-year GoDaddy deal or Cloudflare/Porkbun), auto-renew on, add-ons off
- [ ] Verify the domain in GitHub account settings (TXT record)
- [ ] Remove the parked records; add 4 A, 4 AAAA, and the `www` CNAME
- [ ] Set the custom domain in repo Settings → Pages; enforce HTTPS
- [ ] Code: switch `site` and the hardcoded URLs to `https://shidhartho.com` (feature branch), then merge
- [ ] Search Console Domain property, sitemap, Change of address
- [ ] Update Scholar, LinkedIn, ResearchGate, ORCID, GitHub profile, CV, and email signature
