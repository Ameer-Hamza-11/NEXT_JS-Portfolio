import { relations } from "drizzle-orm";
import {
    index,
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
        phoneNumber: varchar("phone_number", { length: 20 }),
    avatarUrl: text("avatar_url"),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},(table)=>({
    emailIdx: index("email_idx").on(table.email),
    usernameIdx: index("username_idx").on(table.userName),
}))


export const sessions = mysqlTable("sessions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    userAgent: text("user_agent").notNull(),
    ip: varchar("ip", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},(table)=>({
    userIdIdx: index("session_user_id_idx").on(table.userId),
}))


export const posts = mysqlTable("posts", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    status: mysqlEnum("status", ["draft", "published"])
        .default("draft")
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
 
},(table)=>({
    userIdIdx: index("post_user_id_idx").on(table.userId),
    slugIdx: index("post_slug_idx").on(table.slug),
}))



export const userRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
    user: one(users, {
        fields: [posts.userId],
        references: [users.id]
    })

}))

export const sessionsRelations = relations(sessions, ({ one }) => ({

    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));