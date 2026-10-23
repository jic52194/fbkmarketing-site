// Home page: the live landing page that GoHighLevel served at /social-media-fulfillment-faq (wording kept as published).
// Price (owner decision, 2026-10): $1,990/month everywhere; the old free-month offer is retired.
import { esc, btn, img, figure, list, faqSchema } from "../scripts/lib.mjs";

export const OBJECTIONS = [
  ["“Will it sound like my brand?”", "Yes. We start with a quick intake and align tone, offers, and boundaries. Then we run an approval loop (or auto-post if you prefer). The goal is simple: you still sound like you — just more consistent."],
  ["“We tried agencies — they disappear.”", "We are not an ad agency. We are fulfillment. Deliverables are tracked. Content ships on schedule. If you want a weekly meeting and a deck, that’s not us. If you want output, it is."],
  ["“What if we don’t have photos?”", "No problem. We build content from your services, FAQs, before/after stories, reviews, and stock-safe visuals. Over time, we help you build a tiny capture habit (15 seconds at a job site goes a long way)."],
  ["“Does this connect to automation?”", "Yes. FBK is built on infrastructure that can connect to CasperPortal workflows: follow-up, missed-call text-back, review requests, booking, and pipeline. Content is the front door; automation is the closer."],
];

const SYSTEM = [
  ["01", "Consistency Engine", "Your brand never goes dark. Scheduled output, predictable cadence, and zero gaps."],
  ["02", "Done-For-You Fulfillment", "We write, format, and publish. You don’t manage creators, freelancers, or tools."],
  ["03", "Approval or Autopilot", "Approve posts if you want control — or let the system ship automatically."],
  ["04", "Reporting & Lift", "Clear activity reporting so you can see consistency compounding over time."],
];

const COMPARE = [
  ["Freelancer", "Talent, when available. Often inconsistent output.", "Ghosting, style drift, missed weeks."],
  ["Agency", "Meetings + decks. “Strategy” without shipping.", "High cost, slow cycles, unclear deliverables."],
  ["In-house", "Full control if you can hire & manage.", "Hiring + salary + turnover + management load."],
  ["FBK Fulfillment", "Content ships on schedule. Approval loop or autopost.", "Low. Clear deliverables. $1,990/month, month-to-month."],
];

const SHOWCASE = [
  ["website-brand", "Website design and development for Georgetown MA businesses by FBK Marketing", "Website + Brand Presence", "Make your online presence look open, trusted, and active — before they ever call."],
  ["local-seo", "Local SEO services to improve Google rankings in Georgetown Massachusetts by FBK Marketing", "Local SEO Visibility", "Show up when people search. Win the click before competitors even get seen."],
  ["automation", "AI marketing automation and smart follow up for Georgetown Massachusetts businesses by FBK Marketing", "Automation That Follows Up", "Content is the front door. Automation is the closer. Keep leads warm without chasing."],
  ["chat-lead-capture", "AI chatbot for your business to capture and qualify leads for Georgetown Massachusetts companies", "Chat + Lead Capture", "Turn website traffic into conversations. Capture intent in real time."],
];

const OFFER_SCHEMA = { "@context": "https://schema.org", "@type": "Service", name: "Done-for-you social media fulfillment", serviceType: "Social media content creation and publishing", provider: { "@id": "https://fbkmarketing.com/#org" }, areaServed: "US",
  offers: { "@type": "Offer", url: "https://fbkmarketing.com/get-started", price: "1990.00", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", price: "1990.00", priceCurrency: "USD", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } } };

export const homeSchema = [OFFER_SCHEMA, faqSchema(OBJECTIONS.map(([q, a]) => [q.replace(/[“”]/g, ""), a]))];

export const home = () => `
<section class="hero" id="top"><div class="wrap split">
<div>
<p class="eyebrow">Social Media Fulfillment</p>
<h1>FBK Marketing <span class="h1sub">Done-for-you social media fulfillment</span></h1>
<p class="lede">FBK Marketing is a fulfillment-first, done-for-you social media system for business owners and operators who cannot afford inconsistency. Owned and operated by RAIBRO LLC. Built on CasperPortal infrastructure so your marketing doesn’t just look active — it creates conversations, captures leads, and pushes prospects toward action.</p>
<p class="ctas">${btn("Get Started at $1,990/month", "/get-started")}${btn("Why This Works", "/why-social-media-fulfillment", "ghost")}</p>
<p class="tags"><span>Built for busy operators.</span><span>Remote service · United States.</span><span>Local relevance: Georgetown MA.</span></p>
</div>
<div class="hero-art"><img src="/img/logo-512.png" width="512" height="512" alt="FBK Marketing brand mark" fetchpriority="high"></div>
</div></section>

<section class="sec"><div class="wrap narrow">
<h2>Consistency Is a Trust Signal</h2>
<p>Most businesses don’t lose because their service is bad — they lose because their online presence looks inactive. When your social feeds go quiet, the market assumes the worst: you’re not open, you’re not growing, or you’re not serious. FBK Marketing fixes that by shipping done-for-you content on schedule so your brand stays visible, credible, and clickable — especially for local buyers in Georgetown, Massachusetts who search fast and decide faster.</p>
</div></section>

<section class="sec soft" id="offer"><div class="wrap split">
<div>
<p class="eyebrow">The Offer</p>
<h2>Done-For-You Social Media Content for $1,990/month</h2>
<p>Get done-for-you social media content for $1,990/month. You get a consistent posting cadence, clean brand voice alignment, and a system you can keep running without becoming a content factory.</p>
<div class="offer"><p class="eyebrow">Offer</p><p><b>Done-for-you social media content: $1,990/month.</b></p><p class="small">Month-to-month · No long-term contract · <a href="/1990-pricing-explanation">What the price covers</a></p>
<p class="ctas">${btn("Order Now: $1,990/month", "/get-started")}${btn("See Why", "/why-social-media-fulfillment", "ghost")}</p></div>
</div>
<div class="figs">${figure("strategy-session", "Business team marketing strategy session for Georgetown Massachusetts companies by FBK Marketing", "Strategy without overhead")}${figure("partnership-handshake", "Trusted marketing partnership handshake for Georgetown MA businesses with FBK Marketing", "Trust-first partnership")}</div>
</div></section>

<section class="sec" id="system"><div class="wrap">
<p class="eyebrow">The System</p>
<h2>What Ships Every Month</h2>
<p class="lead-in">We treat content like fulfillment: deliverables, cadence, and quality control. You don’t pay for “ideas.” You pay for output that keeps your brand in motion.</p>
<ol class="steps">${SYSTEM.map(([n, t, d]) => `<li><span class="num">${n}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}</ol>
<div class="figs two">${figure("local-market-framework", "Local market domination framework infographic for Georgetown MA businesses using FBK Marketing", "Local market framework")}${figure("seo-process", "SEO process infographic explaining how search works for Georgetown Massachusetts businesses", "How visibility compounds")}</div>
</div></section>

<section class="sec soft" id="proof"><div class="wrap">
<p class="eyebrow">Infographics + Reality</p>
<h2>Why Most Businesses Lose Here</h2>
<p class="lead-in">Social dies for the same reasons every time: time, consistency, and unclear ownership. Your customers don’t care why you stopped posting — they only notice you disappeared. We remove the bottleneck and keep output moving.</p>
<div class="figs two">${figure("paid-vs-organic", "Paid vs organic search results comparison infographic for Georgetown Massachusetts business visibility", "Paid vs organic: the visibility game")}${figure("appointment-team", "Outbound calls and appointment setting team image for Georgetown MA businesses", "Visibility → conversation → appointment")}</div>
<div class="tablewrap"><table><caption class="sr">Options for getting social media content done</caption><thead><tr><th scope="col">Option</th><th scope="col">What you get</th><th scope="col">Risk</th></tr></thead><tbody>
${COMPARE.map(([o, g, r], i) => `<tr${i === 3 ? ' class="hl"' : ""}><th scope="row">${esc(o)}</th><td>${esc(g)}</td><td>${esc(r)}</td></tr>`).join("")}
</tbody></table></div>
</div></section>

<section class="sec" id="objections"><div class="wrap narrow">
<p class="eyebrow">Battle-Round Tactics</p>
<h2>Objections, Answered</h2>
<p class="lead-in">These are the common concerns — handled upfront so you can decide fast.</p>
<div class="faq">${OBJECTIONS.map(([q, a]) => `<details open><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
</div></section>

<section class="sec soft" id="showcase"><div class="wrap">
<h2 class="sr">Showcase</h2>
<div class="cards c4">${SHOWCASE.map(([n, alt, t, d]) => `<div class="card pic">${img(n, alt, { sizes: "(min-width: 900px) 280px, 100vw" })}<h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
</div></section>

<section class="sec" id="faq"><div class="wrap split">
<div>
<h2>FAQ</h2>
<p class="eyebrow">Fast Links</p>
<p>If you want the long-form answers, use the <a href="/faq">FAQ page</a>. If you’re ready, go to <a href="/get-started">Get Started</a>.</p>
<p class="ctas">${btn("Open FAQ", "/faq", "ghost")}${btn("Get Started at $1,990/month", "/get-started")}</p>
<h3>Best Fit</h3>
${list(["Busy operators who need consistency.", "Service businesses that sell trust.", "Local businesses (including Georgetown MA)."])}
<h3>Competitive Threats</h3>
<p>Random freelancers = inconsistent quality. Agencies = strategy decks. <b>Fulfillment wins because it ships.</b></p>
<h3>What happens after signup?</h3>
<p>Onboard → Plan → Approve → Publish → Report. If you prefer zero meetings, choose auto-post and keep it moving.</p>
<h3>Need to talk first?</h3>
<p>Use the <a href="/contact">Contact page</a> for a fast fit check, or go straight to <a href="/get-started">Get Started</a> if you already know consistency is the bottleneck.</p>
</div>
<div>${figure("execution-team", "Digital marketing team executing campaigns for Georgetown MA businesses with FBK Marketing", "In the Field · Execution & delivery")}</div>
</div></section>
`;
