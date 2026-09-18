# The event loop

> **TL;DR:** JavaScript runs on one thread. The engine runs one task to completion, then drains **all** microtasks,
> then the browser may render, then the next task starts. `await` and `.then` are microtasks. `setTimeout` and events are tasks.

## Mental model
```
 ┌──────────────── one "turn" of the event loop (browser) ────────────────┐
 │ 1. pick ONE macrotask   (script, setTimeout, setInterval, I/O,         │
 │                          UI event, MessageChannel)                     │
 │ 2. run it to completion (call stack empties)                           │
 │ 3. drain the microtask queue (Promise reactions, await continuations,  │
 │    queueMicrotask, MutationObserver). New microtasks are drained too!  │
 │ 4. if it's time to render (~every 16.7ms at 60Hz):                     │
 │      requestAnimationFrame callbacks → style → layout → paint → composite
 │ 5. requestIdleCallback if there's spare time                           │
 └────────────────────────────────────────────────────────────────────────┘
```

## Key points
- **Run-to-completion:** nothing interrupts synchronous code. A 200 ms loop freezes clicks, animations and rendering.
- **Microtasks starve rendering:** an infinite promise chain never lets the browser paint.
- `await x` ≈ `Promise.resolve(x).then(continuation)`. The rest of the async function runs in a later microtask.
- `setTimeout(fn, 0)` is at least ~0–4 ms and always runs *after* the current microtasks.
- `requestAnimationFrame` runs **right before paint**, which makes it the right place for visual updates (canvas, measured animations).
- Node's loop has **phases** (timers → pending → poll → check (`setImmediate`) → close), plus `process.nextTick`, which runs before promise microtasks. See [node-event-loop](../node/node-event-loop.md).

## Example
```js
console.log('A');
setTimeout(() => console.log('B'));
Promise.resolve().then(() => console.log('C'));
queueMicrotask(() => console.log('D'));
console.log('E');
// A E C D B
```

## Pitfalls
- Assuming `setTimeout(fn, 0)` runs "immediately".
- A heavy `.then` handler still blocks the UI. Promises aren't threads.
- `try/catch` around `setTimeout` doesn't catch errors thrown later inside the callback.
- Reading layout (`offsetHeight`) after writes inside a loop causes **forced synchronous layout**.

## 🎤 Interview questions
<details><summary>How do you keep the UI responsive during heavy work?</summary>
Split the work into chunks and yield between them (`await scheduler.yield()` where supported, or `setTimeout`/`MessageChannel`),
move it to a **Web Worker**, virtualise large lists, and in React use `startTransition`/`useDeferredValue` so urgent updates win.
</details>
<details><summary>Where does requestAnimationFrame run, and why use it for animation?</summary>
Before the next paint, once per frame, and it's paused in background tabs. It syncs your updates with the display refresh and avoids doing work that never gets painted.
</details>
<details><summary>What is INP and how does the event loop relate to it?</summary>
Interaction to Next Paint measures the delay from an input to the next frame. Long tasks on the main thread delay both the event handler and the paint.
</details>

## Practise in Kanvas
[lab 05](../../../labs/05-async/README.md) · `features/whiteboard/CanvasBoard.jsx` (rAF) · `features/activity/ActivityFeed.jsx` (long tasks)
