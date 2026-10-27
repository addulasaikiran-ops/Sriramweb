import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteDescription =
  "Explore car rental, local and outstation travel, family and group journeys, and towing enquiries with Sriram Travels in Gooty, Andhra Pradesh.";

export const metadata: Metadata = {
  title: {
    default: "Sriram Travels | Car Rentals & Towing in Gooty",
    template: "%s | Sriram Travels",
  },
  description: siteDescription,
  applicationName: "Sriram Travels",
  keywords: [
    "Sriram Travels",
    "car rentals in Gooty",
    "outstation car rental",
    "family travel",
    "group travel",
    "towing services in Gooty",
    "Andhra Pradesh travel",
  ],
  openGraph: {
    type: "website",
    title: "Sriram Travels | Car Rentals & Towing in Gooty",
    description: siteDescription,
    siteName: "Sriram Travels",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
