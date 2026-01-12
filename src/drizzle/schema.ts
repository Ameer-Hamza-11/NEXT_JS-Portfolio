import { relations } from "drizzle-orm";
import {
    index,
    // date,
    int,
    json,
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
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
})

export const profile = mysqlTable("profile", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
    avatarUrl: text("avatar_url"),
    bannerUrl: text("banner_url"),
    headline: varchar("headline", { length: 150 }),
    description: text("description"),
    location: varchar("location", { length: 100 }),
    websiteUrl: varchar("website_url", { length: 255 }),
    githubUrl: varchar("github_url", { length: 255 }),
    linkedinUrl: varchar("linkedin_url", { length: 255 }),
    twitterUrl: varchar("twitter_url", { length: 255 }),
    skills: json("skills"),
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

})



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