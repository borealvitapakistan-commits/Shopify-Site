/* ============================================
   Global JavaScript
   ============================================ */

// Shopify formatMoney helper
if (typeof Shopify === 'undefined') {
  var Shopify = {};
}

Shopify.formatMoney = function(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || '${{amount}}';

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = precision || 2;
    thousands = thousands || ',';
    decimal = decimal || '.';

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    var centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

function setupAutoMarqueeTrack(track, options) {
  if (!track) {
    return;
  }

  const settings = options || {};
  const force = settings.force === true;

  if (track.__marqueeCleanup && force) {
    track.__marqueeCleanup();
  } else if (track.dataset.marqueeReady === 'true') {
    return;
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  Array.from(track.children)
    .filter((item) => item.hasAttribute('data-marquee-clone'))
    .forEach((item) => item.remove());

  const originalItems = Array.from(track.children);
  if (originalItems.length < 2) {
    return;
  }

  const interactiveClones = track.dataset.marqueeInteractive === 'true';
  const speed = parseFloat(track.dataset.marqueeSpeed || '0.05');
  const cleanupCallbacks = [];
  let baseWidth = 0;
  let lastTimestamp = 0;
  let frameId = 0;
  let paused = false;

  const addListener = (target, eventName, handler, listenerOptions) => {
    target.addEventListener(eventName, handler, listenerOptions);
    cleanupCallbacks.push(() => {
      target.removeEventListener(eventName, handler, listenerOptions);
    });
  };

  const getOriginalItems = () => Array.from(track.children).filter((item) => !item.hasAttribute('data-marquee-clone'));

  track.dataset.marqueeReady = 'true';

  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('data-marquee-clone', 'true');
    clone.setAttribute('aria-hidden', 'true');

    if (!interactiveClones) {
      clone.style.pointerEvents = 'none';
    }

    clone.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((focusable) => {
      focusable.setAttribute('tabindex', '-1');
    });

    track.appendChild(clone);
  });

  const refreshMeasurements = () => {
    const items = getOriginalItems();
    if (!items.length) {
      baseWidth = 0;
      return;
    }

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    baseWidth = Math.ceil((lastItem.offsetLeft + lastItem.offsetWidth) - firstItem.offsetLeft + gap);

    if (baseWidth > 0 && track.scrollLeft >= baseWidth) {
      track.scrollLeft = track.scrollLeft % baseWidth;
    }
  };

  const setPaused = (nextState) => {
    paused = nextState;
    if (!paused) {
      lastTimestamp = 0;
    }
  };

  const step = (timestamp) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const delta = Math.min(timestamp - lastTimestamp, 32);
    lastTimestamp = timestamp;

    if (!paused && baseWidth > 0) {
      track.scrollLeft += speed * delta;

      if (track.scrollLeft >= baseWidth) {
        track.scrollLeft -= baseWidth;
      }
    }

    frameId = window.requestAnimationFrame(step);
  };

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  const handleFocusIn = () => setPaused(true);
  const handleFocusOut = () => {
    window.setTimeout(() => {
      if (!track.contains(document.activeElement)) {
        setPaused(false);
      }
    }, 0);
  };
  const handleTouchStart = () => setPaused(true);
  const handleTouchEnd = () => setPaused(false);
  const handlePointerDown = () => setPaused(true);
  const handlePointerUp = () => setPaused(false);

  addListener(track, 'mouseenter', handleMouseEnter);
  addListener(track, 'mouseleave', handleMouseLeave);
  addListener(track, 'focusin', handleFocusIn);
  addListener(track, 'focusout', handleFocusOut);
  addListener(track, 'touchstart', handleTouchStart, { passive: true });
  addListener(track, 'touchend', handleTouchEnd);
  addListener(track, 'pointerdown', handlePointerDown);
  addListener(track, 'pointerup', handlePointerUp);
  addListener(window, 'resize', refreshMeasurements);
  addListener(window, 'load', refreshMeasurements);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (track.dataset.marqueeReady === 'true') {
        refreshMeasurements();
      }
    });
  }

  refreshMeasurements();
  frameId = window.requestAnimationFrame(step);

  track.__marqueeCleanup = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    cleanupCallbacks.forEach((cleanup) => cleanup());

    Array.from(track.children)
      .filter((item) => item.hasAttribute('data-marquee-clone'))
      .forEach((item) => item.remove());

    delete track.dataset.marqueeReady;
    delete track.__marqueeCleanup;
  };

  return track.__marqueeCleanup;
}

window.setupAutoMarqueeTrack = setupAutoMarqueeTrack;
window.resetAutoMarqueeTrack = function(track) {
  return setupAutoMarqueeTrack(track, { force: true });
};

// Cart AJAX functionality
function updateCartIndicators(cart) {
  // Update cart count in header
  const cartCountElements = document.querySelectorAll('[data-cart-count]');
  cartCountElements.forEach(el => {
    el.textContent = cart.item_count;
    if (cart.item_count > 0) {
      el.classList.add('has-items');
    } else {
      el.classList.remove('has-items');
    }
  });
}

Shopify.onCartUpdate = function(cart) {
  updateCartIndicators(cart);

  // Open cart drawer if exists
  if (typeof window.openCartDrawer === 'function') {
    window.openCartDrawer();
  }
};

// Add to cart AJAX for product forms
document.addEventListener('DOMContentLoaded', function() {
  const cleanBreadcrumbText = (text) => String(text || '').replace(/\s+/g, ' ').replace(/\/+/g, ' / ').trim();

  const normalizePdpSourceLabel = (label) => {
    const clean = cleanBreadcrumbText(label);
    const lower = clean.toLowerCase();

    if (!clean || lower === 'home' || lower === 'home page' || lower === 'homepage') {
      return '';
    }

    if (lower === 'best sellings' || lower === 'best selling') {
      return 'Best Sellers';
    }

    if (lower === 'new arrival') {
      return 'New Arrivals';
    }

    return clean;
  };

  const findPdpSource = (link) => {
    const explicitSource = link.closest('[data-pdp-source-label]');
    const explicitLabel = normalizePdpSourceLabel(link.dataset.pdpSourceLabel || (explicitSource && explicitSource.dataset.pdpSourceLabel));

    if (explicitLabel) {
      return {
        label: explicitLabel,
        url: link.dataset.pdpSourceUrl || (explicitSource && explicitSource.dataset.pdpSourceUrl) || window.location.href
      };
    }

    const panel = link.closest('[role="tabpanel"][aria-labelledby]');
    if (panel) {
      const tab = document.getElementById(panel.getAttribute('aria-labelledby'));
      const tabLabel = normalizePdpSourceLabel(tab && tab.textContent);

      if (tabLabel && tabLabel.toLowerCase() !== 'products') {
        return {
          label: tabLabel,
          url: window.location.pathname + window.location.search + (panel.closest('section') && panel.closest('section').id ? '#' + panel.closest('section').id : '')
        };
      }
    }

    const section = link.closest('section, .shopify-section, [data-section-id]');
    if (section) {
      const activeTab = section.querySelector('[role="tab"].is-active, [role="tab"][aria-selected="true"], button.is-active');
      const activeTabLabel = normalizePdpSourceLabel(activeTab && activeTab.textContent);

      if (activeTabLabel && activeTabLabel.toLowerCase() !== 'products') {
        return {
          label: activeTabLabel,
          url: section.dataset.carouselCollectionUrl || window.location.pathname + window.location.search + (section.id ? '#' + section.id : '')
        };
      }

      const heading = section.querySelector('.product-carousel__featured-title, .balance-wellness__title, .best-sellers-showcase__title, .section-title, h1, h2');
      const headingLabel = normalizePdpSourceLabel(heading && heading.textContent);

      if (headingLabel) {
        return {
          label: headingLabel,
          url: section.dataset.carouselCollectionUrl || window.location.pathname + window.location.search + (section.id ? '#' + section.id : '')
        };
      }
    }

    if (window.location.pathname.indexOf('/collections/') !== -1) {
      const title = document.querySelector('.collection-hero__title, .collection-title, h1');
      const collectionLabel = normalizePdpSourceLabel(title && title.textContent) || 'All Products';

      return {
        label: collectionLabel,
        url: window.location.pathname + window.location.search
      };
    }

    return {
      label: 'All Products',
      url: '/collections/all'
    };
  };

  document.addEventListener('click', function(event) {
    const link = event.target.closest('a[href]');
    if (!link) return;

    let productUrl;
    try {
      productUrl = new URL(link.getAttribute('href'), window.location.origin);
    } catch (error) {
      return;
    }

    if (productUrl.origin !== window.location.origin || productUrl.pathname.indexOf('/products/') === -1) {
      return;
    }

    const source = findPdpSource(link);
    const sourceLabel = normalizePdpSourceLabel(source && source.label);
    if (!sourceLabel) return;

    const sourceUrl = (source && source.url) || window.location.href;

    productUrl.searchParams.set('bv_source', sourceLabel);
    productUrl.searchParams.set('bv_source_url', sourceUrl);
    link.href = productUrl.toString();

    try {
      const breadcrumbData = JSON.stringify({ label: sourceLabel, url: sourceUrl });
      window.sessionStorage.setItem('bvPdpBreadcrumb', breadcrumbData);
      window.sessionStorage.setItem('bvPdpBreadcrumb:' + productUrl.pathname, breadcrumbData);
    } catch (error) {
      // Session storage can be unavailable in private browsing.
    }
  }, true);

  // Product form AJAX (delegated to catch dynamically rendered forms)
  document.addEventListener('submit', function(e) {
    const form = e.target.closest('[data-product-form]');
    if (!form) return;
    const isPdpMainForm = form.hasAttribute('data-pdp-main-form');
    const submitter = e.submitter;

    if (submitter && (submitter.hasAttribute('data-buy-now') || submitter.name === 'return_to')) {
      return;
    }

    if (!document.getElementById('CartDrawer') && !isPdpMainForm) {
      return;
    }

    // Allow dynamic checkout / buy now buttons to submit normally
    if (submitter) {
      if (
        submitter.name === 'checkout' ||
        submitter.classList.contains('shopify-payment-button__button') ||
        submitter.closest('.shopify-payment-button')
      ) {
        return;
      }
    }

    e.preventDefault();

    const submitBtn = submitter || form.querySelector('[type="submit"]');
    const submitText = submitBtn.querySelector('span') || submitBtn;
    const originalText = submitText.textContent;

    submitBtn.disabled = true;
    submitText.textContent = 'Adding...';

    const formData = new FormData(form);

    fetch(form.action + '.js', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Status ' + response.status);
      return response.json();
    })
    .then(data => {
      return fetch('/cart.js', {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
    })
    .then(response => response.json())
    .then(cart => {
      if (isPdpMainForm) {
        updateCartIndicators(cart);
        submitText.textContent = 'Added!';
        const notice = form.parentElement ? form.parentElement.querySelector('[data-pdp-cart-notice]') : null;
        if (notice) {
          notice.hidden = false;
          notice.classList.add('is-visible');
        }
      } else {
        Shopify.onCartUpdate(cart);
        submitText.textContent = 'Added!';
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitText.textContent = originalText;
      }, 2000);
    })
    .catch(error => {
      console.error('Add to cart error:', error);
      // Fallback: submit form normally (lets the browser handle auth)
      submitBtn.disabled = false;
      submitText.textContent = originalText;
      form.submit();
    });
  });
  
  // Accordion functionality
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
      } else {
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Deal countdowns
  const countdownElements = Array.from(document.querySelectorAll('[data-deal-end]'));
  if (countdownElements.length) {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      countdownElements.forEach((el) => {
        const end = new Date(el.dataset.dealEnd).getTime();
        if (Number.isNaN(end)) return;
        const diff = Math.max(end - now, 0);
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        el.textContent = `Ends in ${days} days ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
    };

    updateCountdowns();
    setInterval(updateCountdowns, 1000);
  }

  document.querySelectorAll('[data-auto-marquee]').forEach((track) => {
    setupAutoMarqueeTrack(track);
  });
});

// Cart drawer functions (can be overridden by cart-drawer.liquid)
window.openCartDrawer = window.openCartDrawer || function() {
  const drawer = document.getElementById('CartDrawer');
  if (drawer) {
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    return;
  }

  window.location.href = '/cart';
};

window.closeCartDrawer = window.closeCartDrawer || function() {
  const drawer = document.getElementById('CartDrawer');
  if (drawer) {
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }
};

window.CartDrawer = window.CartDrawer || {
  open: function() {
    return window.openCartDrawer();
  },
  close: function() {
    return window.closeCartDrawer();
  }
};
