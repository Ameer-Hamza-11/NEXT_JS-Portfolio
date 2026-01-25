import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "@/app/dashboard/DashboardLayoutClient";
import { UserProvider } from "@/context/user-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "User Dashboard",
    template: "%s | Dashboard",
  },
  description:
    "User dashboard to manage profile, settings, projects, and activity inside Hamza's portfolio platform.",

  authors: [{ name: "Ameer Hamza" }],
  creator: "Ameer Hamza",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "User Dashboard | Hamza Portfolio",
    description:
      "Private user dashboard for managing account and personal data.",
    siteName: "Hamza Portfolio",
    type: "website",
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <DashboardLayoutClient isAdmin={user.role === "admin"}>
      <UserProvider user={user}>{children}</UserProvider>
    </DashboardLayoutClient>
  );
}
