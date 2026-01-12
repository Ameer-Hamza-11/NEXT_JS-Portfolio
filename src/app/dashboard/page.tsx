

import { ProfileCompletion } from "@/features/users/components/Dashboard/ProfileCompletion";
import { userProfile } from "@/features/users/server/user.profile.queries";
import React from "react";

const Dashboard = async () => {
  const profile = await userProfile();

  return (
    <div className="flex flex-col gap-6">
      {!profile?.isProfileCompleted && <ProfileCompletion />}

      <div className="text-lg font-medium">
        Welcome to Dashboard 👋
      </div>
    </div>
  );
};

export default Dashboard;
