"use client";

import React from "react";
import Image from "next/image";
// import Link from "next/link";
import { User, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { GetUserType } from "@/features/users/server/user.profile.action";

const GetSpecificUser = ({ data }: { data: GetUserType }) => {
  if (data.status === "ERROR") {
    return <div className="text-center text-destructive text-xl">{data.message}</div>;
  }
  if(!data.data){
    return <div className="text-center text-destructive text-xl">User not found</div>;

  }

  const user = data?.data;

  return (
    <div className="max-w-md mx-auto rounded-xl border bg-background shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="relative h-32 bg-muted">
        {user.bannerUrl && <Image src={user.bannerUrl} alt="Banner" fill className="object-cover" />}
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-4">
        {/* Avatar */}
        <div className="-mt-12 flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full border-2 border-background bg-muted overflow-hidden">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div>
            <p className="font-semibold text-lg text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.userName}</p>
          </div>
        </div>

        {/* Headline */}
        {user.headline && <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{user.headline}</p>}

        {/* Skills */}
        {!!user.skills?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="rounded-full border px-3 py-1 text-xs bg-accent/10 text-foreground">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Socials */}
        <div className="mt-4 flex items-center gap-4 text-muted-foreground">
          {user.websiteUrl && <SocialIcon href={user.websiteUrl}><Globe /></SocialIcon>}
          {user.githubUrl && <SocialIcon href={user.githubUrl}><Github /></SocialIcon>}
          {user.linkedinUrl && <SocialIcon href={user.linkedinUrl}><Linkedin /></SocialIcon>}
          {user.twitterUrl && <SocialIcon href={user.twitterUrl}><Twitter /></SocialIcon>}
        </div>

      </div>
    </div>
  );
};

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="hover:text-foreground transition-all duration-200">
    {children}
  </a>
);

export default GetSpecificUser;
