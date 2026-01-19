import GetUserBlogs from "@/features/blogs/components/GetUserBlogs";
import { deleteBlogPostsAction, getUserBlogPostsAction } from "@/features/blogs/server/blog.posts.action";
import React from "react";

const page = async () => {
  const res = await getUserBlogPostsAction();
  if (res.status === "ERROR") {
    return <div className="text-center text-red-500 mt-10">{res.message}</div>;
  }


  return (
    <div>
      <GetUserBlogs  userPosts={res.data} />
    </div>
  );
};

export default page;
