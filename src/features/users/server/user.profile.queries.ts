import { profile } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries"
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";


export const userProfile = async () => {
    const user = await getCurrentUser();
    if (!user) return null;

    const [userProfile] = await db.select().from(profile).where(eq(profile.userId, user.id))
    const isProfileCompleted =
    !!userProfile &&
    !!userProfile.headline &&
    !!userProfile.description &&
    Array.isArray(userProfile.skills) &&
    userProfile.skills.length > 0;
  
    return { ...userProfile, isProfileCompleted };
}