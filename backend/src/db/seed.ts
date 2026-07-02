// backend/src/db/seed.ts
import { db } from './index';
import { users, homestays, drivers } from './schema';
import * as bcrypt from 'bcrypt';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Hash the universal mock password
    const plainTextPassword = 'password123';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(plainTextPassword, saltRounds);

    // 1. Seed Consumer User
    await db.insert(users).values({
      email: 'user@example.com',
      passwordHash,
      firstName: 'Rahul',
      lastName: 'Chettri',
    }).onConflictDoNothing();
    console.log('✅ User seeded');

    // 2. Seed Homestay Partner
    await db.insert(homestays).values({
      email: 'homestay@example.com',
      passwordHash,
      propertyName: 'Mirik Lake View Retreat',
      gstNumber: '19AAAAA0000A1Z5',
      essentialsConfig: { wifi: true, parking: true, breakfast: false },
    }).onConflictDoNothing();
    console.log('✅ Homestay seeded');

    // 3. Seed Driver Partner
    await db.insert(drivers).values({
      email: 'driver@example.com',
      passwordHash,
      licenseNumber: 'WB74-2026-9999',
      vehicleType: 'SUV - Innova',
      isAvailable: true,
    }).onConflictDoNothing();
    console.log('✅ Driver seeded');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
}

seed();
