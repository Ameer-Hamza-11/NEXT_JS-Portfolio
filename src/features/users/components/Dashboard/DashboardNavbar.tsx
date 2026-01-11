"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardNavbar = ({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) => {
  return (
<header className="fixed top-0 z-40 h-[8ch] w-full border-b bg-background">
      <div className="flex h-full items-center px-4 gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
    </header>
  );
};

export default DashboardNavbar;
