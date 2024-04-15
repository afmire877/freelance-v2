import { relations, sql } from "drizzle-orm";

import {
  integer,
  json,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { type Result } from "postcss";

export const pgTable = pgTableCreator((name) => `freelance-v2_${name}`);

export const submissions = pgTable("submission", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 256 })
    .unique()
    .notNull()
    .default(sql`uuid_generate_v4()`),
  answers: json("answers").default([]),
  profileId: integer("profileId").references(() => profiles.id, {
    onDelete: "cascade",
  }),
  score: json("score").$type<Result[]>().default([]),
  submittableId: varchar("submittableId").unique().default(""),

  isComplete: boolean("isComplete").default(false),
  currentQuestionIndex: integer("currentQuestionIndex"),

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
  revenue: varchar("revenue", { length: 256 }),
  desiredRevenue: varchar("desiredRevenue", { length: 256 }),
  marketingConsent: boolean("marketingConsent").default(false),
  acceptedTOS: boolean("acceptedTOS").default(false),
  submittableId: varchar("submittableId").unique(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// export const profileRelations = relations(profiles, ({ many }) => ({
//   submissions: many(submissions),
// }));

// export const submissionsRelations = relations(submissions, ({ one }) => ({
//   profile: one(profiles, {
//     fields: [submissions.profileId],
//     references: [profiles.id],
//   }),
// }));
