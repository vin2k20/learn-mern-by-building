# CSS architecture: BEM, CSS Modules, tokens, layers

> **TL;DR:** keep CSS predictable. **Tokens** for values, **layers** for priority, **scoped class names** (CSS Modules or BEM) for components, and a few **utilities**.

## Options compared
| Approach | Scoping | Pros | Cons |
|---|---|---|---|
| **BEM** (`.card__title--active`) | naming convention | no tooling, readable | verbose, discipline required |
| **CSS Modules** (`styles.title`) | build-time unique class names | real scoping, plain CSS | dynamic theming needs custom properties |
| **Utility-first** (Tailwind) | atomic classes | fast, consistent | long class lists, needs a build step |
| **CSS-in-JS** (styled-components, Emotion) | runtime/compiled | co-located, dynamic | runtime cost; RSC friction |
| **Zero-runtime CSS-in-JS** (vanilla-extract, Panda, StyleX) | build-time | type-safe tokens | tooling |

Kanvas uses **CSS Modules + custom-property tokens + global layers** (no framework), so you practise real CSS.

## Suggested layer order (client)
```css
@layer reset, tokens, base, layout, components, utilities, overrides;
```

## Tokens with custom properties
```css
:root { --color-primary: #5b5bd6; --space-4: 1rem; }
:root[data-theme="dark"] { --color-primary: #8b8bf5; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { /* dark values */ } }
.button { background: var(--color-primary); padding: var(--space-2) var(--space-4); }
```
Custom properties are **inherited** and **live** (JS can set them), which makes them perfect for themes and component variants:
`.button[data-variant="ghost"] { --btn-bg: transparent; }`

## Naming & structure tips
- One CSS Module per component. Class names describe roles (`.root`, `.header`, `.title`), not looks (`.blue`).
- Variants go in `data-*` attributes (`data-variant="primary"`, `data-state="open"`), which is also great for testing.
- Avoid deep selectors (`.a .b .c .d`) and IDs for styling.
- Use `:focus-visible` rather than removing outlines.
- Keep z-indexes in tokens.

## 🎤 Interview questions
<details><summary>How would you theme an app for light and dark mode?</summary>
Semantic tokens as CSS variables, two value sets (a `prefers-color-scheme` default plus a `data-theme` override), components that only reference the tokens, and an early inline script (or SSR attribute) to avoid a flash of the wrong theme.
</details>
