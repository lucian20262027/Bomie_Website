import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Bomie AI | North America's First AI Commerce OS for Local Businesses & Creators",
  description:
    "North America's First AI Commerce OS for Local Businesses & Creators — AI smart matching, 30s script copilot, built-in FTC compliance, and 30/40/30 Stripe Escrow.",
  openGraph: {
    title: "Bomie AI — Where Local Businesses Meet Booming Creators",
    description:
      "North America's First AI Commerce OS for Local Businesses & Creators — AI smart matching, 30s script copilot, built-in FTC compliance, and 30/40/30 Stripe Escrow.",
    url: "https://www.bomie.ai",
    siteName: "Bomie AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bomie AI — Where Local Businesses Meet Booming Creators",
    description:
      "North America's First AI Commerce OS for Local Businesses & Creators.",
  },
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    shortcut: ["/icon.svg?v=2"],
    apple: ["/icon.svg?v=2"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.bomie.ai/#organization",
        name: "Bomie AI",
        legalName: "BOMIES LLC",
        url: "https://www.bomie.ai",
        logo: "https://www.bomie.ai/icon.svg?v=2",
        description:
          "North America's First AI Commerce OS for Local Businesses & Creators — AI smart matching, 30s script copilot, built-in FTC compliance, and 30/40/30 Stripe Escrow.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
        founder: {
          "@type": "Person",
          name: "Lucian Wang",
          sameAs: "https://www.linkedin.com/in/lucianwang18",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "lucian.wang@bomie.ai",
          contactType: "customer support",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "Bomie Commerce OS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.bomie.ai",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "$0 platform fee during MVP launch for local businesses and creators.",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
