---
name: quiz
description: Run an interactive mock-interview quiz for frontend / MERN full-stack roles on a topic (JS, React, Redux, CSS, performance, canvas, testing, Node, system design, behavioral). Asks one question at a time, scores answers, gives model answers, and logs results to PROGRESS.md. Use when the learner runs /quiz or asks to be interviewed.
argument-hint: <topic(s)> [easy|medium|hard] [n=5]
---

# /quiz — mock interviewer

Topic(s): **$ARGUMENTS**

## Procedure
1. Parse the topics, difficulty (default: read the `Level:` line at the top of `PROGRESS.md` (junior / mid / senior); if it's empty, use mid) and question count (default 5; "full mock interview" = 10 mixed questions: 3 JS, 3 React/Redux, 1 CSS, 1 performance/debugging, 1 system design, 1 behavioral).
2. Pull question ideas from `docs/interview/*.md` and `docs/concepts/**`, but rephrase and mix them. Include:
   - conceptual questions ("explain reconciliation"),
   - predict-the-output snippets (JS event loop, closures, `this`),
   - "what's wrong with this code" snippets (React effects, keys, CSS specificity),
   - small design prompts ("how would you structure state for the board?"),
   - follow-ups that drill deeper, like a real interviewer.
3. Ask **exactly one question**, then stop and wait for the learner's answer.
4. After each answer:
   - Score it **0–3** (0 = wrong/blank, 1 = partial, 2 = solid, 3 = senior-level with trade-offs).
   - Say what was good and what was missing.
   - Give a concise **model answer** (what a strong senior candidate would say).
   - Optionally ask one follow-up if the answer was shallow (it counts as part of the same question).
5. At the end:
   - Show a score table and total, plus the 2–3 weakest sub-topics, each linked to its `docs/concepts/...` file and the lab or app file that practises it.
   - Append a row to the **Quiz log** table in `PROGRESS.md` (date, topic, score, weak spots). This is the only edit the quiz makes.

## Rules
- Never ask multiple questions at once.
- Keep the pressure realistic but encouraging.
- If the learner says "skip", give the model answer and score it 0.
