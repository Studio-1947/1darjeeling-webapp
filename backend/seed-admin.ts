import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

async function seedAdmins() {
  const admins = [
    { email: 'admin1@1darjeeling.com', password: 'secureadminpassword1' },
    { email: 'admin2@1darjeeling.com', password: 'secureadminpassword2' }
  ];

  console.log('Seeding admins...');
  
  for (const admin of admins) {
    const [existing] = await db.select().from(users).where(eq(users.email, admin.email)).limit(1);
    if (!existing) {
      const passwordHash = await bcrypt.hash(admin.password, 10);
      await db.insert(users).values({
        email: admin.email,
        passwordHash,
        role: 'admin',
        firstName: 'System',
        lastName: 'Administrator'
      });
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Admin ${admin.email} already exists.`);
    }
  }
  
  console.log('Admin seeding complete!');
  process.exit(0);
}

seedAdmins().catch((err) => {
  console.error('Error seeding admins:', err);
  process.exit(1);
});
