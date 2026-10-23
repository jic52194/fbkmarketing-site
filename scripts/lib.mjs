// Shared layout + helpers for fbkmarketing.com (static build → dist/). Brand: navy #0E0C32, neon green #00FF0A, orange #FF8A00.
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const SITE = "https://fbkmarketing.com";
export const NAME = "FBK Marketing";
export const PHONE = "(573) 432-5325";
export const PHONE_TEL = "+15734325325";
export const EMAIL = "info@fbkmarketing.com";
export const LOGO = SITE + "/img/logo-512.png";
export const OUT = fileURLToPath(new URL("../dist/", import.meta.url));
export const TODAY = new Date().toISOString().slice(0, 10);

// ── Embeds kept from the live GoHighLevel / LeadConnector account (see README › Forms and embeds) ──
// $1,990/mo order form (GHL funnel "$1990 SOCIAL MEDIA", step page p872M5Fx3lpbrxpAPJE3, served today at / and /get-started).
// When fbkmarketing.com moves to GitHub Pages the funnel can no longer be served from this domain, so /get-started frames the
// same funnel page from GHL. Recommended: connect a subdomain (e.g. order.fbkmarketing.com) to that funnel in GHL and put its URL here.
export const ORDER_URL = "https://sites.leadconnectorhq.com/preview/p872M5Fx3lpbrxpAPJE3";
export const FORM = (id) => `https://link.casperportal.net/widget/form/${id}`;
export const SURVEY = (id) => `https://link.casperportal.net/widget/survey/${id}`;
export const FORMS = {
  contact: "evHxONGnDNzukyINPQ1i",     // "CONTACT US - FBK MARKETING" (was a native form on /contact)
  affiliate: "zMor6EzYVDY0kwiOBg6W",   // affiliate sign-up form (was a pop-up on /join)
  onboarding: "RJsQdEThq5ER5msGXBIZ",  // "FBK- ONBOARDING FORM" (funnel step after checkout, /fbk-signed-up-survey)
};
export const AFFILIATE_SURVEY = "IJXP5wdeMmeZ69ItyvRW"; // survey "affiliate rice" (/affiliate-survey, step after /join)
export const CHAT = `<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="66d03e49f0610d7630c281dd" defer></script>`;

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

// The agency that built and runs this site (also linked from the footer credit and llms.txt).
export const CASPERB2B = { "@type": "Organization", name: "CasperB2B", url: "https://casperb2b.com/" };

// Facts the live site states (home page JSON-LD, terms, privacy policy). Nothing else is claimed.
export const ORG = { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE}/#org`, name: NAME, alternateName: "FBKMarketing", url: SITE + "/", logo: LOGO,
  description: "Done-for-you social media content so busy operators stay consistent without daily production work.",
  email: EMAIL, telephone: "+1-573-432-5325", areaServed: "US",
  address: { "@type": "PostalAddress", streetAddress: "252 Daniel Webster Hwy #1093", addressLocality: "Nashua", addressRegion: "NH", postalCode: "03060", addressCountry: "US" },
  contactPoint: { "@type": "ContactPoint", telephone: "+1-573-432-5325", contactType: "Customer Service", email: EMAIL, areaServed: "US", availableLanguage: "English" },
  parentOrganization: { "@type": "Organization", name: "RAIBRO LLC" },
  sameAs: ["https://www.youtube.com/@FBKMarketing", "https://www.facebook.com/fbkmarketing"],
  creator: CASPERB2B };

export const NAV = [["Pricing", "/#offer"], ["System", "/#system"], ["Why fulfillment", "/why-social-media-fulfillment"], ["FAQ", "/faq"], ["Contact", "/contact"]];

export const urls = []; // [path, lastmod] for the sitemap (indexable pages only)

export function write(path, html) {
  const file = join(OUT, path === "/" ? "index.html" : path.endsWith("/") ? path + "index.html" : path + (path.includes(".") ? "" : "/index.html"));
  mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, html);
  // GitHub Pages answers /x with a 301 to /x/ when only x/index.html exists; a sibling x.html makes /x itself a 200.
  if (path !== "/" && !path.endsWith("/") && !path.includes(".")) writeFileSync(join(OUT, path + ".html"), html);
}

/** Page shell. crumbs = [[name, path], ...] adds a visible breadcrumb + BreadcrumbList. */
export function page({ path, title, desc, body, schema = [], crumbs, noindex = false, chat = true, ogImage = LOGO }) {
  if (title.length > 60) throw new Error(`title > 60 chars on ${path}: ${title}`);
  if (desc.length > 155) throw new Error(`description > 155 chars on ${path}: ${desc}`);
  const url = SITE + path;
  const schemas = [
    path === "/" ? ORG : null,
    path === "/" ? { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#site`, name: NAME, url: SITE + "/", publisher: { "@id": `${SITE}/#org` } } : null,
    { "@context": "https://schema.org", "@type": "WebPage", "@id": url, url, name: title, description: desc, inLanguage: "en-US", isPartOf: { "@type": "WebSite", "@id": `${SITE}/#site`, name: NAME, url: SITE + "/" }, publisher: { "@type": "Organization", "@id": `${SITE}/#org`, name: NAME, url: SITE + "/", logo: LOGO } },
    crumbs && crumbs.length > 1 ? { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: SITE + p })) } : null,
    ...schema,
  ].filter(Boolean);
  if (!noindex) urls.push([path, TODAY]);
  const navLink = ([n, h]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${esc(n)}</a>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}">
<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${NAME}"><meta property="og:locale" content="en_US"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImage}"><meta property="og:image:alt" content="FBK Marketing logo">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#0E0C32"><link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="stylesheet" href="/assets/site.css?v=${TODAY}">
${schemas.map(ld).join("")}
</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap bar">
<a class="brand" href="/"><img src="/img/logo-160.webp" width="44" height="44" alt="FBK Marketing logo"><span>FBK Marketing</span></a>
<nav class="nav" aria-label="Main">${NAV.map(navLink).join("")}</nav>
<a class="btn sm" href="/get-started" data-track="Get Started [header]">Get Started</a>
<details class="menu"><summary aria-label="Open menu">Menu</summary><nav aria-label="Mobile">${NAV.map(navLink).join("")}<a href="/get-started" data-track="Get Started [menu]">Get Started</a></nav></details>
</div></header>
<main id="main">${crumbs && crumbs.length > 1 ? `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb">${crumbs.map(([n, p], i) => (i < crumbs.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`)).join(" › ")}</nav></div>` : ""}${body}</main>
<footer class="foot"><div class="wrap">
<div class="cols">
<div><p class="fbrand">FBK Marketing</p><p>United States · Remote Service<br>Owned by RAIBRO LLC</p><p>Done-for-you social content to stay consistent.</p>
<p><a href="mailto:${EMAIL}">${EMAIL}</a><br><a href="tel:${PHONE_TEL}">${PHONE}</a></p></div>
<div><p class="fh">Get Started</p><ul><li><a href="/get-started" data-track="Get Started [footer]">Get Started at $1,990/month</a></li><li><a href="/contact">Contact</a></li><li><a href="/terms-and-conditions">Terms</a></li><li><a href="/privacy-policy">Privacy</a></li></ul></div>
<div><p class="fh">Learn</p><ul><li><a href="/why-social-media-fulfillment">Why Fulfillment</a></li><li><a href="/why-choose-fbkmarketing">Why FBK Marketing</a></li><li><a href="/faq">FAQ</a></li><li><a href="/platforms-managed">Platforms</a></li><li><a href="/cancellation-policy">Cancellation policy</a></li></ul></div>
<div><p class="fh">Affiliates</p><ul><li><a href="/join">Join Program</a></li><li><a href="/affiliate-terms-and-conditions">Affiliate Terms</a></li><li><a href="https://fbkmarketing.app.clientclub.net/login" rel="noopener">Affiliate Login</a></li></ul></div>
<div><p class="fh">CasperPortal</p><ul><li><a href="https://login.casperportal.net/" rel="noopener">Customer Login</a></li><li><a href="https://casperportal.com" rel="noopener">Sign Up</a></li></ul></div>
</div>
<p class="copy">© ${TODAY.slice(0, 4)} FBK Marketing. All rights reserved. · <a href="#" onclick="window.dispatchEvent(new Event('cso:consent-open'));return false">Cookie settings</a> · <a href="https://casperb2b.com/portfolio" rel="noopener">Built by CasperB2B</a></p>
</div></footer>
<script src="/assets/t.js" data-site="fbkmarketing" data-privacy="/privacy-policy" data-banner="1" defer></script>
${chat ? CHAT : ""}
</body></html>`;
}

// ── building blocks ──
/** Button link. `track` names where it sits (hero, closing, sticky…); t.js then logs clicks as "<label> [<track>]". */
export const btn = (label, href, cls = "", track = "") => `<a class="btn${cls ? " " + cls : ""}" href="${href}"${href.startsWith("http") ? ' rel="noopener"' : ""}${track ? ` data-track="${esc(label)} [${esc(track)}]"` : ""}>${esc(label)}</a>`;
/** The primary call to action and the facts the site already states about it (home offer box, cancellation policy, content control). */
export const PRIMARY = ["Get Started at $1,990/month", "/get-started"];
export const TRUST = `<p class="small trust">$1,990/month · Month-to-month, no long-term contract · <a href="/cancellation-policy">Cancel with 30 days’ notice</a> · Approve every post or choose auto-post</p>`;
export const list = (items) => `<ul class="checks">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
/** Responsive WebP image from static/img (name-lg.webp and, for big images, name-sm.webp). */
export const IMG = {
  "strategy-session": [626, 468], "partnership-handshake": [626, 417], "local-market-framework": [800, 2000, 600], "seo-process": [800, 2000, 600],
  "paid-vs-organic": [900, 994, 600], "appointment-team": [200, 200], "website-brand": [400, 400], "local-seo": [400, 400],
  "automation": [940, 788, 600], "chat-lead-capture": [1200, 628, 600], "execution-team": [1068, 1120, 600],
};
export function img(name, alt, { sizes = "(min-width: 900px) 420px, 100vw", eager = false } = {}) {
  const [w, h, sm] = IMG[name];
  const srcset = sm ? ` srcset="/img/${name}-sm.webp ${sm}w, /img/${name}-lg.webp ${w}w" sizes="${sizes}"` : "";
  return `<img src="/img/${name}-lg.webp"${srcset} width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
export const figure = (name, alt, caption) => `<figure class="fig">${img(name, alt)}<figcaption>${esc(caption)}</figcaption></figure>`;
export const embed = (src, title, h = 760, id = "") => `<div class="embed"${id ? ` id="${id}"` : ""}><iframe src="${src}" title="${esc(title)}" style="min-height:${h}px" loading="lazy"></iframe></div><script src="https://link.casperportal.net/js/form_embed.js" defer></script>`;
export const related = (h2, items, footHtml = "") => `<section class="sec soft"><div class="wrap"><h2>${esc(h2)}</h2><div class="cards c3">${items.map(([t, d, href]) => `<div class="card"><h3><a href="${href}">${esc(t)}</a></h3><p>${esc(d)}</p></div>`).join("")}</div>${footHtml ? `<p class="more">${footHtml}</p>` : ""}</div></section>`;
export const faqSchema = (items) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

/** Redirect page for a legacy URL (GitHub Pages can't 301): canonical + meta refresh + noindex. */
export const redirect = (to) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved | FBK Marketing</title><meta name="robots" content="noindex"><link rel="canonical" href="${to.startsWith("http") ? to : SITE + to}"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)}+location.hash)</script></head><body><p>This page moved to <a href="${to}">${SITE}${to}</a>.</p></body></html>`;
