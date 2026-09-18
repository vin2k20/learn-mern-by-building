/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/lib/httpClient.js · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   One fetch wrapper (a FACADE) for REST and GraphQL: base URL, JSON, the auth header, timeouts, retry with backoff,
 *   cancellation, a GET cache, and normalised errors that follow docs/api-contract.md.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/async-promises.md · labs/05-async (retry, withTimeout) · labs/07 (LRUCache) ·
 *               docs/concepts/web/http-caching-cors.md · docs/concepts/web/security-xss-csrf-jwt.md
 *
 * 🧩 USED BY  authSlice (thunks via extraArgument) · dashboardQueries.js · boardSlice thunks · the RTK Query baseQuery ☆
 *
 * 📝 STEPS
 *   1. export class ApiError extends Error { constructor({ status, code, message, details }) … }
 *   2. let getToken = () => null; export function configureAuth(fn) { getToken = fn }   (store.js wires it to state.auth.token)
 *   3. async function request(path, { method = 'GET', body, signal, timeout = 10_000, retries = method === 'GET' ? 2 : 0, cache = false } = {})
 *      a. The URL: import.meta.env.VITE_API_URL + path
 *      b. Headers: 'Content-Type': 'application/json' when there's a body, and Authorization: `Bearer ${token}` when there's a token
 *      c. Timeout: combine the caller's signal with AbortSignal.timeout(timeout) using AbortSignal.any([...])
 *      d. Retry with backoff (lab 05) ONLY for network errors and 5xx, never 4xx, and never for aborts
 *      e. Response handling: a 204 → null. JSON parse. !res.ok → throw new ApiError({ status: res.status, ...body.error }).
 *         A 401 → emit an 'unauthorized' event (lab 03 EventEmitter) so the auth slice can log out.
 *      f. GET cache ☆: an LRUCache(50) keyed by the URL for requests with cache: true, with a TTL (store { at, data }).
 *         Invalidate the entries that start with a prefix after mutations.
 *   4. export const http = { get: (p, o) => request(p, o), post: (p, body, o) => request(p, { ...o, method: 'POST', body }),
 *      patch, put, delete: … , graphql(query, variables, o) }
 *   5. graphql(): POST '/graphql' → if json.errors?.length, throw an ApiError with code = errors[0].extensions?.code
 *      (remember that GraphQL errors arrive with HTTP 200!)
 *
 * ✅ DONE WHEN
 *   [ ] A 500 from MSW is retried twice with increasing delays (visible in the Network tab)
 *   [ ] Aborting (e.g. unmounting the component) doesn't show an error toast
 *   [ ] Every thrown error is an ApiError with status + code + message
 *
 * ⚠️ GOTCHAS  fetch doesn't reject on 4xx/5xx · don't retry POSTs (not idempotent) unless you have idempotency keys.
 *
 * 🎤 INTERVIEW ANGLE  "How do you structure API calls in a React app?", "when is retrying safe?"
 * 🤖 ASK THE AGENT    /hint client/src/lib/httpClient.js step 3c · /review client/src/lib/httpClient.js
 * ═══════════════════════════════════════════════════════════════════════════
 */
