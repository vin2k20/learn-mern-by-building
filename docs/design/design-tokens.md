# Design tokens

Tokens are the design system's single source of truth. You'll implement them as CSS custom properties in
`client/src/styles/tokens.css` and `landing/css/base.css`. **Never hard-code a colour, spacing or duration in a
component. Always use `var(--token)`.**

## Colour
| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#f7f7fb` | `#0f1117` | Page background |
| `--color-surface` | `#ffffff` | `#171a23` | Cards, panels, modals |
| `--color-surface-2` | `#eef0f6` | `#1f2330` | Columns, inputs, hover |
| `--color-border` | `#dfe2ec` | `#2c3242` | Hairlines |
| `--color-text` | `#161a26` | `#e8eaf2` | Body text |
| `--color-text-muted` | `#5b6275` | `#9aa2b6` | Secondary text |
| `--color-primary` | `#5b5bd6` | `#8b8bf5` | Buttons, links, focus |
| `--color-primary-contrast` | `#ffffff` | `#0f1117` | Text on primary |
| `--color-success` | `#1f9d6b` | `#3ecf95` | Done, toasts |
| `--color-warning` | `#c77d0a` | `#f0b44c` | Due soon |
| `--color-danger` | `#d6405b` | `#ff7a8f` | Errors, destructive |
| `--color-focus-ring` | `#5b5bd6` 3px | `#8b8bf5` 3px | `:focus-visible` outline |

Status colours: `--status-todo: #8a93a8`, `--status-in-progress: #3b82f6`, `--status-review: #a855f7`, `--status-done: var(--color-success)`.
Priority colours: `low` = muted, `medium` = primary, `high` = warning, `urgent` = danger.

**Contrast rule:** body text must hit **≥ 4.5 : 1** against its background; large text and UI parts need ≥ 3 : 1.
Check it in DevTools (Elements → Styles → the colour swatch shows the contrast ratio).

## Typography
- Font stack: `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` (Inter is optional; the system font is fine).
- Mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
- Fluid sizes using `clamp(min, preferred, max)`:

| Token | Value |
|---|---|
| `--text-xs` | `0.75rem` |
| `--text-sm` | `0.875rem` |
| `--text-md` | `1rem` |
| `--text-lg` | `clamp(1.125rem, 1rem + 0.4vw, 1.25rem)` |
| `--text-xl` | `clamp(1.375rem, 1.1rem + 1vw, 1.75rem)` |
| `--text-2xl` | `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)` |
| `--text-hero` | `clamp(2.25rem, 1.2rem + 4.5vw, 4.5rem)` |

Line height: `1.5` for body, `1.15` for headings. Weights: 400 / 500 / 700.

## Spacing (4 px base)
`--space-1: 0.25rem` · `--space-2: 0.5rem` · `--space-3: 0.75rem` · `--space-4: 1rem` · `--space-5: 1.5rem` ·
`--space-6: 2rem` · `--space-7: 3rem` · `--space-8: 4rem` · `--space-9: 6rem`

## Radius, shadow, z-index
| Token | Value |
|---|---|
| `--radius-sm / md / lg / pill` | `4px / 8px / 16px / 999px` |
| `--shadow-1` | `0 1px 2px rgb(0 0 0 / 0.06), 0 1px 3px rgb(0 0 0 / 0.1)` |
| `--shadow-2` | `0 4px 12px rgb(0 0 0 / 0.12)` |
| `--shadow-3` | `0 12px 32px rgb(0 0 0 / 0.18)` |
| `--z-header / drawer / modal / toast / palette` | `10 / 20 / 30 / 40 / 50` |

## Breakpoints (mobile-first, used with `min-width`)
| Name | Min width | Layout intent |
|---|---|---|
| base | 0 | Single column; sidebar becomes an off-canvas drawer; board columns scroll horizontally with scroll-snap |
| `sm` | `40rem` (640px) | Two-column card grids |
| `md` | `48rem` (768px) | Sidebar collapses to an icon rail; drawer overlays content |
| `lg` | `64rem` (1024px) | Full sidebar; dashboard in a 3-column grid |
| `xl` | `80rem` (1280px) | Max content width `75rem`, centred |

> Custom properties **can't** be used inside media-query conditions (`@media (min-width: var(--bp-md))` doesn't work).
> Write the literal value and keep this table as the reference. (☆ Look up `@custom-media`, a draft spec, via Lightning CSS.)

## Motion
| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `120ms` | Hover, press |
| `--duration-base` | `200ms` | Drawer, dropdown, fade |
| `--duration-slow` | `400ms` | Page-level reveals, chart growth |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Things entering |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful pop (toasts, card drop) |

Rules:
1. Animate **`transform` and `opacity`** only (they're composited). Avoid animating `width/height/top/left`.
2. Under `@media (prefers-reduced-motion: reduce)`, set durations to ~`0.01ms` and stop infinite animations.
3. Exit animations should be faster than enter animations.
