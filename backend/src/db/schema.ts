// backend/src/db/schema.ts
import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique(), // Made nullable
  phone: varchar('phone', { length: 20 }).unique(),  // Added phone
  passwordHash: text('password_hash').notNull(),
  
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  
  // Roles matching the frontend onboardingSchema: 'tourist', 'driver', 'homestay', 'cafe', plus 'provider-pending'
  role: varchar('role', { length: 50 }).default('tourist').notNull(),
  
  // Separate JSON configs for dual-role users
  touristConfig: jsonb('tourist_config'),
  providerConfig: jsonb('provider_config'),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
