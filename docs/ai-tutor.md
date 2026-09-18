# Using the AI tutor

Kanvas has an optional **AI tutor layer**. The tutor's job is to help you *learn*, not to write the app for you.
Everything in the project also works **without AI**: the hints, primers, tests and checklists are all in the repo.

## What the tutor will and won't do
The rules live in [CLAUDE.md](../CLAUDE.md) (and [AGENTS.md](../AGENTS.md) for other tools):
- ✅ It explains concepts, gives hints at three levels, reviews your code like a team lead, runs mock interviews, and tracks your progress.
- ✅ It reads a file's instruction block first and answers against the step you're on.
- ❌ It won't write solutions into your files unless you explicitly ask (or use `/unstuck`).
- ❌ It never edits the lab tests. They're the specification.

## Option A: Claude Code (built-in slash commands)
1. Install Claude Code (terminal, desktop app or IDE extension) by following the official instructions at [claude.com/claude-code](https://claude.com/claude-code).
2. Open your copy of the repo as the working folder. Claude Code loads `CLAUDE.md` automatically, and the skills in `.claude/skills/` become slash commands.
3. Use them:

| Command | What you get | Example |
|---|---|---|
| `/explain <topic or file>` | Concept, mental model, a generic example, pitfalls, and how to say it in an interview | `/explain event delegation` |
| `/hint <file> [step]` | A nudge. Ask again for levels 2 and 3. | `/hint client/src/hooks/useLocalStorage.js step 2` |
| `/review <file, folder or phase-N>` | A team-lead style review against the file's ✅ DONE WHEN list | `/review client/src/features/board` |
| `/quiz <topics> [easy/medium/hard] [n=5]` | A mock interviewer: one question at a time, scored, with model answers, logged to `PROGRESS.md` | `/quiz redux middleware hard n=3` |
| `/progress` | Runs the lab tests, detects finished files, updates `PROGRESS.md`, and suggests your next 3 tasks | `/progress` |
| `/unstuck <file> <step or function>` | The escape hatch: a reference implementation for **one** step, explained | `/unstuck labs/05-async/async.js mapLimit` |

You can also just talk to it and tag files: `@client/src/features/board/TaskCard.jsx the drop event never fires. Here's the console output: …`

## Option B: other assistants (Cursor, Copilot, Codex, Gemini, ChatGPT…)
Many tools read `AGENTS.md` automatically. If yours doesn't, tell it at the start of a session:
> "Read AGENTS.md and CLAUDE.md in this repo and follow their tutor rules."

The slash commands are just saved procedures in `.claude/skills/<name>/SKILL.md`. Use these plain-language equivalents:

| Instead of | Say |
|---|---|
| `/explain X` | "Explain X for this project following `.claude/skills/explain/SKILL.md`: a mental model, a generic example (not my file's solution), pitfalls, and an interview answer." |
| `/hint file step` | "Give me a level-1 hint for step N of `<file>`. Don't show a solution. I'll ask for the next level." |
| `/review path` | "Review `<path>` like a team lead against its ✅ DONE WHEN list, following `.claude/skills/review/SKILL.md`. Don't edit the files." |
| `/quiz topic` | "Interview me on `<topic>`. One question at a time, score each answer 0–3, and give a model answer after each." |
| `/progress` | "Run `cd labs && npm test`, check which instruction files have code under them, update PROGRESS.md, and suggest my next 3 tasks." |
| `/unstuck file fn` | "I've tried the hints. Show me a reference implementation for just `<fn>` in `<file>`, explained line by line, in the chat only." |

With chat-only tools (no repo access), paste the file's instruction block and your code into the chat.

## Prompt library (works with any assistant)
- **Debugging:** "Here's what I expected, what happened, and the console/network output: … Ask me questions before suggesting a fix."
- **Design discussion:** "Should the whiteboard shapes live in Redux or local state? Argue both sides, then recommend one."
- **Interview drill:** "Give me the 🎤 questions from `<file>` one at a time and grade my answers."
- **Explain it back:** "I'll explain reconciliation in my own words. Point out anything wrong or missing."
- **Target role:** "Here's a job description: … Map it to the Kanvas phases and tell me which ☆ items to promote to ★."
- **Code-review practice:** "Write a flawed TaskCard with 6 realistic bugs for me to review, then grade my review."

## Good habits
- **Try first** (10–15 minutes), then ask for a hint, not an answer.
- **Explain it back** after you finish a step. If you can't, you don't own it yet.
- **Verify AI output**: run the tests, read the code, check the docs. Assistants can be wrong about versions and APIs.
- **Never paste secrets** (`.env` values, tokens) into a chat.
- Learning without AI? Use the 💡 HINTS, the primers in `docs/concepts/`, the Q&A banks in `docs/interview/`, and GitHub Discussions.
