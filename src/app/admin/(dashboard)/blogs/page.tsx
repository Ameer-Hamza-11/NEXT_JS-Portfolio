import GetAllUserBlogs from "@/features/blogs/components/GetAllUserBlogs";
import { getPublishedBlogPostsAction } from "@/features/blogs/server/blog.posts.action";
import React from "react";

const page = async () => {
  const res = await getPublishedBlogPostsAction();
  if (res.status === "ERROR") {
    return (
      <>
    
        <h1 className="text-2xl text-destructive">Error While loading blogs</h1> 
        <div>{res.message}</div>
      </>
    );
  }

  return (
    <div>
      {res.status === "SUCCESS" && <GetAllUserBlogs posts={res.data} isAdmin={true} />}
    </div>
  );
};

export default page;
