"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DeleteBlogHandler,
  deleteBlogPostsAction,
  post,
} from "../server/blog.posts.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GetUserBlogsProps {
  userPosts: post[];
}

const GetUserBlogs = ({ userPosts }: GetUserBlogsProps) => {
  const handleDelete = async (slug: string) => {
    return await deleteBlogPostsAction(slug);
  };
  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium">No posts yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Blogs or projects will appear here
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>

        <Link
          href="/dashboard/posts"
          className="text-sm text-muted-foreground hover:underline"
        >
          View all
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
};

export default GetUserBlogs;

/* ================= POST CARD ================= */

const PostCard = ({
  post,
  handleDelete,
}: {
  post: post;
  handleDelete: DeleteBlogHandler;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const res = await handleDelete(post.slug);
      if (res.status === "ERROR") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative rounded-xl border bg-background overflow-hidden hover:shadow-sm transition">
      {/* ACTION BUTTONS */}
      <div className="absolute right-2 top-2 z-10 flex gap-1">
        {/* EDIT */}
        <Link
          href={`/dashboard/posts/my-posts/${post.slug}/edit`}
          className="inline-flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur hover:bg-background"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Link>

        {/* DELETE */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="inline-flex items-center gap-1 rounded-md bg-destructive/90 px-2 py-1 text-xs font-medium text-destructive-foreground shadow-sm hover:bg-destructive disabled:opacity-70"
        >
          {isDeleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
          Delete
        </button>
      </div>

      {/* COVER IMAGE */}
      <div className="relative h-44 bg-muted overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No cover image
          </div>
        )}

        {/* STATUS */}
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-medium",
            post.status === "published"
              ? "bg-foreground text-background"
              : "border bg-background text-muted-foreground"
          )}
        >
          {post.status}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h3 className="line-clamp-2 font-semibold leading-snug">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.createdAt).toLocaleDateString("en-GB")}
          </div>

          <span className="uppercase tracking-wide">{post.type}</span>
        </div>
      </div>
    </div>
  );
};
