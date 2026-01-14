import { z } from "zod";

const optionalStringWithLimit = (min?: number, max?: number) => {
  let schema = z.string().trim();

  if (min) {
    schema = schema.min(min, `Must be at least ${min} characters`);
  }

  if (max) {
    schema = schema.max(max, `Must not exceed ${max} characters`);
  }

  return schema.transform(val => (val === "" ? undefined : val)).optional();
};
export const userProfileSchema = z.object({
  name: optionalStringWithLimit(2, 255),

  userName: optionalStringWithLimit(3, 255),

  avatarUrl: optionalStringWithLimit(),

  bannerUrl: optionalStringWithLimit(),

  headline: optionalStringWithLimit(10, 150),

  description: optionalStringWithLimit(20, 1000),

  location: optionalStringWithLimit(2, 100),

  websiteUrl: optionalStringWithLimit().refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid URL (e.g. https://example.com)"
  ),

  githubUrl: optionalStringWithLimit().refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid GitHub URL"
  ),

  linkedinUrl: optionalStringWithLimit().refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid LinkedIn URL"
  ),

  twitterUrl: optionalStringWithLimit().refine(
    val => !val || /^https?:\/\//.test(val),
    "Invalid Twitter URL"
  ),

  skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "At least one skill is required").optional(),
});


export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;
