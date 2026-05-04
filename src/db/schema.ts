import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const analyses = pgTable("analyses", {
  id: uuid("id").defaultRandom().primaryKey(),

  customerName: text("customer_name").notNull(),
  callerPhone: text("caller_phone"),
  transcript: text("transcript").notNull(),

  summary: text("summary").notNull(),
  sentiment: text("sentiment").notNull(),
  urgency: text("urgency").notNull(),
  riskLevel: text("risk_level").notNull(),
  recommendedFollowUp: text("recommended_follow_up").notNull(),
  actionItems: jsonb("action_items").$type<string[]>().notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
