import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "./whatsapp";
export function StickyContactBar(){return <div className="mobile-contact-bar" aria-label="Quick contact"><a href={`tel:+${site.phone}`}><Phone size={18}/> Call</a><a href={buildWhatsAppUrl("Hello Sriram Travels, I'd like to make an enquiry.")} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a></div>;}
