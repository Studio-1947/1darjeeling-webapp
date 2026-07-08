import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://admin:rootpassword@localhost:5432/darjeeling_db?schema=public'
});

async function run() {
  await client.connect();
  await client.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;`);
  await client.query(`ALTER TABLE "users" ADD COLUMN "phone" varchar(20);`);
  await client.query(`ALTER TABLE "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");`);
  console.log('Migrated');
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
