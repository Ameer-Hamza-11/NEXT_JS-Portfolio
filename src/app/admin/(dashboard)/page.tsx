import AdminDashboard from '../../../features/admin/components/AdminDashoard'

import { getDataLengthAction } from "@/features/admin/server/admin.action";
import { getRecentUsersAction } from "@/features/admin/server/admin.action";
import { getRecentBlogsAction } from "@/features/admin/server/admin.action";

const Page = async () => {
  const dataLength = await getDataLengthAction();
  const recentUsers = await getRecentUsersAction();
  const recentBlogs = await getRecentBlogsAction(); 

  return (
    <AdminDashboard
      result={dataLength}
      recentUsers={recentUsers}
      recentBlogs={recentBlogs}
    />
  );
};

export default Page;
