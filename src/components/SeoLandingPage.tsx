import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { rates } from "@/data/rates";
import { buildWhatsAppUrl } from "@/components/whatsapp";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  fareLabel: string;
  fareValue: string;
  details: string[];
  whatsappMessage: string;
};

export function SeoLandingPage({ eyebrow, title, description, fareLabel, fareValue, details, whatsappMessage }: Props) {
  return (
    <main className="seo-landing-page">
      <header className="seo-landing-header"><Link href="/" aria-label="Sriram Travels home">SRIRAM TRAVELS</Link><a href={`tel:+${site.phone}`}><Phone size={16}/> {site.phoneDisplay}</a></header>
      <section className="seo-landing-hero">
        <p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p>
        <h1>{title}</h1>
        <p className="seo-landing-description">{description}</p>
        <div className="seo-landing-actions"><a className="button button-gold" href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">WhatsApp Enquiry <ArrowUpRight size={16}/></a><a className="button button-outline" href={`tel:+${site.phone}`}><Phone size={16}/> Call Now</a></div>
      </section>
      <section className="seo-landing-content section-pad">
        <div className="seo-fare-card"><span>{fareLabel}</span><strong>{fareValue}</strong><p>Fare placeholder only. Ask Sriram Travels for an itemised quote for your date, vehicle and trip plan.</p><a className="text-link" href={buildWhatsAppUrl(whatsappMessage)}>Request exact fare <ArrowUpRight size={16}/></a></div>
        <div className="seo-route-details"><h2>Plan your trip from Gooty</h2><p><MapPin size={16}/> {site.location}</p><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p>Quote factors may include the selected vehicle, chargeable kilometres, minimum daily kilometres ({rates.minimumDailyKm}), driver bata ({rates.driverBata}), tolls ({rates.tollPolicy}), night halt ({rates.nightHalt}) and agreed stops. These bracketed values are editable placeholders until filled with verified business rates.</p></div>
      </section>
      <section className="seo-landing-bottom"><h2>Ready to enquire?</h2><p>Share your pickup point, destination, travel date and passenger count.</p><a className="button button-gold" href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">Get a WhatsApp Quote <ArrowUpRight size={16}/></a></section>
      <footer className="seo-landing-footer"><span>{site.name} · {site.location}</span><Link href="/">Home</Link><Link href="/#rates">Rates</Link><Link href="/#contact">Contact</Link></footer>
    </main>
  );
}
