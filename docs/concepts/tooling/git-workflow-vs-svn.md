# Git workflows (and how Git differs from SVN)

> **TL;DR:** Git is **distributed**: everyone has the full history, and branches are cheap pointers. SVN is **centralised**: one server,
> and commits go straight to it. Modern teams use short-lived feature branches plus pull requests.

## Git vs SVN
| | Git | SVN |
|---|---|---|
| Model | distributed (a local repo) | centralised |
| Commit | local, then push | straight to the server (needs the network) |
| Branch | a lightweight pointer | a directory copy (`/branches/x`) |
| Merge | powerful 3-way merges, rebase | historically painful |
| History | a content-addressed DAG (SHA) | incremental revision numbers (r1234) |
| Partial checkout | sparse checkout / partial clone | natural (check out a subfolder) |
| Large binaries | Git LFS | handled well natively |
| Locking | not built in (LFS locks) | `svn lock` |

## Branching strategies
| Strategy | Summary | Fits |
|---|---|---|
| **GitHub flow / trunk-based** | short-lived branches → PR → main, deploy often, feature flags | most product teams |
| **Git flow** | `develop`, `release/*`, `hotfix/*` | versioned releases, slower cadence |
| **Release branches** | cut `release/2026.09` from main, cherry-pick fixes | mobile and enterprise |

## Everyday toolkit
```
git switch -c feat/board-dnd          git add -p               git commit -m "feat(board): drag cards"
git fetch && git rebase origin/main   git push -u origin HEAD  git stash push -m wip / git stash pop
git log --oneline --graph --all       git diff --staged        git restore --staged file
git commit --amend --no-edit          git revert <sha>          git cherry-pick <sha>
git reset --soft HEAD~1               git reflog  (undo almost anything)
git bisect start / good / bad         git blame -L 10,30 file
```

## Merge vs rebase vs squash
- **Merge commit:** preserves the true history and the branch topology.
- **Rebase:** replays your commits on top of the target, giving a linear history. **Never rebase shared/public branches.**
- **Squash merge:** one commit per PR, a clean main, but the individual commits are lost.

## Conventional Commits
`type(scope): subject` → `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. `BREAKING CHANGE:` goes in the footer.
This enables automated changelogs and semantic versioning.

## Resolving conflicts
Understand both sides, talk to the other author if it isn't obvious, re-run the tests, and never blindly "accept mine".

## 🎤 Interview questions
<details><summary>You pushed a commit with a secret. What now?</summary>
Rotate the secret immediately (assume it's compromised), then remove it from the history (git filter-repo / BFG) and force-push in coordination with the team. Add secret scanning and pre-commit checks.
</details>
