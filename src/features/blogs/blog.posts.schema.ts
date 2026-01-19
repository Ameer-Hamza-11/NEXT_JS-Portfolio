import { blogStatus, blogTypes } from "@/lib/constraints";
import z from "zod";


export const blogPostsSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters long")
        .max(255, "Title must be at most 255 characters long"),
    excerpt: z
        .string()
        .trim()
        .max(300, "Excerpt must be at most 300 characters long")
        .optional(),
    type: z.enum(blogTypes, { error: "Type must be either blog or project" }),
    content: z
        .string()
        .trim()
        .min(50, "Content must be at least 50 characters long")
        .max(10000, "Content must be at most 10000 characters long"),
    coverImage: z
        .url("Cover image must be a valid URL")
        .trim()
        .optional(),
    status: z.enum(blogStatus, { error: "status must be either draft or published" }),


})

export type blogPostsSchemaType = z.infer<typeof blogPostsSchema>