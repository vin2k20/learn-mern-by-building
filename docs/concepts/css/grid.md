# CSS Grid

> **TL;DR:** a two-dimensional layout. Define **tracks** (rows and columns) on the container and place items onto them, by line numbers or by **named areas**.

## Essentials
```css
.shell {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100dvh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; min-width: 0; }   /* min-width: 0 stops wide content (code, tables) from blowing out the track */
```

## Units & functions
| Thing | Meaning |
|---|---|
| `fr` | a fraction of the free space |
| `repeat(3, 1fr)` | three equal columns |
| `minmax(16rem, 1fr)` | at least 16rem, grows to fill |
| `repeat(auto-fit, minmax(16rem, 1fr))` | **responsive cards without media queries** |
| `auto-fill` vs `auto-fit` | auto-fill keeps empty tracks; auto-fit collapses them, so the items stretch |
| `min-content` / `max-content` / `fit-content(20rem)` | content-based sizing |
| `grid-auto-flow: dense` | backfills holes (the visual order may differ from the DOM order) |
| `grid-column: 1 / -1` | span the full width |
| `grid-column: span 2` | span two tracks |
| `subgrid` | a child grid reuses its parent's tracks (aligns card internals) |

## Alignment
`justify-items` / `align-items` (inside cells) · `justify-content` / `align-content` (the whole grid in the container) ·
`place-items: center` (both) · `justify-self` / `align-self` (one item).

## Recipes
```css
/* Centre anything */
.page-center { display: grid; place-items: center; min-height: 100dvh; }

/* Dashboard that re-flows */
.dashboard { display: grid; gap: var(--space-5); grid-template-columns: 1fr;
  grid-template-areas: "s1" "s2" "s3" "s4" "bar" "people" "burn"; }
@media (min-width: 64rem) {
  .dashboard { grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "s1 s2 s3 s4" "bar bar bar people" "burn burn burn burn"; }
}

/* Pricing cards with aligned rows (subgrid) */
.pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1.5rem; }
.plan    { display: grid; grid-row: span 4; grid-template-rows: subgrid; }
```

## Grid vs Flexbox
Grid = layout **first** (tracks define the item sizes). Flexbox = content **first** (items define the sizes). They combine well:
a grid page shell with flex toolbars inside.

## 🎤 Interview questions
<details><summary>Build a responsive card grid without media queries.</summary>
<code>grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr))</code>. The inner <code>min()</code> stops overflow on very narrow screens.
</details>

## Practise in Kanvas
`landing/css/layout.css` · `client/src/styles/layout.css` · `features/dashboard/Dashboard.module.css` · `features/projects/ProjectsPage`
