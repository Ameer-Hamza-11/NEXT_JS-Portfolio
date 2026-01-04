import { relations } from "drizzle-orm";
import {
    // date,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    timestamp,
    varchar,
    // year,
    // boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userName: varchar("username", { length: 255 }).unique().notNull(),
    password: text("password").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: mysqlEnum("role", ["user", "admin"])
        .default("user")
        .notNull(),
    phoneNumber: varchar("phone_number", { length: 255 }),
    avatarUrl: text("avatar_url"),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})


export const sessions = mysqlTable("sessions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    userAgent: text("user_agent").notNull(),
    ip: varchar("ip", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})



export const userRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({

    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
    }),
  }));