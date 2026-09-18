/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/projects/NewProjectModal.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A modal form to create a project (name, description, colour) using the RTK Query mutation, with validation,
 *   pending/error states and ☆ an optimistic UI.
 *
 * 🧠 CONCEPTS  → components/Modal · docs/concepts/react/react-19-features.md (useOptimistic ☆) · docs/api-contract.md (POST /api/projects)
 *
 * 📝 STEPS
 *   1. Props: { open, onClose, onCreated }. const [createProject, { isLoading, error, reset }] = useCreateProjectMutation()
 *   2. A form inside <Modal title="New project" footer={…}>:
 *      - name (required, 2–60 chars; show a live counter) · description (textarea, optional)
 *      - a colour picker: a radio group of 6 swatches (a <fieldset> + <legend>, visually custom radio inputs, each
 *        with an accessible name like "Indigo")
 *   3. On submit: validate → `await createProject(values).unwrap()` → toast "Project created" → onCreated(project) → onClose()
 *      Handle a 409 (a duplicate name) as a field error on "name", and anything else as a form-level error.
 *   4. Reset the form and the mutation state when the modal closes.
 *   5. ☆ useOptimistic in ProjectsPage to show the new card instantly with a "Saving…" badge.
 *
 * ✅ DONE WHEN
 *   [ ] Keyboard only: open → fill in → choose a colour with the arrow keys → Enter submits → focus returns to the "New project" button
 *   [ ] A duplicate name shows the server message next to the field
 *
 * 🎤 INTERVIEW ANGLE  "How do you map server validation errors to form fields?"
 * ═══════════════════════════════════════════════════════════════════════════
 */
