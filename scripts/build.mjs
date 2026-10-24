// Builds fbkmarketing.com into dist/ (static, GitHub Pages). node scripts/build.mjs
import { fileURLToPath } from "node:url";
import { rmSync, mkdirSync, cpSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { SITE, OUT, TODAY, EMAIL, PHONE, PHONE_TEL, ORDER_URL, FORM, SURVEY, FORMS, AFFILIATE_SURVEY, urls, write, page, esc, btn, list, embed, related, faqSchema, redirect, PRIMARY, TRUST } from "./lib.mjs";
import { home, homeSchema } from "../content/home.mjs";

const C = JSON.parse(readFileSync(new URL("../content/pages.json", import.meta.url), "utf8"));
rmSync(OUT, { recursive: true, force: true }); mkdirSync(OUT, { recursive: true });
const STATIC = fileURLToPath(new URL("../static/", import.meta.url));
if (existsSync(STATIC)) cpSync(STATIC, OUT, { recursive: true });

// ── Home ──
write("/", page({ path: "/", title: "FBK Marketing | Done-For-You Social Media Fulfillment",
  desc: "Done-for-you social media content for $1,990/month, so busy operators stay consistent without daily production work. Owned by RAIBRO LLC.", body: home(), schema: homeSchema }));

// ── Template pages (2024 site): h1, intro, three or four feature sections, closing call to action ──
const SERVICE = {
  "1990-service-details": ["Social Media Management Service Details | FBK Marketing", "Everything included in FBK Marketing's done-for-you social media management service.",
    "This page lists what business owners get with FBK Marketing’s done-for-you social media management service at $1,990 per month: content creation, strategic posting and hands-off management."],
  "1990-pricing-explanation": ["Social Media Management Pricing Explained | FBK Marketing", "How FBK Marketing prices done-for-you social media management and what the monthly fee covers.",
    "This page explains, for business owners comparing options, what FBK Marketing’s $1,990/month social media management fee covers and why it is priced that way."],
  "why-choose-fbkmarketing": ["Why Choose FBK Marketing | Done-For-You Social Media", "What sets FBK Marketing apart: personalized strategies, expert guidance and comprehensive support for your social media.",
    "This page explains, for business owners choosing a social media provider, what sets FBK Marketing’s done-for-you service apart: personalized strategies, expert guidance and comprehensive support."],
  "platforms-managed": ["Social Media Platforms Managed | FBK Marketing", "Facebook, Instagram, Twitter (X), LinkedIn and more, managed with content tailored to your brand.",
    "This page lists the social media platforms FBK Marketing manages for business owners, including Facebook, Instagram, Twitter (X) and LinkedIn, with content tailored to each brand."],
  "content-tailoring": ["Content Tailored to Your Brand | FBK Marketing", "How FBK Marketing matches every post to your brand voice, services and audience.",
    "This page explains, for business owners using FBK Marketing, how every post is matched to your brand voice, services and audience."],
  "content-control": ["Content Control and Approvals | FBK Marketing", "Approve every post, suggest changes and keep control of your brand while FBK Marketing handles the work.",
    "This page explains, for business owners who want to keep control of their brand, how you can approve every post and suggest changes while FBK Marketing handles the work."],
  "posting-frequency": ["Social Media Posting Frequency | FBK Marketing", "How FBK Marketing sets a posting cadence that keeps your brand visible and engaged.",
    "This page explains, for business owners using FBK Marketing, how a posting cadence is set to keep your brand visible and engaged."],
  "cancellation-policy": ["Cancellation Policy | FBK Marketing", "Month-to-month billing, cancel with 30 days' notice. Payments are non-refundable.",
    "This is FBK Marketing’s cancellation policy for customers of its social media management service: billing is month-to-month, you can cancel with 30 days’ notice, and payments are non-refundable."],
  "measuring-success": ["Measuring Social Media Success | FBK Marketing", "The metrics and reports FBK Marketing uses to show the impact of your social media.",
    "This page explains, for business owners using FBK Marketing, which metrics and reports are used to show the impact of your social media."],
  "follower-engagement": ["Follower Engagement | FBK Marketing", "How FBK Marketing engages with your followers to build relationships around your brand.",
    "This page explains, for business owners using FBK Marketing, how the team engages with your followers to build relationships around your brand."],
  "idea-sharing": ["Share Your Content Ideas | FBK Marketing", "How you can share ideas and campaigns with the FBK Marketing team.",
    "This page explains, for FBK Marketing customers, how you can share your own content ideas and campaigns with the team."],
};
const CONCERN = {
  "overcoming-time-constraints": ["No Time for Social Media? | FBK Marketing", "How done-for-you social media fulfillment frees business owners from daily content work.",
    "This page is for business owners with no time for social media: it explains how FBK Marketing’s done-for-you fulfillment takes daily content work off your plate."],
  "overcoming-the-lack-of-expertise": ["No Social Media Expertise? | FBK Marketing", "Professional social media management for businesses without in-house expertise.",
    "This page is for businesses without in-house social media expertise: it explains how FBK Marketing provides professional social media management instead."],
  "streamlining-content-creation": ["Streamlining Content Creation | FBK Marketing", "Consistent, high-quality social content without building a content team.",
    "This page is for business owners who struggle to produce content regularly: it explains how FBK Marketing delivers consistent, high-quality social content without you building a content team."],
  "maintaining-consistent-branding": ["Consistent Branding Across Platforms | FBK Marketing", "Keep one voice, tone and look across every social platform.",
    "This page is for business owners active on several social platforms: it explains how FBK Marketing keeps one voice, tone and look across all of them."],
  "addressing-roi-concerns": ["Social Media ROI | FBK Marketing", "How FBK Marketing ties social media activity to measurable results.",
    "This page is for business owners who want social media to pay off: it explains how FBK Marketing ties social media activity to measurable results."],
  "staying-ahead-of-algorithm-changes": ["Social Media Algorithm Changes | FBK Marketing", "How FBK Marketing adapts content as platform algorithms change.",
    "This page is for business owners worried about platform algorithm updates: it explains how FBK Marketing adapts your content as algorithms change."],
  "ad-budget-management": ["Social Ad Budget Management | FBK Marketing", "Strategic management of your social media ad spend.",
    "This page is for business owners running social media ads: it explains how FBK Marketing helps manage your ad spend strategically."],
  "engagement-and-customer-interaction": ["Engagement and Customer Interaction | FBK Marketing", "Timely, consistent responses to comments, messages and reviews so your brand stays responsive and trusted.",
    "This page is for business owners who need to stay responsive online: it explains how FBK Marketing handles comments, messages and reviews in a timely, consistent way."],
  "keeping-up-with-competitors": ["Keeping Up with Competitors | FBK Marketing", "How FBK Marketing helps your brand stay competitive on social media.",
    "This page is for business owners facing competitors on social media: it explains how FBK Marketing helps your brand stay competitive."],
  "platform-selection": ["Choosing the Right Social Platforms | FBK Marketing", "How FBK Marketing helps you choose the social media platforms that fit your business.",
    "This page is for business owners unsure where to post: it explains how FBK Marketing helps you choose the social media platforms that fit your business."],
  "fear-of-negative-feedback": ["Handling Negative Feedback | FBK Marketing", "A professional strategy for responding to negative feedback on social media.",
    "This page is for business owners worried about criticism online: it explains FBK Marketing’s professional approach to responding to negative feedback on social media."],
  "integration-with-marketing": ["Social Media + Your Other Marketing | FBK Marketing", "How FBK Marketing aligns social media with your SEO, email and content marketing.",
    "This page is for business owners running other marketing channels: it explains how FBK Marketing aligns social media with your SEO, email and content marketing."],
};
// Related pages, chosen by topic across both groups (service FAQ pages + concern pages), so pages that answer
// neighbouring questions (e.g. measuring success ↔ ROI, follower engagement ↔ customer interaction) link to each other.
const RELATED = {
  "1990-service-details": ["1990-pricing-explanation", "platforms-managed", "posting-frequency"],
  "1990-pricing-explanation": ["1990-service-details", "cancellation-policy", "addressing-roi-concerns"],
  "why-choose-fbkmarketing": ["1990-service-details", "content-tailoring", "overcoming-the-lack-of-expertise"],
  "platforms-managed": ["platform-selection", "maintaining-consistent-branding", "posting-frequency"],
  "content-tailoring": ["maintaining-consistent-branding", "content-control", "idea-sharing"],
  "content-control": ["content-tailoring", "idea-sharing", "fear-of-negative-feedback"],
  "posting-frequency": ["staying-ahead-of-algorithm-changes", "streamlining-content-creation", "platforms-managed"],
  "cancellation-policy": ["1990-pricing-explanation", "1990-service-details", "content-control"],
  "measuring-success": ["addressing-roi-concerns", "ad-budget-management", "posting-frequency"],
  "follower-engagement": ["engagement-and-customer-interaction", "fear-of-negative-feedback", "measuring-success"],
  "idea-sharing": ["content-control", "content-tailoring", "integration-with-marketing"],
  "overcoming-time-constraints": ["streamlining-content-creation", "1990-service-details", "posting-frequency"],
  "overcoming-the-lack-of-expertise": ["why-choose-fbkmarketing", "staying-ahead-of-algorithm-changes", "platform-selection"],
  "streamlining-content-creation": ["overcoming-time-constraints", "content-tailoring", "posting-frequency"],
  "maintaining-consistent-branding": ["content-tailoring", "content-control", "platforms-managed"],
  "addressing-roi-concerns": ["measuring-success", "1990-pricing-explanation", "ad-budget-management"],
  "staying-ahead-of-algorithm-changes": ["posting-frequency", "keeping-up-with-competitors", "overcoming-the-lack-of-expertise"],
  "ad-budget-management": ["addressing-roi-concerns", "measuring-success", "integration-with-marketing"],
  "engagement-and-customer-interaction": ["follower-engagement", "fear-of-negative-feedback", "maintaining-consistent-branding"],
  "keeping-up-with-competitors": ["staying-ahead-of-algorithm-changes", "platform-selection", "why-choose-fbkmarketing"],
  "platform-selection": ["platforms-managed", "keeping-up-with-competitors", "integration-with-marketing"],
  "fear-of-negative-feedback": ["engagement-and-customer-interaction", "follower-engagement", "content-control"],
  "integration-with-marketing": ["ad-budget-management", "idea-sharing", "measuring-success"],
};
const blurb = (slug) => { const p = C[slug]; return (p.intro[0] || p.sections[0].p[0]).replace(/^(.{0,140}\S)\s.*$/s, "$1…"); };
const ring = (keys, k, n = 3) => { const i = keys.indexOf(k); return Array.from({ length: n }, (_, j) => keys[(i + j + 1) % keys.length]); };
const ctaHref = (href) => (href === "/request-quote" ? "/get-started" : href); // live: /request-quote 301s to the order form

function templatePage(slug, [title, desc, answer], parent, siblings) {
  const p = C[slug];
  const body = `<section class="hero light"><div class="wrap narrow"><h1>${esc(p.h1)}</h1><p class="lede">${esc(answer)}</p>${p.intro.map((x) => `<p class="lede">${esc(x)}</p>`).join("")}<p class="ctas">${btn(...PRIMARY, "", "hero")}${btn("Contact Us", "/contact", "ghost", "hero")}</p>${TRUST}</div></section>
<section class="sec"><div class="wrap"><div class="features">${p.sections.map((s) => `<article class="feature"><h2>${esc(s.h2)}</h2>${s.p.map((x) => `<p>${esc(x)}</p>`).join("")}${list(s.li)}</article>`).join("")}</div></div></section>
${p.closing ? `<section class="sec band"><div class="wrap narrow"><h2>${esc(p.closing.h2)}</h2>${p.closing.p.map((x) => `<p>${esc(x)}</p>`).join("")}<p class="ctas">${btn(p.closing.cta[0], ctaHref(p.closing.cta[1]), "", "closing")}${btn("Contact Us", "/contact", "ghost light", "closing")}</p>${TRUST}</div></section>` : ""}
${related("Related questions", siblings.map((k) => [C[k].h1, blurb(k), "/" + k]), parent[0] === "FAQ"
    ? `See every answer on the <a href="/faq">social media fulfillment FAQ</a> or the twelve <a href="/why-social-media-fulfillment">reasons businesses hand off social media</a>.`
    : `See all twelve <a href="/why-social-media-fulfillment">reasons businesses hand off social media</a> or the <a href="/faq">social media fulfillment FAQ</a>.`)}`;
  write("/" + slug, page({ path: "/" + slug, title, desc, body, crumbs: [["Home", "/"], parent, [p.h1, "/" + slug]] }));
}
for (const k of Object.keys(SERVICE)) templatePage(k, SERVICE[k], ["FAQ", "/faq"], RELATED[k] ?? ring(Object.keys(SERVICE), k));
for (const k of Object.keys(CONCERN)) templatePage(k, CONCERN[k], ["Why Fulfillment", "/why-social-media-fulfillment"], RELATED[k] ?? ring(Object.keys(CONCERN), k));

// ── Why social media fulfillment (index of the 12 concern pages) ──
{
  const p = C["why-social-media-fulfillment"];
  const body = `<section class="hero light"><div class="wrap narrow"><h1>${esc(p.h1)}</h1><p class="lede">This page is for business owners deciding whether to hand off social media: it covers the twelve most common concerns and how FBK Marketing’s done-for-you social media fulfillment addresses each one.</p></div></section>
<section class="sec"><div class="wrap"><div class="cards c3">${p.cards.map((c) => `<div class="card"><h2 class="h3"><a href="${c.href}">${esc(c.h2)}</a></h2><p>${esc(c.p)}</p><p class="more"><a href="${c.href}" aria-label="Learn more: ${esc(c.h2)}">Learn More</a> · <a href="${PRIMARY[1]}" data-track="${esc(PRIMARY[0])} [card]">${esc(PRIMARY[0])}</a></p></div>`).join("")}</div></div></section>
<section class="sec band"><div class="wrap narrow"><h2>${esc(p.closing.h2)}</h2><p>${esc(p.closing.p)}</p><p class="ctas">${btn(...PRIMARY, "", "closing")}${btn("Read the FAQ", "/faq", "ghost light", "closing")}</p>${TRUST}</div></section>`;
  write("/why-social-media-fulfillment", page({ path: "/why-social-media-fulfillment", title: "Why Businesses Need Social Media Fulfillment | FBK Marketing",
    desc: "Why consistent, done-for-you social content matters and how FBK Marketing keeps your brand active and credible.", body, crumbs: [["Home", "/"], ["Why Fulfillment", "/why-social-media-fulfillment"]] }));
}

// ── FAQ (the FAQ page from the 2024 site, served today at /social-media-fulfillment-faq-555433) ──
{
  const p = C.faq;
  const items = p.items.map((q) => [q.q, q.a, q.href]);
  const body = `<section class="hero light"><div class="wrap narrow"><h1>${esc(p.h1)}</h1><p class="lede">Short answers about FBK Marketing’s done-for-you social media service, with a link to the full page for each.</p></div></section>
<section class="sec"><div class="wrap narrow"><div class="faq">${items.map(([q, a, h]) => `<details open><summary>${esc(q)}</summary><p>${esc(a)} <a href="${h}">Learn more<span class="sr">: ${esc(q)}</span></a></p></details>`).join("")}</div></div></section>
<section class="sec band"><div class="wrap narrow"><h2>${esc(p.closing.q)}</h2><p>${esc(p.closing.a)}</p><p class="ctas">${btn(...PRIMARY, "", "closing")}${btn("Contact Us", "/contact", "ghost light", "closing")}</p>${TRUST}</div></section>`;
  write("/faq", page({ path: "/faq", title: "Social Media Fulfillment FAQ | FBK Marketing",
    desc: "Answers about FBK Marketing's done-for-you social media service: platforms, content, approvals, posting, reporting and cancellation.", body,
    schema: [faqSchema(items.map(([q, a]) => [q, a]))], crumbs: [["Home", "/"], ["FAQ", "/faq"]] }));
}

// ── Contact (GHL form embed) ──
write("/contact", page({ path: "/contact", title: "Contact FBK Marketing | Done-For-You Social Media",
  desc: "Contact FBK Marketing about done-for-you social media fulfillment. Email info@fbkmarketing.com or call (573) 432-5325.",
  crumbs: [["Home", "/"], ["Contact", "/contact"]],
  body: `<section class="hero light"><div class="wrap narrow"><h1>Contact Us</h1><p class="lede">This is the contact page for FBK Marketing, the done-for-you social media service for business owners. Contact us by filling out the form below.</p></div></section>
<section class="sec"><div class="wrap split">
<div>${embed(FORM(FORMS.contact), "Contact Us - FBK Marketing", 640)}</div>
<div><h2>Other ways to reach us</h2><p>Email: <a href="mailto:${EMAIL}">${EMAIL}</a><br>Phone: <a href="tel:${PHONE_TEL}">${PHONE}</a><br>Nashua, New Hampshire</p>
<p>Ready to start? Go to <a href="/get-started">Get Started</a>. Have a question first? Read the <a href="/faq">FAQ</a>, see <a href="/why-choose-fbkmarketing">what sets us apart</a>, or review the <a href="/cancellation-policy">cancellation policy</a>.</p></div>
</div></section>` }));

// ── Order form ($1,990/month). The iframe is the published funnel step from ORDER_URL, never a preview link. ──
const orderForm = ORDER_URL
  ? `<div class="embed order"><iframe src="${esc(ORDER_URL)}" title="FBK Marketing secure order form" style="min-height:1250px" allow="payment"></iframe></div>
<p class="center small">* 100% Secure &amp; Safe Payments * · Trouble loading the form? <a href="${esc(ORDER_URL)}" rel="noopener">Open the secure order form</a> or <a href="/contact">contact us</a>.</p>`
  : `<div class="embed order"><p class="center"><strong>The secure $1,990/month order form is not connected on this deploy.</strong></p>
<p class="center">Email <a href="mailto:${EMAIL}">${EMAIL}</a> or call <a href="tel:${PHONE_TEL}">${PHONE}</a>, or use the <a href="/contact">contact form</a>. This page loads the order form once the production funnel URL is set.</p></div>`;
write("/get-started", page({ path: "/get-started", noindex: true, chat: false, title: "Get Started | FBK Marketing",
  desc: "Order FBK Marketing's done-for-you social media content at $1,990/month. Provide your business details for customized content creation.",
  body: `<section class="sec checkout"><div class="wrap narrow">
<h1>Effortless Social Media Content for Business Owners</h1>
<p class="center">This is the order page for FBK Marketing’s done-for-you social media content for business owners, at $1,990 per month.</p>
<h2 class="h3 center">Who is Claiming This Offer?</h2><p class="center">Provide Your Business Details for Customized Content Creation</p>
<p class="center small">Month-to-month, no long-term contract · cancel with 30 days’ notice · approve every post or choose auto-post.</p>
<p class="center small">Order: done-for-you social media, $1,990 per month. By ordering you agree to the <a href="/terms-and-conditions">terms and conditions</a>; see also the <a href="/cancellation-policy">cancellation policy</a>.</p>
${orderForm}
<p class="center small">Questions first? <a href="/why-social-media-fulfillment">Click to learn more</a>, read the <a href="/faq">FAQ</a> or see <a href="/1990-service-details">what the service includes</a>.</p>
</div></section>` }));

// ── Funnel steps after checkout / affiliate sign-up (kept at their old URLs, noindex) ──
write("/free-social-media-good-plan-thank-you-4143-3685", page({ path: "/free-social-media-good-plan-thank-you-4143-3685", noindex: true, chat: false, title: "Thank You | FBK Marketing",
  desc: "Thank you for choosing FBK Marketing's social media content service.",
  body: `<section class="sec"><div class="wrap narrow center"><h1>Thank You for Choosing Our Social Media Content Service!</h1><p class="lede">We'll reach out shortly to get started.</p><p>${btn("Complete your onboarding form", "/fbk-signed-up-survey")}</p><p><a href="/">Home</a> · <a href="/faq">FAQ</a> · <a href="/contact">Contact</a></p></div></section>` }));
write("/fbk-signed-up-survey", page({ path: "/fbk-signed-up-survey", noindex: true, chat: false, title: "Onboarding Form | FBK Marketing",
  desc: "FBK Marketing onboarding form for new social media fulfillment customers.",
  body: `<section class="sec"><div class="wrap narrow"><h1>Onboarding Form</h1><p>Tell us about your business so we can tailor your content. Questions? <a href="/contact">Contact us</a> or read the <a href="/faq">FAQ</a> and <a href="/content-tailoring">how we tailor content</a>.</p>${embed(FORM(FORMS.onboarding), "FBK- ONBOARDING FORM", 1600)}</div></section>` }));
write("/affiliate-survey", page({ path: "/affiliate-survey", noindex: true, chat: false, title: "Affiliate Survey | FBK Marketing",
  desc: "Help us serve you better: a quick survey for FBK Marketing affiliates.",
  body: `<section class="sec"><div class="wrap narrow"><h1>Help Us Serve You Better</h1><p>To help us provide the best possible service, please take a few moments to complete this survey. Your feedback is invaluable to us.</p>${embed(SURVEY(AFFILIATE_SURVEY), "Help Us Serve You Better - Quick Survey", 900)}<p class="small"><a href="/join">Affiliate program</a> · <a href="/affiliate-terms-and-conditions">Affiliate terms</a> · <a href="/contact">Contact</a></p></div></section>` }));

// ── Affiliate program (/join) ──
{
  const b = C.join;
  let html = "", open = false, faqItems = [], q = null;
  for (const [t, x] of b) {
    if (t !== "li" && open) { html += "</ul>"; open = false; }
    if (t === "h1") html += `<section class="hero light"><div class="wrap narrow"><h1>${esc(x)}</h1>`;
    else if (t === "a") html += `<p>${btn(x, "#join-form")}</p>`;
    else if (t === "h2") { if (/^\d+\./.test(x)) { q = [x.replace(/^\d+\.\s*/, ""), ""]; faqItems.push(q); } else q = null; html += `<h2>${esc(x)}</h2>`; }
    else if (t === "p") { html += `<p>${esc(x)}</p>`; if (q) q[1] += (q[1] ? " " : "") + x; }
    else if (t === "li") { if (!open) { html += `<ul class="checks">`; open = true; } html += `<li>${esc(x)}</li>`; if (q) q[1] += (q[1] ? " " : "") + x; }
  }
  if (open) html += "</ul>";
  html = html.replace(/(<h2>Earn \$500)/, "</div></section><section class=\"sec\"><div class=\"wrap narrow\">$1");
  html += `<p>Read the full <a href="/affiliate-terms-and-conditions">affiliate terms and conditions</a>, see <a href="/why-social-media-fulfillment">why businesses need social media fulfillment</a>, or <a href="/contact">contact us</a>.</p></div></section>
<section class="sec soft" id="join-form"><div class="wrap narrow"><h2>Join the FBK Marketing Affiliate Program</h2>${embed(FORM(FORMS.affiliate), "affiliate", 900)}<p class="small">Already an affiliate? <a href="https://fbkmarketing.app.clientclub.net/login" rel="noopener">Affiliate Login</a></p></div></section>`;
  write("/join", page({ path: "/join", title: "Affiliate Program: Sell Social Media | FBK Marketing",
    desc: "Earn $500 per month for every business you enroll in FBK Marketing's Social Media Fulfillment Program. Join the affiliate program.",
    body: html, schema: [faqSchema(faqItems)], crumbs: [["Home", "/"], ["Affiliate Program", "/join"]] }));
}

// ── Legal pages ──
function legal(slug, title, desc, crumb) {
  let html = "", open = false;
  for (const [t, x] of C[slug]) {
    if (t !== "li" && open) { html += "</ul>"; open = false; }
    if (t === "h1") html += `<h1>${esc(x)}</h1>`;
    else if (t === "h2") html += `<h2>${esc(x)}</h2>`;
    else if (t === "p") html += `<p>${esc(x)}</p>`;
    else if (t === "li") { if (!open) { html += "<ul>"; open = true; } html += `<li>${esc(x)}</li>`; }
    else if (t === "contact") html += `<p>${x.split("|").map(esc).join("<br>")}<br>Email: <a href="mailto:${EMAIL}">${EMAIL}</a><br>Phone: <a href="tel:${PHONE_TEL}">${PHONE}</a></p>`;
  }
  if (open) html += "</ul>";
  html += `<p class="small">Related: ${[["/terms-and-conditions", "Terms and Conditions"], ["/privacy-policy", "Privacy Policy"], ["/affiliate-terms-and-conditions", "Affiliate Terms and Conditions"], ["/cancellation-policy", "Cancellation Policy"], ["/contact", "Contact Us"]].filter(([h]) => h !== "/" + slug).map(([h, n]) => `<a href="${h}">${n}</a>`).join(" · ")}</p>`;
  write("/" + slug, page({ path: "/" + slug, title, desc, body: `<section class="sec"><div class="wrap narrow legal">${html}</div></section>`, crumbs: [["Home", "/"], [crumb, "/" + slug]] }));
}
legal("terms-and-conditions", "Terms and Conditions for Customers | FBK Marketing", "The terms that govern FBK Marketing's social media management services: billing, cancellation, content ownership and more.", "Terms and Conditions");
legal("privacy-policy", "Privacy Policy | FBK Marketing", "How FBK Marketing collects, uses, shares and protects information from customers, affiliates and website visitors.", "Privacy Policy");
legal("affiliate-terms-and-conditions", "Affiliate Terms and Conditions | FBK Marketing", "The terms of the FBK Marketing Affiliate Program: eligibility, compensation, payouts, termination and prohibited activities.", "Affiliate Terms");

// ── 404 ──
writeFileSync(join(OUT, "404.html"), page({ path: "/404", noindex: true, title: "Page Not Found | FBK Marketing", desc: "That page doesn't exist. Find done-for-you social media fulfillment from FBK Marketing.",
  body: `<section class="sec"><div class="wrap narrow center"><h1>Page not found</h1><p class="lede">That page doesn’t exist or has moved. Try one of these pages instead.</p><p class="ctas" style="justify-content:center">${btn("Go to the home page", "/", "", "404")}${btn("Read the FAQ", "/faq", "ghost", "404")}</p></div></section>
<section class="sec soft"><div class="wrap"><h2>Popular pages</h2><div class="cards c3">${[["What the $1,990/month service includes", "Content creation, strategic posting and hands-off management.", "/1990-service-details"], ["Why $1,990/month?", "What the monthly fee covers and why it is priced that way.", "/1990-pricing-explanation"], ["Social media platforms managed", "Facebook, Instagram, Twitter (X) and LinkedIn.", "/platforms-managed"], ["Why businesses need social media fulfillment", "The twelve most common concerns, answered.", "/why-social-media-fulfillment"], ["Cancellation policy", "Month-to-month billing, cancel with 30 days’ notice.", "/cancellation-policy"], ["Affiliate program", "Earn $500 per month for every business you enroll.", "/join"]].map(([t, d, h]) => `<div class="card"><h3><a href="${h}">${esc(t)}</a></h3><p>${esc(d)}</p></div>`).join("")}</div>
<p class="center">Still stuck? Email <a href="mailto:${EMAIL}">${EMAIL}</a>, call <a href="tel:${PHONE_TEL}">${PHONE}</a> or use the <a href="/contact">contact form</a>. </p><p class="center">${btn(...PRIMARY, "", "404")}</p></div></section>` })
  .replace(`<link rel="canonical" href="${SITE}/404">`, ""));

// ── Legacy URLs → new homes (GitHub Pages can't 301: canonical + meta refresh + noindex) ──
const LEGACY = {
  "/social-media-fulfillment-faq": "/",              // the landing page now lives at the root
  "/social-media-fulfillment-faq-555433": "/faq",    // old FAQ funnel step (contact form's next step)
  "/request-quote": "/get-started",                  // live: 301 → / (the order form)
  "/signup": "/get-started",                         // $1990 funnel order step; the funnel no longer serves this host
};
for (const [from, to] of Object.entries(LEGACY)) write(from, redirect(to));

// ── sitemap / robots / llms.txt / CNAME ──
const PRI = { "/": "1.0", "/faq": "0.9", "/why-social-media-fulfillment": "0.9", "/contact": "0.8", "/join": "0.6", "/terms-and-conditions": "0.3", "/privacy-policy": "0.3", "/affiliate-terms-and-conditions": "0.3" };
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([p, m]) => `<url><loc>${SITE}${p}</loc><lastmod>${m}</lastmod><priority>${PRI[p] ?? "0.7"}</priority></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\n# AI answer engines welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Claude-SearchBot\nAllow: /\nUser-agent: Claude-User\nAllow: /\nUser-agent: anthropic-ai\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Perplexity-User\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: Applebot-Extended\nAllow: /\nUser-agent: Bingbot\nAllow: /\nUser-agent: CCBot\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
writeFileSync(join(OUT, "llms.txt"), readFileSync(new URL("../content/llms.txt", import.meta.url), "utf8"));
writeFileSync(join(OUT, "CNAME"), "fbkmarketing.com\n");
writeFileSync(join(OUT, ".nojekyll"), "");
mkdirSync(fileURLToPath(new URL("../data/", import.meta.url)), { recursive: true });
writeFileSync(fileURLToPath(new URL("../data/urls.txt", import.meta.url)), urls.map(([p]) => SITE + p).join("\n") + "\n");
const orderPage = readFileSync(join(OUT, "get-started/index.html"), "utf8");
if (/\/preview\/|sites\.leadconnectorhq\.com/i.test(orderPage)) throw new Error("/get-started still references a GoHighLevel preview URL");
console.log(`built ${urls.length} indexable pages + ${Object.keys(LEGACY).length} redirects at ${TODAY}`);
console.log(ORDER_URL ? `order form: ${ORDER_URL}` : "order form: ORDER_URL is not set (preview link is not used)");
