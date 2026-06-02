# M5 Accessibility Notes

Date: 2026-05-30

## Older Adult Simulation

- Finding: The site had strong base text sizing, but no obvious way to request a larger, higher-contrast experience.
- Fix: Added a persistent Comfort Mode toggle with larger text tokens, higher contrast color tokens, stronger focus rings, larger control targets, and reduced motion while enabled.
- Finding: The skip link existed but inherited `visually-hidden !important`, so keyboard users could not reliably see it when focused.
- Fix: Added a focus/focus-visible override that restores the skip link as a fixed, visible control.

## Teen Keyboard / Screen-Reader Simulation

- Finding: Product and collection primary actions were keyboard reachable, but the global Comfort control needed clear pressed state semantics.
- Fix: The Comfort Mode control is a real button with `aria-pressed`, an explicit aria-label, and localStorage-backed state that persists after reloads and across pages.
- Finding: Product Facts needed to stay navigable by assistive tech after M4.
- Fix: Retained captioned ingredient table with scoped row and column headers, plus visible cautions and label facts.
- Finding: Carousel dot targets were a previous M4 accessibility risk.
- Fix: Dot controls were enlarged in M4 and remain covered by M5's 52px Comfort Mode target baseline.

## Checklist

- Comfort Mode persists across reloads: verified in Playwright.
- Keyboard skip link visible on focus: verified in Playwright.
- Reduced-motion preference baseline remains in `assets/base.css`; Comfort Mode also disables animation/transition durations.
- Fresh M5 theme path: verified in Playwright on home, collection, and Allergy Relief PDP.
- Public cache blocker: some anonymous Allergy Relief PDP responses still serve an old immutable `base.css` URL and overflow in Comfort Mode. M5 acceptance and Lighthouse Accessibility site-wide verification are pending until those stale Shopify page-cache variants clear.
