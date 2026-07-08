import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';

async function migrate() {
  await db.execute(sql`
    ALTER TABLE users RENAME COLUMN profile_config TO tourist_config;
    ALTER TABLE users ADD COLUMN provider_config jsonb;
  `);
  console.log("Migration complete");
  process.exit(0);
}

migrate().catch(err => { console.error(err); process.exit(1); });
