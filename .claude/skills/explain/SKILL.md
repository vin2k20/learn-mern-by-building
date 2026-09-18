---
name: explain
description: Explain a frontend/JS/React/CSS/Node concept or a Kanvas project file in interview-ready depth (mental model, why it matters, generic example, pitfalls, interview phrasing). Use when the learner asks "what is", "how does", "why", or runs /explain.
argument-hint: <topic or file path>
---

# /explain — concept explainer

Explain: **$ARGUMENTS**

## Procedure
1. Work out what is being asked about:
   - **A file path** → read its instruction block and explain the *concepts* listed under 🧠 CONCEPTS and what the file is for in the architecture (🧩 DEPENDS ON / USED BY). Don't implement it.
   - **A topic** → look for a matching primer in `docs/concepts/**` (use Glob/Grep) and read it first so your explanation stays consistent with the repo. If the primer is thin or missing, say so at the end and offer to extend it.
2. Write the explanation in this structure (keep it skimmable):
   - **TL;DR**: 1–2 sentences.
   - **Mental model**: an analogy and/or a small ASCII diagram.
   - **How it actually works**: the mechanics, with correct terminology. Mention version specifics (React 19.3, Router 8, Express 5, Node 24) when they matter.
   - **Generic example**: a short snippet (≤ 25 lines) that is **not** the solution to any file in this repo. Use different names and domains (e.g. a shopping cart instead of the board).
   - **Where you'll use it in Kanvas**: the file paths.
   - **Pitfalls & gotchas**: 3–5 bullets.
   - **🎤 Interview angle**: a crisp 2–3 sentence answer the learner could say out loud, then 2 likely follow-up questions (answers hidden behind "ask me for the answers").
3. End with one quick self-check question for the learner to answer.

## Rules
- Never write the file's actual implementation (see CLAUDE.md golden rule 1).
- Prefer accuracy over breadth. If you're unsure about a version-specific detail, say so.
