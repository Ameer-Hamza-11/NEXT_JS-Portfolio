"use server"

import { db } from "@/lib/db"
import { LoginUserDataType, loginUserSchema, RegisterUserWithConfirmDataType, registerUserWithConfirmSchema } from "../auth.schema"
import { users } from "@/drizzle/schema"
import { eq, or } from "drizzle-orm"
import argon from "argon2"
import { createSessionAndSetCookies, invalidateSession, validateSessionAndGetUser } from "./use-cases/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const registerUserAction = async (data: RegisterUserWithConfirmDataType) => {
    try {
        const { data: validatedData, error } = registerUserWithConfirmSchema.safeParse(data)
        if (error) return { status: "ERROR", message: error.issues[0].message }
        const { name, userName, email, phoneNumber, password } = validatedData
        const [user] = await db.select().from(users).where(or(eq(users.email, email), eq(users.userName, userName)))
        if (user) {
            if (user.email === email) {
                return { status: "ERROR", message: "Email Already Exists" }
            }
            else {
                return { status: "ERROR", message: "Username Already Exists" }
            }
        }

        const hashedPassword = await argon.hash(password)
        const [newUser] = await db.insert(users).values({ name, userName, email, phoneNumber, password: hashedPassword })
        await createSessionAndSetCookies(newUser.insertId)
        return { status: "SUCCESS", message: "Registration Completed Successfully", }

    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }

}




export const loginUserAction = async (data: LoginUserDataType) => {
    try {
        const { data: validatedData, error } = loginUserSchema.safeParse(data)
        if (error) return { status: "ERROR", message: error.issues[0].message }
        const { email, password } = validatedData
        const [user] = await db.select().from(users).where(or(eq(users.email, email)))
        if (!user) {
            return { status: "ERROR", message: "Invalid Email or Password" };
        }
        const isMatch = await argon.verify(user.password, password)

        if (!isMatch) {
            return { status: "ERROR", message: "Invalid Email or Password" }
        }




        await createSessionAndSetCookies(user.id)
        return { status: "SUCCESS", message: "Login Successful", }

    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }

}


export const logoutUserAction = async () => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("session")?.value;

        if (!token) return;

        const user = await validateSessionAndGetUser(token)
        if (user?.session?.id) {
            await invalidateSession(user.session.id)
        }
        cookieStore.delete("session")



    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }
}