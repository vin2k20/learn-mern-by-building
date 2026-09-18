# Accessibility (a11y) essentials

> **TL;DR:** semantic HTML first, then keyboard support, visible focus, labels, contrast and announcements. Use ARIA only to fill gaps.
> The target is **WCAG 2.2 AA** (also the legal baseline in many places, e.g. the European Accessibility Act since June 2025).

## Checklist
- **Semantics:** `<header> <nav> <main> <aside> <footer>`, headings in order, `<button>` for actions, `<a href>` for navigation, lists for lists, tables for tabular data
- **Keyboard:** everything works with Tab/Shift+Tab/Enter/Space/Esc/arrows, there are no keyboard traps (except intentional ones in modals), and the focus order matches the visual order
- **Focus:** a visible `:focus-visible` style, focus moves into dialogs and back to the trigger when they close, and there's a skip link to the main content
- **Labels:** every input has a `<label>`; icon-only buttons have `aria-label`; images have a meaningful or empty `alt`
- **Contrast:** 4.5:1 for text, 3:1 for large text and UI components. Don't rely on colour alone (add icons or text).
- **Motion:** `prefers-reduced-motion`, and no auto-playing, distracting animation
- **Announcements:** `aria-live="polite"` for toasts and status updates; `role="alert"` for errors
- **Target size:** ≥ 24×24 px (WCAG 2.2)
- **Forms:** errors linked with `aria-describedby`, `aria-invalid`, and not colour-only
- **Zoom:** usable at 200% and at 320 px wide (reflow)

## ARIA patterns used in Kanvas
| Widget | Pattern |
|---|---|
| Modal | `<dialog>` or `role="dialog"` + `aria-modal="true"` + `aria-labelledby`, a focus trap, Esc to close |
| Tabs | `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, roving `tabindex`, arrow keys |
| Command palette | `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant`; `role="listbox"`/`option` |
| Dropdown menu | a `<button aria-haspopup="menu" aria-expanded>` + `role="menu"`/`menuitem`, or the native Popover API |
| Drag-and-drop | a keyboard alternative (pick up / move / drop) + live announcements; `aria-grabbed` is deprecated |
| Toasts | an `aria-live="polite"` region (`assertive` only for errors) |
| Canvas | fallback content inside `<canvas>`, a text description, keyboard-accessible tools, an alternative data table for charts |

**The first rule of ARIA:** don't use ARIA if a native element does the job.

## Testing
Keyboard-only walk-through · a screen reader (VoiceOver: Cmd+F5; NVDA on Windows) · Lighthouse / axe DevTools ·
the DevTools Accessibility tree · `eslint-plugin-jsx-a11y` · Testing Library's `getByRole` queries (which fail when the semantics are wrong).

## 🎤 Interview questions
<details><summary>How do you make a custom dropdown accessible?</summary>
A native button trigger with aria-expanded and aria-controls; the list with the proper role; arrow-key navigation, Enter/Space to select, Esc to close and return focus, type-ahead; announcing the selection; closing on outside click. Or use `<select>` / the new customizable select where possible.
</details>
