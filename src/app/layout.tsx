import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/features/users/components/Navbar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "My Next-js Portfolio", template: "%s | My Site" },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        <main className="w-full min-h-screen flex flex-col bg-neutral-50 text-neutral-600">
          <Navbar user={user} />

          <div className="pt-[8ch]">{children}</div>
        </main>
       
      </body>
    </html>
  );
}
