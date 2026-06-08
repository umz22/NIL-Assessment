Create a strong CLAUDE.md file for this project.

The project is a full-stack React Native assessment using:
- Turborepo
- Expo SDK 54 / React Native 0.81+
- Expo Router
- Next.js 16 App Router
- Hono
- Zod
- Drizzle ORM
- Neon Postgres using @neondatabase/serverless
- TanStack Query v5
- TypeScript strict mode

The CLAUDE.md should tell Claude how to work in this repo:
- prioritize small focused changes
- preserve strict TypeScript
- use Zod validation at API boundaries
- store money as integer cents, never floats
- keep schema normalized
- avoid unnecessary dependencies
- prefer readable code over clever abstractions
- maintain mobile UI fidelity to the mockup
- include loading, error, retry, and pull-to-refresh states
- ask before making major architectural deviations
- remind me to commit after each completed slice

Make it specific to this assessment and this stack.