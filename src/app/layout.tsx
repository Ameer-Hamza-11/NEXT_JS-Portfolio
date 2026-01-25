import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user-context";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

export const metadata: Metadata = {
  title: {
    default: "Hamza | Full Stack Developer",
    template: "%s | Hamza Portfolio",
  },
  description:
    "Hamza is a Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, MySQL & MongoDB. Explore projects, skills, and experience.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "MySQL",
    "MongoDB",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Ameer Hamza" }],
  creator: "Ameer Hamza",
  metadataBase: new URL("https://your-portfolio-url.com"),
  openGraph: {
    title: "Hamza | Full Stack Developer",
    description:
      "Modern Full Stack Developer portfolio built with Next.js, Tailwind CSS, shadcn/ui & MySQL.",
    url: "https://your-portfolio-url.com",
    siteName: "Hamza Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hamza Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza | Full Stack Developer",
    description:
      "Full Stack Developer skilled in Next.js, React, Node.js & Databases.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // icons: {
  //   icon: "/logo.svg",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // }
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster richColors position="top-right" />
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
