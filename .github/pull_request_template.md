<!--
👋 This template has two sections:
   A) You're CONTRIBUTING to the original learn-mern-by-building repo → fill in A and delete B.
   B) You're merging a phase in YOUR OWN copy of the project → delete A and use B as your self-review.
-->

## A. Contribution to the original repo
**What & why:**

**Type:** <!-- docs / instructions · lab tests · new content · tooling -->

- [ ] `node tools/verify-scaffold.mjs --run-labs` passes locally
- [ ] No solution code added to instruction files or lab stubs
- [ ] Lab test changes were verified against a private reference solution (in a collapsed block below, or a secret gist)
- [ ] `CHANGELOG.md` updated under **Unreleased** (if learners would notice the change)
- [ ] Commands are cross-platform, and version-specific facts state their version
- [ ] API changes update `docs/api-contract.md` + the MSW and server instructions together

<details><summary>Reference solution (for reviewers, if tests changed)</summary>

```js
// paste it here
```
</details>

---

## B. Learner self-review (your own repo)
### What & why
<!-- One or two sentences: what does this PR change and why? Link the phase or file (e.g. Phase 4 · features/board). -->

### How to test
<!-- Steps a reviewer can follow. Include the routes, credentials (demo@kanvas.dev / kanvas123) and edge cases. -->
1.
2.

### Screenshots / recordings
<!-- For UI changes: before/after at 360px and 1280px. For performance work: Profiler or Lighthouse numbers. -->

### Self-review checklist
- [ ] Every **✅ DONE WHEN** item in the touched files' instruction blocks is satisfied
- [ ] `npm run lint` and the tests pass locally (`labs`, `client`, `server` as relevant)
- [ ] Keyboard-only walk-through done; focus is visible; ARIA used only where needed
- [ ] Responsive at 360 / 768 / 1024 / 1440 px; `prefers-reduced-motion` respected
- [ ] No unnecessary re-renders (React Profiler checked for list and board changes)
- [ ] Loading, empty, error and success states are handled
- [ ] No secrets, `console.log`s or commented-out code left behind
- [ ] Effects clean up (listeners, timers, observers, requests)
- [ ] API calls match `docs/api-contract.md`
- [ ] `/review` (or the tutor prompt equivalent) run on the main files and the 🔴 findings fixed

### Notes for the reviewer
<!-- Trade-offs you made, alternatives you considered, follow-ups (☆ items you skipped). -->
