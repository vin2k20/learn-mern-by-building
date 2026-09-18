# Box model, specificity, the cascade & layers

> **TL;DR:** use `box-sizing: border-box` everywhere. Specificity is compared as a tuple **(ids, classes/attributes/pseudo-classes, elements)**.
> `@layer` order beats specificity, which makes large CSS predictable.

## Box model
```
┌──────────── margin ────────────┐
│ ┌────────── border ──────────┐ │
│ │ ┌──────── padding ───────┐ │ │
│ │ │        content         │ │ │   content-box: width = content only
│ │ └────────────────────────┘ │ │   border-box:  width = content + padding + border ✅
│ └────────────────────────────┘ │
└────────────────────────────────┘
```
- Vertical margins between blocks **collapse** (not in flex/grid containers).
- `display`: block, inline, inline-block, flex, grid, contents, none. `visibility: hidden` keeps the space; `display: none` doesn't.
- Logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) support RTL layouts.

## The cascade (in priority order)
1. Origin & importance (user-agent < user < author; `!important` flips the order)
2. **Cascade layers** (`@layer reset, base, components, utilities;`): later layers win; unlayered styles beat layered ones
3. **Specificity**
4. Source order (last one wins)
Inline `style=""` beats selectors (except `!important`).

## Specificity examples
| Selector | (id, class, element) |
|---|---|
| `li` | (0,0,1) |
| `.card .title` | (0,2,0) |
| `#nav a:hover` | (1,1,1) |
| `button[type="submit"]` | (0,1,1) |
| `:where(.card) .title` | (0,1,0), since `:where()` adds 0 |
| `:is(#a, .b) p` | (1,0,1), since `:is()` takes its most specific argument |

## Positioning & stacking
`static` · `relative` (offsets itself; the containing block for absolute children) · `absolute` · `fixed` · `sticky` (needs a scroll container and a `top` value).
A **stacking context** is created by `position` + `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate`, and so on. `z-index` only compares values within the same context.

## Modern selectors worth knowing
`:has()` (parent/relational) · `:is()`/`:where()` · `:focus-visible` · `:not(.a, .b)` · CSS nesting (`&:hover`), which is native now.

## 🎤 Interview questions
<details><summary>Why doesn't my z-index work?</summary>
The element isn't positioned (or isn't a flex/grid child), or it's inside a different stacking context than the element it should overlap. Check the parents for transform, opacity or isolation.
</details>
<details><summary>How do cascade layers help?</summary>
You declare the layer order once, and a later layer wins regardless of specificity. Resets and third-party CSS can't accidentally override components, and there's no need for specificity wars or !important.
</details>
