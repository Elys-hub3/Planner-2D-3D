ALTER TABLE "floor_plans" ADD COLUMN "share_id" uuid DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "floor_plans" ADD CONSTRAINT "floor_plans_share_id_unique" UNIQUE("share_id");