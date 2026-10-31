import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const siteDescription =
  "Explore car rental, local and outstation travel, family and group journeys, and towing enquiries with Sriram Travels in Gooty, Andhra Pradesh.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  title: {
    default: "Sriram Travels | Car Rentals & Towing in Gooty",
    template: "%s | Sriram Travels",
  },
  description: siteDescription,
  applicationName: "Sriram Travels",
  openGraph: {
    type: "website",
    title: "Sriram Travels | Car Rentals & Towing in Gooty",
    description: siteDescription,
    siteName: "Sriram Travels",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sriram Travels — travel enquiries" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "Sriram Travels | Car Rentals & Towing in Gooty",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111b2b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${manrope.variable} ${cormorant.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { if (window.sessionStorage.getItem("sriram-hanuman-intro-seen") === "1") document.documentElement.dataset.hanumanIntroSeen = "true"; } catch {}`,
          }}
        />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": ["LocalBusiness", "TaxiService"], name: site.name, telephone: `+${site.phone}`, address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Gooty", addressRegion: "Andhra Pradesh", addressCountry: "IN" }, areaServed: { "@type": "AdministrativeArea", name: site.location } }).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
