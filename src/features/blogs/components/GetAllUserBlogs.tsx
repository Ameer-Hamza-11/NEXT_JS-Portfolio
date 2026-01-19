"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { post } from "../server/blog.posts.action";

type GetAllUserBlogsProps = {
  posts: post[];
};

const GetAllUserBlogs = ({ posts }: GetAllUserBlogsProps) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-xl font-semibold">No blogs yet</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-md">
          Thoughts, stories, and ideas will appear here once blogs are published.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
};

export default GetAllUserBlogs;

/* ================= BLOG CARD ================= */

const BlogCard = ({ blog }: { blog: post }) => {
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
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
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
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
        >
          View full article
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
};
