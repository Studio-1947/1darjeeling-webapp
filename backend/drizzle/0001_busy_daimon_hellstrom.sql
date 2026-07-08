DROP TABLE "drivers" CASCADE;--> statement-breakpoint
DROP TABLE "homestays" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(50) DEFAULT 'tourist' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_config" jsonb;