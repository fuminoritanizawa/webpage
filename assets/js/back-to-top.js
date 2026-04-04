// back-to-top.js
// Toggles the floating back-to-top button after scrolling.
// NOTE: querySelector must run inside init() — in baseof.html the JS bundle
// is injected (line 14) BEFORE the site_footer partial (line 19), so the
// .back-to-top element does not yet exist when the IIFE first executes.
(function () {
  'use strict';

  var thresholdPx = 360; // within 300-500px per request

  function init() {
    var button = document.querySelector('.back-to-top');
    if (!button) return;

    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(function () {
        var y = window.scrollY || document.documentElement.scrollTop || 0;
        if (y > thresholdPx) {
          button.classList.add('is-visible');
        } else {
          button.classList.remove('is-visible');
        }
        ticking = false;
      });
    }

    onScroll(); // run once to set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
