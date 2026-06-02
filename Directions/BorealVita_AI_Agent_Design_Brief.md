# Boreal Vita — Web Design System & Build Brief
### A directive for the AI engineering agent (Codex)

> **How to use this document.** This is your single source of truth. Treat it the way a senior design director would brief you on day one. The **Brand Law** sections are non-negotiable. The **Creative Latitude** sections are where you are expected to be a 200-IQ designer and surprise us. When in doubt: brand tokens win, accessibility wins, and the oldest user we serve wins. Save this file in the repo root (e.g. `AGENTS.md` or `/docs/design-system.md`) and re-read it before every milestone.

---

## 0. THE BRIEF FORM (lock these before you write a line of code)

Fill and version-control this block. It is the contract.

```
PROJECT:          Boreal Vita storefront redesign
PLATFORM:         Shopify (current). Confirm: Liquid theme refactor OR headless (Hydrogen/Next).
PRIMARY MARKET:   Pakistan (delivery), Canadian-made products (NPN-registered)
PRIMARY LANGUAGE: English (label copy is EN/FR because products are Canadian)
CURRENCY:         Confirm with owner (storefront shows "$")
AUDIENCE:         Universal — must delight a 16-year-old AND be effortless for a 90-year-old
NORTH STAR:       "Northern apothecary meets modern science." Calm, trustworthy, alive.
BRAND PROMISE:    Herbal By Nature. Antioxidants that protect cells.
NON-NEGOTIABLES:  Brand color tokens, brand type system, WCAG 2.2 AA minimum (AAA on body text),
                  reduced-motion parity, 48px touch targets, gold-never-as-small-text-on-white.
CREATIVE FREEDOM: Layout, motion, composition, atmosphere, micro-interactions, illustration.
DEFINITION OF DONE: Section 11 checklist passes on real devices, by a real older adult and teen.
```

---

## 1. THE GAP WE ARE CLOSING (current state, audited)

The live site at borealvita.ca is a functional Shopify storefront on a near-stock theme. Honest assessment:

- It already uses a deep teal close to the brand (`#0A282C` theme color ≈ brand `#0A272A`), so the foundation is sympathetic — **do not throw away the teal equity.**
- The **brand type system is absent** — no Moderniz/Coolvetica/DM Sans hierarchy, no gold gradient language, no disciplined spacing.
- Product imagery appears **AI-generated and inconsistent.** This reads as "drop-shipper," not "Canadian apothecary."
- Layout is the **default theme pattern** (hero carousel → shop-by-concern → trending → deals → bundles → blog → footer). Competent, forgettable.
- It serves **Pakistan**; treat localization, currency, and trust signals as first-class.

**Your job:** keep the teal equity and the commerce plumbing, and replace the generic skin with a designed, accessible, unforgettable system built from the brand spec.

---

## 2. BRAND LAW — COLOR (do not improvise these hexes)

These come directly from the official brand sheet. They are canonical. You may **derive** neutral surfaces and interaction states, but you may not alter or "improve" the canonical values.

### 2.1 Canonical palette (locked)

| Role | Token | Hex |
|---|---|---|
| Deepest teal (title gradient start; ≈ current theme color) | `--bv-teal-900` | `#0A272A` |
| **Main brand color** | `--bv-teal-800` | `#114245` |
| Main-gradient ends | `--bv-teal-700` | `#163B43` |
| Heading-gradient end | `--bv-teal-600` | `#165258` |
| Bright accent teal (gradient center) | `--bv-teal-500` | `#228191` |
| Core gold | `--bv-gold-500` | `#E9A526` |
| Gold gradient light center | `--bv-gold-200` | `#F5D988` |
| Gold gradient warm end | `--bv-gold-600` | `#E9A256` |
| "Yellow Dark" — actually a burnt orange/terracotta, use sparingly | `--bv-rust-600` | `#D44B2B` |
| Gold-on-light **text** color (deep brown) | `--bv-brown-900` | `#563114` |
| White | `--bv-white` | `#FFFFFF` |
| Ink / body text on light | `--bv-ink` | `#111111` |

### 2.2 Canonical gradients (exact stops from the spec)

```css
--bv-grad-main:    linear-gradient(135deg, #163B43 0%, #228191 50%, #163B43 100%);
--bv-grad-heading: linear-gradient(180deg, #0A272A 0%, #165258 100%);
--bv-grad-gold:    linear-gradient(135deg, #E9A526 0%, #F5D988 50%, #E9A256 100%);
```

### 2.3 THE GOLD RULE (memorize this — it protects older readers)

The core gold `#E9A526` has roughly **2:1 contrast on white** — it **fails** as text. Therefore:

- ✅ Gold gradient on **deep teal** (banners, badges, the "Mission Statement Banner" treatment) — high contrast, on-brand.
- ✅ Gold as **large decorative** elements, dividers, icon strokes, glow/sunlight accents.
- ✅ When you must place gold-adjacent text on a light background, use **`--bv-brown-900` (#563114)**, never the gold itself.
- ❌ **Never** gold body text, gold links, gold small UI labels on white. Ever.

### 2.4 Derived (allowed, must be documented in the style page)

You may add a warm paper surface and standard state colors so the UI breathes. Keep them subtle and never let them override the canonical hexes.

```css
--bv-cream:     #FBF8F1;  /* optional warm "label paper" surface */
--bv-teal-tint: #EAF1F1;  /* faint teal wash for cards/sections */
--bv-success:   #2E7D5B;  /* derive; pair with icon + text, never color-only */
--bv-error:     #B3261E;  /* derive; AA on white */
--bv-focus:     #228191;  /* focus ring base, thickened for visibility */
```

---

## 3. BRAND LAW — TYPOGRAPHY

Four roles from the spec. Tracking is **0**, scales are **100%** (no artificial horizontal/vertical scaling on the web — use real type sizes). Leading is set per role.

| Role | Font | Used for |
|---|---|---|
| **Display / Titles** | **Moderniz** (Regular) | Hero headlines, big product names, statement moments. Geometric, wide, futuristic. |
| **Secondary display / UI headings** | **Coolvetica** (Regular) | Section labels, "Product Facts," the count block ("120 Capsules"), the strength block ("405"), nav, buttons. |
| **Body** | **DM Sans** | All paragraphs, directions, warnings, descriptions, long-form. |
| **Accent (optional, replaceable)** | **Lemon Milk** | Promo banners, highlight flashes. The spec marks this *replaceable* — fine to drop if licensing is hard. |

### 3.1 Font licensing — READ BEFORE SHIPPING

- **DM Sans** → open-source (Google Fonts / Fontsource). Self-host WOFF2. No issue.
- **Moderniz** → commercial display font. **Confirm a web/embedding license** before shipping; if unavailable, use the documented fallback and flag it to the owner.
- **Coolvetica** → commercial (Typodermic). A webfont license exists — **acquire it**; do not hotlink pirated copies.
- **Lemon Milk** → commercial. Optional; only ship with a valid web license.

Self-host all licensed fonts as WOFF2, `font-display: swap`, preload the two most critical faces. Never let the cascade fall to Times New Roman.

### 3.2 Font stacks (with safe fallbacks)

```css
--font-display: "Moderniz", "Coolvetica", "Archivo", "Arial Narrow", system-ui, sans-serif;
--font-heading: "Coolvetica", "Oswald", "Archivo Narrow", system-ui, sans-serif;
--font-body:    "DM Sans", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--font-accent:  "Lemon Milk", "Coolvetica", "Archivo", system-ui, sans-serif;
```

### 3.3 Fluid, accessible type scale

The print spec lists tiny sizes (down to 3pt) for packaging. **That is print, not web.** On the web the audience is 16–90; floor the body generously and scale fluidly.

```css
:root{
  /* Base body floor is intentionally large for older readers */
  --fs-body:   clamp(1.0625rem, 0.95rem + 0.45vw, 1.1875rem); /* ~17→19px */
  --fs-small:  clamp(0.9375rem, 0.9rem + 0.2vw, 1rem);        /* ~15→16px, never smaller for real content */
  --fs-lead:   clamp(1.1875rem, 1.05rem + 0.6vw, 1.375rem);   /* intro paragraphs */
  --fs-h3:     clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  --fs-h2:     clamp(1.75rem, 1.4rem + 1.8vw, 2.75rem);
  --fs-h1:     clamp(2.5rem, 1.9rem + 3.2vw, 4.5rem);
  --fs-hero:   clamp(3rem, 2rem + 5vw, 6rem);                 /* Moderniz hero moment */

  --lh-tight:  1.08;   /* display */
  --lh-snug:   1.25;   /* headings */
  --lh-body:   1.65;   /* body — generous for readability */
  --measure:   68ch;   /* max line length for body text */
  --tracking:  0;      /* brand spec: tracking 0 everywhere */
}
```

Rules: body line length capped at `--measure`; body line-height `1.65`; never set real content below `--fs-small`; headings in Coolvetica/Moderniz, body in DM Sans, no exceptions.

---

## 4. BRAND LAW — SPACING, GEOMETRY, ASSETS

- **Clear space:** the spec defines safe margin as "the height of the Product Facts heading (X)." Translate to a spacing token `--space-x` and keep at least that clearance around major brand blocks (logo lockup, hero, banners). Build an 8px-based scale (`4, 8, 12, 16, 24, 32, 48, 64, 96`).
- **Logo:** use the supplied lockups (`logo-white.png`, `header-logo-color.png`) plus the SVG already on the site. Maintain clear space; never recolor, stretch, or place on low-contrast backgrounds. Request vector logo + favicon set from owner if not already vector.
- **Iconography:** check icons in `--bv-teal-800` (the spec uses a check icon in main color for bullet copy). One coherent icon set, 1.75–2px stroke, rounded joins.
- **Imagery / art direction:** replace AI-looking product shots over time with consistent, honest product photography on `--bv-cream` or soft botanical sets. Until then, set a consistent treatment (same background, same light, same crop) so the catalog feels like one brand. Botanical/northern-flora motifs are encouraged as texture, not clipart.
- **Corners & shadows:** pick ONE radius language (suggest 14–18px on cards, pill buttons) and a soft, layered shadow system (no harsh 1px borders everywhere). Document it.

---

## 5. CREATIVE LATITUDE — THE "EVER-LIVING" DIRECTION

This is where you get to be brilliant. The tokens above are the grammar; here is the poetry.

**Concept: "Northern apothecary meets modern science."** Boreal = the northern forest. Vita = life. The feeling: deep evergreen calm, with gold like low northern sunlight breaking through trees — warmth, vitality, trust. Clinical enough to believe, natural enough to love.

Pick ONE flavor and commit (do not blend timidly):
1. **Luxe-Natural / Editorial** — generous negative space, big Moderniz headlines, gold hairline accents, slow confident motion. (Default recommendation.)
2. **Modern Apothecary** — warm cream paper surfaces, botanical line art, teal ink, gold foil moments. Tactile, premium.
3. **Clean Clinical-Warm** — crisp white + teal, scientific clarity, gold reserved for proof/benefit highlights.

Whatever you pick: **atmosphere over flat color.** Use layered depth — a faint gradient mesh of teal, a whisper of grain, soft glows behind hero product, gold light leaks. Make it feel *alive* without ever fighting the content. One unforgettable signature moment per page beats ten scattered tricks.

**Hard creative guardrails (anti-AI-slop):**
- No purple-on-white gradients, no Inter/Roboto/Arial as the design voice, no stock "SaaS hero with floating cards" cliché, no centered-everything timidity.
- Dominant color with sharp accents > evenly distributed pastel mush.
- Asymmetry, overlap, intentional grid-breaks — but never at the cost of the Grandparent Test (Section 8).

---

## 6. COMPONENT STANDARDS (the kit)

Build these as reusable, documented components. Every one must pass the accessibility spec in Section 7.

- **Buttons.** Primary = teal `--bv-teal-800` fill, white text, pill, min height 48px, min touch 48×48. Hover/active = subtle lift + `--bv-teal-700`. Secondary = teal outline. Gold may be used as a *premium/limited* accent button **only on dark sections**. Visible focus ring (≥3px, `--bv-focus`).
- **Nav / header.** Keep the mega-menu structure (it organizes a large catalog well) but redesign it: larger hit areas, clear current-state, sticky on scroll, a prominent search, and a high-contrast cart. Mobile = full-screen, thumb-reachable, big rows.
- **Product card.** Big honest image, product name in Coolvetica, price clear and large, count badge ("120 Capsules") and strength ("405 mg") as on-brand chips echoing the label. One obvious "Add to cart." Wishlist as secondary. Never bury price or rely on hover to reveal actions.
- **"Product Facts" web panel.** A signature component (Section 9 / Milestone M4): a beautiful, accessible re-creation of the physical label's facts table — teal headings, DM Sans rows, gold accent rule, fully responsive, screen-reader friendly as a real table.
- **Section label.** Small caps Coolvetica eyebrow (e.g. "SHOP BY CONCERN") above a Moderniz/large heading — directly mirrors the brand sheet's hierarchy.
- **Banner / mission statement.** Gold gradient on teal with `--bv-brown-900` or white text (whichever passes contrast for that size) — this is the one place gold leads, exactly as the packaging does.
- **Forms & inputs.** Always-visible labels (never placeholder-only), large fields (≥48px), generous spacing, inline error text with icon, clear success. Newsletter, account, search all conform.
- **Footer.** Keep the information architecture (Information / Help / Account / Community newsletter) but redesign for warmth and clarity; large legible links, trust signals, Made-in-Canada + NPN credibility, locale/currency.

---

## 7. BRAND LAW — UNIVERSAL ACCESSIBILITY (16 → 90)

This is the heart of the project. **Universal design is the flex, not a compromise.** A site that a 90-year-old can use effortlessly and a teenager finds mesmerizing is harder and better than either alone. Targets are **WCAG 2.2 AA minimum, AAA on body text.**

**Color & contrast**
- Body text ≥ 7:1 (AAA) where feasible; everything ≥ 4.5:1 (AA). Large text ≥ 3:1.
- Obey the Gold Rule (2.3). Never convey meaning by color alone — pair with text/icon/shape.

**Type & reading**
- Body floor ~17–19px (`--fs-body`), line-height 1.65, line length ≤ 68ch. Plain language, short sentences, no jargon dumps. Real content never below `--fs-small`.

**Targets & motion**
- Touch targets ≥ **48×48px**, ≥ 8px apart (older hands, tremor, low precision).
- Hover is enhancement only — every critical action works on tap and keyboard.
- Respect `prefers-reduced-motion`: provide a calm, equally beautiful static version. No autoplay that can't be paused. No motion that conveys essential info.

**Keyboard & screen reader**
- Fully keyboard operable; logical tab order; keep the existing skip-link and expand it. Visible, thick focus rings everywhere (never `outline:none` without a stronger replacement).
- Semantic HTML + landmarks (`header/nav/main/footer`), real headings in order, ARIA only where semantics fall short, meaningful alt text on all product/brand imagery, labelled controls.

**Forms & feedback**
- Visible labels, big inputs, forgiving validation, clear recoverable errors, generous spacing.

**Predictability**
- Consistent navigation and layout across pages; nothing jumps or changes meaning on scroll. Obvious, stable "where am I / how do I get back."

---

## 8. THE TWO TESTS (literal acceptance criteria, every milestone)

Every milestone must pass **both** before it's "done":

- 🧓 **The Grandparent Test.** Could a 75–90-year-old, new to the site, on a phone, with reading glasses, find a product, understand what it does, and add it to cart **without help and without zooming**? Text big enough, targets big enough, language plain enough, contrast strong enough, nothing hidden behind hover.
- 🧑 **The Teenager Test.** Would a 16-year-old screenshot it because it looks *good*? Is there a moment of delight, a sense of craft, something modern and alive — not a "pharmacy website"?

If a design wins one and loses the other, it is not done. The genius is in winning both.

---

## 9. SIGNATURE / "UNCOMMON" FEATURES (build at least these three)

These set the site apart and serve the mission. Treat as required, not optional flourish.

1. **Comfort Mode control.** A persistent, obvious toggle (header or floating) offering **Larger Text** and **Higher Contrast** modes, remembered across sessions. This is the inclusivity centerpiece — make it elegant, not an afterthought.
2. **The "Label, Reborn" Product Facts panel.** Faithfully translate the physical label's information system to the web as a beautiful, accessible component (real semantic table, teal/gold treatment, NPN + Made-in-Canada credibility, dosage/strength/count chips). The web should feel continuous with the bottle in the customer's hand.
3. **Quiet, orchestrated arrival.** One well-choreographed page-load reveal per key page (staggered, calm, on-brand sunlight-through-forest feel) that has a fully static reduced-motion twin of equal beauty.

(Stretch, owner's call: a guided "What should I take?" concern-finder with large friendly steps; localized PK trust block with delivery/returns clarity.)

---

## 10. TECHNICAL & PLATFORM NOTES

- **Platform:** It's Shopify today. Confirm with the owner whether you're (a) refactoring the Liquid theme in place, or (b) going headless (Hydrogen / Next.js). The token system, components, and accessibility spec apply either way.
- **Token architecture:** ship everything in Section 2–4 as CSS custom properties in one `tokens.css` (or Tailwind theme config). One source of truth; no hard-coded hexes in components.
- **Fonts:** self-host licensed WOFF2, `font-display: swap`, preload critical faces, define fallbacks (3.2). Resolve licensing before launch.
- **Performance budget:** Lighthouse Performance ≥ 85, **Accessibility ≥ 95**, Best Practices & SEO ≥ 90 on mobile. LCP < 2.5s, CLS < 0.1. Lazy-load below-fold imagery; serve responsive `srcset`; compress everything; keep motion GPU-cheap.
- **Localization:** primary market Pakistan — confirm currency, delivery/returns messaging, and that NPN/Made-in-Canada credibility is surfaced (it's a trust asset). Keep EN primary; the label's FR is a packaging artifact, not required UI.
- **Packaging parity:** the web and the physical label should look like one brand. Same teal, same gold, same type roles, same "Product Facts" voice. (CMYK/print rules in the spec are for packaging only — don't apply CMYK on the web.)

---

## 11. DEFINITION OF DONE (QA checklist — run every milestone)

```
[ ] Only canonical hexes/gradients used; derived tokens documented
[ ] Type roles correct: Moderniz=display, Coolvetica=UI headings, DM Sans=body
[ ] Fonts self-hosted, licensed, with working fallbacks; no Times fallback ever
[ ] Gold Rule obeyed (no gold small text on white; brown #563114 for gold-adjacent text)
[ ] Body ≥ ~17–19px, line-height 1.65, measure ≤ 68ch, plain language
[ ] Contrast: body AAA where feasible, everything AA; nothing meaningful by color alone
[ ] Touch targets ≥ 48×48, ≥ 8px apart; hover never required for critical actions
[ ] Full keyboard operation; visible thick focus rings; skip link present
[ ] Semantic HTML + landmarks + alt text + labelled controls; SR-tested
[ ] prefers-reduced-motion honored; static version equally beautiful; no unpausable autoplay
[ ] Comfort Mode works and persists
[ ] Lighthouse: A11y ≥95, Perf ≥85, BP/SEO ≥90 (mobile); LCP <2.5s; CLS <0.1
[ ] Grandparent Test PASS  •  Teenager Test PASS
[ ] Tested on real phone + desktop, small and large screens
```

---

## 12. MILESTONES (named, sequenced — the uncommon stuff is built in)

Work in this order. Each milestone ships the Definition-of-Done checklist for its scope, and passes **both** the Grandparent and Teenager tests.

### M0 — "Forensics & Foundations"
*Objective:* understand what exists and lay rails.
*Do:* audit the current Shopify site (keep teal equity + commerce plumbing, list what's generic); confirm platform path (Liquid vs headless); build `tokens.css` (Sections 2–4) and the font pipeline with fallbacks; set the accessibility baseline (reset, focus styles, landmarks, reduced-motion scaffolding).
*Uncommon twist:* write down, in one paragraph each, the chosen creative flavor (Section 5) and the "one unforgettable thing" the whole site will be remembered for. Commit it before designing.
*Accept when:* tokens render on a blank page, fonts self-host with fallbacks, Lighthouse A11y ≥95 on a styled blank page.

### M1 — "The Voice of the Brand" (living style guide FIRST)
*Objective:* a real, browsable style-guide page that IS the source of truth.
*Do:* render every token, gradient, type role at every scale, every button/input/badge/state, the icon set, spacing scale, and the Gold Rule demonstrated visually (pass vs fail examples).
*Uncommon twist:* ship the style guide before any marketing page. Nothing gets built that isn't first proven here.
*Accept when:* a stranger could rebuild the brand from this page alone; all components pass DoD.

### M2 — "First Five Seconds" (hero / above the fold)
*Objective:* the mesmerizing-but-legible front door.
*Do:* Moderniz hero moment, atmospheric teal depth + gold light, clear value prop, one strong CTA, the orchestrated arrival animation (Signature #3).
*Uncommon twist:* build the **reduced-motion static version first** and make it beautiful; the animated version is the enhancement, not the crutch. The hero must read instantly to a 90-year-old.
*Accept when:* both tests pass; LCP <2.5s; static twin is as strong as the animated one.

### M3 — "The Shelf" (collection + product cards)
*Objective:* a trustworthy, scannable catalog for a large product range.
*Do:* product card (Section 6), collection/listing grid, filters that work on tap + keyboard, big legible prices, count/strength chips echoing the label.
*Uncommon twist:* the grid should feel like a curated apothecary shelf, not a spreadsheet — rhythm, breathing room, honest imagery treatment — while staying instantly scannable for low-vision users.
*Accept when:* both tests pass; filtering works without hover; nothing relies on color alone.

### M4 — "The Label, Reborn" (Product Detail Page)
*Objective:* the bottle, continued on screen. Use **Allergy Relief** as the worked example.
*Do:* full PDP with the signature **Product Facts** web panel (Signature #2): dosage table (e.g. Nettle 150 mg, Black elder 90 mg, Black Walnut 45 mg, Blue chamomile 45 mg, Huang qin 45 mg, Vitamin C 30 mg), non-medicinal ingredients, claims, cautions/warnings, **NPN 80134953**, **120 Vegetarian Capsules / 405 mg per capsule**, Made-in-Canada credibility, sticky add-to-cart on mobile.
*Uncommon twist:* the on-screen facts panel should make a customer holding the physical bottle feel they're looking at the same brand — same teal/gold, same voice — but rendered as a fully accessible semantic web table, not an image of the label.
*Accept when:* both tests pass; the facts table is screen-reader navigable; cautions are clearly legible to older users.

### M5 — "Comfort by Design" (inclusivity hardening + Comfort Mode)
*Objective:* make universal access undeniable.
*Do:* ship Comfort Mode (Signature #1: larger text + higher contrast, persistent); full keyboard + screen-reader pass across M1–M4; verify all targets, focus rings, labels, alt text, reduced-motion.
*Uncommon twist:* recruit (or simulate via checklist) one older adult and one teen to actually try the site; log what confused each; fix it. Document findings.
*Accept when:* Lighthouse A11y ≥95 site-wide; Comfort Mode persists; documented user notes addressed.

### M6 — "Motion & Soul" (choreography pass)
*Objective:* make it feel alive without sacrificing anyone.
*Do:* orchestrate page-load reveals, scroll states, and surprising-but-tasteful micro-interactions across the site; all GPU-cheap; all with reduced-motion twins.
*Uncommon twist:* every animation must answer "what does this help the user understand or feel?" Delete motion that's only decoration-for-decoration's-sake. One signature moment per page, executed with precision.
*Accept when:* both tests pass; reduced-motion experience is complete and lovely; no CLS regressions.

### M7 — "Trust & Conversion" (cart, forms, localization, proof)
*Objective:* turn delight into confident purchase.
*Do:* cart + checkout entry, account/newsletter/search forms (Section 6), reviews/ratings if available, trust signals, PK localization (currency, delivery, returns), Made-in-Canada/NPN credibility surfaced.
*Uncommon twist:* design the cart and forms for the *least* confident user — if a nervous 80-year-old can check out calmly, everyone can.
*Accept when:* both tests pass; full keyboard checkout; clear recoverable errors; localization confirmed.

### M8 — "The Polish Room" (QA + launch)
*Objective:* ship something flawless.
*Do:* full DoD pass site-wide; real-device testing (small/large, iOS/Android/desktop); performance budget met; accessibility audit; content proofread; analytics + redirects; launch checklist.
*Uncommon twist:* final sign-off requires one real older adult and one teen to each complete a purchase unaided. If either struggles, it's not done.
*Accept when:* every box in Section 11 is checked across the site, on real hardware, by real humans of both ages.

---

## 13. ANTI-PATTERNS (do not do)

- ❌ Generic AI-slop aesthetics: Inter/Roboto/Arial as the voice, purple-on-white gradients, floating-card SaaS hero clichés, centered-everything timidity.
- ❌ Gold text on white (the Gold Rule). Tiny "designy" type. Hover-only actions. `outline:none` with no replacement.
- ❌ Color-only meaning. Mystery-meat navigation. Motion that can't be reduced. Autoplay you can't stop.
- ❌ Hard-coded hexes scattered in components. Pirated/hotlinked fonts. Times New Roman fallback.
- ❌ "Pretty but unusable" OR "usable but lifeless." We need both. Always both.

---

*End of brief. Brand tokens are law. Accessibility is law. The oldest user we serve and the most demanding teen are both watching. Now go make something Boreal Vita is proud to hand a customer alongside the bottle.*
