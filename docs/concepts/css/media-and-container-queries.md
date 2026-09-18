# Media queries & container queries (responsive design)

> **TL;DR:** go **mobile-first** (base styles for small screens, then `min-width` queries). Use **container queries** when a component should
> respond to *its own* width, not the viewport's. Also respect user preferences (colour scheme, motion, contrast).

## Media query syntax
```css
@media (min-width: 48rem) { … }                       /* ≥ 768px (with a 16px root) */
@media (width >= 48rem) and (width < 64rem) { … }     /* range syntax (widely supported) */
@media (orientation: landscape) { … }
@media (hover: hover) and (pointer: fine) { .card:hover { … } }   /* don't rely on hover on touch screens */
@media (prefers-color-scheme: dark) { :root { … } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
@media (prefers-contrast: more) { … }
@media print { nav, .no-print { display: none; } }
```
Why `rem` in media queries? They scale with the user's browser font-size setting, which is an accessibility win.

## Mobile-first vs desktop-first
| Mobile-first (`min-width`) ✅ | Desktop-first (`max-width`) |
|---|---|
| Small screens load the simplest CSS | Mobile overrides pile up |
| Progressive enhancement | Graceful degradation |

## Container queries
```css
.card-list { container-type: inline-size; container-name: cards; }
@container cards (min-width: 30rem) {
  .card { display: grid; grid-template-columns: 6rem 1fr; }
}
.card-title { font-size: clamp(1rem, 4cqi, 1.5rem); }   /* cqi = 1% of the container's inline size */
```
Use them for reusable components (project cards in a sidebar vs the main grid, dashboard widgets).

## Responsive checklist
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Fluid type and spacing with `clamp()`
- Images: `max-width: 100%; height: auto;`, `srcset`/`sizes`, and `aspect-ratio`
- `100dvh` instead of `100vh` on mobile (the dynamic toolbar)
- Touch targets at least 24×24 CSS px (WCAG 2.2 AA) and ideally 44×44
- Test in DevTools device mode **and** on a real phone. Check landscape too.
- JavaScript equivalent: `window.matchMedia(query)` with a `change` listener (see `useMediaQuery`)

## 🎤 Interview questions
<details><summary>Media query vs container query?</summary>
A media query responds to the viewport or device. A container query responds to the size of an ancestor container, which makes a component truly reusable in any layout slot.
</details>

## Practise in Kanvas
`landing/css/responsive.css` · `client/src/styles/layout.css` · `hooks/useMediaQuery.js` · `ProjectCard.module.css`
