# NIL Assessment

A full-stack NIL (Name, Image, Likeness) application: a React Native mobile client backed by a Hono API, sharing a typed Drizzle/Neon Postgres database — all in a single Turborepo monorepo.

## Tech Stack

| Layer       | Technology                                              |
| ----------- | ------------------------------------------------------- |
| Monorepo    | Turborepo + pnpm workspaces                             |
| Mobile      | Expo SDK 54 / React Native 0.81 / Expo Router           |
| API         | Next.js 16 (App Router) + Hono                           |
| Data        | Drizzle ORM + Neon Postgres (`@neondatabase/serverless`) |
| Validation  | Zod                                                     |
| Data layer  | TanStack Query v5                                       |
| Language    | TypeScript (strict mode)                                |

## Repository Structure

```
NIL_Assessment/
├── apps/
│   ├── mobile/          # Expo / React Native app (Expo Router)
│   └── api/             # Next.js 16 + Hono API
├── packages/
│   └── database/        # Drizzle schema, Neon client, migrations  ← implemented
├── .env.example         # Committed template — copy to .env
├── turbo.json           # Turborepo task pipeline
└── pnpm-workspace.yaml  # Workspace package globs
```

> Status: the **database package** is fully implemented (schema, client, migrations, validated against Neon). The `mobile` and `api` apps are scaffolded and not yet built out.

## Prerequisites

- Node.js >= 20
- pnpm >= 9 (`packageManager` is pinned to `pnpm@9.15.0`)
- A [Neon](https://console.neon.tech) Postgres database

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the committed template and fill in real values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

- **`DATABASE_URL`** — your Neon connection string. Get it from the
  [Neon Console](https://console.neon.tech) → your project → **Connect** →
  copy the connection string (use the direct, non-pooled string for migrations).
- **`EXPO_PUBLIC_API_URL`** — base URL the mobile app calls.

> ⚠️ `.env` holds real secrets and is git-ignored — never commit it.
> Only `.env.example` (placeholders only) is committed. If `DATABASE_URL`
> is missing at runtime, the app fails fast with a clear setup error.

### 3. Push the database schema

From the repo root:

```bash
pnpm db:generate                       # generate SQL migrations from the schema
pnpm --filter @nil/database db:push    # apply the schema to your Neon database
```

See [`packages/database/README.md`](packages/database/README.md) for full details
on the schema, tables, and all available database scripts.

## Root Scripts

Run from the repo root; each fans out across the workspace via Turborepo.

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm typecheck`   | Type-check every package (`tsc --noEmit`)    |
| `pnpm type-check`  | Alias of `typecheck`                         |
| `pnpm db:generate` | Generate Drizzle migrations from the schema  |
| `pnpm build`       | Build all apps/packages                      |
| `pnpm dev`         | Run all apps in dev mode                     |
| `pnpm lint`        | Lint all packages                            |
