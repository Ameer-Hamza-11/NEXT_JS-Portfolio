import GetAllUsers from "@/features/admin/components/GetAllUsers";
import { getAllUsersAction } from "@/features/users/server/user.profile.action";

const page = async () => {
  const result = await getAllUsersAction();

  return (
    <div>
      <GetAllUsers result={result} />
    </div>
  );
};

export default page;
