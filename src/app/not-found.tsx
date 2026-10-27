import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/components/whatsapp";
export default function NotFound() { return <main className="not-found-page"><p className="eyebrow dark-eyebrow">SRIRAM TRAVELS</p><h1>Wrong turn.</h1><p>That page could not be found. Let&apos;s get you back on the road.</p><div className="not-found-actions"><Link className="button button-gold" href="/">Back to home</Link><a className="button button-dark" href={`tel:+${site.phone}`}><Phone size={16}/> Call us</a><a className="button button-dark" href={buildWhatsAppUrl("Hello Sriram Travels, I need help finding a page on your website.")} target="_blank" rel="noreferrer">WhatsApp</a></div></main>; }
