"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  UserIcon,
  Home,
  HomeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutUserAction } from "@/features/auth/server/auth.actions";

const sidebarItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "User Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "All Users", href: "/admin/users", icon: UserIcon },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <span className="text-sm font-semibold">Admin Panel</span>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-background md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
              className="fixed left-0 top-0 z-50 h-screen w-full max-w-[100vw] border-r bg-background"
            >
              <div className="flex h-14 items-center justify-between border-b px-4">
                <span className="text-sm font-semibold">Admin Panel</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <>
      <nav className="flex flex-col gap-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                "text-muted-foreground transition",
                "hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </div>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full border-t p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          onClick={logoutUserAction}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </motion.button>
      </div>
    </>
  );
};

export default AdminSideBar;
