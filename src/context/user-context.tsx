"use client";

import { createContext, useContext } from "react";

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatarUrl?: string;
} | null;

const UserContext = createContext<CurrentUser>(null);

export function UserProvider({
  user,
  children,
}: {
  user: CurrentUser;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
