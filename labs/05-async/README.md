# Lab 05 · Async JavaScript & the event loop ★

**Time box:** 2 h · **Run:** `npm run test:05` · **Primers:** [event loop](../../docs/concepts/js/event-loop.md), [promises](../../docs/concepts/js/async-promises.md)

## Why this matters
Every data fetch, debounce, animation frame and React state update is scheduled on the event loop.
"Predict the output" questions with `setTimeout` + `Promise` + `async/await` come up in almost every frontend interview,
and so does "implement `Promise.all`".

## Mental model
```
┌──────────── call stack ────────────┐
│ runs sync code to completion       │
└───────────────┬────────────────────┘
                │ stack empty?
                ▼
   ┌── microtask queue ──┐   drained COMPLETELY (promises, await continuations, queueMicrotask)
   └──────────┬──────────┘
              ▼
   (browser: maybe render → rAF callbacks → style/layout/paint)
              ▼
   ┌── macrotask queue ──┐   take ONE task (setTimeout, setInterval, I/O, UI events, MessageChannel)
   └──────────┬──────────┘
              └──────► back to the top
```

## Tasks (in `async.js`)
1. `sleep(ms)`
2. `promiseAll`, `promiseAllSettled`, `promiseRace`, `promiseAny`: **without** using the built-in combinators.
3. `withTimeout(promise, ms)`: rejects with an error named `TimeoutError`.
4. `retry(fn, options)`: exponential backoff and a `shouldRetry` predicate.
5. `mapLimit(items, limit, asyncFn)`: a concurrency pool (think "upload 50 files, 4 at a time").
6. `promisify(fn)`: Node-style callback → promise.
7. **Predict the output**: six event-loop puzzles in `predictions` (the snippets are below).

## Predict the output (each answer is an array of strings)
```js
// p1
log('A');
setTimeout(() => log('B'), 0);
Promise.resolve().then(() => log('C'));
queueMicrotask(() => log('D'));
log('E');

// p2
async function inner() { log('inner start'); await null; log('inner end'); }
log('start'); inner(); Promise.resolve().then(() => log('then')); log('end');

// p3
const p = new Promise((resolve) => { log('executor'); resolve('R'); log('after resolve'); });
p.then((v) => log(v));
log('sync');
await p;
log('awaited');

// p4
setTimeout(() => { log('T1'); Promise.resolve().then(() => log('M-in-T1')); }, 0);
setTimeout(() => log('T2'), 0);
Promise.resolve().then(() => { log('M1'); setTimeout(() => log('T3'), 0); });

// p5
try {
  setTimeout(() => { try { throw new Error('late'); } catch { log('caught inside timer'); } }, 0);
  await Promise.reject(new Error('early'));
} catch (e) { log(`caught ${e.message}`); }

// p6
const wait = (ms, v) => new Promise((r) => setTimeout(() => { log(v); r(v); }, ms));
const result = await Promise.all([wait(15, 'slow'), wait(1, 'fast')]);
log(result.join('+'));
```

## 🎤 Interview questions
1. Microtasks vs macrotasks: give two examples of each. Where does `requestAnimationFrame` fit?
2. What does `await` do under the hood? (Suspends, then resumes in a microtask.)
3. `Promise.all` vs `allSettled` vs `race` vs `any`: when would you use each in a UI?
4. How do you cancel a `fetch`? What happens to the promise? (`AbortController`, `AbortError`)
5. How would you avoid a race condition when a search input fires requests out of order?
6. Can a long chain of microtasks block rendering? (Yes. Microtasks run before the browser gets to paint.)
7. Why is `try/catch` around `setTimeout` useless for errors thrown inside the callback? (p5)

## Stretch ☆
- `createRequestDeduper()`: identical in-flight requests share one promise.
- `retry` that honours an `AbortSignal`.
