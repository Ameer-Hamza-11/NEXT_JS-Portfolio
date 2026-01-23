"use server"

import { contacts, posts, users } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { db } from "@/lib/db";
import { count as drizzleCount, eq } from "drizzle-orm";



export type DataLengthType = | { status: "ERROR", message: string } | { status: "SUCCESS", data: { userCount: number, postsCount: number, messagesCount: number } }

export const getDataLengthAction = async (): Promise<DataLengthType> => {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return { status: "ERROR", message: "User not found." };
        }
        if (user.role !== "admin") {
            return { status: "ERROR", message: "Unauthorized Access." };
        }

        const [{ messagesCount }] = await db
            .select({ messagesCount: drizzleCount(contacts.id) })
            .from(contacts);

        const [{ postsCount }] = await db
            .select({ postsCount: drizzleCount(posts.id) })
            .from(posts);


        const [{ userCount }] = await db
            .select({ userCount: drizzleCount(users.id) })
            .from(users).where(eq(users.role, "user"));


        return { status: "SUCCESS", data: { userCount, postsCount, messagesCount } };

    } catch (error) {
        return {
            status: "ERROR",
            message: "Something went wrong, please try again.",
        };
    }
}