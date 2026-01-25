import { cookies } from "next/headers"
import { validateSessionAndGetUser } from "./use-cases/session";
import { cache } from "react";


export const getCurrentUser = cache(async () => {
  try {
    const cookieStore = await cookies(); 
    const session = cookieStore.get("session")?.value;

    if (!session) return null;

    return await validateSessionAndGetUser(session);
  } catch (error) {
    console.error("DB ERROR:", error);
    return null; 
  }
});