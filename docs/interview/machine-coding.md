# Machine-coding prompts (timed)

**Rules:** a 45–60 min timer. Build in a separate sandbox (`npm create vite@latest drills -- --template react` *outside* this repo, or plain HTML files).
Spend 5 min on requirements and your plan (out loud), 30–40 min building, 5–10 min on edge cases, a11y and the trade-offs talk.
After each one, run `/review <path>` on your drill code and log the time taken.

| # | Prompt | Core skills | Suggested day |
|---|---|---|---|
| 1 | **Debounced autocomplete** | debounce, fetch + AbortController, keyboard nav, ARIA combobox, caching | Day 2 ★ |
| 2 | **Nested comments** | recursion, a tree data structure, add reply/edit/delete, collapse | ☆ |
| 3 | **File explorer tree** | recursion, expand/collapse, keyboard arrows, add/rename folders | ☆ |
| 4 | **Infinite scroll feed** | IntersectionObserver, pagination cursor, loading/error states, virtualisation talk | Day 2 ★ |
| 5 | **Star rating widget** | hover preview, keyboard (arrows), half stars ☆, controlled/uncontrolled | Day 7 |
| 6 | **Tabs + accordion** | compound components, roving tabindex, ARIA | ☆ |
| 7 | **Modal manager** | portal, focus trap, stacking multiple modals, Esc handling, scroll lock | ☆ |
| 8 | **OTP input** | refs array, focus movement, paste handling, backspace | ☆ |
| 9 | **Progress bars queue** | only N concurrent bars (mapLimit!), animation with transitions | ☆ |
| 10 | **Kanban mini-board** | drag-and-drop, state shape, persistence | (you built this) |
| 11 | **Stopwatch / countdown** | intervals, drift correction with timestamps, cleanup, pause/resume | ☆ |
| 12 | **Data table** | sorting (stable), filtering, pagination, column resizing ☆, virtualisation ☆ | ☆ |

---

## 1. Debounced autocomplete ★
Build a search box that suggests GitHub-style repository names from a fake API (`fakeSearch(q)` returns a promise with a random 100–600 ms delay).
**Requirements**
- Only query after 300 ms of no typing, and never query for fewer than 2 characters.
- Show a loading state and an empty state. Highlight the matched substring.
- ↑/↓ moves the active option, Enter selects, and Esc closes. Clicking outside closes it.
- Results must never be out of order (a slow earlier response must not overwrite a newer one).
- Cache results per query (an LRU with 20 entries).
**Accessibility:** `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"`/`option`.
**Talk about:** debounce vs throttle, AbortController vs ignoring stale responses, cache invalidation, server-side search.

## 4. Infinite scroll feed ★
Render a feed from `fetchPage(cursor)` → `{ items, nextCursor }` (10 items per page, 1,000 total).
**Requirements**
- Load the next page when a sentinel element is within 300 px of the viewport.
- Never fire two loads at once. Stop when `nextCursor` is null.
- Show a skeleton while loading, and an inline error with a Retry button.
- Keep the scroll position when returning from a detail view ☆.
**Talk about:** IntersectionObserver vs scroll listeners, virtualisation after ~1k items, cursor vs offset pagination, accessibility (a "Load more" button fallback, announcing new content).

## 5. Star rating
`<StarRating value onChange max={5} readOnly? />`. Hovering previews, clicking sets, clicking the current value clears it ☆.
The keyboard: Left/Right changes the value, and it works as a radio group (`role="radiogroup"` with `role="radio"` items).
**Talk about:** controlled vs uncontrolled, SVG stars with CSS `fill`, half-star precision.

## 9. Progress bars queue
A button adds a progress bar that fills over 2 s. Only **3** bars may fill at the same time; the others wait in a queue.
**Talk about:** a concurrency pool (lab 05), CSS transitions vs rAF, cleanup on unmount.

## 11. Stopwatch
Start/Stop/Reset/Lap. It must stay accurate after the tab has been in the background (use `performance.now()` deltas, not a counter of ticks).
**Talk about:** timer drift, `requestAnimationFrame` vs `setInterval`, and effect cleanup.

(Prompts 2, 3, 6, 7, 8 and 12: ask the tutor, `"expand machine-coding prompt 7 into a full spec"`.)
