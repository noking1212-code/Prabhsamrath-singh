import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prabhsamrath.com"),
  title: {
    default: "Prabhsamrath Singh | Developer, Builder, Entrepreneur",
    template: "%s | Prabhsamrath Singh"
  },
  description: "Building products, exploring AI, and sharing the journey publicly.",
  openGraph: {
    title: "Prabhsamrath Singh",
    description: "Developer. Builder. Entrepreneur.",
    url: "https://prabhsamrath.com",
    siteName: "Prabhsamrath Singh",
    images: [{ url: "/images/profile.jpg", width: 1200, height: 1200 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhsamrath Singh",
    description: "Building products, exploring AI, and sharing the journey publicly.",
    images: ["/images/profile.jpg"]
  },
  icons: {
    icon: "/images/profile.jpg"
  }
};

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-ink font-sans text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
