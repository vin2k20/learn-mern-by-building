# Lab 09 · DOM manipulation & events ★

**Time box:** 2 h (60 min tests + 60 min playground) · **Run:** `npm run test:09` · **Playground:** `npm run serve:09`
**Primers:** [DOM events & delegation](../../docs/concepts/js/dom-events-delegation.md), [rendering pipeline](../../docs/concepts/web/rendering-pipeline.md)

## Why this matters
Frontend roles ask for *"DOM manipulation and event handlers"*. React hides the DOM, but interviews don't:
expect "implement event delegation", "why is `innerHTML` dangerous?", "build a modal with a focus trap",
or a vanilla-JS machine-coding round.

## Concepts
- Creating and inserting nodes: `createElement`, `append`, `replaceChildren`, `DocumentFragment`
- Why batching DOM writes matters (**reflow/repaint**) and how to avoid layout thrashing
- Event propagation: **capture → target → bubble**, `stopPropagation` vs `preventDefault`
- **Event delegation** with `event.target.closest(selector)` + `root.contains(match)`
- `CustomEvent` with `detail`, `bubbles` and `cancelable`
- Focus management: tabbable elements, focus traps (modals), `document.activeElement`
- `FormData` and the Constraint Validation API
- XSS: `textContent` vs `innerHTML`

## Part A: tested helpers (`dom-events.js`, runs in jsdom)
1. `createElement(tag, attrs, ...children)`: a tiny, safe hyperscript helper.
2. `renderList(container, items, renderItem)`: one DOM insertion via a fragment.
3. `delegate(root, type, selector, handler)`: one listener for many elements.
4. `onClickOutside(element, callback)`: the building block for dropdowns and popovers.
5. `emitCustom(target, name, detail)`: custom events.
6. `trapFocus(container)`: keeps Tab and Shift+Tab inside a modal.
7. `serializeForm(form)`: FormData → a plain object.

## Part B: the vanilla playground (`playground/`)
Build **Quick Tasks**, a tiny board widget without any framework, using your Part A helpers.
Follow the instructions in `playground/index.html`, `playground/app.js` and `playground/styles.css`.
This is also good practice for a vanilla machine-coding round.

## Predict the order (answer in your head, then check in the playground's console)
```html
<div id="outer"><button id="inner">Click</button></div>
```
```js
outer.addEventListener('click', () => log('outer bubble'));
outer.addEventListener('click', () => log('outer capture'), true);
inner.addEventListener('click', () => log('inner bubble'));
inner.addEventListener('click', () => log('inner capture'), { capture: true });
inner.click();
```
<details><summary>Answer</summary>

`outer capture`, `inner capture`, `inner bubble`, `outer bubble`. Modern browsers run capture listeners before bubble listeners even at the target.
</details>

## 🎤 Interview questions
1. Explain event delegation. What are its benefits and limits? (`focus`/`blur` don't bubble: use `focusin`/`focusout`.)
2. `event.target` vs `event.currentTarget`?
3. What causes a reflow? How do you batch reads and writes? (Read everything first, then write, or use `requestAnimationFrame`.)
4. How does React attach event handlers? (One listener per event type on the root container, since React 17.)
5. How do you make a custom dropdown accessible?
6. `innerHTML` vs `textContent` vs `innerText`?
