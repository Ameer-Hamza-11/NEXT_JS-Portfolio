"use server"

import { contacts, posts, profile, users } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { db } from "@/lib/db";
import { and, desc, count as drizzleCount, eq, InferSelectModel } from "drizzle-orm";



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

    } catch {
        return {
            status: "ERROR",
            message: "Something went wrong, please try again.",
        };
    }
}



export const deleteUserByUserName = async (userName: string) => {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return { status: "ERROR", message: "User not found." };
        }
        if (user.role !== "admin") {
            return { status: "ERROR", message: "Unauthorized Access." };
        }
        await db.delete(users).where(eq(users.userName, userName))


        return { status: "SUCCESS", message: "User Deleted SuccessFully" };

    } catch {
        return {
            status: "ERROR",
            message: "Something went wrong, please try again.",
        };
    }
}



export const getRecentUsersAction = async () => {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "admin") {
    return { status: "ERROR", message: "Unauthorized!" };
        
    }
    const recentUsers = await db
      .select({
        id: users.id,
        name: users.name,
        userName: users.userName,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(5);

    return { status: "SUCCESS", data: recentUsers };
  } catch (error) {
    return { status: "ERROR", message: "Something went wrong, please try again.", };
  }
};

// type  BlogsType = InferSelectModel<typeof posts>
// export type getRecentBlogType = 
// | {status: "SUCCESS" , data: BlogsType[] }
// | {status: "ERROR" , message: string }

export const getRecentBlogsAction=  async()=>{
    try {
        const user = await getCurrentUser()
        if (!user || user.role !== "admin") {
        return { status: "ERROR", message: "UnAuthorized!" };
            
        }
        const recentBlogs = await db
          .select()
          .from(posts)
          .orderBy(desc(posts.createdAt))
          .limit(5);
    
        return { status: "SUCCESS", data: recentBlogs };
      } catch (error) {
        return { status: "ERROR", message: "Something went wrong, please try again.", };
      }
}