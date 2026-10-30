import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Gooty to Tirupati Taxi | Sriram Travels",
  description: "Enquire about a taxi from Gooty to Tirupati with Sriram Travels. Share your date and passenger count for availability and a written fare quote.",
  alternates: { canonical: "/gooty-to-tirupati-taxi" },
};

export default function GootyToTirupatiTaxiPage() {
  return <SeoLandingPage eyebrow="GOOTY TO TIRUPATI TAXI" title="Taxi from Gooty to Tirupati" description="Plan a trip from Gooty to Tirupati with a vehicle suited to your group. Contact Sriram Travels to check availability and get an itemised quote before booking." fareLabel="Sample route fare" fareValue="[GOOTY_TIRUPATI_SAMPLE_FARE]" details={["Confirm one-way or round-trip requirements.", "Ask for the current route distance and estimated travel time.", "Confirm tolls, driver bata and night-halt charges in the written quote."]} whatsappMessage="Hello Sriram Travels, I need a taxi from Gooty to Tirupati. Date: ____. Passengers: ____. One-way/round trip: ____. Please confirm vehicle availability and itemised fare." />;
}
