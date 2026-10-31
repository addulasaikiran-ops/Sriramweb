import { Phone, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "./whatsapp";

function isConfigured(value: string) {
  return value.trim() !== "" && !/^\[[A-Z0-9_]+\]$/.test(value.trim());
}
export function TowingEmergency() {
  return <section className="towing-section" id="towing" aria-labelledby="towing-title"><div><div className="eyebrow"><span className="eyebrow-line" /> VEHICLE RECOVERY ENQUIRIES</div><h2 id="towing-title">When the road gets difficult.</h2><p>Contact Sriram Travels to discuss vehicle recovery. {isConfigured(site.towingCoverage) ? `Coverage: ${site.towingCoverage}.` : "Share your location so we can check service coverage."} {isConfigured(site.towingResponseTime) ? `Typical response time: ${site.towingResponseTime}.` : "Response time depends on location and current availability."}</p><div className="towing-actions"><a className="button button-gold" href={`tel:+${site.phone}`}><Phone size={16}/> Call for recovery</a><a className="button button-outline" href={buildWhatsAppUrl("Hello Sriram Travels, I need vehicle recovery. Location: ____. Vehicle: ____. Problem: ____.")} target="_blank" rel="noreferrer">WhatsApp recovery details <ArrowUpRight size={16}/></a></div></div><div><h3>What to tell us</h3><ol className="towing-checklist"><li>Your current location or nearest landmark</li><li>Vehicle make and type</li><li>What happened and whether anyone is in immediate danger</li></ol><p className="form-note">If anyone is in immediate danger, contact local emergency services first. {isConfigured(site.operatingHours) && <strong>Operating hours: {site.operatingHours}.</strong>}</p></div></section>;
}
