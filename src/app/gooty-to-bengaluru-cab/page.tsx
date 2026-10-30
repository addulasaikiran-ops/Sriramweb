import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Gooty to Bengaluru Cab | Sriram Travels",
  description: "Request a cab quote from Gooty to Bengaluru. Check vehicle options, trip details and current fare with Sriram Travels before confirming.",
  alternates: { canonical: "/gooty-to-bengaluru-cab" },
};

export default function GootyToBengaluruCabPage() {
  return <SeoLandingPage eyebrow="GOOTY TO BENGALURU CAB" title="Cab from Gooty to Bengaluru" description="Ask about a cab for travel between Gooty and Bengaluru. Share your travel date, pickup location, passenger count and trip type to receive a route-specific quote." fareLabel="Sample route fare" fareValue="[GOOTY_BENGALURU_SAMPLE_FARE]" details={["Specify your pickup area and destination in Bengaluru.", "Ask us to confirm distance and expected journey time for your date.", "Request a written breakdown of fare inclusions and extra charges."]} whatsappMessage="Hello Sriram Travels, I need a cab from Gooty to Bengaluru. Date: ____. Pickup area: ____. Passengers: ____. One-way/round trip: ____. Please confirm availability and fare." />;
}
