# Portfolio CMS Ecosystem

This repository is being transformed from a working MERN portfolio into a maintainable Portfolio CMS ecosystem.

Milestone 1 establishes the monorepo foundation only. It does not introduce CMS features, auth, dashboard CRUD, uploads, analytics, or schema rewrites yet.

## Current Workspace

```txt
Portfolio-2/
├─ apps/
│  ├─ portfolio/       # Existing public React + Vite portfolio
│  └─ dashboard/       # Future private admin dashboard workspace
├─ server/             # Existing Express + MongoDB API
├─ packages/
│  ├─ shared/          # Future shared schemas, constants, and DTOs
│  ├─ api-client/      # Future shared HTTP client
│  └─ ui/              # Future shared low-level UI primitives
├─ docs/               # Architecture and implementation planning
├─ package.json        # Root workspace scripts
├─ pnpm-workspace.yaml # pnpm workspace package map
└─ turbo.json          # Task orchestration
```

The existing `portoflio/` directory is still present as a separate Next.js/Payload experiment. It is intentionally not part of the active pnpm workspace because the approved architecture is the custom MERN CMS path.

## Why Monorepo

The portfolio, dashboard, API server, shared contracts, and API client belong to one product ecosystem. A monorepo lets content models, validators, routes, and frontend integrations evolve together without copy-pasting types or duplicating HTTP clients across repositories.

This matters because the final goal is content management without code edits. The dashboard and portfolio must agree exactly on data shapes, publish states, upload metadata, and API response contracts.

## Why pnpm

pnpm gives the workspace fast installs, strict dependency isolation, and efficient disk usage. It also makes it easy to run commands against one package with `--filter`, which keeps each milestone small and testable.

## Why Turborepo

Turborepo coordinates scripts across the workspace. As the project grows, it will let us build, lint, test, and cache only the packages affected by a change. That keeps the portfolio, dashboard, server, and shared packages scalable without turning the repo into a slow pile of scripts.

## Commands

Install dependencies:

```bash
pnpm install
```

Run the public portfolio:

```bash
pnpm dev:portfolio
```

Run the Express server:

```bash
pnpm dev:server
```

Run portfolio and server together:

```bash
pnpm dev
```

Build workspace packages that currently expose a build script:

```bash
pnpm build
```

Lint workspace packages that currently expose a lint script:

```bash
pnpm lint
```

Format the repository:

```bash
pnpm format
```

Check formatting without writing changes:

```bash
pnpm format:check
```

Seed the existing database:

```bash
pnpm seed
```

## Milestone 1 Testing Checklist

- Confirm `apps/portfolio` exists and contains the previous Vite portfolio.
- Confirm `server` exists and contains the previous Express API.
- Confirm `apps/dashboard`, `packages/shared`, `packages/api-client`, and `packages/ui` exist as workspace packages.
- Run `pnpm install`.
- Run `pnpm lint`.
- Run `pnpm build`.
- Run `pnpm --filter @portfolio/server start` only when `MONGODB_URI` is available.
- Run `pnpm dev:portfolio` to verify the Vite app boots.
- Run `pnpm dev:server` to verify the API boots when database environment variables are configured.

## Next Milestone

Milestone 2 will introduce the production backend structure: `server/src/app.js`, `server/src/server.js`, centralized config, middleware, modules, and the first integration test safety net while preserving the current public API behavior.
