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
})();
