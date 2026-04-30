import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theunbrokenecho.com"),
  title: {
    default: "The Unbroken Echo | Rohit Ranjan",
    template: "%s | The Unbroken Echo",
  },
  description:
    "A literary platform for Rohit Ranjan: books, poetry, essays, and reflections where code meets prose.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Rohit Ranjan" }],
  creator: "Rohit Ranjan",
  publisher: "The Unbroken Echo",
  keywords: [
    "The Unbroken Echo",
    "Rohit Ranjan",
    "Shadows of Us",
    "Indian author",
    "contemporary fiction",
    "poetry",
    "literary blog",
  ],
  openGraph: {
    title: "The Unbroken Echo",
    description:
      "Stories, poems, and reflections exploring love, memory, and the quiet echoes we carry.",
    url: "https://theunbrokenecho.com",
    siteName: "The Unbroken Echo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unbroken Echo",
    description:
      "Books, poetry, essays, and reflections from Rohit Ranjan.",
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
              name: "The Unbroken Echo",
              url: "https://theunbrokenecho.com",
              author: {
                "@type": "Person",
                name: "Rohit Ranjan",
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
