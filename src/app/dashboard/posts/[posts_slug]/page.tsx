import GetFullBlog from "@/features/blogs/components/GetFullBlog";
import { getBlogPostsBySlugAction } from "@/features/blogs/server/blog.posts.action";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    posts_slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { posts_slug } = await params;
  console.log(posts_slug);

  const res = await getBlogPostsBySlugAction(posts_slug);
  if (res.status === "ERROR") {
    return <div>{res.message}</div>
  }

  return (
    <div>
      <GetFullBlog data={res.data} />
    </div>
  );
};

export default page;
