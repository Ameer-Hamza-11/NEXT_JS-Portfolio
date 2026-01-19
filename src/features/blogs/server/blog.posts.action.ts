"use server";

import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { blogPostsSchema, blogPostsSchemaType } from "../blog.posts.schema";
import { db } from "@/lib/db";
import { posts } from "@/drizzle/schema";
import { blogStatus, slugify } from "@/lib/constraints";
import { and, eq, InferSelectModel } from "drizzle-orm";


export const blogPostsAction = async (data: blogPostsSchemaType) => {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return { status: "ERROR", message: "You must be logged in to post a blog." }
        }
        const { success, data: validatedData, error } = blogPostsSchema.safeParse(data)
        if (!success || error) {
            return { status: "ERROR", message: error.issues[0].message }
        }
        const { title, content, excerpt, status, type, coverImage } = validatedData;

        const baseSlug = slugify(title);
        const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

        await db.insert(posts).values({
            userId: user.id,
            slug,
            title,
            content,
            excerpt,
            status,
            type,
            coverImage
        })



        return { status: "SUCCESS", message: "Blog Posted SuccessFully!" }

    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }
    }
}


export type post = InferSelectModel<typeof posts>

export const getPublishedBlogPostsAction = async (): Promise<{ status: "SUCCESS", data: post[] } | { status: "ERROR", message: string }> => {
    try {
        const user = await getCurrentUser()
        if (!user) return {
            status: "ERROR",
            message: "You must be logged in to view your published blogs."
        }
        const publishedPosts = await db.select().from(posts).where(and(eq(posts.status, blogStatus[1]), eq(posts.userId, user.id)))


        return { status: "SUCCESS", data: publishedPosts };



    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }

    }
}


export const getUserBlogPostsAction = async (): Promise<{ status: "SUCCESS", data: post[] } | { status: "ERROR", message: string }> => {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return { status: "ERROR", message: "You must be logged in to view your blogs." }
        }

        const userPosts = await db.select().from(posts).where(eq(posts.userId, user.id))
        return { status: "SUCCESS", data: userPosts }

    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }

    }
}


export const getBlogPostsBySlugAction = async (slug: string): Promise<{ status: "SUCCESS", data: post } | { status: "ERROR", message: string }> => {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return { status: "ERROR", message: "You must be logged in to view your blogs." }
        }

        const [userPosts] = await db.select().from(posts).where(and(
            eq(posts.slug, slug),
            eq(posts.userId, user.id)
        ))
        if (!userPosts) {
            return { status: "ERROR", message: "Blog not found." }
        }

        return { status: "SUCCESS", data: userPosts }

    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }

    }
}


export const updateBlogPostsAction = async (slug: string, data: blogPostsSchemaType) => {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return { status: "ERROR", message: "You must be logged in to post a blog." }
        }
        const { success, data: validatedData, error } = blogPostsSchema.safeParse(data)
        if (!success || error) {
            return { status: "ERROR", message: error.issues[0].message }
        }
        const { title, content, excerpt, status, type, coverImage } = validatedData;

   
        const newSlug =
        slug === slugify(title)
          ? slug
          : `${slugify(title)}-${crypto.randomUUID().slice(0, 6)}`;
          
        await db.update(posts).set({
            userId: user.id,
            slug: newSlug,
            title,
            content,
            excerpt,
            status,
            type,
            coverImage
        }).where(and(
            eq(posts.slug, slug),
            eq(posts.userId, user.id)
        ))



        return { status: "SUCCESS", message: "Blog Updated SuccessFully!" }

    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }
    }

}

export type DeleteBlogHandler = (slug: string) => Promise<{
    status: "SUCCESS" | "ERROR";
    message: string;
  }>;
export const deleteBlogPostsAction = async (slug: string): Promise<{ status: "SUCCESS" | "ERROR"; message: string }> => {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return { status: "ERROR", message: "You must be logged in to delete a blog." }
        }

        await db.delete(posts).where(and(
            eq(posts.slug, slug),
            eq(posts.userId, user.id)
        ))

        return { status: "SUCCESS", message: "Blog Deleted SuccessFully!" }
        
    } catch (error) {
        return { status: "ERROR", message: "Something went wrong, Please Try Again!" }
        
    }
}