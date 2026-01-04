import { cookies } from "next/headers"
import { validateSessionAndGetUser } from "./use-cases/session";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
    const cookie = await cookies()
    const session = cookie.get("session")?.value;

    if (!session) return null;
    const user = await validateSessionAndGetUser(session)
    return user
})