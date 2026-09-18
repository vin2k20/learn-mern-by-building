# Responsive images & CSS units

> **TL;DR:** use relative units for type and spacing, `clamp()` for fluid sizing, and let the browser pick image sizes with `srcset`/`sizes`/`<picture>`.

## Units
| Unit | Relative to | Use for |
|---|---|---|
| `px` | CSS pixel | borders, hairlines, shadows |
| `rem` | root font size | type, spacing, media queries |
| `em` | the element's font size | padding that scales with the font (buttons) |
| `%` | the parent (it depends on the property) | widths |
| `vw` / `vh` | the viewport | full-bleed sections |
| `dvh` / `svh` / `lvh` | dynamic / small / large viewport | mobile full-height layouts |
| `ch` | the width of "0" | readable line length (`max-width: 65ch`) |
| `cqi` / `cqb` | the container's inline/block size | container-query typography |
| `fr` | the grid's free space | grid tracks |

`clamp(min, preferred, max)`: `font-size: clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)` scales smoothly and stays within bounds.
`min()` / `max()`: `width: min(100% - 2rem, 75rem)` for a centred container with gutters.

## Images
```html
<img src="hero-800.jpg"
     srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w"
     sizes="(min-width: 64rem) 50vw, 100vw"
     width="1600" height="900" alt="Kanvas board with three columns"
     fetchpriority="high" decoding="async">

<picture>
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <img src="hero.jpg" alt="" width="1600" height="900" loading="lazy">
</picture>
```
- `width`/`height` (or CSS `aspect-ratio`) reserve space and prevent **CLS**.
- `loading="lazy"` for images below the fold. **Never** lazy-load the LCP image. Give it `fetchpriority="high"`.
- Decorative images get `alt=""`. Informative ones describe their purpose.
- `object-fit: cover` for cropping. SVG for icons and logos (and `currentColor` to theme them).

## 🎤 Interview questions
<details><summary>How do you avoid layout shift from images and fonts?</summary>
Set dimensions or aspect-ratio on media, use font-display: swap with size-adjust or fallback metrics, reserve space for async content (skeletons), and avoid inserting content above existing content.
</details>

## Practise in Kanvas
`landing/index.html` (hero `<picture>`) · `landing/css/base.css` (fluid type)
