import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Booking and fare information for Sriram Travels enquiries.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><a href="/">SRIRAM TRAVELS</a><a href="/">Back to website</a></header>
      <article className="legal-content">
        <p className="eyebrow dark-eyebrow">BOOKING INFORMATION</p>
        <h1>Terms &amp; Conditions</h1>
        <p><strong>Last updated:</strong> [TERMS_LAST_UPDATED]</p>
        <p>This starter page is not a final contract. The business owner must review it and fill in the actual policies before publication.</p>

        <h2>Enquiries and bookings</h2>
        <p>A website or WhatsApp enquiry is a request for information, not a confirmed booking. A booking is confirmed only after Sriram Travels communicates acceptance and the agreed trip details, payment terms and vehicle availability.</p>

        <h2>Fare and inclusions</h2>
        <p>Fare may depend on the selected vehicle, chargeable distance, minimum daily kilometres, trip duration, driver bata, tolls, parking, permits, night halt and agreed stops. All bracketed fare values on the website are placeholders and must be replaced with current, accurate amounts. Ask for a written itemised quote and confirm inclusions and exclusions before paying.</p>

        <h2>Vehicle and passenger details</h2>
        <p>Vehicle photos may be temporary placeholders until owner-supplied fleet photographs are added. Confirm the assigned vehicle, seat count, AC status, luggage capacity and passenger capacity before booking. Do not rely on any bracketed specification.</p>

        <h2>Changes, cancellations and refunds</h2>
        <p>Contact Sriram Travels as early as possible if you need to change or cancel a trip. Availability and any applicable charges depend on the policy agreed for the booking. The business owner must add the actual cancellation window, rescheduling terms, advance/refund rules and any fees here before accepting payments. No fixed fee or refund guarantee is stated by this template.</p>

        <h2>Towing and recovery</h2>
        <p>Towing and recovery enquiries are subject to location, vehicle condition, equipment and availability. The website's coverage and response-time fields are editable placeholders and do not promise a service level. If anyone is in immediate danger, contact local emergency services first.</p>

        <h2>Customer responsibilities</h2>
        <p>Provide accurate contact, pickup, destination, date, passenger and luggage details. Before departure, confirm the final fare, route, pickup time, vehicle, payment method and any additional charges directly with Sriram Travels.</p>

        <h2>Contact</h2>
        <p>{site.name}<br />{site.address}<br />{site.location}<br />Phone: {site.phoneDisplay}<br />Email: {site.email}</p>

        <h2>Owner review required</h2>
        <p>Fill in the effective date and actual business terms, and obtain appropriate legal review before publishing this page or accepting bookings under it.</p>
      </article>
      <footer className="legal-footer"><span>{site.name} · {site.location}</span><a href="/privacy-policy">Privacy Policy</a><a href="/">Home</a></footer>
    </main>
  );
}
