"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteBlogPostsAction, post } from "../server/blog.posts.action";

type GetAllUserBlogsProps = {
  isAdmin?: boolean;
  posts: post[];
};

const GetAllUserBlogs = ({ posts, isAdmin }: GetAllUserBlogsProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-xl font-semibold">No blogs yet</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          Thoughts, stories, and ideas will appear here once blogs are published.
        </p>
      </div>
    );
  }

  const handleDelete = async (slug: string) => {
    const ok = confirm("Are you sure you want to delete this blog?");
    if (!ok) return;

    await deleteBlogPostsAction(slug);
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isAdmin={isAdmin}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default GetAllUserBlogs;


/* ================= BLOG CARD ================= */

const BlogCard = ({
  blog,
  isAdmin,
  onDelete,
}: {
  blog: post;
  isAdmin?: boolean;
  onDelete?: (slug: string) => void;
}) => {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-background transition hover:shadow-md">
      {/* IMAGE */}
      <div className="relative h-44 w-full bg-muted overflow-hidden">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No cover image
          </div>
        )}

        {/* TYPE */}
        <span className="absolute left-3 top-3 rounded-full border bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
          {blog.type}
        </span>

        {/* DELETE (ADMIN ONLY) */}
        {isAdmin && (
          <button
            onClick={() => onDelete?.(blog.slug)}
            className="absolute right-3 top-3 rounded-md border bg-background/90 p-2 text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {blog.excerpt}
          </p>
        )}

        {/* META */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </div>

          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              blog.status === "published"
                ? "bg-foreground text-background"
                : "border"
            )}
          >
            {blog.status}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/dashboard/posts/${blog.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View full article
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
};
