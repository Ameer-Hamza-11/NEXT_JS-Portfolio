"use server"

import { profile, users } from "@/drizzle/schema"
import { userProfileSchema, UserProfileSchemaType } from "../user.profile.schema"
import { userProfile } from "./user.profile.queries"
import { db } from "@/lib/db"
import { and, eq, InferSelectModel } from "drizzle-orm"
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
      return { status: "ERROR", message: parsed.error.issues[0].message }
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

    await db.transaction(async (tx) => {
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


export type UserItem = {
  name: string;
  userName: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  headline: string | null;
  description: string | null;
  location: string | null;
  websiteUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  skills: string[] | null;
};

export type GetAllUserType =
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; data: UserItem[] };

export const getAllUsersAction = async (): Promise<GetAllUserType> => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: "ERROR", message: "User not found." };
    }

    if (user.role !== "admin") {
      return { status: "ERROR", message: "Unauthorized Access." };
    }

    const usersData: UserItem[] = await db
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
      .innerJoin(users, and(eq(users.id, profile.userId), eq(users.role, "user")))

    return { status: "SUCCESS", data: usersData };
  } catch {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again.",
    };
  }
};
export type GetUserType =
  | { status: "ERROR"; message: string }
  | { status: "SUCCESS"; data: UserItem | null };
export const getUserByUserNameAction = async (userName: string): Promise<GetUserType> => {

  try {
    const user = await getCurrentUser();

    if (!user) {
      return { status: "ERROR", message: "User not found." };
    }
    if (userName !== user.userName && user.role !== "admin") {
      return { status: "ERROR", message: "Unauthorized Access." };
    }
    const [userData] = await db
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
    .from(users)
    .innerJoin(profile,and(eq(users.id, profile.userId), eq(users.role, "user")))
    .where(eq(users.userName, userName)) ;

    
  




    return { status: "SUCCESS", data: userData || null };
  } catch(err){
    console.log(err);
    
    return {
      status: "ERROR",
      message: "Something went wrong, please try again.",
    };
  }
}