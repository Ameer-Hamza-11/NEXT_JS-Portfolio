import UserSettingForm from "@/features/users/components/Dashboard/UserSettingForm";
import { userProfile } from "@/features/users/server/user.profile.queries";
import React from "react";

const page = async () => {
  const profile = await userProfile();
  return (
    <main className="border min-h-screen flex flex-col gap-1.5 px-5 py-2">
      <h1 className="font-semibold text-2xl ">Settings</h1>
      <UserSettingForm profile={profile}/>
    </main>
  );
};

export default page;
