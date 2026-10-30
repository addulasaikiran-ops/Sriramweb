import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";

export const metadata: Metadata = {
  title: "Tempo Traveller on Rent in Gooty | Sriram Travels",
  description: "Enquire about a Tempo Traveller for family trips, group travel and outstation journeys from Gooty. Confirm seat count, luggage space and fare.",
  alternates: { canonical: "/tempo-traveller-on-rent-gooty" },
};

export default function TempoTravellerOnRentGootyPage() {
  return <SeoLandingPage eyebrow="TEMPO TRAVELLER RENTAL" title="Tempo Traveller on Rent in Gooty" description="Planning a family outing, group journey or pilgrimage? Ask Sriram Travels about available group vehicles and confirm the exact seat count, AC, luggage capacity and fare before booking." fareLabel="Per-kilometre rate" fareValue="[TEMPO_TRAVELLER_RATE_PER_KM]" details={["Tell us the passenger count and luggage requirements.", "Confirm which Traveller variant and seat count will be assigned.", "Ask whether driver bata, tolls, parking and night halt are included."]} whatsappMessage="Hello Sriram Travels, I need a Tempo Traveller from Gooty. Destination: ____. Date: ____. Passenger count: ____. Luggage: ____. Please confirm the seat-count variant, availability and itemised fare." />;
}
