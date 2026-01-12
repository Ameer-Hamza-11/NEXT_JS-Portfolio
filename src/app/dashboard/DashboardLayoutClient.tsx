"use client";

import React, { useState } from "react";
import DashboardSidebar from "@/features/users/components/Dashboard/DashboardSidebar";
import DashboardNavbar from "@/features/users/components/Dashboard/DashboardNavbar";

const DashboardLayoutClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
  
      <DashboardNavbar onMenuClick={() => setOpen(true)} />

   
      <DashboardSidebar open={open} onClose={() => setOpen(false)} />

     
      <main className="pt-[8ch] md:pl-64">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayoutClient;
