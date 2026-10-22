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
| `/get-started` | GHL funnel page `p872M5Fx3lpbrxpAPJE3` (funnel "$1990 SOCIAL MEDIA", product "$1990 Per Month Social Media"), framed from `https://sites.leadconnectorhq.com/preview/p872M5Fx3lpbrxpAPJE3` | The GHL order form and Stripe payment, then the thank-you and onboarding steps |
| `/contact` | Form `evHxONGnDNzukyINPQ1i` "CONTACT US - FBK MARKETING" via `link.casperportal.net/widget/form/…` | A GHL contact in the FBK sub-account (location `DNB14sOqM0GayjGjxxSy`) |
| `/join` | Form `zMor6EzYVDY0kwiOBg6W` (affiliate sign-up; on the live site it opened as a pop-up) | GHL, then the affiliate survey |
| `/fbk-signed-up-survey` | Form `RJsQdEThq5ER5msGXBIZ` "FBK- ONBOARDING FORM" | GHL |
| `/affiliate-survey` | Survey `IJXP5wdeMmeZ69ItyvRW` | GHL |
| All pages except checkout and funnel steps | LeadConnector chat widget `66d03e49f0610d7630c281dd` | GHL conversations |

**Order form, action needed:** after DNS moves to GitHub Pages, GHL can no longer serve the funnel on fbkmarketing.com.
- Today `/get-started` frames the funnel's GHL preview URL.
- Before going live, test one real order through it.
- Better: connect a subdomain such as `order.fbkmarketing.com` to that funnel in GHL, then set `ORDER_URL` in `scripts/lib.mjs`.

**Not carried over:** the Meta Pixel `341558345430601`. To keep it, add it behind the cookie consent.

## Open questions for the owner
- **Price conflict:**
  - The home page offer says "30 days free (normally $497/month)".
  - These pages say $1990/month: `/1990-service-details`, `/1990-pricing-explanation`, `/faq`, `/terms-and-conditions`, `/join`, `/affiliate-terms-and-conditions` and the `/get-started` order form.
  - Each price stays where it appears today. Pick one.
- `/join` says "How to Make Money Selling Social Media in 2024".
- The order form charges $1990 with no free month, while the home page CTA "Claim 30 Days Free" links to it.

## DNS (GitHub Pages)
- Apex `fbkmarketing.com`: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `www`: CNAME to `<github-user>.github.io`
- In the repo settings, set Pages to GitHub Actions and the custom domain to fbkmarketing.com, then turn on Enforce HTTPS.
- IndexNow key file: `static/4ddba96738d52b5bdf030fcf0fa084e3.txt`
