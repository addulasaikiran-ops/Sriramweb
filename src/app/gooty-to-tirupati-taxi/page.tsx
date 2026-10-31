import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
export const metadata: Metadata = { title: "Gooty to Tirupati Taxi", description: "Enquire about a driver-included taxi from Gooty to Tirupati with Sriram Travels. Confirm vehicle availability and fare before booking.", alternates: { canonical: "/gooty-to-tirupati-taxi" } };
export default function Page() { return <ServiceLandingPage title="Gooty to Tirupati Taxi" service="a Gooty to Tirupati taxi" description="Plan a trip from Gooty to Tirupati with Sriram Travels. Share your travel date, pickup point and passenger count to request a suitable vehicle." fareLabel="Contact Sriram Travels for a current route quote and confirm the total fare before booking." />; }
