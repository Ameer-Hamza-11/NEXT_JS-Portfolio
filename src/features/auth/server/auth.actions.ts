"use server"

import { db } from "@/lib/db"
import { registerUserSchema, registerUserSchemaType } from "../auth.schema"
import { users } from "@/drizzle/schema"
import { eq, or } from "drizzle-orm"
import argon from "argon2"
import { createSessionAndSetCookies } from "./use-cases/session"


export const registerUserAction = async (data: registerUserSchemaType) => {
    try {
        const { data: validatedData, error } = registerUserSchema.safeParse(data)
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