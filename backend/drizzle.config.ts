// backend/drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://admin:rootpassword@localhost:5432/darjeeling_db',
  },
  verbose: true,
  strict: true,
});
