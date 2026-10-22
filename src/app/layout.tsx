import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sriram Travels | Premium Car Rentals & Towing",
  description: "Comfortable local and outstation car rentals, family journeys and towing assistance from Sriram Travels & Towing Services in Gooty, Andhra Pradesh.",
  applicationName: "Sriram Travels",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111b2b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
