import z from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "name must be min 3 characters")
        .max(255, "name must be min 255 characters"),
    email: z
        .email("Please enter a valid email address ")
        .trim()
        .max(255, "Email must not exceed 255 characters")
        .toLowerCase(),
    subject: z
        .string()
        .trim()
        .min(5, "subject must be min 5 characters")
        .max(255, "subject must be min 255 characters"),
    message: z
        .string()
        .trim()
})


export type contactSchemaType = z.infer<typeof contactSchema>