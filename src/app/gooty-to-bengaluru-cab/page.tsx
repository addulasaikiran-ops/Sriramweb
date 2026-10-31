import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
export const metadata: Metadata = { title: "Gooty to Bengaluru Cab", description: "Request an outstation cab from Gooty to Bengaluru with Sriram Travels. Ask for vehicle options and a confirmed total fare.", alternates: { canonical: "/gooty-to-bengaluru-cab" } };
export default function Page() { return <ServiceLandingPage title="Gooty to Bengaluru Cab" service="a Gooty to Bengaluru cab" description="Ask Sriram Travels about an outstation cab from Gooty to Bengaluru. Share your pickup, date and return-trip requirements for a quote." fareLabel="Sample fare: [GOOTY_TO_BENGALURU_SAMPLE_FARE]. Replace with your confirmed quote guidance before publishing." />; }
