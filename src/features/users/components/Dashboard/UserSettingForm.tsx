"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  userProfileSchema,
  UserProfileSchemaType,
} from "../../user.profile.schema";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/multi-select";

import {
  AlbumIcon,
  EarthIcon,
  GithubIcon,
  LinkedinIcon,
  Loader,
  MapPinCheck,
  Text,
  TwitterIcon,
  User,
  User2Icon,
} from "lucide-react";

import { updateUserProfile } from "../../server/user.profile.action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Tiptap from "@/components/tiptap-text-editor";
import z from "zod";
import { userProfile } from "../../server/user.profile.queries";
import { ImageUpload } from "@/components/upload-image";

const skillsOptions = [
  { label: "Web Development", value: "web-dev" },
  { label: "Frontend Development", value: "frontend" },
  { label: "Backend Development", value: "backend" },
  { label: "Full-Stack Development", value: "fullstack" },
  { label: "Wordpress Development", value: "wordpress" },
  { label: "Graphic Designing", value: "graphic" },
  { label: "Human resources", value: "hr" },
  { label: "Video Editor", value: "editor" },
  { label: "Software Engineer", value: "s-engineer" },
  { label: "UI UX Design", value: "ui-ux-design" },
  { label: "Software Development", value: "s-developer" },
  { label: "Web Designer", value: "web-designer" },
  { label: "Project Manager", value: "manager" },
];

const errorClass = "border-red-500 focus-visible:ring-red-500";

type Props = {
  profile: Awaited<ReturnType<typeof userProfile>> | null;
};

const UserSettingForm = ({ profile }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, errors },
    reset,
  } = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      avatarUrl: profile?.avatarUrl || "",
      bannerUrl: profile?.bannerUrl || "",
      description: profile?.description || "",
      headline: profile?.headline || "",
      location: profile?.location || "",
      name: profile?.name || "",
      userName: profile?.userName || "",
      websiteUrl: profile?.websiteUrl || "",
      githubUrl: profile?.githubUrl || "",
      linkedinUrl: profile?.linkedinUrl || "",
      twitterUrl: profile?.twitterUrl || "",
      skills: Array.isArray(profile?.skills) ? profile?.skills : [],
    },
  });
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile) return;

      reset({
        avatarUrl: profile.avatarUrl ?? "",
        bannerUrl: profile.bannerUrl ?? "",
        description: profile.description ?? "",
        headline: profile.headline ?? "",
        location: profile.location ?? "",
        name: profile.name ?? "",
        userName: profile.userName ?? "",
        websiteUrl: profile.websiteUrl ?? "",
        githubUrl: profile.githubUrl ?? "",
        linkedinUrl: profile.linkedinUrl ?? "",
        twitterUrl: profile.twitterUrl ?? "",
        skills: Array.isArray(profile.skills) ? profile.skills : [],
      });
    };

    fetchProfile();
  }, [profile, reset]);

  const handleFormSubmit = async (data: UserProfileSchemaType) => {
    const res = await updateUserProfile(data);
    if (res.status === "SUCCESS") toast.success(res.message);
    if (res.status === "ERROR") toast.error(res.message);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto max-w-4xl space-y-8 px-4 py-6"
    >
 <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
       
       <Controller
         name="avatarUrl"
         control={control}
         render={({ field, fieldState }) => {
           return (
             <div className="md:col-span-2 space-y-2">
               <Label htmlFor="avatarUrl">Company Logo *</Label>
               <ImageUpload
                 value={field.value}
                 onChange={field.onChange}
                 boxText={
                   "A photo Larger than 400 pixels works best. Max photo size 5 MB"
                 }
                 className={cn(
                   fieldState.error &&
                     "ring-1 ring-destructive/50 rounded-lg h-64 w-64"
                 )}
               />
               {fieldState.error && (
                 <p className="text-sm text-destructive">
                   {fieldState.error.message}
                 </p>
               )}
             </div>
           );
         }}
       />
 

     {/* bannerImageUrl */}
     <Controller
         name="bannerUrl"
         control={control}
         render={({ field, fieldState }) => {
           return (
             <div className="md:col-span-4 space-y-2">
               <Label htmlFor="avatarUrl">Company Banner *</Label>
               <ImageUpload
                 value={field.value}
                 onChange={field.onChange}
                 boxText={
                   "A photo Larger than 400 pixels works best. Max photo size 5 MB"
                 }
                 className={cn(
                   fieldState.error &&
                     "ring-1 ring-destructive/50 rounded-lg h-64 w-64"
                 )}
               />
               {fieldState.error && (
                 <p className="text-sm text-destructive">
                   {fieldState.error.message}
                 </p>
               )}
             </div>
           );
         }}
       />
            </div>


      {/* BASIC INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-1">
          <Label>Name *</Label>
          <div className="relative">
            <User2Icon className="input-icon" />
            <Input
              placeholder="Your name"
              className={cn("pl-9", errors.name && errorClass)}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <Label>Username *</Label>
          <div className="relative">
            <User className="input-icon" />
            <Input
              placeholder="username"
              className={cn("pl-9", errors.userName && errorClass)}
              {...register("userName")}
            />
          </div>
          {errors.userName && (
            <p className="text-sm text-red-500">{errors.userName.message}</p>
          )}
        </div>
      </div>

      {/* HEADLINE */}
      <div className="space-y-1">
        <Label>Headline *</Label>
        <div className="relative">
          <AlbumIcon className="input-icon" />
          <Input
            placeholder="Frontend Developer | MERN Stack"
            className={cn("pl-9", errors.headline && errorClass)}
            {...register("headline")}
          />
        </div>
        {errors.headline && (
          <p className="text-sm text-red-500">{errors.headline.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Description *</Label>

        <div className="overflow-hidden rounded-lg border">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Tiptap value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Write a short bio about yourself (supports formatting)
        </p>

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* LOCATION + WEBSITE */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <Label>Location *</Label>
          <div className="relative">
            <MapPinCheck className="input-icon" />
            <Input
              placeholder="Karachi, Pakistan"
              className={cn("pl-9", errors.location && errorClass)}
              {...register("location")}
            />
          </div>
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Website *</Label>
          <div className="relative">
            <EarthIcon className="input-icon" />
            <Input
              placeholder="https://example.com"
              className={cn("pl-9", errors.websiteUrl && errorClass)}
              {...register("websiteUrl")}
            />
          </div>
          {errors.websiteUrl && (
            <p className="text-sm text-red-500">{errors.websiteUrl.message}</p>
          )}
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: "GitHub", icon: GithubIcon, name: "githubUrl" },
          { label: "LinkedIn", icon: LinkedinIcon, name: "linkedinUrl" },
          { label: "Twitter", icon: TwitterIcon, name: "twitterUrl" },
        ].map(({ label, icon: Icon, name }) => (
          <div key={name} className="space-y-1">
            <Label>{label}</Label>
            <div className="relative">
              <Icon className="input-icon" />
              <Input
                placeholder={`https://${label.toLowerCase()}.com`}
                className={cn(
                  "pl-9",
                  errors[name as keyof typeof errors] && errorClass
                )}
                {...register(name as any)}
              />
            </div>
            {errors[name as keyof typeof errors] && (
              <p className="text-sm text-red-500">
                {errors[name as keyof typeof errors]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="space-y-1">
        <Label>Skills *</Label>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={skillsOptions}
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Select your skills"
            />
          )}
        />
        {errors.skills && (
          <p className="text-sm text-red-500">{errors.skills.message}</p>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>

        {!isDirty && (
          <span className="text-sm text-muted-foreground">
            No changes to save
          </span>
        )}
      </div>
    </form>
  );
};

export default UserSettingForm;
