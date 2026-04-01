// scroll-animate.js
// Adds .is-visible to elements as they enter the viewport.
// CSS handles the actual animation (opacity + translateY transition).
// About section (#about) is pre-marked visible — no entrance animation for the hero.

(function () {
  'use strict';

  var TARGETS = [
    '.pub-list-item',
    '.stream-item',
    '.project-card',
    '.row.experience',
    '.accmp-block',
    '.section-heading',
    '.center-text'
  ].join(', ');

  function init() {
    // Mark the hero immediately — it's above the fold
    var hero = document.getElementById('about');
    if (hero) hero.classList.add('is-visible');

    var elements = document.querySelectorAll(TARGETS);

    if (!elements.length) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
