import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PutturBus | The Best Bus Guide for Puttur",
  description: "Find latest KSRTC bus timings, routes, and stops for Puttur. The smartest way to travel in Puttur. Powered by Sitexar.",
};

import Analytics from "@/components/Analytics";
import PageViewTracker from "@/components/PageViewTracker";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { OfflineIndicator } from "@/components/OfflineIndicator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans bg-background text-foreground`}>
        <Analytics />
        <PageViewTracker />
        <LanguageProvider>
          <OfflineIndicator />
          <SiteHeader />
          {children}
          <Footer />
        </LanguageProvider>
      </body>

    </html>
  );
}
