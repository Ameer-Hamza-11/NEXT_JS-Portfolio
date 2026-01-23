import GetSpecificUser from "@/features/admin/components/GetSpecificUser";
import { getUserByUserNameAction } from "@/features/users/server/user.profile.action";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
    const res = await getUserByUserNameAction(params.username)
  return <div>
   <GetSpecificUser data={res} />

  </div>;
};

export default page;
