# Phase 1 · HTML & CSS: the Kanvas landing page ★ (Day 6, ~4 h)

**Goal:** a responsive, animated, accessible marketing page in **pure HTML and CSS** (plus a few lines of vanilla JS), where
**Flexbox, Grid, media queries, transitions and `@keyframes`** are each used where they actually fit.
**[Interview topics](../interview/target-role.md) covered:** *HTML/CSS · user interface design · optimised for various devices and platforms*
**Design spec:** [wireframes §1](../design/wireframes.md#1-landing-page-landing) · [design tokens](../design/design-tokens.md)
**Primers:** [box model, specificity, cascade layers](../concepts/css/box-model-specificity-cascade-layers.md) ·
[flexbox](../concepts/css/flexbox.md) · [grid](../concepts/css/grid.md) · [media & container queries](../concepts/css/media-and-container-queries.md) ·
[transitions & keyframes](../concepts/css/transitions-keyframes-animations.md) · [CSS architecture](../concepts/css/css-architecture.md) ·
[responsive images & units](../concepts/css/responsive-images-units.md) · [accessibility](../concepts/web/accessibility.md)

Serve it with `npx serve landing` (or VS Code Live Server) and keep DevTools **device mode** open.

---

## Order of work
| # | File | Time | Focus |
|---|---|---|---|
| 1 | [`landing/index.html`](../../landing/index.html) | 45 min | Semantic structure only. Style nothing yet. |
| 2 | [`landing/css/base.css`](../../landing/css/base.css) | 25 min | Cascade layers, reset, tokens, fluid type |
| 3 | [`landing/css/layout.css`](../../landing/css/layout.css) | 50 min | **Flexbox** header/hero, **Grid** features/pricing/footer |
| 4 | [`landing/css/components.css`](../../landing/css/components.css) | 35 min | Buttons, cards, form states, BEM |
| 5 | [`landing/css/responsive.css`](../../landing/css/responsive.css) | 35 min | **Mobile-first media queries**, container queries, print |
| 6 | [`landing/css/animations.css`](../../landing/css/animations.css) | 35 min | **`@keyframes`**, transitions, stagger, reduced motion |
| 7 | [`landing/js/main.js`](../../landing/js/main.js) | 25 min | Nav toggle, reveal-on-scroll, form validation, theme |

Then a 20-minute **app pass**: apply the same techniques to `client/src/styles/layout.css` and `animations.css` (see Phase 5 and 6).

## Decision guide: Flexbox or Grid?
| Situation | Use |
|---|---|
| One-dimensional row or column, content-sized items (nav, toolbar, button group, card header) | **Flexbox** |
| Two-dimensional layout, or aligning items across rows (features, pricing, dashboards, page shell) | **Grid** |
| "As many cards as fit, each at least 16 rem" | `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))` |
| Centre one thing | `display: grid; place-items: center` |
| Push the last item to the end | Flex + `margin-inline-start: auto` |
| Card internals line up across sibling cards | Grid + `subgrid` ☆ |

## Breakpoint checkpoints (screenshot each one)
- **360 px:** a single column, a hamburger menu, full-width buttons, no horizontal scroll.
- **768 px:** two-column features, the nav still collapsed or inline (your call; justify it).
- **1024 px:** a two-column hero, three pricing cards with the featured one scaled up.
- **1440 px:** content capped at `75rem`, centred, with generous whitespace.

## ✅ Definition of done
- [ ] No layout shift when fonts/images load (set `width`/`height` or `aspect-ratio` on media)
- [ ] Lighthouse (mobile): **Accessibility ≥ 95**, **Best Practices ≥ 95**, **SEO ≥ 90**
- [ ] Keyboard only: every interactive element is reachable, with a visible `:focus-visible` style, and the menu can be toggled
- [ ] `prefers-reduced-motion: reduce` turns off non-essential animation
- [ ] `prefers-color-scheme: dark` works, and the manual theme toggle overrides it
- [ ] Every animation uses only `transform`/`opacity` (check DevTools → Rendering → Paint flashing)

## 🎤 Drill (say each answer out loud in under 60 s)
1. Explain the difference between `auto-fit` and `auto-fill`.
2. How does specificity work? Where do `@layer`, `!important` and inline styles fit?
3. Mobile-first vs desktop-first media queries: why prefer `min-width`?
4. Transitions vs keyframe animations: when do you use each?
5. What triggers layout vs paint vs composite? Why animate `transform`?
6. `rem` vs `em` vs `%` vs `vw` vs `ch`, and what `clamp()` does.
7. How do container queries differ from media queries?

🤖 `/review landing` · `/quiz css flexbox grid media queries animations`
