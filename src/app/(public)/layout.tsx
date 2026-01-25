import NavbarWrapper from "@/features/users/components/NavbarWrapper";
import Footer from "@/features/users/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hamza | Full Stack Developer",
    template: "%s | Hamza Portfolio",
  },
  description:
    "Hamza is a Full Stack Developer specializing in Next.js, React, TypeScript, Node.js, MySQL & MongoDB. View projects, skills, and experience.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "MySQL",
    "MongoDB",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Ameer Hamza" }],
  creator: "Ameer Hamza",

  metadataBase: new URL("https://mern-portfolio-by-hamza.netlify.app"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hamza | Full Stack Developer",
    description:
      "Modern portfolio built with Next.js, Tailwind CSS, shadcn/ui & TypeScript.",
    url: "https://mern-portfolio-by-hamza.netlify.app",
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
      "Full Stack Developer skilled in Next.js, React & modern web technologies.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-neutral-50 text-neutral-600">
      <NavbarWrapper />

      <div className="pt-[8ch] flex-1">{children}</div>

      <Footer />
    </main>
  );
}
  