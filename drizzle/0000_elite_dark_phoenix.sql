CREATE TABLE "analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_name" text NOT NULL,
	"caller_phone" text,
	"transcript" text NOT NULL,
	"summary" text NOT NULL,
	"sentiment" text NOT NULL,
	"urgency" text NOT NULL,
	"risk_level" text NOT NULL,
	"recommended_follow_up" text NOT NULL,
	"action_items" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
