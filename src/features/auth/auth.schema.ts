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
        .regex(/^(\+92|0)?3\d{9}$/, "Invalid Pakistani phone number"),

})

export type registerUserSchemaType = z.infer<typeof registerUserSchema>


export const registerUserWithConfirmSchema = registerUserSchema.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type RegisterUserWithConfirmDataType = z.infer<
    typeof registerUserWithConfirmSchema
>;


export const loginUserSchema = z.object({
    email: z
        .email("Please enter a valid email address ")
        .trim()
        .max(255, "Email must not exceed 255 characters")
        .toLowerCase(),

    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginUserDataType = z.infer<typeof loginUserSchema>;