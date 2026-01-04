import { z } from "zod"

export const registerUserSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "name must be min 3 characters")
        .max(255, "name must be min 255 characters"),
    userName: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters long")
        .max(255, "Username must not exceed 255 characters")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "Username can only contain letters, numbers, underscores, and hyphens"
        ),

    email: z
        .email("Please enter a valid email address ")
        .trim()
        .max(255, "Email must not exceed 255 characters")
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),
    phoneNumber: z.string()
        .trim()
        .min(10, " phoneNumber must be min 10 characters")
        .max(12, " phoneNumber must be max 12 characters")

})

export type registerUserSchemaType = z.infer<typeof registerUserSchema>