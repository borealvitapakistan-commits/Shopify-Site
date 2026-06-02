(function() {
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealOnScroll() {
    var revealNodes = document.querySelectorAll('[data-about-page] [data-reveal]');
    if (!revealNodes.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      revealNodes.forEach(function(node) {
        node.classList.add('is-visible');
      });
      return;
    }

    var revealObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    revealNodes.forEach(function(node) {
      revealObserver.observe(node);
    });
  }

  function initAnimatedBands() {
    var bands = document.querySelectorAll('[data-about-page] [data-band]');
    if (!bands.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      bands.forEach(function(band) {
        band.classList.add('is-active');
      });
      return;
    }

    var bandObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
          } else {
            entry.target.classList.remove('is-active');
          }
        });
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-8% 0px -8% 0px' }
    );

    bands.forEach(function(band) {
      bandObserver.observe(band);
    });
  }

  function initStorySection(section) {
    var steps = section.querySelectorAll('[data-story-step]');
    var stickyImage = section.querySelector('[data-story-image]');
    if (!steps.length || !stickyImage) return;

    var reducedMotion = prefersReducedMotion();
    if (!('IntersectionObserver' in window)) {
      steps.forEach(function(step, index) {
        step.classList.toggle('is-active', index === 0);
      });
      return;
    }

    var currentIndex = -1;

    function activateStep(step) {
      var index = Number(step.dataset.stepIndex || 0);
      if (index === currentIndex) return;
      currentIndex = index;

      steps.forEach(function(item, itemIndex) {
        item.classList.toggle('is-active', itemIndex === index);
      });

      var nextSrc = step.dataset.stepSrc;
      if (!nextSrc || stickyImage.getAttribute('src') === nextSrc) return;

      if (!reducedMotion) {
        stickyImage.classList.add('is-transitioning');
      }

      stickyImage.setAttribute('src', nextSrc);
      if (step.dataset.stepSrcset) {
        stickyImage.setAttribute('srcset', step.dataset.stepSrcset);
      }
      if (step.dataset.stepSizes) {
        stickyImage.setAttribute('sizes', step.dataset.stepSizes);
      }
      if (step.dataset.stepAlt) {
        stickyImage.setAttribute('alt', step.dataset.stepAlt);
      }

      if (!reducedMotion) {
        window.setTimeout(function() {
          stickyImage.classList.remove('is-transitioning');
        }, 260);
      }
    }

    var stepObserver = new IntersectionObserver(
      function(entries) {
        var visibleEntries = entries.filter(function(entry) {
          return entry.isIntersecting;
        });
        if (!visibleEntries.length) return;

        visibleEntries.sort(function(a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        });
        activateStep(visibleEntries[0].target);
      },
      { threshold: [0.25, 0.45, 0.65], rootMargin: '-20% 0px -30% 0px' }
    );

    steps.forEach(function(step) {
      stepObserver.observe(step);
    });

    activateStep(steps[0]);
  }

  function initStorySections() {
    var sections = document.querySelectorAll('[data-scroll-story]');
    sections.forEach(function(section) {
      initStorySection(section);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
    initAnimatedBands();
    initStorySections();
  });
})();
