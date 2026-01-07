import type { Metadata } from "next";




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

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
