"use client";

import React from "react";
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

const skillsOptions = [
  { label: "Web Development", value: "web-dev" },
  { label: "Frontend Development", value: "frontend" },
  { label: "Backend Development", value: "backend" },
  { label: "MERN Stack", value: "mern" },
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
  { label: "Tailwind CSS", value: "tailwind" },
  { label: "REST APIs", value: "rest-api" },
  { label: "Git & GitHub", value: "git" },
  { label: "UI Design", value: "ui-design" },
  { label: "UX Design", value: "ux-design" },
  { label: "Web Designer", value: "web-designer" },
  { label: "Figma", value: "figma" },
];

const errorClass = "border-red-500 focus-visible:ring-red-500";

const UserSettingForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      avatarUrl: "",
      bannerUrl: "",
      description: "",
      headline: "",
      location: "",
      name: "",
      userName: "",
      websiteUrl: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      skills: [],
    },
  });

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
            <p className="text-sm text-red-500">
              {errors.userName.message}
            </p>
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

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <Label>Description *</Label>
        <Textarea
          placeholder="Tell something about yourself..."
          className={cn("min-h-[180px]", errors.description && errorClass)}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">
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
            <p className="text-sm text-red-500">
              {errors.location.message}
            </p>
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
            <p className="text-sm text-red-500">
              {errors.websiteUrl.message}
            </p>
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
          {isSubmitting && (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          )}
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
