"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, MessageSquare } from "lucide-react";
import { DataLengthType } from "../server/admin.action";
import RecentUsers from "./RecentUsers";
import RecentBlogs from "./RecentBlogs";


type Props = {
  result: DataLengthType;
  recentUsers: any;
  recentBlogs: any;
};

const AdminDashboard = ({ result, recentUsers, recentBlogs }: Props) => {
  if (result.status === "ERROR") {
    return (
      <div className="text-center text-destructive text-xl">
        {result.message}
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* COUNTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard icon={User} title="Users" value={result.data.userCount} />
        <DashboardCard icon={FileText} title="Blogs" value={result.data.postsCount} />
        <DashboardCard
          icon={MessageSquare}
          title="Messages"
          value={result.data.messagesCount}
        />
      </div>

      {/* RECENTS */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
  <CardHeader>
    <CardTitle>Recent Users</CardTitle>
  </CardHeader>
  <CardContent>
    {recentUsers.status === "ERROR" ? (
      <p className="text-destructive">{recentUsers.message}</p>
    ) : (
      <RecentUsers data={recentUsers.data} />
    )}
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Recent Blogs</CardTitle>
  </CardHeader>
  <CardContent>
    {recentBlogs.status === "ERROR" ? (
      <p className="text-destructive">{recentBlogs.message}</p>
    ) : (
      <RecentBlogs data={recentBlogs.data} />
    )}
  </CardContent>
</Card>
      </div>
    </div>
  );
};

export default AdminDashboard;


const DashboardCard = ({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: number }) => (
  <Card className="bg-background border shadow-sm hover:shadow-md transition-all duration-300">
    <CardContent className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-muted text-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-foreground font-semibold text-lg">{value}</p>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
    </CardContent>
  </Card>
);
