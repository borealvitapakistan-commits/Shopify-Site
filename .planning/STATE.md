# State

## Current Position

M4 - The Label, Reborn is complete. M5 - Comfort by Design is implemented but not accepted yet because Shopify is intermittently serving stale product-page HTML that points at an immutable pre-M5 `base.css` asset and causes Allergy Relief PDP horizontal overflow in Comfort Mode.

## Decisions

- Platform path: Shopify Liquid theme refactor in place.
- Creative flavor: Luxe-Natural / Editorial.
- Halal positioning: keep halal/certification language in About Us/trust standards only; remove it from browser title, homepage H1, and persistent header messaging.
- Fonts: DM Sans is self-hosted. Licensed Moderniz/Coolvetica files are not present, so the theme uses self-hosted Montserrat/Bebas fallback faces behind the official font-family names until licenses/assets are supplied.

## Done This Session

- Added canonical Boreal Vita tokens in `assets/tokens.css`.
- Rewired compatibility CSS variables to the canonical token palette.
- Added self-hosted font fallback definitions and preloads.
- Strengthened global accessibility defaults: larger body text, line-height, 48px buttons, focus rings, and reduced-motion baseline.
- Removed halal-led copy from SEO defaults, header strip defaults/current settings, and homepage hero H1.
- Ran `shopify theme check` with zero offenses.
- Pushed to live Shopify theme `Boreal vita Updates` (#155318223037).
- Fixed homepage ARIA issues that were blocking Lighthouse accessibility.
- Final live Lighthouse M0 run: Performance 88, Accessibility 100, Best Practices 77, SEO 100.
- Added the M1 living style guide section and alternate templates at `page.style-guide` and `index.style-guide`.
- Made the public style guide available at `https://borealvita.ca/?view=style-guide`.
- Adjusted the Gold Rule fail demo so the page demonstrates the forbidden pairing without failing contrast audits.
- Final live Lighthouse M1 style-guide run: Performance 99, Accessibility 100, Best Practices 77, SEO 100.
- Implemented the M2 homepage hero refactor in `sections/hero-banner.liquid`: editorial teal/gold hero, market-aware H1, stronger lead copy, CTA, proof points, product facts card, reduced-motion-aware autoplay, responsive mobile constraints, and fallback hero image.
- Added generated hero fallback asset `assets/bv-hero-northern-apothecary.jpg`.
- Updated `templates/index.json` so the homepage explicitly owns the M2 hero settings and autoplay is disabled.
- Added `bv-theme-revision` metadata in `layout/theme.liquid`.
- Pushed M2 files to live Shopify theme `Boreal vita Updates` (#155318223037) and confirmed a Shopify CLI pull matches local files.
- Verified M2 preview screenshots on desktop and mobile; mobile copy and eyebrow no longer clip.
- Final preview Lighthouse M2 run: Performance 92, Accessibility 97, Best Practices 77, SEO 100. Accessibility loss is the Shopify preview bar iframe missing a title; CLS 0, LCP 2.4s, FCP 2.3s.
- Confirmed the normal public homepage cache refreshed and now serves the M2 hero without `preview_theme_id`.
- Final public Lighthouse M2 run: Performance 92, Accessibility 100, Best Practices 77, SEO 100. CLS 0, LCP 2.8s, FCP 2.4s.
- Implemented the M3 collection shelf in `sections/main-collection.liquid`: curated apothecary toolbar, semantic fieldset filters, larger tap targets, responsive product-first mobile layout, and eager/fetch-priority handling for above-the-fold product images.
- Updated `snippets/product-card-amzn.liquid` and `assets/product-card-amzn.css` with label-derived count/strength chips, visible price label, stronger low-vision price/title sizing, premium shelf card styling, reduced-motion safeguards, and mobile chip stacking.
- Pushed M3 files to live Shopify theme `Boreal vita Updates` (#155318223037) and confirmed the public collection URL now serves the new M3 markup without `preview_theme_id`.
- Verified M3 desktop and mobile public rendering. Mobile computed layout places the product card before filters, keeps cards/filters within a 390px viewport, and shows count/strength chips.
- Verified M3 filter interaction on the live collection: availability checkbox works by tap and by keyboard Space activation.
- Final public Lighthouse M3 collection run: Performance 93, Accessibility 100, Best Practices 77, SEO 100. CLS 0, LCP 2.9s, FCP 2.0s.
- Implemented the M4 Allergy Relief PDP label continuation in `sections/product-main-buy.liquid`: NPN fallback, 120 Vegetarian Capsules / 405 mg per capsule sizing, Made in Canada label facts, and mobile sticky add-to-cart enabled through `templates/product.json`.
- Added the M4 Product Facts web panel in `sections/product-info-accordions.liquid`: semantic ingredient table with caption, scoped row/column headers, claims, cautions/warnings, non-medicinal ingredients, NPN 80134953, and Made-in-Canada credibility.
- Enlarged ingredient carousel dot tap targets after Lighthouse flagged them; the final public M4 accessibility score is 100.
- Pushed M4 files to live Shopify theme `Boreal vita Updates` (#155318223037) and confirmed a Shopify CLI pull matches local files.
- Verified M4 public desktop and mobile rendering. Mobile shows the sticky add-to-cart bar, label fact chips, and a 6-row screen-reader navigable facts table.
- Final public Lighthouse M4 product run: Performance 85, Accessibility 100, Best Practices 77, SEO 100. CLS 0, LCP 4.0s, FCP 2.2s.
- Implemented M5 Comfort Mode: header utility buttons on desktop, sticky, and mobile headers; persistent localStorage state; early root class application; synchronized `aria-pressed` state; larger text/contrast tokens; stronger focus rings; larger Comfort-mode control targets; reduced motion; and visible skip-link focus behavior.
- Added M5 product ingredient overflow protections in `assets/base.css`, `layout/theme.liquid`, `sections/header.liquid`, and `sections/product-info-accordions.liquid` to cover normal and cached product render paths.
- Added `.planning/M5_ACCESSIBILITY_NOTES.md` with older-adult and teen keyboard/screen-reader simulation findings.
- Pushed M5 files to Shopify and created/published live duplicate theme `Boreal vita Updates M5` (#155831894205). The previous `Boreal vita Updates` theme (#155318223037) is now unpublished but was also synced with the M5 files because stale product HTML still references it.
- Verified in Playwright that the fresh M5 theme path passes: Comfort Mode persists on homepage, skip link becomes visible on keyboard focus, collection remains within a 390px viewport, and the Allergy Relief PDP stays within a 390px viewport when the fresh M5 assets are served.
- Blocker found: normal anonymous Allergy Relief PDP requests intermittently receive older Shopify page-cache variants with `base.css?v=162310217446694740241780185926`; those variants overflow to 570px at a 390px viewport when Comfort Mode is already persisted. This prevents M5 acceptance and Lighthouse site-wide verification.

## Not Done

- M5 is not accepted until the public Allergy Relief PDP consistently serves a non-overflowing page-cache variant and Lighthouse Accessibility is rerun across home, style guide, collection, and product.
- M6-M8 are not started.
- Best Practices remains below 90 because of Shopify/browser-level third-party cookie and inspector findings; revisit during M8 launch QA.
