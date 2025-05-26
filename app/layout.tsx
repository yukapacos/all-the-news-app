import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Simple News Feed",
  description: "シンプルなニュースフィードのデモです",
  openGraph: {
    title: "Simple News Feed",
    description: "シンプルなニュースフィードのデモです",
    url: "https://news-feed.yukaten.com/",
    siteName: "Simple News Feed",
    images: [
      {
        url: "https://news-feed.yukaten.com/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Simple News Feed プレビュー画像",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple News Feed",
    description: "シンプルなニュースフィードのデモです",
    images: ["https://news-feed.yukaten.com/favicon.ico"],
    // site: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
