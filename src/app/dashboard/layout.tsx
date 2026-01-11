import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { notFound } from "next/navigation";
import DashboardLayoutClient from "@/app/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) notFound();

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
