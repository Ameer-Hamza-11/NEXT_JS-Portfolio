"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  FileText,
  MessageSquare,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* AI Welcome */}
      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-xl font-semibold">
          Welcome to your personal dashboard 🤖
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          This dashboard helps you manage your profile, write and edit blog
          posts, contact the admin, and explore the portfolio. Everything is
          designed to be simple and focused.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <ActionCard
          icon={User}
          title="Create / Update Profile"
          description="Build your public profile by adding skills, bio, and social links."
          href="/dashboard/settings"
        />

        <ActionCard
          icon={FileText}
          title="Manage Blog Posts"
          description="Create new blogs or edit and delete your existing posts."
          href="/dashboard/posts"
        />

        <ActionCard
          icon={MessageSquare}
          title="Contact Admin"
          description="Send messages to the admin for help, feedback, or collaboration."
          href="/"
        />

        <ActionCard
          icon={Globe}
          title="Explore Portfolio"
          description="Browse projects, blogs, and see what this portfolio offers."
          href="/"
        />
      </div>
    </div>
  );
};

export default UserDashboard;

/* ================= ACTION CARD ================= */

const ActionCard = ({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Card className="group border bg-background transition hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>

        <p className="text-sm text-muted-foreground flex-1">
          {description}
        </p>

        <Button
          asChild
          variant="ghost"
          className="justify-between px-0"
        >
          <Link href={href}>
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
