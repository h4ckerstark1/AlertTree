# Architecture

## Principles

1. **Modular by feature.** Each module (agent, discover, monitors and so on) owns its pages, components, hooks and schemas.
2. **Data access in one place.** Pages never call `fetch` and never import demo fixtures. They use hooks that depend on a per-module data-source contract.
3. **Honest UI.** Nothing shows as connected, active, verified or executed unless the backend confirmed it.
4. **Tokens, not hardcoded colors.** All visuals come from semantic design tokens (see `THEMING.md`).
5. **Security by default.** See `SECURITY.md`.

## Folder structure (target)

```
src/
  app/          App, router, providers, route guards
  design/       tokens, theme presets, theme store, contrast checks
  components/
    ui/         reusable primitives (Button, Dialog, Tabs, ...)
    layout/     AppShell, Sidebar, Topbar, MobileDrawer
    command/    command launcher and global search
    charts/     themed chart wrappers
  features/     one folder per module
  services/
    api/        typed HTTP client
    contracts/  data-source interfaces per module
    live/       real implementations (call /api)
    demo/       labeled demo implementations and fixtures
  lib/          env, safe storage, formatting, helpers
  hooks/        shared hooks
  styles/       global CSS
```

Folders are created in the phase that first needs them.

## Data flow

```
Page -> feature hook (TanStack Query) -> data-source contract
                                          |-- live implementation -> /api (Go BFF)
                                          `-- demo implementation -> labeled fixtures
```

A capabilities provider reports per module whether data is `live`, `demo` or `unavailable`. Demo screens show a persistent "Demo data" badge.

## Backend topology (planned)

- **Go:** main API, BFF session handling and authorization layer
- **Python:** AI orchestration service (reached through the Go API, never directly from the browser)
- **PostgreSQL:** primary database
- **Redis:** queue and cache

The browser only ever talks to same-origin `/api`.

## Phases

| Phase | Scope                                                                                                     |
| ----- | --------------------------------------------------------------------------------------------------------- |
| 0     | Scaffold and documentation (this batch)                                                                   |
| 1     | Design system, themes, shared UI components                                                               |
| 2     | Application shell, router, command launcher                                                               |
| 3     | Modules: overview, notifications, settings, discover, cyber, monitors, agent, automation, analytics, team |
| 4     | Services layer and API requirements finalized                                                             |
| 5     | Quality assurance and accessibility checks                                                                |
