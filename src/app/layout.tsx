import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bomie.ai"),
  title: "No.1 Small Business & Creators Platform | Bomie AI",
  description:
    "The first platform in North America for local businesses and local creators — AI smart matching, autonomous campaign orchestration, and built-in FTC compliance.",
  openGraph: {
    title: "Bomie AI — Where Local Businesses Meet Booming Creators",
    description:
      "First Platform in North America for Local Businesses & Local Creators. AI smart matching, 4-stage autonomous campaign OS, and built-in FTC compliance.",
    url: "https://www.bomie.ai",
    siteName: "Bomie AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bomie AI — Where Local Businesses Meet Booming Creators",
    description:
      "First Platform in North America for Local Businesses & Local Creators.",
  },
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/icon.svg?v=2"],
    apple: ["/icon.svg?v=2"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
