// scroll-animate.js
// Adds .is-visible to elements as they enter the viewport.
// CSS handles the actual animation (opacity + translateY transition).
// About section (#about) is pre-marked visible — no entrance animation for the hero.

(function () {
  'use strict';

  var TARGETS = [
    '.pub-list-item',
    '.stream-item',
    // .project-card excluded — Isotope manages all project card visibility/positioning
    '.row.experience',
    '.accmp-block',
    '.section-heading',
    '.center-text'
  ].join(', ');

  function initScrollAnimate() {
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

  // Sticky heading tap → scroll to top of that section.
  // Targets: pages-widget headings, experience-widget headings, projects center-text.
  // Only active on mobile (≤991px) where the sticky is visible; harmless on desktop.
  function initStickyHeadingTap() {
    var STICKY_SELECTOR = [
      '.pages-widget__heading',
      '.experience-widget__heading',
      '.home-section .center-text'
    ].join(', ');

    var headings = document.querySelectorAll(STICKY_SELECTOR);
    if (!headings.length) return;

    headings.forEach(function (heading) {
      heading.addEventListener('click', function () {
        var section = heading.closest('.home-section');
        if (!section) return;

        var navbar = document.querySelector('.navbar');
        var offset = navbar ? navbar.offsetHeight : 70;

        var y = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }

  // Preload carousel background images.
  // Bootstrap hides non-active slides with display:none, so browsers skip loading
  // their background-images until the slide becomes active. With 2s intervals this
  // causes a gray flash (or apparent freeze) while the image loads on demand.
  // Solution: extract the URL from each slide's inline style and force-load it via
  // an Image object so the browser caches it before the slide transition fires.
  function preloadCarouselImages() {
    var items = document.querySelectorAll('.carousel-item');
    items.forEach(function (item) {
      var bg = item.style.backgroundImage;
      if (!bg) return;
      var match = bg.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (match && match[1]) {
        var img = new window.Image();
        img.src = match[1];
      }
    });
  }

  function init() {
    initScrollAnimate();
    initStickyHeadingTap();
    preloadCarouselImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
