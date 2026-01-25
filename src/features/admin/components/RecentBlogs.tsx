"use client";

import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

type BlogItem = {
  id: number;
  title: string;
  slug: string;
  type: "blog" | "project";
  status: "draft" | "published";
  createdAt: Date;
};

const RecentBlogs = ({ data }: { data: BlogItem[] }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No recent blogs added.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((blog) => (
        <Link
          key={blog.id}
          href={`/dashboard/posts/${blog.slug}`}
          className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition"
        >
          <FileText className="h-4 w-4 text-muted-foreground" />

          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-1">
              {blog.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {blog.type} • {blog.status}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentBlogs;
