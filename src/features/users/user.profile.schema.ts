import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .transform(val => (val === "" ? undefined : val))
  .optional();

export const userProfileSchema = z.object({
  userId: z.number().int(),

  avatarUrl: optionalString,
  bannerUrl: optionalString,

  headline: optionalString.refine(
    val => !val || val.length <= 150,
    "Headline must not exceed 150 characters"
  ),

  description: optionalString,

  location: optionalString.refine(
    val => !val || val.length <= 100,
    "Location must not exceed 100 characters"
  ),

  websiteUrl: optionalString.refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid URL (e.g. https://example.com)"
  ),

  githubUrl: optionalString.refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid GitHub URL"
  ),

  linkedinUrl: optionalString.refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid LinkedIn URL"
  ),

  twitterUrl: optionalString.refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid Twitter URL"
  ),

  skills: z.array(z.string()).optional(),
});

export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;
