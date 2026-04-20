import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nastaranloghmani.com"),
  title: {
    default: "Nastaran Loghmani - UX/UI Developer & Product Designer",
    template: "%s | Nastaran Loghmani",
  },
  description:
    "UX/UI Developer and product designer building AI-driven digital experiences. Specializing in data research, user-centered design, and modern frontend development.",
  keywords: [
    "UX UI Developer",
    "Product Designer",
    "Frontend Developer",
    "AI-driven design",
    "React",
    "Next.js",
    "Figma",
    "Nastaran Loghmani",
  ],
  authors: [{ name: "Nastaran Loghmani", url: "https://github.com/nastaranloghmani" }],
  creator: "Nastaran Loghmani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nastaranloghmani.com",
    title: "Nastaran Loghmani - UX/UI Developer & Product Designer",
    description:
      "UX/UI Developer and product designer building AI-driven digital experiences.",
    siteName: "Nastaran Loghmani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nastaran Loghmani - UX/UI Developer & Product Designer",
    description:
      "UX/UI Developer and product designer building AI-driven digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nastaranloghmani.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
