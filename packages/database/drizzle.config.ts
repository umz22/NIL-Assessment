import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// drizzle-kit runs from packages/database; load the root .env explicitly so all
// commands (push, migrate, studio) can reach the real DATABASE_URL.
config({ path: '../../.env' });

// DATABASE_URL is required for push / migrate / studio (commands that connect).
// db:generate only reads schema files — no connection needed — so we allow a
// placeholder here and rely on the runtime fail-fast guard in src/db.ts instead.
const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://placeholder';

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});
