"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  MapPin,
} from "lucide-react";
import { userProfile } from "../../server/user.profile.queries";
import { cn } from "@/lib/utils";
import { User, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


type Props = {
  profile: Awaited<ReturnType<typeof userProfile>> | null;
};

const container = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

const UserProfile = ({ profile }: Props) => {
    if (!profile || !profile.isProfileCompleted) {
        return <UserProfileEmpty isOwner />;
      }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background"
    >
      {/* ================= BANNER ================= */}
      <div className="relative h-40 sm:h-52 w-full bg-muted">
        {profile.bannerUrl && (
          <Image
            src={profile.bannerUrl}
            alt="Banner"
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative px-4 sm:px-8 pb-8">
        {/* AVATAR + NAME */}
        <div className="-mt-14 sm:-mt-20 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <motion.div
            variants={item}
            className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-background bg-muted overflow-hidden shadow-md"
          >
            {profile.avatarUrl && (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
              />
            )}
          </motion.div>

          <motion.div variants={item}>
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
              {profile.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              @{profile.userName}
            </p>
          </motion.div>
        </div>

        {/* HEADLINE */}
        {profile.headline && (
          <motion.p
            variants={item}
            className="mt-4 text-base sm:text-lg font-medium max-w-2xl"
          >
            {profile.headline}
          </motion.p>
        )}

        {/* META INFO */}
        <motion.div
          variants={item}
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          {profile.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </div>
          )}

          {profile.websiteUrl && (
            <a
              href={profile.websiteUrl}
              target="_blank"
              className="flex items-center gap-1.5 hover:text-foreground transition"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div
          variants={item}
          className="mt-5 flex items-center gap-4"
        >
          {profile.githubUrl && (
            <SocialIcon href={profile.githubUrl}>
              <Github />
            </SocialIcon>
          )}
          {profile.linkedinUrl && (
            <SocialIcon href={profile.linkedinUrl}>
              <Linkedin />
            </SocialIcon>
          )}
          {profile.twitterUrl && (
            <SocialIcon href={profile.twitterUrl}>
              <Twitter />
            </SocialIcon>
          )}
        </motion.div>

        {/* DESCRIPTION */}
        {profile.description && (
          <motion.div
            variants={item}
            className={cn(
              "prose prose-sm sm:prose-base mt-8 max-w-none",
              "prose-neutral dark:prose-invert"
            )}
            dangerouslySetInnerHTML={{
              __html: profile.description,
            }}
          />
        )}

        {/* SKILLS */}
        {Array.isArray(profile.skills) && profile.skills.length > 0 && (
          <motion.div variants={item} className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full border px-3 py-1 text-xs sm:text-sm font-medium bg-background"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default UserProfile;


const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.a
    href={href}
    target="_blank"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="text-muted-foreground hover:text-foreground transition"
  >
    {children}
  </motion.a>
);







type UserEmptyProps = {
  isOwner?: boolean;
};

const UserProfileEmpty = ({ isOwner = false }: UserEmptyProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl rounded-2xl border bg-background px-6 py-14 text-center"
    >
      {/* ICON */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
        <User className="h-7 w-7 text-muted-foreground" />
      </div>

      {/* TEXT */}
      <h2 className="text-xl font-semibold">
        Profile not completed
      </h2>

      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        {isOwner
          ? "You haven’t created your public profile yet. Complete your profile to showcase your skills and experience."
          : "This user hasn’t completed their profile yet."}
      </p>

      {/* CTA */}
      {isOwner && (
        <div className="mt-6">
          <Link href="/dashboard/settings">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Profile
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};


