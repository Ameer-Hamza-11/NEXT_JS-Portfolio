import { UserProvider } from "@/context/user-context";
import AdminSideBar from "@/features/admin/components/AdminSideBar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin Panel",
  },
  description:
    "Admin dashboard for managing portfolio content, users, projects, and system settings.",
  authors: [{ name: "Ameer Hamza" }],
  creator: "Ameer Hamza",

  robots: {
    index: false,   // 🔒 IMPORTANT
    follow: false,
  },

  openGraph: {
    title: "Admin Dashboard | Hamza Portfolio",
    description:
      "Private admin panel for managing the Hamza Full Stack Developer portfolio.",
    siteName: "Hamza Portfolio Admin",
    type: "website",
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    notFound(); // or redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSideBar />

      <main className="pt-14 md:pl-64">
        <div className="p-4 md:p-6">
          <UserProvider user={user}>{children}</UserProvider>
        </div>
      </main>
    </div>
  );
}
