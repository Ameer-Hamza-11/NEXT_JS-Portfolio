"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, User, FileText, MessageSquare } from 'lucide-react';
import { DataLengthType } from '../server/admin.action';

const AdminDashboard = ({result}: {result: DataLengthType}) => {
    if (result.status === "ERROR") {
        return <div className="text-center text-destructive text-xl">{result.message}</div>;
    }
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard icon={User} title="Users" value={result.data.userCount} />
        <DashboardCard icon={FileText} title="Blogs" value={result.data.postsCount} />
        <DashboardCard icon={MessageSquare} title="Messages" value={result.data.messagesCount} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-background border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent users added.</p>
          </CardContent>
        </Card>

        <Card className="bg-background border shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Recent Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent blogs yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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

export default AdminDashboard;