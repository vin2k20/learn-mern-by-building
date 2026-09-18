# The browser rendering pipeline

> **TL;DR:** HTML → DOM, CSS → CSSOM, then render tree → layout → paint → composite. Know what each change costs, and avoid blocking the main thread.

## Critical rendering path
```
HTML ──parse──► DOM ──┐
                      ├──► Render tree ──► Layout (geometry) ──► Paint (pixels into layers) ──► Composite (GPU) ──► 🖥
CSS  ──parse──► CSSOM ┘
JS can pause HTML parsing (classic <script>) and modify the DOM/CSSOM → re-style / re-layout
```
- CSS is **render-blocking**. Classic scripts are **parser-blocking**. `defer`/`async`/`type=module` avoid blocking.
- Fonts can block text rendering. Use `font-display: swap` and preload critical fonts.

## Frame budget
At 60 Hz there are ~16.7 ms per frame. The browser needs some of that, so aim for **< 10 ms of JS per frame** during animation or scrolling.
Tasks longer than 50 ms are **long tasks**, and they hurt INP.

## Costs of changes
| Change | Triggers |
|---|---|
| Geometry: `width`, `height`, `top`, `font-size`, adding/removing nodes | layout → paint → composite |
| Visuals: `color`, `background`, `box-shadow` | paint → composite |
| `transform`, `opacity` (on their own layer) | composite only |

## Forced synchronous layout (layout thrashing)
```js
for (const el of items) {
  el.style.width = box.offsetWidth + 'px';   // read (forces layout) → write (invalidates) → read → …
}
// Fix: read once, write many
const w = box.offsetWidth;
for (const el of items) el.style.width = w + 'px';
```

## Tools
DevTools Performance panel (Main track: purple = layout, green = paint), the Rendering panel (paint flashing, layout shift regions),
the Layers panel, and `performance.mark/measure` for custom timings.

## 🎤 Interview questions
<details><summary>What happens when you type a URL and press Enter?</summary>
DNS → TCP/TLS (or QUIC) → the HTTP request → the response → parse HTML and build the DOM → fetch CSS/JS/images (preload scanner) → CSSOM → run scripts → render tree → layout → paint → composite, and events and hydration follow.
</details>
