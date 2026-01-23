"use server"

import { db } from '@/lib/db';
import { contacts, users } from '@/drizzle/schema';
import { contactSchema, contactSchemaType } from '../user.contacts.schema';
import { eq, InferSelectModel } from 'drizzle-orm';
import { getCurrentUser } from '@/features/auth/server/auth.queries';



export const postContactAction = async (formData: contactSchemaType, userId: number) => {
    try {

        const { success, data: validatedData, error } = contactSchema.safeParse(formData)
        if (!success || error) {
            return { status: "ERROR", message: error.issues[0].message }
        }

        const { name, email, subject, message } = validatedData;

        const [IsEmailMatch] = await db.select().from(users).where(eq(users.email, email))
        if (!IsEmailMatch) return { status: "ERROR", message: "Email does not match with your account email." }

        await db.insert(contacts).values({
            userId,
            name,
            email,
            subject,
            message
        })

        return { status: "SUCCESS", message: "Your message has been sent successfully!" }


    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }
}

export type ContactType = InferSelectModel<typeof contacts>

export type GetAllContactsType = | { status: "ERROR", message: string } | { status: "SUCCESS", data: ContactType[] }

export const getAllUserContactsAction = async (): Promise<GetAllContactsType> => {
    try {
        const user = await getCurrentUser()
        if (!user || user.role !== "admin") {
            return { status: "ERROR", message: "Unauthorized Access!" }
        }
        const contactsData = await db.select().from(contacts)

        return { status: "SUCCESS", data: contactsData }

    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }

}



export type GetContactByIdType = | { status: "ERROR", message: string } | { status: "SUCCESS", data: ContactType }


export const getContactByIdAction = async (userId: number):Promise<GetContactByIdType> => {
    try {

        const user = await getCurrentUser()
        if (!user || user.role !== "admin") {
            return { status: "ERROR", message: "Unauthorized Access!" }
        }
        const [contactsData] = await db.select().from(contacts).where(eq(contacts.userId, userId))

        return { status: "SUCCESS", data: contactsData }


    } catch (error) {
        return { status: "ERROR", message: "Something Went Wrong!" }

    }
}