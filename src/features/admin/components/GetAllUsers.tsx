"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Github, Linkedin, Twitter, User } from "lucide-react";
import { UserItem } from "@/features/users/server/user.profile.action";
import { deleteUserByUserName } from "../server/admin.action";
import { toast } from "sonner";

type GetAllUsersProps = {
  result:
    | { status: "ERROR"; message: string }
    | { status: "SUCCESS"; data: UserItem[] };
};

const GetAllUsers = ({ result }: GetAllUsersProps) => {
  if (result.status === "ERROR") {
    return (
      <div className="text-center text-destructive text-xl">
        {result.message}
      </div>
    );
  }

  if (!result.data.length) {
    return (
      <div className="text-center text-muted-foreground">
        No users found
      </div>
    );
  }

  const handleDelete = async (username: string) => {
    const ok = confirm(`Are you sure you want to delete @${username}?`);
    if (!ok) return;

    const res = await deleteUserByUserName(username);

    if (res.status === "SUCCESS") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {result.data.map((user) => (
        <UserCard
          key={user.userName}
          user={user}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default GetAllUsers;

/* ================= USER CARD ================= */

import { Trash } from "lucide-react";
import { useState } from "react";

const UserCard = ({
  user,
  onDelete,
}: {
  user: UserItem;
  onDelete: (username: string) => Promise<void>;
}) => {
  const [deleting, setDeleting] = useState(false);

  const name = user.name?.trim() || "Anonymous User";
  const username = user.userName?.trim() || "username";

  const handleClick = async () => {
    try {
      setDeleting(true);
      await onDelete(username);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border bg-background shadow-sm hover:shadow-md transition">

      {/* ===== Delete Button ===== */}
      <button
        onClick={handleClick}
        disabled={deleting}
        className="absolute top-3 right-3 z-10 rounded-full p-2 text-destructive hover:bg-destructive/10 disabled:opacity-50"
        title="Delete user"
      >
        <Trash className="h-4 w-4" />
      </button>

      {/* ===== Banner ===== */}
      <div className="relative h-24">
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
      <div className="flex justify-center relative bottom-5">
        <div className="h-16 w-16 rounded-full border-4 border-background bg-muted overflow-hidden flex items-center justify-center">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={name}
              width={64}
              height={64}
              className="object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="px-5 pt-3 pb-5 text-center">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-muted-foreground">@{username}</p>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {user.headline || "This user hasn’t added a headline yet."}
        </p>

        {!!user.skills?.length && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {user.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-3 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-center gap-4 text-muted-foreground">
          {user.websiteUrl && <SocialIcon href={user.websiteUrl}><Globe /></SocialIcon>}
          {user.githubUrl && <SocialIcon href={user.githubUrl}><Github /></SocialIcon>}
          {user.linkedinUrl && <SocialIcon href={user.linkedinUrl}><Linkedin /></SocialIcon>}
          {user.twitterUrl && <SocialIcon href={user.twitterUrl}><Twitter /></SocialIcon>}
        </div>

        <Link
          href={`/admin/users/${username}`}
          className="mt-4 inline-block text-sm font-medium text-black hover:underline"
        >
          View profile →
        </Link>
      </div>
    </div>
  );
};


/* ================= SOCIAL ICON ================= */

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
