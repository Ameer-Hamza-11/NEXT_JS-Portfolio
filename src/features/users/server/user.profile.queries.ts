import { profile, users } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  role: "user" | "admin";
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
  session: {
    id: string;
    expiresAt: Date;
    userAgent: string;
    ip: string;
  } | null;
}


export const userProfile = async () => {
    const user = await getCurrentUser();
    if (!user) return null;
    const [userProfile] = await db
    .select({
      name: users.name,
      userName: users.userName,
      avatarUrl: profile.avatarUrl,
      bannerUrl: profile.bannerUrl,
      headline: profile.headline,
      description: profile.description,
      location: profile.location,
      websiteUrl: profile.websiteUrl,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
      twitterUrl: profile.twitterUrl,
      skills: profile.skills,
    })
    .from(profile)
    .innerJoin(users, eq(users.id, profile.userId))
    .where(eq(profile.userId, user.id));
  
    const isProfileCompleted =
    !!userProfile &&
    !!userProfile.headline &&
    !!userProfile.description &&
    Array.isArray(userProfile.skills) &&
    userProfile.skills.length > 0;
  
    return { ...userProfile, isProfileCompleted };
}