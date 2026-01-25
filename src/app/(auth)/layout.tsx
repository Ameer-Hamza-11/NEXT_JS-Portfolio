import { getCurrentUser } from "@/features/auth/server/auth.queries";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Authentication",
    template: "%s | Hamza Portfolio",
  },
  description:
    "Login or register to access your dashboard and manage your profile on Hamza's portfolio platform.",

  authors: [{ name: "Ameer Hamza" }],
  creator: "Ameer Hamza",

  robots: {
    index: false, 
    follow: false,
  },

  openGraph: {
    title: "Login / Register | Hamza Portfolio",
    description:
      "Secure authentication pages for Hamza's full stack portfolio.",
    siteName: "Hamza Portfolio",
    type: "website",
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/"); // already logged in
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-6">{children}</div>
    </main>
  );
}
