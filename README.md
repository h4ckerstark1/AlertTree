# AlertTree

**Never Miss. Never Forget. Stay Ahead.**

AlertTree is an AI-powered intelligence discovery, monitoring and workflow automation platform. This repository contains the **web frontend**. It is being built from scratch, phase by phase.

> **Status: Phase 0 (scaffold).** The toolchain and documentation exist. No product features are implemented and no backend is connected.

## Stack

- React + TypeScript + Vite
- Tailwind CSS (design tokens through CSS variables)
- Radix UI primitives, Lucide icons
- TanStack Query (server state), Zustand (UI preferences)
- Recharts (charts), React Router (routing)
- npm as the package manager

Later phases add the libraries as they are used. See `docs/ARCHITECTURE.md`.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Getting started

```bash
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

| Command                | What it does                                |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the development server                |
| `npm run build`        | Typecheck, then create the production build |
| `npm run preview`      | Serve the production build locally          |
| `npm run typecheck`    | Run the TypeScript compiler without output  |
| `npm run lint`         | Run ESLint                                  |
| `npm run format`       | Format all files with Prettier              |
| `npm run format:check` | Check formatting without changing files     |

## Backend integration

The frontend talks to the backend only through same-origin `/api` requests. In development, Vite proxies `/api` to `API_PROXY_TARGET` (default `http://localhost:8080`). Authentication uses httpOnly cookie sessions managed by the backend, so the frontend never handles tokens.

Until the backend exists, features use clearly labeled demo data. All backend requirements are tracked in `docs/API_REQUIREMENTS.md`.

## Documentation

- `docs/ARCHITECTURE.md`: structure, data flow, demo vs. live data
- `docs/THEMING.md`: design tokens and theme customization
- `docs/SECURITY.md`: security rules for frontend and backend
- `docs/API_REQUIREMENTS.md`: what the frontend needs from the backend

## Rules for contributors

- Never commit secrets. `VITE_*` variables are public.
- Never store tokens in `localStorage` or `sessionStorage`.
- Never show demo data without a visible "Demo data" label.
- Never show a feature as connected, active or successful without backend confirmation.
