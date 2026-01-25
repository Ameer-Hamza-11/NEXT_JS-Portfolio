import GetSpecificUser from "@/features/admin/components/GetSpecificUser";
import { getUserByUserNameAction } from "@/features/users/server/user.profile.action";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};


const page = async ({ params }:  Props) => {
  
  const { username } = await params;
  
    const res = await getUserByUserNameAction(username)
  return <div>
   <GetSpecificUser data={res} />

  </div>;
};

export default page;
