# HTML & CSS interview Q&A

## HTML
<details><summary>1. Why does semantic HTML matter?</summary>
Accessibility (screen readers and landmarks), SEO, built-in keyboard behaviour, and maintainability. <code>&lt;button&gt;</code> gives you focus, Enter/Space and a role for free.
</details>
<details><summary>2. `defer` vs `async` vs `type="module"`?</summary>
defer: downloads in parallel and runs in order after parsing. async: runs as soon as it's downloaded (unordered). Modules are deferred by default.
</details>
<details><summary>3. What does the viewport meta tag do?</summary>
It sets the layout viewport to the device width, so media queries match real device sizes instead of a 980 px virtual viewport.
</details>
<details><summary>4. What is `<template>` / `<dialog>` / `<details>` good for?</summary>
Inert, cloneable markup / a native modal with a focus trap and backdrop (`showModal`) / a native disclosure widget with no JS.
</details>
<details><summary>5. How do you make forms accessible?</summary>
Labels, fieldset/legend for groups, error messages linked with aria-describedby, aria-invalid, native validation attributes, and focusing the first error on submit.
</details>
<details><summary>6. What's the Popover API?</summary>
The <code>popover</code> attribute plus <code>popovertarget</code> give you top-layer popovers with light dismiss and no z-index fights. Combine them with CSS anchor positioning.
</details>

## CSS
<details><summary>7. Explain the box model and box-sizing.</summary>
content + padding + border + margin. border-box makes width include padding and border (predictable).
</details>
<details><summary>8. Specificity: which wins, `#nav a` or `.menu .item a`?</summary>
#nav a = (1,0,1). .menu .item a = (0,2,1). The ID wins. Cascade layers and source order come into play before specificity and after it, respectively.
</details>
<details><summary>9. Flexbox vs Grid?</summary>
Flexbox for one-dimensional, content-driven layout. Grid for two-dimensional, layout-driven structure. Combine them.
</details>
<details><summary>10. `flex: 1` means?</summary>
<code>flex: 1 1 0%</code>: grow and shrink equally from a zero basis.
</details>
<details><summary>11. Centre a div (three ways).</summary>
<code>display:grid; place-items:center</code> · flex with justify-content and align-items set to center · <code>position:absolute; inset:0; margin:auto</code> (with a size).
</details>
<details><summary>12. auto-fit vs auto-fill?</summary>
Both create as many tracks as fit. auto-fit collapses the empty ones so the items stretch; auto-fill keeps the empty tracks.
</details>
<details><summary>13. Mobile-first media queries?</summary>
Base styles for small screens plus min-width enhancements. Less CSS for mobile, and it follows progressive enhancement.
</details>
<details><summary>14. Container queries vs media queries?</summary>
Container queries respond to the component's container size, which makes components reusable. Media queries respond to the viewport or device.
</details>
<details><summary>15. Transition vs animation? Which properties do you animate?</summary>
Transitions go between two states when something changes. Animations are keyframe timelines. Animate transform and opacity (they're composited).
</details>
<details><summary>16. How do you implement dark mode?</summary>
Semantic CSS variables, prefers-color-scheme as the default, a data-theme override persisted in storage, and an early script to avoid a flash.
</details>
<details><summary>17. position: sticky isn't working. Why?</summary>
There's no top/left value, an ancestor has overflow: hidden/auto (which becomes the scroll container), or the parent is too short.
</details>
<details><summary>18. What creates a stacking context?</summary>
A positioned element with z-index, opacity < 1, transform, filter, will-change, isolation: isolate, flex/grid children with z-index, and so on.
</details>
<details><summary>19. BEM vs CSS Modules vs utility CSS?</summary>
See the CSS architecture primer: a naming convention vs build-time scoping vs atomic classes, and their trade-offs.
</details>
<details><summary>20. How do you avoid CLS?</summary>
Dimensions on media, reserved space for dynamic content, font metric overrides, and no content injected above what's already there.
</details>
<details><summary>21. rem vs em?</summary>
rem is relative to the root font size (consistent). em is relative to the element's font size (it compounds when nested, which is useful for component-internal spacing).
</details>
<details><summary>22. What is `:has()` good for?</summary>
Parent and relational styling: <code>.card:has(img)</code>, and form states (<code>label:has(+ input:invalid)</code>), without JS.
</details>
<details><summary>23. How would you build a responsive navbar without JS?</summary>
Flexbox, then at small widths a hidden checkbox or a `<details>` toggle (or the Popover API) to show the menu. JS is still better for managing aria-expanded.
</details>
<details><summary>24. What are cascade layers?</summary>
<code>@layer</code> defines priority buckets. A later layer beats an earlier one regardless of specificity, which makes resets, libraries and components predictable.
</details>
