"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Globe,
  Github,
  Linkedin,
  Twitter,
  ArrowLeft,
} from "lucide-react";
import { GetUserType } from "@/features/users/server/user.profile.action";
import { Button } from "@/components/ui/button";

const GetSpecificUser = ({ data }: { data: GetUserType }) => {
  const router = useRouter();

  if (data.status === "ERROR") {
    return (
      <div className="text-center text-destructive text-xl">
        {data.message}
      </div>
    );
  }

  if (!data.data) {
    return (
      <div className="text-center text-destructive text-xl">
        User not found
      </div>
    );
  }

  const user = data.data;

  const name = user.name?.trim() || "Anonymous User";
  const username = user.userName?.trim() || "username";
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="max-w-md mx-auto overflow-hidden rounded-xl border bg-background shadow-sm">
      
      {/* ===== Banner ===== */}
      <div className="relative h-36">
        {/* Go Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="absolute left-3 top-3 z-10 bg-background/80 backdrop-blur hover:bg-background"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {user.bannerUrl ? (
          <Image
            src={user.bannerUrl}
            alt="Banner"
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-neutral-900 to-neutral-700" />
        )}
      </div>

      {/* ===== Avatar ===== */}
      <div className="flex justify-center -mt-10">
        <div className="relative h-20 w-20 rounded-full border-4 border-background bg-muted overflow-hidden flex items-center justify-center">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={name}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-muted-foreground">
              {firstLetter}
            </span>
          )}
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="px-6 pt-4 pb-6 text-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">@{username}</p>

        <p className="mt-3 text-sm text-muted-foreground">
          {user.headline || "This user hasn’t added a headline yet."}
        </p>

        {/* Skills */}
        {!!user.skills?.length && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-3 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Socials */}
        <div className="mt-5 flex justify-center gap-5 text-muted-foreground">
          {user.websiteUrl && <SocialIcon href={user.websiteUrl}><Globe /></SocialIcon>}
          {user.githubUrl && <SocialIcon href={user.githubUrl}><Github /></SocialIcon>}
          {user.linkedinUrl && <SocialIcon href={user.linkedinUrl}><Linkedin /></SocialIcon>}
          {user.twitterUrl && <SocialIcon href={user.twitterUrl}><Twitter /></SocialIcon>}
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="hover:text-foreground transition"
  >
    {children}
  </a>
);

export default GetSpecificUser;
