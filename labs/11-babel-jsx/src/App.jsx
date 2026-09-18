/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/11-babel-jsx/src/App.jsx · Phase 2 · Day 3 · ★ core (Part A, not tested)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Write a small, JSX-heavy component so you can SEE what Babel turns each feature into.
 *   This file is only compiled, never run.
 *
 * 📝 STEPS: write components that use each of these JSX features:
 *   1. A function component `TaskItem({ task, onToggle })` returning an <li> with
 *      - a className built from a template literal (`task ${task.done ? 'done' : ''}`)
 *      - an event handler prop (onClick={() => onToggle(task.id)})
 *      - a boolean attribute (<input type="checkbox" checked={task.done} readOnly />)
 *      - a JSX comment {/* like this *\/}
 *   2. A component `TaskList({ tasks, onToggle, emptyText = 'Nothing to do' })` that
 *      - returns a Fragment (<>…</>) with an <h2> and a <ul>
 *      - renders a list with .map() and a `key`
 *      - renders conditionally with && and with a ternary
 *      - spreads props: <TaskItem {...rest} task={t} />
 *   3. A component using `children` and a namespaced/dashed attribute (aria-label, data-id).
 *   4. export default function App() that renders <TaskList> with some inline data.
 *
 * Then follow README.md Part A to compile this file with the classic runtime, the automatic
 * runtime, development mode, and preset-env. Note three differences you notice between the outputs.
 *
 * 🎤 INTERVIEW ANGLE  "What does this JSX compile to?", "why are keys passed separately in the new transform?"
 * 🤖 ASK THE AGENT    /explain classic vs automatic JSX runtime
 * ═══════════════════════════════════════════════════════════════════════════
 */
