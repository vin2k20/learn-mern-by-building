# Flexbox

> **TL;DR:** a one-dimensional layout (a row **or** a column). Items share space along the **main axis** and align on the **cross axis**.

```
flex-direction: row                         main axis ───────────────►
┌──────────────────────────────────────────────────────┐  ▲
│ [item] [item] [ item grows ────────── ] [item]       │  │ cross axis
└──────────────────────────────────────────────────────┘  ▼
```

## Container properties
| Property | Values | Notes |
|---|---|---|
| `display` | `flex` / `inline-flex` | |
| `flex-direction` | `row` · `column` · `*-reverse` | reverse also flips the visual order (a11y caution) |
| `flex-wrap` | `nowrap` · `wrap` | wrapping creates flex *lines* |
| `justify-content` | `flex-start` · `center` · `space-between` · `space-around` · `space-evenly` | main axis |
| `align-items` | `stretch` · `center` · `flex-start` · `baseline` | cross axis, per line |
| `align-content` | same values | distributes the *lines* (only when wrapping) |
| `gap` | `1rem` / `1rem 2rem` | no margin hacks needed |

## Item properties
| Property | Meaning |
|---|---|
| `flex-grow` | share of the positive free space |
| `flex-shrink` | share of the negative space (overflow) |
| `flex-basis` | the starting size before growing/shrinking (`auto` = width/height or content) |
| `flex: 1` | `1 1 0%`: equal columns regardless of content |
| `flex: auto` | `1 1 auto`: grow, based on content size |
| `flex: none` | `0 0 auto`: rigid |
| `align-self` | overrides `align-items` for one item |
| `order` | visual order (doesn't change the tab order!) |
| `margin-inline-start: auto` | pushes the item (and everything after it) to the end |

## Recipes
```css
.navbar   { display: flex; align-items: center; gap: var(--space-4); }
.navbar .actions { margin-inline-start: auto; }
.toolbar  { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.input-row input { flex: 1 1 12rem; min-width: 0; }   /* min-width: 0 lets text inputs shrink */
.board    { display: flex; gap: var(--space-4); overflow-x: auto; scroll-snap-type: x mandatory; }
.column   { flex: 0 0 18rem; scroll-snap-align: start; }
.center   { display: flex; justify-content: center; align-items: center; }
```

## Gotchas
- Flex items have `min-width: auto`, so long words or content can overflow. Fix it with `min-width: 0` (or `overflow: hidden`).
- `flex-basis` beats `width` when both are set (in the main axis).
- Percentage heights inside flex columns need a definite height on the parent.

## 🎤 Interview questions
<details><summary>What's the difference between `flex: 1` and `flex: auto`?</summary>
<code>flex: 1</code> uses a basis of 0, so the space is split equally. <code>flex: auto</code> uses the content size as the basis, so bigger content gets bigger items.
</details>

## Practise in Kanvas
`landing/css/layout.css` (header, hero) · `features/board/*.module.css` (columns) · `features/whiteboard/Toolbar.module.css`
