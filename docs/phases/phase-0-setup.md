# Phase 0 · Setup, git and npm ★ (Day 1, ~60 min)

**Goal:** a working toolchain, a git history you'd be proud to show, and the labs running.
**[Interview topics](../interview/target-role.md) covered:** *code versioning tools like Git/SVN · Node + NPM · popular frontend development tools*
**Primers:** [npm, semver & workspaces](../concepts/tooling/npm-semver-workspaces.md) · [git workflow (vs SVN)](../concepts/tooling/git-workflow-vs-svn.md)
**Detailed install instructions for every OS:** [getting-started.md](../getting-started.md)

---

## 1. Your own copy of the repo (5 min)
Create your copy (**Use this template** or **Fork** on GitHub), then clone it:
```bash
git clone https://github.com/<your-username>/<your-repo>.git && cd <your-repo>
```
Your copy is where you commit your work and track your progress. (See [getting-started § 1](../getting-started.md#1-get-your-own-copy-of-the-repo) for the differences between the options.)

## 2. Node 24 LTS (5 min)
The project needs **Node 24** (`.nvmrc`). Older versions fail: React Router 8 needs ≥ 22.22, Babel 8 needs ≥ 22.18, jsdom 30 needs ≥ 22.22.2.
```bash
nvm install
```
```bash
nvm use
```
(With fnm: `fnm install && fnm use`. With nvm-windows: `nvm install 24 && nvm use 24`.)
Check with `node -v` (v24.x) and `npm -v` (11.x).

> 🎤 *Why LTS?* Even-numbered releases become Long-Term Support (about 30 months of fixes). Production apps and CI should pin an LTS.
> From Node 27, the project moves to one major release a year, and every release becomes LTS.

## 3. Editor (5 min)
Install the **ESLint**, **Prettier** and **EditorConfig** extensions, and turn on "format on save".
The repo's `.editorconfig` sets 2-space indentation and LF line endings (`.gitattributes` enforces LF in git too).

## 4. Git workflow (15 min)
1. Read `.gitignore` and `.gitattributes`, and be able to explain every line (why ignore `.env` but not `.env.example`? why `dist/`?).
2. Create a branch for your first phase: `git switch -c phase-2/js-labs`
3. Use **Conventional Commits**: `feat(labs): implement LRU cache`, `fix(board): keep tail pointer`, `test:`, `docs:`, `refactor:`, `perf:`, `chore:`.
4. When a phase is done, merge it into your `main`: open a PR **in your own repo** (the PR template gives you a self-review checklist),
   or merge locally with `git switch main && git merge --no-ff phase-2/js-labs`.
5. Fill in the header of `PROGRESS.md` (track, level, start date, goal) and make your first commit:
   `git commit -am "chore: start the <track> track"`

**Commands you should be fluent in** (practise them as you go):
`status · add -p · commit --amend · switch -c · merge --no-ff · rebase main · stash push/pop · log --oneline --graph · diff --staged · restore · revert · cherry-pick · reset --soft HEAD~1 · bisect · blame`

> 🎤 *Merge vs rebase?* Merge preserves history (a merge commit). Rebase rewrites your branch onto the tip of main for a linear history.
> Never rebase shared branches. *Git vs SVN?* Git is distributed (a full repo locally, cheap branches). SVN is centralised (one server, and commits need the network). See the primer.

## 5. npm and the root package (10 min)
The root `package.json` doesn't exist yet. Creating it is part of the exercise:
```bash
npm init -y
```
Edit the root `package.json`:
- `"name": "kanvas"`, `"private": true` (it can never be published by accident)
- `"engines": { "node": ">=24" }`
- scripts:
  - `"labs": "npm test --prefix labs"`
  - (Phase 3) `"dev:client": "npm run dev -w client"`
  - (Phase 7) `"dev": "concurrently -n client,server -c blue,green \"npm:dev -w client\" \"npm:dev -w server\""`
- **Workspaces:** `npm init -y -w client` (Phase 3) and `npm init -y -w server` (Phase 7) add `"workspaces"` for you.
  Don't add a workspace entry before its folder has a `package.json`, or npm will complain.

> 🎤 Know these: `^1.2.3` (the same major), `~1.2.3` (the same minor), `package-lock.json` (the exact tree; commit it),
> `npm ci` (clean install from the lockfile, used in CI), `npx` (run a binary without a global install), `npm ls <pkg>`, `npm outdated`, `npm audit`,
> `dependencies` vs `devDependencies` vs `peerDependencies`.

## 6. Labs (10 min)
```bash
cd labs && npm ci
```
```bash
npm run test:01
```
Red tests with `TODO` errors mean everything is wired up correctly.

## ✅ Checkpoint
- [ ] `node -v` → v24.x
- [ ] Your own copy is cloned, you're on a `phase-2/...` branch, and the `PROGRESS.md` header is committed
- [ ] The root `package.json` is private, with a `labs` script
- [ ] `npm run labs` runs (red is fine)

🤖 `/explain npm workspaces` · `/explain git rebase vs merge` · `/quiz git npm`
