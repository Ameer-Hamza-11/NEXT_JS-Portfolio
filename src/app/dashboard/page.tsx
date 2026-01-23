import GetUserBlogs from "@/features/blogs/components/GetUserBlogs";
import { getUserBlogPostsAction } from "@/features/blogs/server/blog.posts.action";
import { ProfileCompletion } from "@/features/users/components/Dashboard/ProfileCompletion";
import UserDashboard from "@/features/users/components/Dashboard/UserDashboard";
import { userProfile } from "@/features/users/server/user.profile.queries";
import React from "react";

const Dashboard = async () => {
  const profile = await userProfile();
  const res = await getUserBlogPostsAction();
  if (res.status === "ERROR") {
    return <div className="text-center text-red-500 mt-10">{res.message}</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-medium">Welcome to Dashboard 👋</div>
      {!profile?.isProfileCompleted ? (
        <>
          <ProfileCompletion />
        </>
      ) : (
        <>
    <UserDashboard/>
        </>
      )}
    </div>
  );
};

export default Dashboard;
