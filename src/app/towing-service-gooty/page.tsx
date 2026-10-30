import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Towing Service in Gooty | Sriram Travels",
  description: "Contact Sriram Travels to enquire about towing or vehicle recovery in Gooty. Share your location and vehicle issue to check coverage and availability.",
  alternates: { canonical: "/towing-service-gooty" },
};

export default function TowingServiceGootyPage() {
  return <SeoLandingPage eyebrow="TOWING & RECOVERY ENQUIRIES" title="Towing Service in Gooty" description="If your vehicle needs recovery, contact Sriram Travels with your current location, vehicle type and issue. Service coverage and response time are not guaranteed; check availability directly before relying on a response." fareLabel="Towing charge" fareValue="[TOWING_BASE_CHARGE]" details={[`Coverage: ${site.towingCoverage}`, `Typical response time: ${site.towingResponseTime}`, "Share your location or nearest landmark and vehicle details.", "If anyone is in immediate danger, contact local emergency services first."]} whatsappMessage="Hello Sriram Travels, I need towing / vehicle recovery. Location: ____. Vehicle: ____. Problem: ____. Please confirm coverage, availability, response time and charge." />;
}
