import AdminSideBar from "@/features/admin/components/AdminSideBar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { notFound, redirect } from "next/navigation";

// const geistSans = Montserrat({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "%s | My Site" },
  description: "next-js portfolio by ameer hamza using typescript",
  authors: { name: "ameerhamza" },
  openGraph: {
    title: "My Next-js Portfolio",
    description: "Welcome to My Portfolio",
    url: "https://mern-portfolio-by-hamza.netlify.app",
    siteName: "My Site",
    images: [
      {
        url: "https://60lubhnpkm.ufs.sh/f/vGItfculpA5wGVJ5Gwr0EkJseWmHVZhFTdC4DbYNxMz85PUB",
      },
    ],
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    notFound();
  }
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <main className="pt-14 md:pl-64">
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
