/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/05-async/async.js · Phase 2 · Day 1 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Master promises and the event loop by re-implementing the Promise
 *   combinators and the async helpers the Kanvas http client will need.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/event-loop.md, docs/concepts/js/async-promises.md
 *   promise states · thenables · microtasks · async/await · error propagation ·
 *   AggregateError · exponential backoff · concurrency limiting
 *
 * 🧩 USED LATER BY
 *   client/src/lib/httpClient.js (retry, withTimeout) · server/src/scripts/seed.js (mapLimit)
 *
 * 📝 STEPS
 *   1. sleep(ms) → a promise that resolves (with undefined) after ms.
 *   2. promiseAll(iterable)
 *      - Convert the iterable with Array.from. Wrap every item with Promise.resolve (it may
 *        not be a promise). Store results BY INDEX and count completions. Resolve when the
 *        count reaches the length. Reject on the first rejection.
 *      - Empty input → resolve [] immediately.
 *      ✋ Don't use Promise.all / allSettled / race / any. The tests check this.
 *   3. promiseAllSettled(iterable) → never rejects. Each entry is
 *      { status: 'fulfilled', value } or { status: 'rejected', reason }.
 *   4. promiseRace(iterable) → settles like the first item to settle.
 *      Empty input → a promise that never settles.
 *   5. promiseAny(iterable) → resolves with the first FULFILLED value. If all reject, reject
 *      with new AggregateError(errorsInInputOrder, 'All promises were rejected').
 *      Empty input → reject with an AggregateError too.
 *   6. withTimeout(promise, ms)
 *      - Race the promise against a timer that rejects with an Error whose name is 'TimeoutError'.
 *      - Clear the timer when the promise settles first (no dangling timers).
 *   7. retry(fn, { retries = 3, delay = 0, factor = 2, shouldRetry = () => true } = {})
 *      - Call `await fn(attempt)` with attempt = 1, 2, 3… Return the first successful value.
 *      - On failure: if attempts are used up (retries + 1 in total) or shouldRetry(error) is false,
 *        rethrow the error. Otherwise wait delay * factor ** (attempt - 1) ms and try again.
 *   8. mapLimit(items, limit, asyncFn)
 *      - Run asyncFn(item, index) with at most `limit` calls in flight.
 *      - Resolve with the results in INPUT order. On the first rejection, reject and
 *        don't start any new items.
 *      - Hint: start `limit` "workers", each pulling the next index from a shared counter.
 *   9. promisify(fn) → (...args) => new Promise(...) that calls fn with the args plus a
 *      callback (err, value). Keep `this` (use a regular function).
 *  10. predictions: fill in p1–p6 from README.md WITHOUT running them.
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:05 is green
 *   [ ] you can draw the event loop and walk through p4 out loud
 *
 * 💡 HINTS
 *   - new Promise((resolve, reject) => { ... }), and remember resolve/reject are idempotent.
 *   - clearTimeout in a .finally() or in both branches.
 *
 * ⚠️ GOTCHAS
 *   - Resolving promiseAll when `results.length === n` is wrong: assigning results[5] first makes length 6.
 *   - `for (const item of items) await fn(item)` is sequential, not concurrent.
 *   - An `async` executor inside `new Promise` swallows errors. Don't do it.
 *
 * 🎤 INTERVIEW ANGLE
 *   "Implement Promise.all", "event loop order", "retry with backoff", "limit concurrency".
 *
 * 🚀 STRETCH ☆  request de-duplication · abortable retry
 *
 * 🤖 ASK THE AGENT
 *   /explain event loop microtasks · /quiz event loop output · /hint labs/05-async/async.js mapLimit
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function sleep(ms) {
  throw new Error('TODO: implement sleep');
}

export function promiseAll(iterable) {
  throw new Error('TODO: implement promiseAll');
}

export function promiseAllSettled(iterable) {
  throw new Error('TODO: implement promiseAllSettled');
}

export function promiseRace(iterable) {
  throw new Error('TODO: implement promiseRace');
}

export function promiseAny(iterable) {
  throw new Error('TODO: implement promiseAny');
}

export function withTimeout(promise, ms) {
  throw new Error('TODO: implement withTimeout');
}

export async function retry(fn, options = {}) {
  throw new Error('TODO: implement retry');
}

export function mapLimit(items, limit, asyncFn) {
  throw new Error('TODO: implement mapLimit');
}

export function promisify(fn) {
  throw new Error('TODO: implement promisify');
}

// Each answer is an array of strings, e.g. ['A', 'B'].
export const predictions = {
  p1: undefined,
  p2: undefined,
  p3: undefined,
  p4: undefined,
  p5: undefined,
  p6: undefined,
};
