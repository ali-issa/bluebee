import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_purpose_section_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_purpose_section_cta_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_brand_statement_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_brand_statement_cta_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_services_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_purpose_section_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_purpose_section_cta_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_statement_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_statement_cta_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_services_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_social_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_services_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_contact_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_footer_privacy_policy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_privacy_policy_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_sticky_words_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key_words_word1" varchar DEFAULT 'beelieve',
  	"key_words_word2" varchar DEFAULT 'create',
  	"key_words_word3" varchar DEFAULT 'inspire',
  	"description" varchar DEFAULT 'bluebee is a creative agency with a dynamic blend of passion, creativity, and devotion. We help brands beelieve in the extraordinary impact they can achieve and create powerful experiences that inspire a meaningful connection with their audiences.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_purpose_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"delay" numeric DEFAULT 0
  );
  
  CREATE TABLE "pages_blocks_purpose_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_text" varchar DEFAULT 'Everything we do is rooted in purpose, just like the bees that inspire us. Each move, every detail, there''s intention behind it.',
  	"description" varchar DEFAULT 'Keep scrolling to discover how the spirit of the hive shapes who we are, what we do, and how we deliver.',
  	"brand_headings_heading1" varchar DEFAULT 'Inspired by Bees.',
  	"brand_headings_heading2" varchar DEFAULT 'Built for Impact.',
  	"cta_button_link_type" "enum_pages_blocks_purpose_section_cta_button_link_type" DEFAULT 'reference',
  	"cta_button_link_new_tab" boolean,
  	"cta_button_link_url" varchar,
  	"cta_button_link_label" varchar,
  	"cta_button_link_appearance" "enum_pages_blocks_purpose_section_cta_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sticky_tabs_section_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_sticky_tabs_section_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"padding" numeric DEFAULT 5
  );
  
  CREATE TABLE "pages_blocks_sticky_tabs_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"final_heading" varchar DEFAULT 'Our Beekeepers.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"statement" varchar,
  	"cta_button_link_type" "enum_pages_blocks_brand_statement_cta_button_link_type" DEFAULT 'reference',
  	"cta_button_link_new_tab" boolean,
  	"cta_button_link_url" varchar,
  	"cta_button_link_label" varchar,
  	"cta_button_link_appearance" "enum_pages_blocks_brand_statement_cta_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_clients_grid_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"padding" numeric DEFAULT 5
  );
  
  CREATE TABLE "pages_blocks_clients_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Crafted by Passion. Driven by Purpose.',
  	"heading" varchar DEFAULT 'Powered by Creativity',
  	"description" varchar DEFAULT 'Every service we offer is a reflection of our hive''s spirit, buzzing with energy, shaped by imagination, and built with care.',
  	"subtitle" varchar DEFAULT 'Explore how BlueBee transforms ideas into experiences that inspire, connect, and leave a lasting impression.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_panels_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"offering" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_panels_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"position" varchar,
  	"avatar" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" varchar,
  	"cta" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_link_type" "enum_pages_blocks_services_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bee_in_touch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_image_src" varchar DEFAULT '/images/bluebee_phone.png',
  	"hero_image_alt" varchar DEFAULT 'A hand holding a rotary phone speaker',
  	"form_id" integer,
  	"enable_intro" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_our_offices_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"directions_url" varchar,
  	"directions_label" varchar DEFAULT 'Get Directions'
  );
  
  CREATE TABLE "pages_blocks_our_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Offices',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Careers',
  	"description" varchar DEFAULT 'Curiosity fuels our creativity, and fresh perspectives keep us buzzing. If you are passionate and ready to grow with us, get in touch!',
  	"email" varchar DEFAULT 'jobs@bluebeecreation.com',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_words_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"key_words_word1" varchar DEFAULT 'beelieve',
  	"key_words_word2" varchar DEFAULT 'create',
  	"key_words_word3" varchar DEFAULT 'inspire',
  	"description" varchar DEFAULT 'bluebee is a creative agency with a dynamic blend of passion, creativity, and devotion. We help brands beelieve in the extraordinary impact they can achieve and create powerful experiences that inspire a meaningful connection with their audiences.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_purpose_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"delay" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_purpose_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_text" varchar DEFAULT 'Everything we do is rooted in purpose, just like the bees that inspire us. Each move, every detail, there''s intention behind it.',
  	"description" varchar DEFAULT 'Keep scrolling to discover how the spirit of the hive shapes who we are, what we do, and how we deliver.',
  	"brand_headings_heading1" varchar DEFAULT 'Inspired by Bees.',
  	"brand_headings_heading2" varchar DEFAULT 'Built for Impact.',
  	"cta_button_link_type" "enum__pages_v_blocks_purpose_section_cta_button_link_type" DEFAULT 'reference',
  	"cta_button_link_new_tab" boolean,
  	"cta_button_link_url" varchar,
  	"cta_button_link_label" varchar,
  	"cta_button_link_appearance" "enum__pages_v_blocks_purpose_section_cta_button_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_tabs_section_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_tabs_section_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"padding" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sticky_tabs_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"final_heading" varchar DEFAULT 'Our Beekeepers.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement" varchar,
  	"cta_button_link_type" "enum__pages_v_blocks_brand_statement_cta_button_link_type" DEFAULT 'reference',
  	"cta_button_link_new_tab" boolean,
  	"cta_button_link_url" varchar,
  	"cta_button_link_label" varchar,
  	"cta_button_link_appearance" "enum__pages_v_blocks_brand_statement_cta_button_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clients_grid_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"padding" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_clients_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'Crafted by Passion. Driven by Purpose.',
  	"heading" varchar DEFAULT 'Powered by Creativity',
  	"description" varchar DEFAULT 'Every service we offer is a reflection of our hive''s spirit, buzzing with energy, shaped by imagination, and built with care.',
  	"subtitle" varchar DEFAULT 'Explore how BlueBee transforms ideas into experiences that inspire, connect, and leave a lasting impression.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_panels_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"offering" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_panels_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"position" varchar,
  	"avatar" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"sub_title" varchar,
  	"description" varchar,
  	"cta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_link_type" "enum__pages_v_blocks_services_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bee_in_touch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_src" varchar DEFAULT '/images/bluebee_phone.png',
  	"hero_image_alt" varchar DEFAULT 'A hand holding a rotary phone speaker',
  	"form_id" integer,
  	"enable_intro" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_offices_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"directions_url" varchar,
  	"directions_label" varchar DEFAULT 'Get Directions',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_our_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our Offices',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_careers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Careers',
  	"description" varchar DEFAULT 'Curiosity fuels our creativity, and fresh perspectives keep us buzzing. If you are passionate and ready to grow with us, get in touch!',
  	"email" varchar DEFAULT 'jobs@bluebeecreation.com',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "header_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_social_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_contact_info_phone_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_social_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_home_page" CASCADE;
  DROP TABLE "_pages_v_blocks_home_page" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "header" ADD COLUMN "contact_info_email" varchar DEFAULT 'info@bluebeecreation.com' NOT NULL;
  ALTER TABLE "header" ADD COLUMN "contact_info_phone" varchar DEFAULT '+971 56 394 1288' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "services_link_type" "enum_footer_services_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "services_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "services_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "services_link_label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "services_link_appearance" "enum_footer_services_link_appearance" DEFAULT 'default';
  ALTER TABLE "footer" ADD COLUMN "contact_link_type" "enum_footer_contact_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "contact_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "contact_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_link_label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "contact_link_appearance" "enum_footer_contact_link_appearance" DEFAULT 'default';
  ALTER TABLE "footer" ADD COLUMN "contact_info_email" varchar DEFAULT 'info@bluebeecreation.com' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "company_name" varchar DEFAULT 'bluebee Creation' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "privacy_policy_link_type" "enum_footer_privacy_policy_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "privacy_policy_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "privacy_policy_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "privacy_policy_link_label" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "privacy_policy_link_appearance" "enum_footer_privacy_policy_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_sticky_words_section" ADD CONSTRAINT "pages_blocks_sticky_words_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_purpose_section_images" ADD CONSTRAINT "pages_blocks_purpose_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_purpose_section_images" ADD CONSTRAINT "pages_blocks_purpose_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_purpose_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_purpose_section" ADD CONSTRAINT "pages_blocks_purpose_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_tabs_section_panels" ADD CONSTRAINT "pages_blocks_sticky_tabs_section_panels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_tabs_section_panels" ADD CONSTRAINT "pages_blocks_sticky_tabs_section_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_tabs_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_tabs_section_clients" ADD CONSTRAINT "pages_blocks_sticky_tabs_section_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_tabs_section_clients" ADD CONSTRAINT "pages_blocks_sticky_tabs_section_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sticky_tabs_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sticky_tabs_section" ADD CONSTRAINT "pages_blocks_sticky_tabs_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_statement" ADD CONSTRAINT "pages_blocks_brand_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clients_grid_clients" ADD CONSTRAINT "pages_blocks_clients_grid_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_clients_grid_clients" ADD CONSTRAINT "pages_blocks_clients_grid_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_clients_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_clients_grid" ADD CONSTRAINT "pages_blocks_clients_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_hero" ADD CONSTRAINT "pages_blocks_services_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_panels_offerings" ADD CONSTRAINT "pages_blocks_services_services_panels_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_panels_testimonials" ADD CONSTRAINT "pages_blocks_services_services_panels_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_panels" ADD CONSTRAINT "pages_blocks_services_services_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bee_in_touch" ADD CONSTRAINT "pages_blocks_bee_in_touch_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_bee_in_touch" ADD CONSTRAINT "pages_blocks_bee_in_touch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_offices_offices" ADD CONSTRAINT "pages_blocks_our_offices_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_our_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_our_offices" ADD CONSTRAINT "pages_blocks_our_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_careers" ADD CONSTRAINT "pages_blocks_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_words_section" ADD CONSTRAINT "_pages_v_blocks_sticky_words_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_purpose_section_images" ADD CONSTRAINT "_pages_v_blocks_purpose_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_purpose_section_images" ADD CONSTRAINT "_pages_v_blocks_purpose_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_purpose_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_purpose_section" ADD CONSTRAINT "_pages_v_blocks_purpose_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_panels" ADD CONSTRAINT "_pages_v_blocks_sticky_tabs_section_panels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_panels" ADD CONSTRAINT "_pages_v_blocks_sticky_tabs_section_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sticky_tabs_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_clients" ADD CONSTRAINT "_pages_v_blocks_sticky_tabs_section_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_clients" ADD CONSTRAINT "_pages_v_blocks_sticky_tabs_section_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sticky_tabs_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section" ADD CONSTRAINT "_pages_v_blocks_sticky_tabs_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_statement" ADD CONSTRAINT "_pages_v_blocks_brand_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clients_grid_clients" ADD CONSTRAINT "_pages_v_blocks_clients_grid_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clients_grid_clients" ADD CONSTRAINT "_pages_v_blocks_clients_grid_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_clients_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_clients_grid" ADD CONSTRAINT "_pages_v_blocks_clients_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_hero" ADD CONSTRAINT "_pages_v_blocks_services_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services_panels_offerings" ADD CONSTRAINT "_pages_v_blocks_services_services_panels_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services_panels_testimonials" ADD CONSTRAINT "_pages_v_blocks_services_services_panels_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_services_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services_panels" ADD CONSTRAINT "_pages_v_blocks_services_services_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bee_in_touch" ADD CONSTRAINT "_pages_v_blocks_bee_in_touch_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bee_in_touch" ADD CONSTRAINT "_pages_v_blocks_bee_in_touch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_offices_offices" ADD CONSTRAINT "_pages_v_blocks_our_offices_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_our_offices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_our_offices" ADD CONSTRAINT "_pages_v_blocks_our_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_careers" ADD CONSTRAINT "_pages_v_blocks_careers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_social_links" ADD CONSTRAINT "header_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_contact_info_phone_numbers" ADD CONSTRAINT "footer_contact_info_phone_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_sticky_words_section_order_idx" ON "pages_blocks_sticky_words_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_words_section_parent_id_idx" ON "pages_blocks_sticky_words_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_words_section_path_idx" ON "pages_blocks_sticky_words_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_purpose_section_images_order_idx" ON "pages_blocks_purpose_section_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_purpose_section_images_parent_id_idx" ON "pages_blocks_purpose_section_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_purpose_section_images_image_idx" ON "pages_blocks_purpose_section_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_purpose_section_order_idx" ON "pages_blocks_purpose_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_purpose_section_parent_id_idx" ON "pages_blocks_purpose_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_purpose_section_path_idx" ON "pages_blocks_purpose_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_sticky_tabs_section_panels_order_idx" ON "pages_blocks_sticky_tabs_section_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_tabs_section_panels_parent_id_idx" ON "pages_blocks_sticky_tabs_section_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_tabs_section_panels_media_idx" ON "pages_blocks_sticky_tabs_section_panels" USING btree ("media_id");
  CREATE INDEX "pages_blocks_sticky_tabs_section_clients_order_idx" ON "pages_blocks_sticky_tabs_section_clients" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_tabs_section_clients_parent_id_idx" ON "pages_blocks_sticky_tabs_section_clients" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_tabs_section_clients_logo_idx" ON "pages_blocks_sticky_tabs_section_clients" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_sticky_tabs_section_order_idx" ON "pages_blocks_sticky_tabs_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_sticky_tabs_section_parent_id_idx" ON "pages_blocks_sticky_tabs_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sticky_tabs_section_path_idx" ON "pages_blocks_sticky_tabs_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_statement_order_idx" ON "pages_blocks_brand_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_statement_parent_id_idx" ON "pages_blocks_brand_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_statement_path_idx" ON "pages_blocks_brand_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_clients_grid_clients_order_idx" ON "pages_blocks_clients_grid_clients" USING btree ("_order");
  CREATE INDEX "pages_blocks_clients_grid_clients_parent_id_idx" ON "pages_blocks_clients_grid_clients" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clients_grid_clients_logo_idx" ON "pages_blocks_clients_grid_clients" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_clients_grid_order_idx" ON "pages_blocks_clients_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_clients_grid_parent_id_idx" ON "pages_blocks_clients_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_clients_grid_path_idx" ON "pages_blocks_clients_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_hero_order_idx" ON "pages_blocks_services_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_hero_parent_id_idx" ON "pages_blocks_services_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_hero_path_idx" ON "pages_blocks_services_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_services_panels_offerings_order_idx" ON "pages_blocks_services_services_panels_offerings" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_panels_offerings_parent_id_idx" ON "pages_blocks_services_services_panels_offerings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_panels_testimonials_order_idx" ON "pages_blocks_services_services_panels_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_panels_testimonials_parent_id_idx" ON "pages_blocks_services_services_panels_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_panels_order_idx" ON "pages_blocks_services_services_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_panels_parent_id_idx" ON "pages_blocks_services_services_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_bee_in_touch_order_idx" ON "pages_blocks_bee_in_touch" USING btree ("_order");
  CREATE INDEX "pages_blocks_bee_in_touch_parent_id_idx" ON "pages_blocks_bee_in_touch" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bee_in_touch_path_idx" ON "pages_blocks_bee_in_touch" USING btree ("_path");
  CREATE INDEX "pages_blocks_bee_in_touch_form_idx" ON "pages_blocks_bee_in_touch" USING btree ("form_id");
  CREATE INDEX "pages_blocks_our_offices_offices_order_idx" ON "pages_blocks_our_offices_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_offices_offices_parent_id_idx" ON "pages_blocks_our_offices_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_offices_order_idx" ON "pages_blocks_our_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_our_offices_parent_id_idx" ON "pages_blocks_our_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_our_offices_path_idx" ON "pages_blocks_our_offices" USING btree ("_path");
  CREATE INDEX "pages_blocks_careers_order_idx" ON "pages_blocks_careers" USING btree ("_order");
  CREATE INDEX "pages_blocks_careers_parent_id_idx" ON "pages_blocks_careers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_careers_path_idx" ON "pages_blocks_careers" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sticky_words_section_order_idx" ON "_pages_v_blocks_sticky_words_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_words_section_parent_id_idx" ON "_pages_v_blocks_sticky_words_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_words_section_path_idx" ON "_pages_v_blocks_sticky_words_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_purpose_section_images_order_idx" ON "_pages_v_blocks_purpose_section_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_purpose_section_images_parent_id_idx" ON "_pages_v_blocks_purpose_section_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_purpose_section_images_image_idx" ON "_pages_v_blocks_purpose_section_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_purpose_section_order_idx" ON "_pages_v_blocks_purpose_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_purpose_section_parent_id_idx" ON "_pages_v_blocks_purpose_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_purpose_section_path_idx" ON "_pages_v_blocks_purpose_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_panels_order_idx" ON "_pages_v_blocks_sticky_tabs_section_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_panels_parent_id_idx" ON "_pages_v_blocks_sticky_tabs_section_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_panels_media_idx" ON "_pages_v_blocks_sticky_tabs_section_panels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_clients_order_idx" ON "_pages_v_blocks_sticky_tabs_section_clients" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_clients_parent_id_idx" ON "_pages_v_blocks_sticky_tabs_section_clients" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_clients_logo_idx" ON "_pages_v_blocks_sticky_tabs_section_clients" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_order_idx" ON "_pages_v_blocks_sticky_tabs_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_parent_id_idx" ON "_pages_v_blocks_sticky_tabs_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sticky_tabs_section_path_idx" ON "_pages_v_blocks_sticky_tabs_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_statement_order_idx" ON "_pages_v_blocks_brand_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_statement_parent_id_idx" ON "_pages_v_blocks_brand_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_statement_path_idx" ON "_pages_v_blocks_brand_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_clients_grid_clients_order_idx" ON "_pages_v_blocks_clients_grid_clients" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clients_grid_clients_parent_id_idx" ON "_pages_v_blocks_clients_grid_clients" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clients_grid_clients_logo_idx" ON "_pages_v_blocks_clients_grid_clients" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_clients_grid_order_idx" ON "_pages_v_blocks_clients_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_clients_grid_parent_id_idx" ON "_pages_v_blocks_clients_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_clients_grid_path_idx" ON "_pages_v_blocks_clients_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_hero_order_idx" ON "_pages_v_blocks_services_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_hero_parent_id_idx" ON "_pages_v_blocks_services_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_hero_path_idx" ON "_pages_v_blocks_services_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_services_panels_offerings_order_idx" ON "_pages_v_blocks_services_services_panels_offerings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_panels_offerings_parent_id_idx" ON "_pages_v_blocks_services_services_panels_offerings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_panels_testimonials_order_idx" ON "_pages_v_blocks_services_services_panels_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_panels_testimonials_parent_id_idx" ON "_pages_v_blocks_services_services_panels_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_panels_order_idx" ON "_pages_v_blocks_services_services_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_panels_parent_id_idx" ON "_pages_v_blocks_services_services_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bee_in_touch_order_idx" ON "_pages_v_blocks_bee_in_touch" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bee_in_touch_parent_id_idx" ON "_pages_v_blocks_bee_in_touch" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bee_in_touch_path_idx" ON "_pages_v_blocks_bee_in_touch" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bee_in_touch_form_idx" ON "_pages_v_blocks_bee_in_touch" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_our_offices_offices_order_idx" ON "_pages_v_blocks_our_offices_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_offices_offices_parent_id_idx" ON "_pages_v_blocks_our_offices_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_offices_order_idx" ON "_pages_v_blocks_our_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_our_offices_parent_id_idx" ON "_pages_v_blocks_our_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_our_offices_path_idx" ON "_pages_v_blocks_our_offices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_careers_order_idx" ON "_pages_v_blocks_careers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_careers_parent_id_idx" ON "_pages_v_blocks_careers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_careers_path_idx" ON "_pages_v_blocks_careers" USING btree ("_path");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "header_social_links_order_idx" ON "header_social_links" USING btree ("_order");
  CREATE INDEX "header_social_links_parent_id_idx" ON "header_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_contact_info_phone_numbers_order_idx" ON "footer_contact_info_phone_numbers" USING btree ("_order");
  CREATE INDEX "footer_contact_info_phone_numbers_parent_id_idx" ON "footer_contact_info_phone_numbers" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_home_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first_section_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_section_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_sticky_words_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_purpose_section_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_purpose_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_sticky_tabs_section_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_sticky_tabs_section_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_sticky_tabs_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clients_grid_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_clients_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_panels_offerings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_panels_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_bee_in_touch" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_our_offices_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_our_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sticky_words_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_purpose_section_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_purpose_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sticky_tabs_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clients_grid_clients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_clients_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_services_panels_offerings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_services_panels_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_services_panels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bee_in_touch" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_offices_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_our_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_careers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_contact_info_phone_numbers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_sticky_words_section" CASCADE;
  DROP TABLE "pages_blocks_purpose_section_images" CASCADE;
  DROP TABLE "pages_blocks_purpose_section" CASCADE;
  DROP TABLE "pages_blocks_sticky_tabs_section_panels" CASCADE;
  DROP TABLE "pages_blocks_sticky_tabs_section_clients" CASCADE;
  DROP TABLE "pages_blocks_sticky_tabs_section" CASCADE;
  DROP TABLE "pages_blocks_brand_statement" CASCADE;
  DROP TABLE "pages_blocks_clients_grid_clients" CASCADE;
  DROP TABLE "pages_blocks_clients_grid" CASCADE;
  DROP TABLE "pages_blocks_services_hero" CASCADE;
  DROP TABLE "pages_blocks_services_services_panels_offerings" CASCADE;
  DROP TABLE "pages_blocks_services_services_panels_testimonials" CASCADE;
  DROP TABLE "pages_blocks_services_services_panels" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_bee_in_touch" CASCADE;
  DROP TABLE "pages_blocks_our_offices_offices" CASCADE;
  DROP TABLE "pages_blocks_our_offices" CASCADE;
  DROP TABLE "pages_blocks_careers" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_words_section" CASCADE;
  DROP TABLE "_pages_v_blocks_purpose_section_images" CASCADE;
  DROP TABLE "_pages_v_blocks_purpose_section" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_tabs_section_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_tabs_section_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_sticky_tabs_section" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_grid_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_clients_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_services_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_panels_offerings" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_panels_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_bee_in_touch" CASCADE;
  DROP TABLE "_pages_v_blocks_our_offices_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_our_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_careers" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "header_social_links" CASCADE;
  DROP TABLE "footer_contact_info_phone_numbers" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  ALTER TABLE "pages_blocks_home_page" ADD CONSTRAINT "pages_blocks_home_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_page" ADD CONSTRAINT "_pages_v_blocks_home_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_page_order_idx" ON "pages_blocks_home_page" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_page_parent_id_idx" ON "pages_blocks_home_page" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_page_path_idx" ON "pages_blocks_home_page" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_page_order_idx" ON "_pages_v_blocks_home_page" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_page_parent_id_idx" ON "_pages_v_blocks_home_page" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_page_path_idx" ON "_pages_v_blocks_home_page" USING btree ("_path");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "header" DROP COLUMN "contact_info_email";
  ALTER TABLE "header" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer" DROP COLUMN "services_link_type";
  ALTER TABLE "footer" DROP COLUMN "services_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN "services_link_url";
  ALTER TABLE "footer" DROP COLUMN "services_link_label";
  ALTER TABLE "footer" DROP COLUMN "services_link_appearance";
  ALTER TABLE "footer" DROP COLUMN "contact_link_type";
  ALTER TABLE "footer" DROP COLUMN "contact_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN "contact_link_url";
  ALTER TABLE "footer" DROP COLUMN "contact_link_label";
  ALTER TABLE "footer" DROP COLUMN "contact_link_appearance";
  ALTER TABLE "footer" DROP COLUMN "contact_info_email";
  ALTER TABLE "footer" DROP COLUMN "company_name";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy_link_type";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy_link_url";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy_link_label";
  ALTER TABLE "footer" DROP COLUMN "privacy_policy_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_purpose_section_cta_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_purpose_section_cta_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_brand_statement_cta_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_brand_statement_cta_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_services_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_purpose_section_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_purpose_section_cta_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_brand_statement_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_brand_statement_cta_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_services_cta_link_type";
  DROP TYPE "public"."enum_header_social_links_link_type";
  DROP TYPE "public"."enum_footer_social_links_link_type";
  DROP TYPE "public"."enum_footer_services_link_type";
  DROP TYPE "public"."enum_footer_services_link_appearance";
  DROP TYPE "public"."enum_footer_contact_link_type";
  DROP TYPE "public"."enum_footer_contact_link_appearance";
  DROP TYPE "public"."enum_footer_privacy_policy_link_type";
  DROP TYPE "public"."enum_footer_privacy_policy_link_appearance";`)
}
