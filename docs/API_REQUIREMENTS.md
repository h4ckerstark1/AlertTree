# API Requirements

This lists what the frontend needs from the backend. **No endpoint paths, payloads or response formats are defined yet.** They will be agreed with the backend team and recorded here. Nothing below is implemented unless its status says so.

All requests are same-origin under `/api`, authenticated by the httpOnly session cookie, and subject to the rules in `SECURITY.md`.

## Status legend

- **Undefined:** contract not yet agreed
- **Agreed:** contract documented here, not yet implemented
- **Implemented:** backend available and verified

## Capabilities

| Area                | Frontend needs                                                                                                                     | Permission notes                         | Status    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| Session             | Sign in, sign out, current user, session expiry signal, CSRF token delivery                                                        | Public to authenticated user             | Undefined |
| Capabilities        | Per-module status: live, demo or unavailable; channel connection status                                                            | Any authenticated user                   | Undefined |
| Preferences         | Read and save appearance and notification preferences                                                                              | Own account                              | Undefined |
| AI Agent            | Conversations, streamed responses, proposed actions with status, confirmation                                                      | Sensitive actions need explicit approval | Undefined |
| Discovery           | Search, filters, saved items, follow category, alerts; source URL, deadline, eligibility and verification fields only when sourced | Workspace scoped                         | Undefined |
| Cyber intelligence  | Advisories, CVEs, filters, subscriptions                                                                                           | Workspace scoped                         | Undefined |
| Website monitors    | Create, edit, pause, resume, delete, check history, change diffs, error history                                                    | Role based                               | Undefined |
| Automations         | Create, edit, enable, disable, run history, errors                                                                                 | Role based; no arbitrary code            | Undefined |
| Notifications       | List, read state, categories, priority, preferences, channel status                                                                | Own and workspace                        | Undefined |
| Integrations        | Telegram, email, browser push connection state                                                                                     | Connected only when confirmed            | Undefined |
| Team                | Workspaces, members, roles, invitations, audit activity                                                                            | Owner, Admin, Member, Viewer             | Undefined |
| Analytics           | Aggregates for discoveries, notifications, automations, monitors, agent usage                                                      | Workspace scoped                         | Undefined |
| Account and privacy | Data export, account deletion request, sessions and device history                                                                 | Own account                              | Undefined |

## Rules for adding an endpoint here

1. Describe the contract with the backend owner first.
2. Record method, path, request, response, errors and required permission.
3. Mark it Agreed, then Implemented only after it is verified against the real backend.
