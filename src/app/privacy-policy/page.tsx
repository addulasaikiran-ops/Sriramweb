import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sriram Travels handles enquiry information and website analytics.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><a href="/">SRIRAM TRAVELS</a><a href="/">Back to website</a></header>
      <article className="legal-content">
        <p className="eyebrow dark-eyebrow">WEBSITE INFORMATION</p>
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> [POLICY_LAST_UPDATED]</p>
        <p>This page is a starter template and must be reviewed and completed by the business owner before publication.</p>

        <h2>Information you provide</h2>
        <p>When you submit the enquiry form, the website may process your name, phone number, pickup point, destination, travel date and any optional trip details you enter. The website attempts to send these details to a configured Google Sheets webhook. If that service is not configured or is unavailable, the form displays a warning and offers a WhatsApp handoff.</p>

        <h2>WhatsApp and phone contact</h2>
        <p>When you choose a WhatsApp or phone link, you leave or initiate contact through the relevant service. WhatsApp opens with a pre-filled message; you must review and send it yourself. WhatsApp and your mobile/network provider process information under their own terms and privacy practices.</p>

        <h2>Analytics</h2>
        <p>If Google Analytics 4 is enabled through the website configuration, the site records general events such as phone-link clicks, WhatsApp-link clicks and valid enquiry form submissions. Do not configure analytics to collect names, phone numbers, message contents or other personal details.</p>

        <h2>Use and retention</h2>
        <p>Enquiry information should be used to respond to travel or towing requests and manage related bookings. The business owner must define who can access the connected spreadsheet, how long records are retained, and how deletion or access requests are handled.</p>

        <h2>Security and third parties</h2>
        <p>The site uses basic server-side validation and spam controls, but no internet transmission or storage method can be guaranteed completely secure. Data may be handled by hosting, Google Sheets/Apps Script, Google Analytics or WhatsApp when those services are enabled.</p>

        <h2>Your choices and contact</h2>
        <p>To ask about enquiry information or request a correction, contact {site.name} at {site.phoneDisplay}. Business address: {site.address}. Add a verified privacy contact email here: [PRIVACY_CONTACT_EMAIL].</p>

        <h2>Owner review required</h2>
        <p>Before launch, replace the date and contact placeholders, confirm the actual data processors and retention practices, and obtain appropriate legal review for applicable Indian privacy and consumer requirements.</p>
      </article>
      <footer className="legal-footer"><span>{site.name} · {site.location}</span><a href="/terms">Terms</a><a href="/">Home</a></footer>
    </main>
  );
}
