# Getting started: from zero to your first green test (and on to the finish)

This guide takes you through everything, in order: getting your own copy of the repo, installing the tools on **macOS, Linux or Windows**,
choosing a learning track, the daily workflow, and how each part of the project works until you're done.

- **Time to first green test:** about 30 minutes
- **Prior knowledge:** basic HTML, CSS and JavaScript. React experience helps but isn't required (the labs rebuild the fundamentals).
- **Machine:** any laptop that can run Node 24 and a modern browser. 8 GB of RAM is comfortable.

---

## 1. Get your own copy of the repo
Pick one:

| Option | Best for | How |
|---|---|---|
| **Use this template** (recommended) | Most learners. You get a clean repo of your own (it can be private), with no fork history. | On GitHub, click **Use this template → Create a new repository**, then clone *your* repo. |
| **Fork** | Learners who want to pull future improvements easily and maybe contribute back | Click **Fork**, then clone your fork. See [§ 9](#9-keep-your-copy-up-to-date) for syncing. |
| **Clone directly** | Just looking around | `git clone` the original repo (you can't push your work to it). |

```bash
git clone https://github.com/<your-username>/<your-repo>.git
```
```bash
cd <your-repo>
```

> Work in **your own copy** and commit often. Your commit history becomes a portfolio of how you built a MERN app.

## 2. Install the tools

### 2.1 Git
- **macOS:** `xcode-select --install` (or `brew install git`)
- **Linux:** `sudo apt install git` (Debian/Ubuntu) or your distro's package manager
- **Windows:** install [Git for Windows](https://git-scm.com/download/win) (it includes Git Bash). Then keep line endings consistent:
  `git config --global core.autocrlf input`. (The repo's `.gitattributes` also enforces LF.)

Set your identity once: `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.
To keep your email private on a public repo, use your GitHub **noreply** address (GitHub → Settings → Emails).

### 2.2 Node.js 24 LTS (required)
The project **needs Node 24** (see `.nvmrc`). Older versions fail: React Router 8 needs ≥ 22.22, Babel 8 needs ≥ 22.18, jsdom 30 needs ≥ 22.22.2.
Use a version manager, so different projects can use different Node versions:

| OS | Version manager | Commands (run inside the repo) |
|---|---|---|
| macOS / Linux | [nvm](https://github.com/nvm-sh/nvm) | `nvm install` then `nvm use` (both read `.nvmrc`) |
| macOS / Linux / Windows | [fnm](https://github.com/Schniz/fnm) | `fnm install` then `fnm use` (both read `.nvmrc`) |
| Windows | [nvm-windows](https://github.com/coreybutler/nvm-windows) | `nvm install 24` then `nvm use 24` |
| Any | [Volta](https://volta.sh) | `volta install node@24` |

Check that it worked: `node -v` should print `v24.x`, and `npm -v` should print `11.x`.

> Tip: `nvm alias default 24` (nvm) or `fnm default 24` makes Node 24 the default in new terminals.

### 2.3 Editor
[VS Code](https://code.visualstudio.com) (or any editor) with these extensions: **ESLint**, **Prettier**, **EditorConfig**. Turn on *format on save*.

### 2.4 Browser tools (needed from Phase 3)
Chrome, Edge or Firefox, plus the **React Developer Tools** and **Redux DevTools** extensions.

### 2.5 MongoDB (only needed from Phase 7)
You can install it later. The options for every OS, including the free MongoDB Atlas cloud tier (no install), are in [server/SETUP.md](../server/SETUP.md#4-mongodb).

### 2.6 Optional tools
- **An AI tutor:** [Claude Code](https://claude.com/claude-code) gives you the built-in `/explain`, `/hint`, `/review`, `/quiz`, `/progress` and `/unstuck` commands.
  Other assistants work too. See [ai-tutor.md](ai-tutor.md).
- **Docker** (Phase 8, stretch): Docker Desktop, OrbStack, Colima or Podman.
- **GitHub CLI** (`gh`): handy for creating PRs in your own repo.

## 3. First run (5 minutes)
From the repo root:
```bash
nvm use
```
```bash
cd labs && npm ci
```
```bash
npm run test:01
```
You should see **red tests saying `TODO`**. That's expected: the labs are waiting for your code.
Open [labs/01-scope-closures/README.md](../labs/01-scope-closures/README.md) and start.

> `npm ci` installs the exact versions from `labs/package-lock.json`. Use `npm install` only when you deliberately add or upgrade a package.

## 4. Choose your track and set up PROGRESS.md
Open [ROADMAP.md](../ROADMAP.md) and pick a track:

| Track | Pace | For |
|---|---|---|
| **Intensive (7 days)** | 7–8 h/day | interview prep for developers who already know React/Node and need a refresher |
| **Standard (4 weeks)** | ~2–3 h/day | most learners |
| **Part-time (8 weeks)** | ~6–8 h/week | learning alongside a job or studies |

Then fill in the header of [PROGRESS.md](../PROGRESS.md) (`Track`, `Level`, `Started`, `Goal`) and commit it:
```bash
git add PROGRESS.md && git commit -m "chore: start the standard track"
```

## 5. How the repo teaches you
Every source file in `client/`, `server/` and `landing/` is already created, but it contains an **instruction block instead of code**:
```
🎯 GOAL · 🧠 CONCEPTS · 🧩 DEPENDS ON · 📝 STEPS · ✅ DONE WHEN · 💡 HINTS · ⚠️ GOTCHAS · 🎤 INTERVIEW ANGLE · 🚀 STRETCH · 🤖 ASK THE AGENT
```
You write the code **below** the block. Full legend: [00-how-to-use.md](00-how-to-use.md).

| Part | How you know it works |
|---|---|
| `labs/` (plain JavaScript) | Ready-made **Mocha tests**: `npm run test:NN` turns green |
| `landing/` (HTML/CSS) | A visual check at 360/768/1024/1440 px, plus Lighthouse |
| `client/` (React) | The ✅ DONE WHEN lists, your own Vitest tests (Phase 6), Lighthouse, React DevTools |
| `server/` (Express + MongoDB) | Your own Mocha + Supertest tests (the cases are listed for you), `curl`, and the client working end to end |

Some files are deliberately **not** created for you (`client/package.json`, `.prettierrc`, the root `package.json`…):
you create them by following `client/SETUP.md` and `server/SETUP.md`, which is part of the learning.

## 6. The daily workflow
1. **Branch** for the phase: `git switch -c phase-2/js-labs`
2. **Read** the next file's instruction block (and the linked concept primer if something is fuzzy).
3. **Code** one 📝 STEP at a time with the dev server or tests running.
4. **Check** every ✅ DONE WHEN item (DevTools, the keyboard, a narrow viewport).
5. **Answer** the 🎤 questions out loud.
6. **Commit** with Conventional Commits: `feat(labs): implement LRU cache`
7. At the end of a phase: **self-review** with the checklist in `.github/pull_request_template.md` (or `/review`),
   then merge into your `main` (open a PR in your own repo, or run `git merge --no-ff`).
8. **Quiz yourself** (`/quiz <topic>`) and update the confidence tracker in `PROGRESS.md`.

## 7. The journey, start to end
| Step | Phase | You're done when |
|---|---|---|
| 1 | [0 · Setup](phases/phase-0-setup.md) | Node 24 works, the labs install, and you have a branch workflow |
| 2 | [2 · JavaScript labs](phases/phase-2-javascript-labs.md) | all ★ lab tests are green |
| 3 | [3 · React foundations](phases/phase-3-react-foundations.md) | the app shell, router, theme and component kit work |
| 4 | [4 · State & data](phases/phase-4-state-and-data.md) | login, projects and the board work against the MSW mock API |
| 5 | [5 · Canvas & performance](phases/phase-5-canvas-and-performance.md) | the whiteboard, dashboard, search and virtualised feed work, and you've profiled them |
| 6 | [6 · Testing & quality](phases/phase-6-testing-and-quality.md) | client tests and lint are green, and the accessibility pass is done |
| 7 | [1 · Landing page](phases/phase-1-html-css-landing.md) | the responsive, animated, accessible landing page is done |
| 8 | [7 · Node backend](phases/phase-7-node-backend.md) | the client runs against your Express + MongoDB API, and the server tests are green |
| 9 | [8 · DevOps](phases/phase-8-devops-cicd.md) ☆ | CI is green on GitHub, and the Docker image runs |
| 10 | [9 · Interview drills](phases/phase-9-interview-drills.md) | the machine-coding prompts, system design and STAR stories are done |

(The standard and part-time tracks do the landing page earlier. See [ROADMAP.md](../ROADMAP.md).)

**How the app evolves**
```
Phase 3: static shell ─► Phase 4: data from the MSW mock API (in the browser) ─► Phase 5: canvas + GraphQL (still mocked)
        ─► Phase 7: switch VITE_USE_MOCKS=false → the real Express + MongoDB API, following the same contract
```

## 8. Getting help
1. The file's 💡 HINTS and the linked primer in `docs/concepts/`
2. [FAQ & troubleshooting](faq-troubleshooting.md)
3. Your AI tutor ([how to use it](ai-tutor.md)): `/hint <file> <step>`, then `/unstuck` as a last resort
4. GitHub **Discussions** on the original repo (questions, show & tell), or **Issues** for mistakes in the material

There are **no official solutions** in the repo, on purpose. The tests and the ✅ DONE WHEN lists are how you check your work.

## 9. Keep your copy up to date
The material is improved over time. If you **forked** the repo:
```bash
git remote add upstream https://github.com/vin2k20/learn-mern-by-building.git
```
```bash
git fetch upstream && git merge upstream/main
```
Conflicts usually happen where you've written code under an instruction block that has since changed: keep your code and read the new instructions.

If you used **the template**, your history isn't connected to the original, so don't merge. Instead, read [CHANGELOG.md](../CHANGELOG.md),
add the same `upstream` remote, and pull in only the files you want (docs, tests), for example:
```bash
git fetch upstream && git checkout upstream/main -- docs labs/01-scope-closures/closures.test.js
```

## 10. When you finish
- Deploy it (Phase 8 notes), and add screenshots and your Lighthouse scores to your repo's README.
- Write down your before/after performance numbers (Phase 5). They make great interview stories.
- Share it in the original repo's Discussions (Show and tell), and consider [contributing](../CONTRIBUTING.md) improvements.
