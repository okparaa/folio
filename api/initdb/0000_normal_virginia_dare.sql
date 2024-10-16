CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"surname" varchar(60) NOT NULL,
	"username" varchar(60) NOT NULL,
	"firstname" varchar(60) NOT NULL,
	"lastname" varchar(60),
	"phone" varchar(30) NOT NULL,
	"photo_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"password" varchar(60) NOT NULL,
	"role" varchar DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" boolean DEFAULT false,
	"reference" varchar,
	"authorization_url" varchar,
	"access_code" varchar,
	"message" varchar,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pins" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean,
	"pin" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"role" varchar,
	"permissions" varchar[] DEFAULT '{}'::varchar[] NOT NULL,
	"description" varchar,
	CONSTRAINT "roles_role_unique" UNIQUE("role")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"active" boolean DEFAULT true,
	"refresh_token" varchar,
	"access_token" varchar,
	"kode" varchar(12),
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"user_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contents" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"content" varchar,
	"deleted" boolean DEFAULT false,
	"photo" varchar,
	"title" varchar,
	"slug" varchar,
	CONSTRAINT "contents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"syn" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"route" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	CONSTRAINT "routes_route_unique" UNIQUE("route"),
	CONSTRAINT "routes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
