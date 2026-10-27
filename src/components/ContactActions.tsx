import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "./whatsapp";
export function ContactActions(){return <div className="contact-actions"><a className="button button-gold" href={buildWhatsAppUrl("Hello Sriram Travels, I'd like to make an enquiry.")}>Start a WhatsApp enquiry</a><a href={`tel:+${site.phone}`} className="button button-contact-outline"><Phone size={15}/>{site.phoneDisplay}</a></div>;}