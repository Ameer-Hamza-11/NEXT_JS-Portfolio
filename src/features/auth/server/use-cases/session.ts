import { sessions, users } from "@/drizzle/schema"
import { SESSION_LIFETIME, SESSION_REFRESH_TIME } from "@/lib/constraints"
import { db } from "@/lib/db"
import crypto from "crypto"
import { cookies, headers } from "next/headers"
import { getIpAddress } from "./location"
import { eq } from "drizzle-orm"




type CreateSessionDataType = {
    userId: number,
    ip: string,
    userAgent: string,
    token: string,
    tx?: DbClient

}
//? to generate token for session
const generateSessionToken = () => {
    return crypto.randomBytes(32).toString("hex").normalize()
}


//? to create session hashedToken & save in Db
export const createSessionData = async ({ userId, token, userAgent, ip, tx = db }: CreateSessionDataType) => {
    const hashedToken = crypto.createHash("sha-256").update(token).digest("hex")

    const [session] = await tx.insert(sessions).values({ id: hashedToken, userId, userAgent, ip, expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000) })

    return session
}


type DbClient = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];


//? for session to call createSessionData & set raw session in cookies
export const createSessionAndSetCookies = async (userId: number, tx: DbClient = db) => {
    const token = generateSessionToken()
    const headersList = await headers()
    const ip = await getIpAddress()

    await createSessionData({ userId, token, userAgent: headersList.get("user-agent") || "", ip, tx })
    const cookieStore = await cookies()
    cookieStore.set("session", token, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_LIFETIME,
    })

}


//? to check if the user is login or not & is User session is expired or not
export const validateSessionAndGetUser = async (session: string) => {
    const hashedToken = crypto.createHash("sha-256").update(session).digest("hex")
    const [user] = await db.select({
        session: {
            id: sessions.id,
            expiresAt: sessions.expiresAt,
            userAgent: sessions.userAgent,
            ip: sessions.ip,
        },
        id: users.id,
        name: users.name,
        userName: users.userName,
        role: users.role,
        phoneNumber: users.phoneNumber,
        email: users.email,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
    }).from(sessions).where(eq(sessions.id, hashedToken)).innerJoin(users, eq(users.id, sessions.userId))

    if (!user) return null;

    if (Date.now() >= user.session.expiresAt.getTime()) {
        await invalidateSession(user.session.id)
        return null
    }

    if (Date.now() >= user.session.expiresAt.getTime() - SESSION_REFRESH_TIME * 1000) {
        await db.update(sessions).set({
            expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000)
        }).where(eq(sessions.id, user.session.id))
    }
    return user

}

export const invalidateSession = async (id: string) => {
    await db.delete(sessions).where(eq(sessions.id, id))
}