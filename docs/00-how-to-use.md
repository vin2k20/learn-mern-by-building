# How to use this repo

> New here? Start with [getting-started.md](getting-started.md) (installation and your own copy), then come back to this page for the conventions.

## 1. The instruction block
Every source file starts with a block like this, written in that file type's comment syntax
(`/** */` for JS/CSS, `<!-- -->` for HTML, `#` for YAML/Dockerfile/env):

```
📄 TaskCard.jsx · Phase 4 · Day 4 · ★ core
🎯 GOAL            What this file must do, in one sentence.
🧠 CONCEPTS        What you'll practise, with links to docs/concepts/…
🧩 DEPENDS ON      What it imports / what imports it (the architecture).
📝 STEPS           Small, ordered steps. Do them in order and commit after each big one.
✅ DONE WHEN       Acceptance criteria: behaviour, accessibility, performance.
💡 HINTS           API names / direction only. Try without them first.
⚠️ GOTCHAS         The bugs people usually hit here.
🎤 INTERVIEW ANGLE Questions this file prepares you for. Answer them out loud.
🚀 STRETCH         Optional extras (☆).
🤖 ASK THE AGENT   Suggested prompts for the tutor.
```

**Workflow per file**
1. Read the whole block (2 min). Open the linked concept primer if any term feels fuzzy.
2. Write the code **below** the block, one 📝 STEP at a time. Keep the dev server or tests running.
3. Check every ✅ DONE WHEN item yourself (DevTools, keyboard, narrow viewport).
4. Answer the 🎤 questions out loud in under a minute each. If you can't, run `/explain`.
5. Commit: `git commit -m "feat(board): drag and drop between columns"`.
6. At the end of a feature folder, run `/review <folder>`.

## 2. Legend
| Mark | Meaning |
|---|---|
| `Phase N · Day N` | The phase guide the file belongs to, and its day on the **intensive** track (other tracks: see ROADMAP.md) |
| ★ | Core. Do these on every track |
| ☆ | Stretch. Only if ahead of schedule |
| `→ docs/…` | Read this primer if the concept is new or rusty |
| `(lab 07)` | You already built this in a lab; reuse your implementation |

## 3. What is *not* instructions-only
- `labs/**/*.test.js`: ready-made tests (the spec). **Don't edit them.**
- `labs/**/<name>.js`: an instruction block plus **export stubs** that throw `TODO`. Replace the stub bodies.
- `labs/package.json`: ready to install.
- `client/src/mocks/data/seed.json`: seed data for the mock API and the DB seed script.
- `.gitignore`, `.editorconfig`, `.nvmrc`, `server/.env.example`: small config files.
- Everything in `docs/`.

Files that can't hold comments (like `client/package.json` and `.prettierrc`) don't exist yet. You create them by
following `client/SETUP.md` and `server/SETUP.md`.

## 4. Talking to the tutor
The tutor follows [`CLAUDE.md`](../CLAUDE.md). Useful patterns:

| Situation | Prompt |
|---|---|
| New concept | `/explain useSyncExternalStore` |
| Stuck on a step | `/hint client/src/hooks/useLocalStorage.js step 2` |
| Red test you don't understand | `/hint labs/07-data-structures/data-structures.js LRUCache` |
| Finished a feature | `/review client/src/features/board` |
| Want to check your knowledge | `/quiz redux middleware hard n=3` |
| End of the day | `/progress` |
| Totally blocked | `/unstuck labs/05-async/async.js mapLimit` |
| Debugging | `@client/src/features/board/TaskCard.jsx the drop event never fires — here's the console output: …` |
| Design discussion | "Should the whiteboard shapes live in Redux or local state? Argue both sides." |

Tip: paste error messages and describe what you *expected* vs what *happened*. That's also how to report bugs in a real team.

## 5. Git workflow used in this project
- `main` is always green (labs you've finished pass, the app builds).
- One branch per phase: `phase-2/js-labs`, `phase-4/board`, …
- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `perf:`, `style:`.
- When a phase is done, open a PR **in your own repo** (or merge locally with `git merge --no-ff`), use section B of `.github/pull_request_template.md` as your self-review, run `/review`, then merge.

## 6. Folder conventions (client)
- **Feature-based** folders (`features/board/…`) own their components, slice, selectors, API and styles.
- **Shared** building blocks live in `components/`, `hooks/`, `lib/`.
- **CSS Modules** (`*.module.css`) for component styles; global tokens and layout live in `styles/`.
- Tests sit next to the file they test (`TaskCard.test.jsx`).
- Import alias: `@/` → `client/src/` (configured in `vite.config.js`).
