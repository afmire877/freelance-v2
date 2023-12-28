import { sql } from "drizzle-orm";

import {
  date,
  integer,
  json,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `freelance-v2_${name}`);

export const submissions = pgTable("submission", {
  id: serial("id").primaryKey(),
  answers: json("answers").notNull(),
  profileId: integer("profileId").references(() => profiles.id, {
    onDelete: "cascade",
  }),

  salesPercentage: integer("portfolioPercentage").default(0),
  portfolioPercentage: integer("portfolioPercentage").default(0),
  marketingPercentage: integer("marketingPercentage").default(0),
  financePercentage: integer("financePercentage").default(0),
  legalPercentage: integer("legalPercentage").default(0),
  adminPercentage: integer("adminPercentage").default(0),

  salesScore: integer("portfolioScore").default(0),
  portfolioScore: integer("portfolioScore").default(0),
  marketingScore: integer("marketingScore").default(0),
  financeScore: integer("financeScore").default(0),
  legalScore: integer("legalScore").default(0),
  adminScore: integer("adminPercentage").default(0),

  overallScore: varchar("overallScore").default("0"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const questionBank = pgTable("question_bank", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  topic: varchar("topic", { length: 256 }),
  subTopic: varchar("subTopic", { length: 256 }),
  questions: json("questions"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  contactNumber: varchar("contactNumber", { length: 20 }),
  dateOfBirth: varchar("dateOfBirth"),
  borough: varchar("borough").default("Hackney"),
  email: varchar("email", { length: 256 }).unique().notNull(),
  submittableId: varchar("submittableId").unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
