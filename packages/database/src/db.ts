import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema/index';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    [
      'DATABASE_URL is not set.',
      'Copy .env.example to .env and fill in your real Neon connection string.',
      '  cp .env.example .env',
    ].join('\n'),
  );
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
