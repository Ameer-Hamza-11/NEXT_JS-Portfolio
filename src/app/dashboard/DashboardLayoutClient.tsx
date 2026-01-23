"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/features/users/components/Dashboard/DashboardSidebar";
import DashboardNavbar from "@/features/users/components/Dashboard/DashboardNavbar";

const DashboardLayoutClient = ({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top navbar */}
      <DashboardNavbar onMenuClick={() => setOpen(true)} />

      {/* Sidebar */}
      <DashboardSidebar
        isAdmin={isAdmin}
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main
        className="
          pt-[8ch]
          md:pl-72
          transition-all
        "
      >
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
