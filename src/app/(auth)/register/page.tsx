import Register from "@/features/auth/components/Register";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const session =  cookieStore.get("session")?.value;

  if (session) {
    redirect("/");
  }
  return <Register />;
};

export default page;
