/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/11-babel-jsx/handwritten.js · Phase 2 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Prove that JSX is "just function calls" by writing the classic-runtime output BY HAND.
 *
 * 📝 STEPS
 *   Implement buildCard(h, { title, done, tags }) so it returns EXACTLY what Babel's classic
 *   runtime (with pragma `h`) would produce for this JSX:
 *
 *     <article className="card">
 *       <h2>{title}</h2>
 *       {done && <span className="badge">Done</span>}
 *       <ul>
 *         {tags.map((tag) => <li key={tag}>{tag}</li>)}
 *       </ul>
 *     </article>
 *
 *   Rules of the classic transform:
 *     h(type, propsOrNull, ...children)
 *     - props with no attributes → null
 *     - text and {expressions} become positional children, in order
 *     - {done && <x/>} is passed through as-is (so it can be `false`)
 *     - {array.map(...)} is ONE child that happens to be an array
 *     - key is just another prop in the classic runtime
 *
 *   ✋ Write it without compiling first. The test compiles the JSX above with Babel
 *   and deep-compares your result with Babel's.
 *
 * 🎤 INTERVIEW ANGLE  "Rewrite this JSX without JSX."
 * 🤖 ASK THE AGENT    /hint labs/11-babel-jsx/handwritten.js
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function buildCard(h, { title, done, tags }) {
  throw new Error('TODO: implement buildCard');
}
