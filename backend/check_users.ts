import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { sql } from 'drizzle-orm';

async function run() {
  const allUsers = await db.execute(sql`SELECT * FROM users`);
  console.log(JSON.stringify(allUsers.rows, null, 2));
  process.exit(0);
}

run().catch(console.error);
