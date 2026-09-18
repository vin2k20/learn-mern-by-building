# DOM manipulation, events & delegation

> **TL;DR:** batch DOM writes, never put untrusted strings into `innerHTML`, and handle events for many elements with **one**
> listener on a common ancestor (delegation).

## Event propagation
```
      window
        │  ① capture phase (top → down)
      document
        │
      <main id="board">          ③ bubble phase (bottom → up)
        │
      <article class="card">
        │
      <span>  ◄── ② target phase (event.target)
```
- `addEventListener(type, fn, { capture, once, passive, signal })`
- `event.target` = where the event started · `event.currentTarget` = the element whose listener is running
- `stopPropagation()` stops further propagation · `stopImmediatePropagation()` also skips the remaining listeners on this element
- `preventDefault()` cancels the default action (form submit, link navigation, dragover → allows drop)
- `passive: true` promises you won't call preventDefault, so scroll/touch listeners don't block scrolling
- `focus`/`blur`/`mouseenter`/`mouseleave` **don't bubble**. Use `focusin`/`focusout`/`mouseover`/`mouseout` or capture.

## Delegation
```js
board.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card || !board.contains(card)) return;
  openTask(card.dataset.id);
});
```
Benefits: one listener, works for elements added later, less memory. React has used delegation at the **root container** since v17.

## Creating & updating DOM efficiently
- `document.createElement` + `textContent` (safe) · `append` / `replaceChildren` · `DocumentFragment` for batches
- `<template>` + `content.cloneNode(true)` for repeated markup
- `insertAdjacentHTML` / `innerHTML` **only** with trusted or sanitised HTML (XSS!)
- `classList.toggle`, `dataset`, `el.style.setProperty('--x', v)`

## Reflow (layout) & repaint
- **Read** layout: `offsetWidth`, `getBoundingClientRect()`, `getComputedStyle`, `scrollTop`
- **Write**: changing styles, classes or DOM structure
- Interleaving reads and writes in a loop forces a synchronous layout each time (**layout thrashing**).
  Fix: read everything first, then write (or schedule the writes in `requestAnimationFrame`).

## Observers (don't poll!)
`IntersectionObserver` (lazy loading, infinite scroll, reveal) · `ResizeObserver` (canvas sizing, container-aware components) ·
`MutationObserver` (reacting to third-party DOM changes)

## Custom events
```js
el.dispatchEvent(new CustomEvent('task:moved', { detail: { id }, bubbles: true, cancelable: true }));
```

## 🎤 Interview questions
<details><summary>How would you implement infinite scroll?</summary>
Put a sentinel element after the list, observe it with IntersectionObserver (rootMargin '200px'), load the next page when it intersects, guard against concurrent loads, and stop when there's no next cursor. Virtualise if the list gets big.
</details>
<details><summary>innerHTML vs textContent vs innerText?</summary>
innerHTML parses HTML (XSS risk). textContent sets or reads raw text (fast, includes hidden text). innerText is layout-aware (it triggers a reflow and respects CSS visibility).
</details>

## Practise in Kanvas
[lab 09](../../../labs/09-dom-events/README.md) · `features/board/useBoardDnD.js` · `landing/js/main.js`
