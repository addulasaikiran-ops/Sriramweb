import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], style: ["italic", "normal"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl).origin : "https://sriramweb-zctj.vercel.app";

const siteDescription =
  "Explore car rental, local and outstation travel, family and group journeys, and towing enquiries with Sriram Travels in Gooty, Andhra Pradesh.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
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
    ...(siteUrl ? { images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Sriram Travels — travel enquiries" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    ...(siteUrl ? { images: [`${siteUrl}/opengraph-image`] } : {}),
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

const businessId = siteUrl ? `${siteUrl}/#business` : undefined;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "TaxiService"],
      ...(businessId ? { "@id": businessId } : {}),
      name: site.name,
      ...(siteUrl ? {
        url: siteUrl,
        image: `${siteUrl}/opengraph-image`,
        logo: `${siteUrl}/icon.svg`,
      } : {}),
      description: siteDescription,
      telephone: `+${site.phone}`,
      ...(site.email !== "[BUSINESS_EMAIL]" ? { email: site.email } : {}),
      ...(site.address !== "[BUSINESS_ADDRESS]" ? { address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Gooty", addressRegion: "Andhra Pradesh", addressCountry: "IN" } } : {}),
      areaServed: {
        "@type": "Place",
        name: "Gooty, Andhra Pradesh, India",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Travel and roadside assistance enquiries",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local and outstation car rental" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family and group travel" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Towing and recovery enquiries" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      ...(siteUrl ? { "@id": `${siteUrl}/#website`, url: siteUrl } : {}),
      name: site.name,
      inLanguage: "en-IN",
      ...(businessId ? { publisher: { "@id": businessId } } : { publisher: { "@type": ["LocalBusiness", "TaxiService"], name: site.name } }),
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
