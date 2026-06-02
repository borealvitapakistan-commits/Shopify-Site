# Deferred Issues

- Replace fallback heading fonts with licensed Moderniz/Coolvetica WOFF2 assets when available.
- Audit remaining component-level hard-coded legacy color fallbacks and convert them to canonical `--bv-*` tokens in later M0/M1 work.
- Investigate Shopify/browser-level Lighthouse Best Practices findings during launch QA. Current live M0-M4 runs report Best Practices 77 from Shopify/browser-level redirects, third-party cookies, and inspector issues.
- Re-run PDP Lighthouse after Shopify's product page cache refreshes for Chrome user agents. The live theme contains the responsive image-delivery patch for the Allergy Relief main image, but the public Chrome-user-agent cache still served the pre-optimization `width=1200` markup immediately after push.
- Re-run M5 PDP verification after Shopify clears stale product page-cache variants. Some anonymous Allergy Relief PDP requests still serve old theme HTML (`#155318223037`) with immutable `base.css?v=162310217446694740241780185926`, causing Comfort Mode horizontal overflow even though both the current live theme (`#155831894205`) and old unpublished theme contain the M5 fixes.
- Remove duplicated Comfort Mode product ingredient overflow rules from `layout/theme.liquid`, `sections/header.liquid`, and `sections/product-info-accordions.liquid` once Shopify product caches consistently serve the current `assets/base.css`.
