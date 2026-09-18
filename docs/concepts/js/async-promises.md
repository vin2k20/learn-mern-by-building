# Promises & async/await

> **TL;DR:** a Promise is a placeholder for a future value, and it's in one of three states: *pending → fulfilled | rejected*.
> `async/await` is syntax over promises. Errors propagate down the chain until something catches them.

## States & chaining
```
new Promise(executor)          executor runs synchronously!
   pending ──resolve(v)──► fulfilled ──► .then(onFulfilled) callbacks (microtasks)
          └─reject(e)───► rejected  ──► .catch / .then(_, onRejected)
.then always returns a NEW promise → chaining; returning a promise inside .then "adopts" it
```

## Combinators
| Combinator | Resolves when | Rejects when | UI example |
|---|---|---|---|
| `Promise.all` | all fulfil (values in input order) | the first rejection | load a project + its tasks + its members |
| `Promise.allSettled` | all settle | never | bulk upload with a per-file result |
| `Promise.race` | the first to settle | the first to settle (if it's a rejection) | a timeout wrapper |
| `Promise.any` | the first to fulfil | all reject (`AggregateError`) | the fastest of several mirrors/CDNs |

## Cancellation & races
```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort(); // the fetch rejects with DOMException name 'AbortError'
AbortSignal.timeout(5000);          // built-in timeout signal
AbortSignal.any([s1, s2]);          // combine signals
```
**Search-as-you-type race:** abort the previous request (or ignore stale responses with a request id) so an older response can't overwrite a newer one.
In React, abort in the effect cleanup.

## Error handling
- `await` inside `try/catch`, or `.catch()` at the end of a chain. **Always** handle rejections, because unhandled ones fire `unhandledrejection`.
- `fetch` only rejects on network errors. **An HTTP 404/500 still resolves**, so check `response.ok`.
- Use `finally` for cleanup (spinners, timers).

## Sequential vs parallel
```js
for (const id of ids) await load(id);             // sequential (slow, sometimes required)
await Promise.all(ids.map(load));                  // parallel (fast, can overwhelm the server)
await mapLimit(ids, 4, load);                      // bounded concurrency (lab 05)
```

## Pitfalls
- `array.forEach(async …)` doesn't wait.
- Forgetting `return` inside `.then` breaks the chain (you get `undefined`).
- An `async` executor in `new Promise(async (res) => …)` swallows errors.
- Creating a promise isn't "starting a thread". The work still runs on the main thread.

## 🎤 Interview questions
<details><summary>Implement a retry with exponential backoff.</summary>
Loop over the attempts. On failure, if attempts remain and the error is retryable (5xx, network), wait <code>base * 2 ** attempt</code> (plus jitter), then retry. Otherwise rethrow.
</details>
<details><summary>What happens if you `await` a non-promise?</summary>
It's wrapped in a resolved promise, and the function still suspends and resumes in a microtask.
</details>

## Practise in Kanvas
[lab 05](../../../labs/05-async/README.md) · `client/src/lib/httpClient.js`
