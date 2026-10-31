import Link from "next/link";
import { Phone, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/components/whatsapp";

export function ServiceLandingPage({ title, description, fareLabel, service }: { title: string; description: string; fareLabel: string; service: string }) {
  const message = `Hello Sriram Travels, I'd like to enquire about ${service} from Gooty. Please confirm availability, vehicle and total fare.`;
  return <main className="service-landing section-pad">
    <p className="eyebrow dark-eyebrow">SRIRAM TRAVELS · {site.location}</p>
    <h1>{title}</h1>
    <p>{description}</p>
    <section aria-labelledby="fare-heading"><h2 id="fare-heading">Fare information</h2><p>{fareLabel}</p><p>Final fare depends on the route, vehicle, trip duration and applicable tolls or other charges. Request a written quote before confirming.</p></section>
    <div className="hero-buttons"><a className="button button-gold" href={`tel:+${site.phone}`}><Phone size={16}/> Call Now</a><a className="button button-dark" href={buildWhatsAppUrl(message)} target="_blank" rel="noreferrer">WhatsApp Enquiry <ArrowUpRight size={16}/></a></div>
    <p><Link href="/">← Back to Sriram Travels home</Link></p>
  </main>;
}
