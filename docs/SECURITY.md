# Security

These rules apply to the frontend and define what the backend must provide. Backend security decisions are owned by the backend team and need explicit approval to change.

## Authentication: httpOnly cookie BFF session

- The backend issues the session in an **HttpOnly, Secure** cookie with an appropriate **SameSite** policy.
- The frontend **never** stores access or refresh tokens in `localStorage` or `sessionStorage`, and never reads them.
- The browser sends same-origin requests to `/api`. The Go API acts as the BFF.
- State-changing requests carry a **CSRF token**. The exact mechanism and header name are defined by the backend; the frontend client will follow it.

## Backend requirements (must be enforced server-side)

1. **Exact Origin validation** for unsafe methods (POST, PUT, PATCH, DELETE).
2. **Referer fallback** when Origin is absent.
3. **Reject** unsafe browser requests when both Origin and Referer are absent.
4. `Sec-Fetch-Site` is defense in depth only, never a replacement for the checks above.
5. **Authorization and tenant isolation** are enforced by the backend on every request. Hiding a button in the UI is never a permission check.
6. Rate limiting and audit logging for sensitive actions.
7. Monitored URLs are fetched by the backend only, with SSRF protections.

## Frontend rules

- No secrets in source code or environment variables. `VITE_*` values are public.
- `VITE_API_BASE_URL` must be a same-origin path. The app refuses to start otherwise.
- No `dangerouslySetInnerHTML` (blocked by ESLint). External text is rendered as text.
- Only `http` and `https` URLs are rendered as links, with `rel="noopener noreferrer"`.
- Browser storage is blocked by ESLint: `localStorage` and `sessionStorage`, whether accessed directly, as `window.`, `globalThis.` or `self.` properties (dot or bracket), or by destructuring. The single documented exception is `src/lib/safe-storage.ts` (added in Phase 1), which may use `localStorage` for non-sensitive UI preferences only. `sessionStorage` stays blocked everywhere. These rules catch mistakes; they are not a security boundary, so code review still applies to any new storage use.
- Validate forms and API responses with schemas (added with the first feature).
- Destructive actions require a confirmation dialog.
- AI agent actions that are sensitive require explicit user confirmation, and are shown as proposed until the backend reports completion.
- Automations use predefined triggers, conditions and actions only. No arbitrary code execution.
- Dependencies are locked with `package-lock.json`. CI runs `npm audit`.

## Deployment checklist (to complete before launch)

- [ ] Content Security Policy and other security headers on the reverse proxy
- [ ] HTTPS everywhere, HSTS enabled
- [ ] Cookie attributes verified in production
- [ ] CSRF and Origin/Referer checks tested against the real backend
- [ ] Dependency audit reviewed
