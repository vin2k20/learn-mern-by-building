# Landing page: pure HTML & CSS ★ (Day 6)

The marketing site for Kanvas. **No framework, no CSS library, and only a few lines of vanilla JS.** It's the dedicated showcase for
**semantic HTML, Flexbox, Grid, media queries, container queries, transitions and `@keyframes`**.

- Guide: [docs/phases/phase-1-html-css-landing.md](../docs/phases/phase-1-html-css-landing.md)
- Design: [wireframes §1](../docs/design/wireframes.md#1-landing-page-landing) · [tokens](../docs/design/design-tokens.md)
- Run it: `npx serve landing` → http://localhost:3000 (keep DevTools device mode open)

## Files (work in this order)
1. `index.html`: structure only
2. `css/base.css`: layers, reset, tokens, typography
3. `css/layout.css`: Flexbox and Grid page layout
4. `css/components.css`: buttons, cards, forms
5. `css/responsive.css`: media and container queries
6. `css/animations.css`: transitions, keyframes, scroll reveal
7. `js/main.js`: progressive enhancement

## Sections (content brief)
| Section | Content | Layout tech |
|---|---|---|
| Header | logo, nav links (Features, Pricing, FAQ), Log in, "Start free" | Flexbox, sticky |
| Hero | headline, sub-copy, two CTAs, an animated board mock-up (pure CSS) | Grid 2-col → 1-col |
| Logos ☆ | "Trusted by" strip | Flexbox wrap |
| Features | 6 cards: Boards, Whiteboard, Dashboards, Command palette, Offline-ready, Accessible | Grid auto-fit |
| How it works | 3 numbered steps | Grid + CSS counters ☆ |
| Pricing | Free / Team (featured) / Business | Grid areas, subgrid ☆ |
| Testimonials | infinite marquee | Flexbox track + keyframes |
| FAQ | 5 `<details>` items | block flow |
| Contact | name, email, topic `<select>`, message, consent checkbox | Grid form |
| Footer | links, theme toggle, © | Grid / Flexbox |

Write your own copy (keep it short). Placeholder images: use CSS shapes, gradients or inline SVG. No image files are required.

## Acceptance
See the "Definition of done" in the phase guide. Screenshot 360 / 768 / 1024 / 1440 px and compare them with the wireframes.
