// backend/src/db/schema.ts
import { pgTable, uuid, varchar, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

// 1. Consumers / General Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Homestay Partners (ERP)
export const homestays = pgTable('homestays', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  propertyName: varchar('property_name', { length: 255 }).notNull(),
  gstNumber: varchar('gst_number', { length: 50 }),
  essentialsConfig: jsonb('essentials_config'), // Stores custom ERP setups flexibly
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Driver Partners (Logistics)
export const drivers = pgTable('drivers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  licenseNumber: varchar('license_number', { length: 100 }).notNull().unique(),
  vehicleType: varchar('vehicle_type', { length: 50 }).notNull(),
  isAvailable: boolean('is_available').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
