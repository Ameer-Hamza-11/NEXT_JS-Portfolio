"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { blogPostsSchema, blogPostsSchemaType } from "../blog.posts.schema";
import {
  blogPostsAction,
  post,
  updateBlogPostsAction,
} from "../server/blog.posts.action";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import Tiptap from "@/components/tiptap-text-editor";
import { ImageUpload } from "@/components/upload-image";
import { Loader2, PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateUserBlogsProps {
  initialData?: post;

}

const CreateUserBlogs = ({ initialData, }: CreateUserBlogsProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<blogPostsSchemaType>({
    resolver: zodResolver(blogPostsSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      status: initialData?.status ?? "draft",
      type: initialData?.type ?? "blog",
      coverImage: initialData?.coverImage ?? "",
    },
  });

  const isEdit = !!initialData;
  const onSubmit = async (data: blogPostsSchemaType) => {

    if (isEdit) {
      const res = await updateBlogPostsAction(initialData.slug, data);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
        router.push("/dashboard/posts/my-posts");
      } else {
        toast.error(res.message);
      }
    } else {
      const res = await blogPostsAction(data);
      if (res.status === "SUCCESS") {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-8 px-4 py-8"
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <PenSquare className="h-6 w-6 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">{initialData ? "Edit a Blog" : "Write a Blog"}</h1>
      </div>

      {/* ================= COVER IMAGE ================= */}
      <div className="space-y-2">
        <Label>Cover Image</Label>

        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              boxText="Upload blog cover image"
            />
          )}
        />
      </div>

      {/* ================= TITLE ================= */}
      <div className="space-y-1">
        <Label>Title *</Label>
        <Input
          placeholder="How I built my portfolio with Next.js"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* ================= EXCERPT ================= */}
      <div className="space-y-1">
        <Label>Short Excerpt *</Label>
        <Textarea
          placeholder="Short summary shown on blog cards..."
          rows={3}
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className="text-sm text-destructive">{errors.excerpt.message}</p>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="space-y-2">
        <Label>Content *</Label>

        <div className="rounded-lg border overflow-hidden">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Tiptap value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      {/* ================= STATUS + TYPE ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* STATUS */}
        <div className="space-y-1">
          <Label>Status *</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* TYPE */}
        <div className="space-y-1">
          <Label>Type *</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex items-center gap-4">
        {!isEdit  ? (
          <>
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Publish Blog
            </Button>
          </>
        ) : (
          <>
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Blog
            </Button>
          </>
        )}

        {!isDirty && (
          <span className="text-sm text-muted-foreground">No changes yet</span>
        )}
      </div>
    </form>
  );
};

export default CreateUserBlogs;
