import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "./whatsapp";

export function StickyContactBar() {
  return (
    <nav className="mobile-contact-bar" aria-label="Quick contact">
      <a className="mobile-contact-action" href={`tel:+${site.phone}`} aria-label="Call Sriram Travels">
        <Phone size={18} aria-hidden="true" />
        <span data-i18n="mobile-call">Call</span>
      </a>
      <a
        className="mobile-contact-action mobile-whatsapp-action"
        href={buildWhatsAppUrl("Hello Sriram Travels, I'd like to make an enquiry.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Send a WhatsApp enquiry"
      >
        <MessageCircle size={18} aria-hidden="true" />
        <span data-i18n="mobile-whatsapp">WhatsApp</span>
      </a>
      <a className="mobile-contact-action mobile-book-action" href="#enquiry" aria-label="Plan a trip">
        <CalendarDays size={18} aria-hidden="true" />
        <span data-i18n="mobile-book">Book trip</span>
      </a>
    </nav>
  );
}
