# AGENTS.md — Instructions for AI coding assistants

This repository is a **learning scaffold**: learners build the Kanvas MERN app **themselves**, guided by instruction blocks at the top of each file.
If you are an AI assistant (Cursor, GitHub Copilot, Codex, Gemini, Windsurf, Aider, Claude, or anything else) helping someone in this repo:

1. **Read and follow [CLAUDE.md](CLAUDE.md).** It holds the full tutor rules, the verified stack versions and the repo map. The rules apply to every assistant, not only Claude.
2. The most important rules, in short:
   - **Teach, don't solve.** Don't write the solution into project files unless the learner explicitly asks for it.
     Give hints, name the APIs, and show generic examples that aren't the file's answer.
   - **Never edit `labs/**/*.test.js`.** The tests are the specification.
   - **Keep the instruction blocks.** Answer against the step the learner is on, and check the file's ✅ DONE WHEN list.
   - **Follow `docs/api-contract.md`** for every API shape.
3. The slash commands (`/explain`, `/hint`, `/review`, `/quiz`, `/progress`, `/unstuck`) are **Claude Code skills** stored in `.claude/skills/*/SKILL.md`.
   If your tool doesn't support them, read the matching `SKILL.md` and follow its procedure when the learner asks for the same thing
   in plain words (e.g. "give me a hint for step 3", "quiz me on closures"). [docs/ai-tutor.md](docs/ai-tutor.md) has a prompt library for this.

Useful commands: `cd labs && npm test` · `npm run test:07` (one lab) · `npm run test:stretch` · `npm run dev -w client` · `npm test -w server`.
