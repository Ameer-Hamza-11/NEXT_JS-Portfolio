"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, LayoutDashboard, User, FileText, PlusSquare, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Blogs", href: "/dashboard/posts", icon: FileText },
  { label: "My Posts", href: "/dashboard/posts/my-posts", icon: FileText },
  { label: "Create Post", href: "/dashboard/posts/create", icon: PlusSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const DashboardSidebar = ({
  open,
  onClose,
  isAdmin,
}: {
  open: boolean;
  onClose: () => void;
  isAdmin: boolean;
}) => {
  const pathname = usePathname();

  const finalNavItems = isAdmin
    ? [{ label: "Admin Panel", href: "/admin", icon: Shield }, ...navItems]
    : navItems;

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 h-screen w-72 bg-background border-r transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-sm text-muted-foreground">Workspace</p>
            <h2 className="font-semibold text-base">User Dashboard</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {finalNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer hint */}
        <div className="absolute bottom-0 w-full border-t px-5 py-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Manage your profile, blogs, and explore the portfolio from here.
          </p>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
