"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { post } from "../server/blog.posts.action";

const GetFullBlog = ({ data }: { data: post }) => {
  const router = useRouter();

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      
      {/* ================= GO BACK ================= */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* ================= HEADER ================= */}
      <header className="mb-8 space-y-4">
        {/* TYPE */}
        <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium">
          {data.type}
        </span>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          {data.title}
        </h1>

        {/* EXCERPT */}
        {data.excerpt && (
          <p className="text-base sm:text-lg text-muted-foreground">
            {data.excerpt}
          </p>
        )}

        {/* META */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={data.createdAt.toString()}>
            {new Date(data.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>

          <span className="h-1 w-1 rounded-full bg-muted-foreground" />

          <span className="capitalize">{data.status}</span>
        </div>
      </header>

      {/* ================= COVER IMAGE ================= */}
      {data.coverImage && (
        <div className="relative mb-10 h-[220px] sm:h-[360px] w-full overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={data.coverImage}
            alt={data.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <section
        className={cn(
          "prose prose-neutral max-w-none",
          "prose-headings:scroll-mt-20",
          "prose-img:rounded-xl",
          "prose-a:text-foreground",
          "dark:prose-invert"
        )}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      {/* ================= FOOTER ================= */}
      <footer className="mt-12 border-t pt-6 text-sm text-muted-foreground">
        <p>
          Published on{" "}
          <span className="font-medium text-foreground">
            {new Date(data.createdAt).toLocaleDateString()}
          </span>
        </p>
      </footer>
    </article>
  );
};

export default GetFullBlog;
