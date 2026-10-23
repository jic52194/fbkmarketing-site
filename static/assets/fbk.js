/* fbkmarketing.com page helpers (loaded after t.js, defer).
 * 1. Sticky phone CTA (.mcta): hidden while a page's own hero/closing buttons are on screen, so it never doubles them.
 *    Keeps t.js's cookie notice (#cso-cc) sitting above the bar while the bar is shown.
 */
(function () {
  "use strict";
  var bar = document.querySelector(".mcta");
  if (bar && "IntersectionObserver" in window) {
    var onScreen = new Set();
    var lift = function () {
      var cc = document.getElementById("cso-cc");
      if (cc) cc.style.setProperty("--cso-cc-off", bar.classList.contains("off") || !bar.offsetHeight ? "0px" : bar.offsetHeight + "px");
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) onScreen.add(e.target); else onScreen.delete(e.target); });
      bar.classList.toggle("off", onScreen.size > 0);
      lift();
    });
    document.querySelectorAll("main .ctas .btn, main .hero .btn, main .band .btn, #join-form").forEach(function (el) { io.observe(el); });
    if ("MutationObserver" in window) new MutationObserver(lift).observe(document.body, { childList: true });
  }

  /* 2. Conversion events for t.js (window.csoTrack; it records nothing when the visitor turned analytics off).
   *    - "checkout_view" on the order page, "conversion" on the post-order thank-you page;
   *    - "embed_msg": the order and contact forms are GoHighLevel iframes, so their submits never reach t.js's form
   *      listener. We log only the *name* of each message type those frames post to this page (never its contents),
   *      once per type per page, so the submit/step messages can be identified in the analytics and promoted to a goal. */
  var T = window.csoTrack;
  if (!T) return;
  var path = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
  if (path === "/get-started") T.event("checkout_view", "order form", { goal: "order" });
  if (path === "/free-social-media-good-plan-thank-you-4143-3685") T.event("conversion", "order thank-you page", { goal: "order" });
  var seen = {}, n = 0;
  addEventListener("message", function (e) {
    var host = String(e.origin || "").replace(/^https?:\/\//, "");
    if (!/(^|\.)(leadconnectorhq\.com|casperportal\.net|msgsndr\.com)$/.test(host) || n >= 12) return;
    var d = e.data, t = typeof d === "string" ? d : Array.isArray(d) && typeof d[0] === "string" ? d[0] : d && typeof d.type === "string" ? d.type : d && typeof d.event === "string" ? d.event : null;
    if (!t || !/^[a-z][a-z0-9_:.-]{1,39}$/i.test(t) || seen[t]) return;  // names only: skips resizer strings, ids, anything with spaces or @
    seen[t] = 1; n++;
    var frame = null;
    document.querySelectorAll("iframe").forEach(function (f) { if (f.contentWindow === e.source) frame = f.getAttribute("title"); });
    T.event("embed_msg", t, { from: host, frame: frame });
  });
})();
