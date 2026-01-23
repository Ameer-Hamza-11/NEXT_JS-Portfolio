"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Globe, Github, Linkedin, Twitter } from "lucide-react";
import { UserItem } from "@/features/users/server/user.profile.action";

type GetAllUsersProps = {
  result:
    | { status: "ERROR"; message: string }
    | { status: "SUCCESS"; data: UserItem[] };
};

const GetAllUsers = ({ result }: GetAllUsersProps) => {
  if (result.status === "ERROR") {
    return <div className="text-center text-destructive text-xl">{result.message}</div>;
  }

  if (!result.data.length) {
    return <div className="text-center text-muted-foreground">No users found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {result.data.map((user) => (
        <UserCard key={user.userName} user={user} />
      ))}
    </div>
  );
};

export default GetAllUsers;

/* ================= USER CARD ================= */

const UserCard = ({ user }: { user: UserItem }) => {
  return (
    <div className="group overflow-hidden rounded-xl border bg-background shadow-sm hover:shadow-lg transition-all duration-300">
      {/* BANNER */}
      <div className="relative h-28 bg-muted">
        {user.bannerUrl && (
          <Image src={user.bannerUrl} alt="Banner" fill className="object-cover" />
        )}
      </div>

      {/* CONTENT */}
      <div className="relative px-5 pb-5 pt-3">
        {/* AVATAR */}
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
            <p className="font-semibold text-lg leading-tight text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">@{user.userName}</p>
          </div>
        </div>

        {/* HEADLINE */}
        {user.headline && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{user.headline}</p>
        )}

        {/* SKILLS */}
        {!!user.skills?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="rounded-full border px-3 py-1 text-xs bg-accent/10 text-foreground">
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="text-xs text-muted-foreground">+{user.skills.length - 4} more</span>
            )}
          </div>
        )}

        {/* SOCIALS */}
        <div className="mt-4 flex items-center gap-4 text-muted-foreground">
          {user.websiteUrl && <SocialIcon href={user.websiteUrl}><Globe /></SocialIcon>}
          {user.githubUrl && <SocialIcon href={user.githubUrl}><Github /></SocialIcon>}
          {user.linkedinUrl && <SocialIcon href={user.linkedinUrl}><Linkedin /></SocialIcon>}
          {user.twitterUrl && <SocialIcon href={user.twitterUrl}><Twitter /></SocialIcon>}
        </div>

        {/* CTA */}
        <Link href={`/admin/users/${user.userName}`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline text-black">
          View profile →
        </Link>
      </div>
    </div>
  );
};

/* ================= SOCIAL ICON ================= */

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="hover:text-foreground transition-all duration-200">
    {children}
  </a>
);
