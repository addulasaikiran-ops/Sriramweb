import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Brand footer />
        <div className="footer-business-details">
          <strong>{site.name}</strong>
          <span><MapPin size={14} /> {site.address}</span>
          <a href={`tel:+${site.phone}`}><Phone size={14} /> {site.phoneDisplay}</a>
          <span>{site.location}</span>
        </div>
        <span className="footer-tagline">TAKE THE SCENIC ROUTE.</span>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} {site.name}. Please review our policies before booking.</span>
        <nav className="footer-legal-links" aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <a className="back-top" href="#home">BACK TO TOP ↑</a>
        </nav>
      </div>
    </footer>
  );
}
