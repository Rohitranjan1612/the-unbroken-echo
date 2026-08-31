import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getSiteUrl, siteConfig } from "@/lib/config";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.author}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  keywords: [
    siteConfig.name,
    siteConfig.author,
    "Shadows of Us",
    "Indian author",
    "contemporary fiction",
    "poetry",
    "literary blog",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteUrl,
              author: {
                "@type": "Person",
                name: siteConfig.author,
                jobTitle: "Software Engineer and Author",
              },
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
