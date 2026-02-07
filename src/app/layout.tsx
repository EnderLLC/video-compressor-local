import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CookieBanner from "@/components/ui/cookie-banner";
import { WorkspaceProvider } from "@/context/workspace-context";
import { RecentFilesDrawer } from "@/components/layout/recent-files-drawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Video Compressor - Compress MP4/MOV Locally (No Upload)",
  description: "The fastest local video compressor. Reduce file size of MP4, MOV, AVI videos in your browser without uploading to any server. 100% Private & Free.",
  keywords: ["video compressor", "video converter", "mov to mp4", "avi to mp4", "mkv to mp4", "mp4 to gif", "mp3 extractor", "local video converter", "browser video compression", "no upload video tools"],
  appleWebApp: {
    capable: true,
    title: "LMT",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  // Google Search Console verification (uncomment when you have the verification code)
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <WorkspaceProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
          <RecentFilesDrawer />
        </WorkspaceProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4791649357996475"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
