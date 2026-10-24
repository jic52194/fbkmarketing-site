# fbkmarketing.com

Static rebuild of fbkmarketing.com (formerly a GoHighLevel funnel site). It uses a plain Node build script with no framework. GitHub Actions deploys `dist/` to GitHub Pages.

```
npm ci            # sharp is used only by `npm run images`
npm run build     # → dist/ (pages, sitemap.xml, robots.txt, llms.txt, CNAME, 404.html)
npm run check     # fails on broken internal links or pages with < 3 in-content links
python3 -m http.server 8765 --directory dist   # preview
```

- `content/home.mjs` holds the home page, which is the landing page that used to be at /social-media-fulfillment-faq.
- `content/pages.json` holds the copy of every other page, extracted from the live site on 2026-10-22 with the wording kept.
- `content/llms.txt` is published as /llms.txt.
- `scripts/lib.mjs` holds the layout, the Organization facts and the embed IDs. `scripts/build.mjs` defines every page plus its title and description.
- `scripts/images.mjs <dir>` is a one-time optimizer. It turned the originals from the live site into `static/img/*.webp`.
- `static/assets/t.js` is the first-party analytics and cookie notice, set with `data-site="fbkmarketing"`.
- `static/assets/fbk.js` (site-only, loaded after t.js): hides the sticky phone CTA while the page's own buttons are on screen, and sends conversion events to t.js: `checkout_view` on /get-started, `conversion` on the post-order thank-you page, and `embed_msg` (the name only of each message the GHL form iframes post, to find their submit message). CTA clicks are labelled `<label> [hero|closing|sticky|header|menu|footer|offer|faq]` via `data-track`.

## Pages (31 indexable)
- `/`: home (landing page: offer, system, infographics, objections, FAQ links)
- `/faq`, `/why-social-media-fulfillment`, `/contact`, `/join` (affiliate program)
- Service pages: `/1990-service-details`, `/1990-pricing-explanation`, `/why-choose-fbkmarketing`, `/platforms-managed`, `/content-tailoring`, `/content-control`, `/posting-frequency`, `/cancellation-policy`, `/measuring-success`, `/follower-engagement`, `/idea-sharing`
- Concern pages: `/overcoming-time-constraints`, `/overcoming-the-lack-of-expertise`, `/streamlining-content-creation`, `/maintaining-consistent-branding`, `/addressing-roi-concerns`, `/staying-ahead-of-algorithm-changes`, `/ad-budget-management`, `/engagement-and-customer-interaction`, `/keeping-up-with-competitors`, `/platform-selection`, `/fear-of-negative-feedback`, `/integration-with-marketing`
- Legal: `/terms-and-conditions`, `/privacy-policy`, `/affiliate-terms-and-conditions`

These pages are noindex and left out of the sitemap. Each one keeps its old URL:
- `/get-started`: the order form
- `/free-social-media-good-plan-thank-you-4143-3685`: the thank-you page
- `/fbk-signed-up-survey`: the onboarding form
- `/affiliate-survey`
- `/404.html`

These redirects use a meta refresh plus a canonical tag and are noindex:
- `/social-media-fulfillment-faq` → `/`
- `/social-media-fulfillment-faq-555433` → `/faq`
- `/request-quote` → `/get-started`

## Forms and embeds (all reused from the live GHL / LeadConnector account)
| Where | Embed | Goes to |
|---|---|---|
| `/get-started` | Published HighLevel order step from `ORDER_URL`. Funnel "$1990 SOCIAL MEDIA", step path `/signup`, page `p872M5Fx3lpbrxpAPJE3`, product "$1990 Per Month Social Media". A `/preview/` URL is rejected and is not used when `ORDER_URL` is unset. | The order form and payment, then the thank-you and onboarding steps |
| `/contact` | Form `evHxONGnDNzukyINPQ1i` "CONTACT US - FBK MARKETING" via `link.casperportal.net/widget/form/…` | A GHL contact in the FBK sub-account (location `DNB14sOqM0GayjGjxxSy`) |
| `/join` | Form `zMor6EzYVDY0kwiOBg6W` (affiliate sign-up; on the live site it opened as a pop-up) | GHL, then the affiliate survey |
| `/fbk-signed-up-survey` | Form `RJsQdEThq5ER5msGXBIZ` "FBK- ONBOARDING FORM" | GHL |
| `/affiliate-survey` | Survey `IJXP5wdeMmeZ69ItyvRW` | GHL |
| All pages except checkout and funnel steps | LeadConnector chat widget `66d03e49f0610d7630c281dd` | GHL conversations |

**Share URL:** [https://fbkmarketing.com/](https://fbkmarketing.com/). Order page: [https://fbkmarketing.com/get-started](https://fbkmarketing.com/get-started). Old funnel path `/signup` redirects there.

**Order form, action needed:** `/get-started` loads the funnel only from the `ORDER_URL` environment variable (GitHub Actions variable of the same name). It does not fall back to a preview link.

TODO: no production order host resolves yet (checked 2026-10-24).
- `order.fbkmarketing.com` has no DNS record.
- Funnel "$1990 SOCIAL MEDIA" (`clpvelvEI4HfdXWhV2x8`, location `DNB14sOqM0GayjGjxxSy`) is still on domain `fbkmarketing.com` (domain id `HGfhngrZNIql0IgWv41W`). That hostname is this GitHub Pages site, so it cannot serve the funnel. The order step path on that funnel is `/signup`. Live payments are on.
- Location `xnATPxw1WHXjbkmAcEQL` (FBK MARKETING) does not contain this funnel. Its published site is `kim.fbkmarketing.com` (website "Kim at FBK Marketing": `/linktree`, `/schedule`, `/contact`, `/learn-more`, domain id `Df6RnEgnghLOBEaHCWyj`). That is not the $1,990 order form.

Set this before taking orders:
1. In HighLevel, on the sub-account that owns "$1990 SOCIAL MEDIA", add domain `order.fbkmarketing.com` and attach that funnel to it. Keep the step path `/signup`.
2. DNS: CNAME `order.fbkmarketing.com` to `sites.ludicrous.cloud` (the target already used by `kim.fbkmarketing.com`). Do not use `brand.ludicrous.cloud`; that is the `links.fbkmarketing.com` shortener.
3. After `https://order.fbkmarketing.com/signup` loads the order form, set `ORDER_URL` to that exact URL and redeploy. See `.env.example`. Do not use a `sites.leadconnectorhq.com/preview/` URL.

**Not carried over:** the Meta Pixel `341558345430601`. To keep it, add it behind the cookie consent.

## Pricing (owner decision, 2026-10)
- One price everywhere: $1,990/month (copy, CTAs, FAQ, meta descriptions, Service/Offer schema on the home page, llms.txt).
  The old free-month home offer and its lower "normal" price are removed; CTAs read "Get Started at $1,990/month" and go to
  the unchanged `/get-started` order form ($1990 Per Month Social Media). Legal pages keep the program name
  "$1990 Per Month Effortless Social Media Automation" as written.

## Open questions for the owner
- `/join` says "How to Make Money Selling Social Media in 2024".

## DNS (GitHub Pages)
- Apex `fbkmarketing.com`: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `www`: CNAME to `<github-user>.github.io`
- In the repo settings, set Pages to GitHub Actions and the custom domain to fbkmarketing.com, then turn on Enforce HTTPS.
- IndexNow key file: `static/4ddba96738d52b5bdf030fcf0fa084e3.txt`
