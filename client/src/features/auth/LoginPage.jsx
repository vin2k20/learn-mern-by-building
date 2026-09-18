/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/features/auth/LoginPage.jsx · Phase 4 · Day 4 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   A polished, accessible login form using React 19 ACTIONS (useActionState + useFormStatus),
 *   with validation, loading and error states, and a redirect back to where the user came from.
 *
 * 🧠 CONCEPTS  → docs/concepts/react/react-19-features.md, docs/concepts/web/accessibility.md,
 *               docs/concepts/css/transitions-keyframes-animations.md (shake) · wireframes §9
 *
 * 🧩 DEPENDS ON  authSlice (login) · components/Button · LoginPage.module.css · react-router (useNavigate, useSearchParams)
 *
 * 📝 STEPS
 *   1. const [state, formAction, isPending] = useActionState(async (prev, formData) => {
 *        const email = formData.get('email')?.trim(); const password = formData.get('password');
 *        // client-side validation → return { fieldErrors: {…}, values: { email } } without calling the API
 *        const result = await dispatch(login({ email, password }));
 *        if (login.rejected.match(result)) return { formError: result.payload.message, values: { email } };
 *        navigate(searchParams.get('next') ?? '/projects', { replace: true }); return { ok: true };
 *      }, { values: { email: '' } })
 *   2. <form action={formAction} noValidate> with:
 *      - a labelled email input (type="email", autoComplete="username", required, defaultValue={state.values.email})
 *      - a password input (autoComplete="current-password") with a show/hide toggle button (aria-pressed, aria-controls)
 *      - field errors linked with aria-describedby + aria-invalid
 *      - a form-level error in a role="alert" element (and the card gets data-shake → the shake animation)
 *      - <SubmitButton /> that uses useFormStatus() to show a spinner and disable itself while pending
 *   3. Focus the email input on mount (autoFocus is fine on a dedicated login page. Why is it bad elsewhere?)
 *   4. The demo credentials hint (demo@kanvas.dev / kanvas123) and a "Fill demo" button ☆
 *   5. If already authenticated → <Navigate to="/projects" replace />
 *   6. <title>Sign in · Kanvas</title> (React 19 metadata)
 *
 * ✅ DONE WHEN
 *   [ ] Empty submit → inline errors, focus on the first invalid field, and no network call
 *   [ ] Wrong credentials → the shake + an announced error; the typed email is kept
 *   [ ] While submitting → the button is disabled with a spinner; Enter still submits
 *   [ ] Password managers autofill it correctly (the autocomplete attributes)
 *
 * ⚠️ GOTCHAS  Form actions reset uncontrolled inputs after the action completes. That's why the email is returned in `values`.
 *
 * 🎤 INTERVIEW ANGLE  "How do Actions change form handling in React 19?", "controlled vs uncontrolled forms?"
 * 🤖 ASK THE AGENT    /explain useActionState · /review client/src/features/auth/LoginPage.jsx
 * ═══════════════════════════════════════════════════════════════════════════
 */
