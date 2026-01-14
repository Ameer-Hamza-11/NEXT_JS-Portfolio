"use server"

import { profile, users } from "@/drizzle/schema"
import { userProfileSchema, UserProfileSchemaType } from "../user.profile.schema"
import { userProfile } from "./user.profile.queries"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/features/auth/server/auth.queries"


export const updateUserProfile = async (data: UserProfileSchemaType) => {
    try {
        const user = await getCurrentUser()
        const userProfileData = await userProfile()
        if (!user) {
            return { status: "ERROR", message: "User not found." }
        }
        const parsed = userProfileSchema.safeParse(data)
        if (!parsed.success) {
            return { status: "ERROR", message: parsed.error.issues[0].message}
        }
        const validatedData = parsed.data
        const {
            name,
            userName,
            headline,
            description,
            avatarUrl,
            bannerUrl,
            githubUrl,
            websiteUrl,
            location,
            linkedinUrl,
            twitterUrl,
            skills,
          } = validatedData

          await db.transaction(async (tx)=>{
            await tx.update(users).set({
                name: name ?? user.name,
                userName: userName ?? user.userName,
            }).where(eq(users.id, user.id))

            await tx.update(profile).set({
                headline: headline ?? userProfileData?.headline,
                description: description ?? userProfileData?.description,
                avatarUrl: avatarUrl ?? userProfileData?.avatarUrl,
                bannerUrl: bannerUrl ?? userProfileData?.bannerUrl,
                githubUrl: githubUrl ?? userProfileData?.githubUrl,
                websiteUrl: websiteUrl ?? userProfileData?.websiteUrl,
                location: location ?? userProfileData?.location,
                linkedinUrl: linkedinUrl ?? userProfileData?.linkedinUrl,
                twitterUrl: twitterUrl ?? userProfileData?.twitterUrl,
                skills: skills ?? userProfileData?.skills,
            }).where(eq(profile.userId, user.id))
          })

          return { status: "SUCCESS", message: "Profile updated successfully." }
 

    } catch (error) {
        return { status: "ERROR", message: "something went wrong, please try again." }
    }
}