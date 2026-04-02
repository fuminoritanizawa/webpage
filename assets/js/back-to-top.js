// back-to-top.js
// Toggles the floating back-to-top button after scrolling.
(function () {
  'use strict';

  var button = document.querySelector('.back-to-top');
  if (!button) return;

  var thresholdPx = 360; // within 300-500px per request
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    });
  } else {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

