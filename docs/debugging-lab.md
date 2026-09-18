# Debugging lab: six DevTools bug hunts ★ (Day 5, ~60 min)

**[Interview topics](interview/target-role.md) covered:** *browser-based debugging and performance testing software · problem solving*
**How it works:** for each hunt, **deliberately introduce** the bug into your own Kanvas code on a throwaway branch
(`git switch -c debug-lab`), reproduce it, find it **using the named tool** (even if you already know where it is), write down what you saw,
then fix it (or `git restore`). Fill in the table at the end. These make great interview stories.

Before you start: install **React Developer Tools** and **Redux DevTools**, and learn these shortcuts: `Cmd+Opt+I` (DevTools), `Cmd+Shift+P` (command menu),
`Cmd+P` (open a file in Sources).

---

## Hunt 1: the stale closure (Sources panel + breakpoints)
**Introduce:** in `ActivityFeed.jsx` (or any component), add
`useEffect(() => { const id = setInterval(() => setTick(tick + 1), 1000); return () => clearInterval(id); }, []);` and render `tick`.
**Symptom:** the counter gets stuck at 1.
**Find it with:** Sources → set a **breakpoint** inside the interval callback → look at `tick` in the Scope pane on each hit (always 0).
Try a **logpoint** (right-click the gutter → "Add logpoint") instead of `console.log`.
**Fix:** a functional update (`setTick(t => t + 1)`). **Explain:** the closure captured the first render's `tick`.

## Hunt 2: missing or unstable keys (React DevTools + Elements)
**Introduce:** in `Column.jsx`, render the cards with `key={index}`. Add an uncontrolled `<input>` to TaskCard (a temporary "quick note" field).
**Symptom:** type into the first card's input, move a card up from below it, and the text now sits on the wrong card.
**Find it with:** React DevTools Components → select the card → watch its props change while the state stays put. Elements → watch the DOM nodes being reused.
**Fix:** `key={task.id}`.

## Hunt 3: the listener leak (Memory panel)
**Introduce:** in `CanvasBoard.jsx`, add `window.addEventListener('resize', onResize)` **without** removing it in the cleanup, and have `onResize` close over a big array (`new Array(1e6).fill(0)`).
**Symptom:** memory grows each time you navigate to the whiteboard and away again.
**Find it with:** Memory → heap snapshot → navigate back and forth 5× → GC → snapshot → **Comparison** view (look for growing arrays and closures) → **Retainers**.
Also check Elements → **Event Listeners** on `window`, and the **Performance monitor** (JS heap, listener count).
**Fix:** a cleanup, or `{ signal }` with an AbortController.

## Hunt 4: the render storm (React Profiler + "Highlight updates")
**Introduce:** in `BoardPage.jsx`, pass `onMove={(id, to) => dispatch(moveTask(...))}` inline to a `memo`-ised `Column`, and create a new `filters` object on each render.
**Symptom:** dragging one card re-renders every column and every card.
**Find it with:** React DevTools → Profiler → record a drag → the flame graph → "Why did this render?" ("props changed: onMove, filters").
Turn on **"Highlight updates when components render"**.
**Fix:** `useCallback`, `useMemo` / moving the object out of render, or granular selectors. (☆ Then turn on the React Compiler and compare.)

## Hunt 5: layout thrashing & long tasks (Performance panel)
**Introduce:** in `ActivityFeed.jsx` (the naive version), for each row do `row.style.height = container.offsetHeight / 20 + 'px'` in a loop (a read inside every write).
Also render all 10k rows.
**Symptom:** scrolling janks and typing in the filter lags.
**Find it with:** Performance → **CPU 4× slowdown** → record → Main track: purple "Layout" blocks with a ⚠️ "Forced reflow" warning, and long tasks (red triangles).
Check the **Interactions** track for INP, and the **React Performance Tracks**.
**Fix:** read once and then write; virtualise; `useDeferredValue` for the filter.

## Hunt 6: network & CORS (Network panel)
**Introduce (Day 7):** remove the Vite proxy and call `http://localhost:4000/api/projects` directly with `cors()` disabled on the server.
**Symptom:** the projects page shows an error, while `curl` works fine.
**Find it with:** Network → the failed request → a preflight `OPTIONS` with no `Access-Control-Allow-Origin`. The Console shows a CORS error. Check **Headers** and **Timing**.
Also try the **throttling presets** (Fast 4G / Slow 4G), "Disable cache", **request blocking** (block `/api/tasks*` to test error UI), and **local overrides** (fake a 500 response).
**Fix:** restore the proxy, or configure `cors({ origin })` correctly.

## Bonus hunts ☆
- **Coverage tab:** how much of the initial JS is unused on `/login`? What would you split?
- **Rendering panel:** turn on *Layout Shift Regions* and reload the dashboard. What shifts? Fix it with skeletons of the right size.
- **Lighthouse:** run it on `npm run preview`, then fix the top 3 opportunities.
- **Application panel:** inspect localStorage (the token), the Service Worker (MSW) and the Cache Storage.
- **Recorder panel:** record a "login → move card" flow and replay it with performance measurement.

---

## Results log
| Hunt | Tool used | What you observed | Root cause | Fix | Minutes |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |

🤖 `/explain chrome devtools performance panel` · `/quiz debugging devtools`
