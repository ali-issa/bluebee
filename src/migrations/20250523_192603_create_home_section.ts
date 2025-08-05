import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'homeHero' BEFORE 'highImpact';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'homeHero' BEFORE 'highImpact';
  CREATE TABLE IF NOT EXISTS "pages_hero_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_hero_vertical_slider_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_home_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first_section_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_vertical_slider_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_home_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_section_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_video_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_video_poster_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_video_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_video_poster_id" integer;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_marquee_items" ADD CONSTRAINT "pages_hero_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_hero_vertical_slider_lines" ADD CONSTRAINT "pages_hero_vertical_slider_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_home_page" ADD CONSTRAINT "pages_blocks_home_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_marquee_items" ADD CONSTRAINT "_pages_v_version_hero_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_vertical_slider_lines" ADD CONSTRAINT "_pages_v_version_hero_vertical_slider_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_home_page" ADD CONSTRAINT "_pages_v_blocks_home_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_marquee_items_order_idx" ON "pages_hero_marquee_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_marquee_items_parent_id_idx" ON "pages_hero_marquee_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_vertical_slider_lines_order_idx" ON "pages_hero_vertical_slider_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_vertical_slider_lines_parent_id_idx" ON "pages_hero_vertical_slider_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_home_page_order_idx" ON "pages_blocks_home_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_home_page_parent_id_idx" ON "pages_blocks_home_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_home_page_path_idx" ON "pages_blocks_home_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_marquee_items_order_idx" ON "_pages_v_version_hero_marquee_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_marquee_items_parent_id_idx" ON "_pages_v_version_hero_marquee_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_vertical_slider_lines_order_idx" ON "_pages_v_version_hero_vertical_slider_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_vertical_slider_lines_parent_id_idx" ON "_pages_v_version_hero_vertical_slider_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_home_page_order_idx" ON "_pages_v_blocks_home_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_home_page_parent_id_idx" ON "_pages_v_blocks_home_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_home_page_path_idx" ON "_pages_v_blocks_home_page" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_video_id_media_id_fk" FOREIGN KEY ("hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_video_poster_id_media_id_fk" FOREIGN KEY ("hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_video_id_media_id_fk" FOREIGN KEY ("version_hero_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_video_poster_id_media_id_fk" FOREIGN KEY ("version_hero_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_video_idx" ON "pages" USING btree ("hero_video_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_video_poster_idx" ON "pages" USING btree ("hero_video_poster_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_video_idx" ON "_pages_v" USING btree ("version_hero_video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_video_poster_idx" ON "_pages_v" USING btree ("version_hero_video_poster_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_hero_vertical_slider_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_vertical_slider_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_marquee_items" CASCADE;
  DROP TABLE "pages_hero_vertical_slider_lines" CASCADE;
  DROP TABLE "pages_blocks_home_page" CASCADE;
  DROP TABLE "_pages_v_version_hero_marquee_items" CASCADE;
  DROP TABLE "_pages_v_version_hero_vertical_slider_lines" CASCADE;
  DROP TABLE "_pages_v_blocks_home_page" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_video_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_video_poster_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_video_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_video_poster_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_hero_video_idx";
  DROP INDEX IF EXISTS "pages_hero_hero_video_poster_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_video_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_video_poster_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_video_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_video_poster_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_video_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_video_poster_id";
  ALTER TABLE "forms_blocks_select" DROP COLUMN IF EXISTS "placeholder";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";`)
}
