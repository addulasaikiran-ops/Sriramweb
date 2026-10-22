"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Phone, ShieldCheck, Users, X, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fleet, services, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function WhatsAppLink({ label = "Book your journey", className = "" }: { label?: string; className?: string }) {
  const message = encodeURIComponent("Hello Sriram Travels, I'd like to enquire about car rental / towing service.");
  return (
    <a className={className} href={`https://wa.me/${site.whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
      {label}<ArrowUpRight size={16} strokeWidth={1.7} />
    </a>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = fleet[activeVehicle];

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1 });
      gsap.from(".hero-visual", { x: 50, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.25 });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 32, opacity: 0, duration: 0.85, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
      gsap.to(".hero-orb", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const chooseVehicle = (index: number) => {
    setActiveVehicle((index + fleet.length) % fleet.length);
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={pageRef} className="site-shell">
      <div className="announcement"><span className="status-dot" /> LOCAL JOURNEYS · OUTSTATION TRAVEL · TOWING SUPPORT <a href={`tel:+${site.phone}`}>Need help? Call us <ArrowUpRight size={12} /></a></div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Sriram Travels home">
          <span className="brand-mark"><span className="brand-mark-line" /><span className="brand-mark-line short" /></span>
          <span><strong>SRIRAM<span>.</span></strong><small>TRAVELS & TOWING SERVICES</small></span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#home">Home</a><a onClick={() => setMenuOpen(false)} href="#fleet">Our fleet</a><a onClick={() => setMenuOpen(false)} href="#services">Services</a><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </nav>
        <div className="header-actions"><a className="header-phone" href={`tel:+${site.phone}`}><Phone size={14} /> <span>{site.phoneDisplay}</span></a><WhatsAppLink label="Enquire now" className="button button-dark header-cta" /></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grain" /><div className="hero-orb" />
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY, OUR RESPONSIBILITY</div>
              <h1>Go further.<br /><em>Feel at home.</em></h1>
              <p className="hero-subtitle">The road is yours. We make the journey better.</p>
              <p className="hero-description">Reliable car rentals for the moments that matter, backed by towing support when the unexpected happens.</p>
              <div className="hero-buttons"><a href="#fleet" className="button button-gold">Explore our fleet <ArrowUpRight size={17} /></a><a href="#services" className="button button-outline"><span className="play-icon"><ArrowRight size={13} /></span> Discover our services</a></div>
              <div className="hero-proof"><div className="proof-icon"><ShieldCheck size={19} /></div><div><strong>Travel with confidence</strong><span>Comfortable rides · Responsive support</span></div><span className="proof-check"><Check size={13} /></span></div>
            </div>
            <div className="hero-visual">
              <div className="visual-arc arc-one" /><div className="visual-arc arc-two" />
              <div className="hero-number">01<span> / JOURNEY</span></div>
              <div className="image-frame hero-image-frame"><Image src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=90" alt="Premium SUV ready for a scenic journey" fill priority sizes="(max-width: 900px) 100vw, 60vw" unoptimized className="hero-car-image" /></div>
              <div className="image-caption"><span className="caption-line" /><span>THE JOURNEY IS PART OF THE DESTINATION</span></div>
              <div className="floating-note"><span className="note-star">✳</span><span>Made for the<br /><em>long way home.</em></span></div>
              <div className="visual-index"><span className="index-active" /><span /><span /><span /><span /><span /></div>
            </div>
          </div>
          <div className="hero-bottom"><a href="#fleet" className="scroll-hint"><span className="scroll-icon"><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a><div className="hero-bottom-rule" /><span className="hero-location"><MapPin size={13} /> {site.location}</span></div>
        </section>

        <section className="trust-strip" aria-label="Service highlights">
          <div className="trust-item"><span className="trust-symbol"><ShieldCheck /></span><div><strong>Safety comes first</strong><small>Carefully looked-after vehicles</small></div></div>
          <div className="trust-item"><span className="trust-symbol"><Users /></span><div><strong>People-first service</strong><small>Help when you need it</small></div></div>
          <div className="trust-item"><span className="trust-symbol"><Clock3 /></span><div><strong>Here for the journey</strong><small>Travel and towing enquiries</small></div></div>
          <div className="trust-item"><span className="trust-symbol"><MapPin /></span><div><strong>Rooted in Gooty</strong><small>And ready to go further</small></div></div>
        </section>

        <section className="fleet-section section-pad" id="fleet">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FIND YOUR RIDE</div><h2>A good journey<br />starts with <em>the right one.</em></h2></div><p>From quick city rides to open-road escapes, discover a vehicle for the way you want to travel.</p></div>
          <div className="fleet-layout">
            <aside className="fleet-sidebar">
              <div className="fleet-list-label"><span>OUR FLEET</span><span>0{fleet.length}</span></div>
              {fleet.map((vehicle, index) => <button key={vehicle.number} className={`fleet-list-item ${index === activeVehicle ? "selected" : ""}`} onClick={() => setActiveVehicle(index)} aria-pressed={index === activeVehicle}><span className="fleet-list-no">{vehicle.number}</span><span className="fleet-list-name">{vehicle.name}<small>{vehicle.className}</small></span><ArrowUpRight className="fleet-list-arrow" size={15} /></button>)}
              <div className="fleet-sidebar-foot"><span className="sidebar-foot-line" /> <span>YOUR NEXT MEMORY<br />IS JUST A RIDE AWAY.</span></div>
            </aside>
            <div className="fleet-feature" key={active.number}>
              <div className="fleet-feature-image"><Image src={active.image} alt={active.name} fill sizes="(max-width: 900px) 100vw, 65vw" unoptimized className="fleet-car-image" /><div className="fleet-image-shade" /><span className="fleet-image-num">{active.number}</span><span className="fleet-image-badge"><span className="status-dot" /> AVAILABLE FOR ENQUIRY</span><div className="fleet-image-title"><span>{active.className}</span><h3>{active.name}</h3></div><div className="fleet-controls"><button aria-label="Previous vehicle" onClick={() => chooseVehicle(activeVehicle - 1)}><ChevronLeft size={18} /></button><span>0{activeVehicle + 1} <i>/</i> 0{fleet.length}</span><button aria-label="Next vehicle" onClick={() => chooseVehicle(activeVehicle + 1)}><ChevronRight size={18} /></button></div></div>
              <div className="fleet-feature-detail"><div><h4>{active.description}</h4><div className="spec-list"><span><Users size={15} /> {active.seats}</span><span><ShieldCheck size={15} /> {active.comfort}</span><span><MapPin size={15} /> {active.use}</span></div></div><WhatsAppLink label="Enquire about this vehicle" className="text-link" /></div>
            </div>
          </div>
          <div className="fleet-disclaimer">Vehicle images are illustrative. Please confirm vehicle availability, seating and specifications when enquiring.</div>
        </section>

        <section className="manifesto" id="about"><div className="manifesto-image"><Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85" alt="Mountain road landscape" fill sizes="100vw" unoptimized /></div><div className="manifesto-shade" /><div className="manifesto-content reveal"><span className="manifesto-kicker">MORE THAN JUST THE MILES</span><h2>It&apos;s not just<br />where you go.<br /><em>It&apos;s how you get there.</em></h2><p>Every trip has a reason. A family gathering, a new place, an important day. We’re here to help you get there with comfort and care.</p><a href="#contact" className="button button-light">Let&apos;s plan your journey <ArrowUpRight size={16} /></a></div><span className="manifesto-side-note">SRIRAM TRAVELS · EST. FOR THE ROAD AHEAD</span></section>

        <section className="services-section section-pad" id="services"><div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</div><h2>Ready for the road.<br /><em>There when it isn't.</em></h2></div><p>From planning the miles ahead to helping when the road gets difficult, we’re one call away from your next step.</p></div>
          <div className="services-grid">{services.map((service) => <article className="service-card reveal" key={service.number}><span className="service-num">{service.number}</span><div className="service-icon">{service.number === "01" ? <MapPin /> : service.number === "02" ? <Users /> : <Zap />}</div><h3>{service.title}</h3><p>{service.copy}</p><a href={service.number === "03" ? `tel:+${site.phone}` : "#contact"} aria-label={`Enquire about ${service.title}`}><ArrowUpRight size={17} /></a></article>)}</div>
        </section>

        <section className="contact-section" id="contact"><div className="contact-watermark">SR.</div><div className="contact-copy reveal"><div className="eyebrow"><span className="eyebrow-line" /> THE NEXT CHAPTER STARTS HERE</div><h2>Where to<br /><em>next?</em></h2><p>Tell us what your journey needs. We’ll help you work out the next step.</p><div className="contact-actions"><WhatsAppLink label="Start a WhatsApp enquiry" className="button button-gold" /><a href={`tel:+${site.phone}`} className="button button-contact-outline"><Phone size={15} /> {site.phoneDisplay}</a></div></div><div className="contact-side reveal"><div className="contact-orbit"><ArrowDownRight size={30} strokeWidth={1} /></div><span className="contact-side-label">YOUR JOURNEY.<br />OUR RESPONSIBILITY.</span><div className="contact-details"><span><MapPin size={14} /> {site.location}</span><span><Clock3 size={14} /> Towing enquiries · Day or night</span></div></div></section>
      </main>

      <footer className="site-footer"><a href="#home" className="brand footer-brand"><span className="brand-mark"><span className="brand-mark-line" /><span className="brand-mark-line short" /></span><span><strong>SRIRAM<span>.</span></strong><small>TRAVELS & TOWING SERVICES</small></span></a><span className="footer-tagline">TAKE THE SCENIC ROUTE.</span><span className="footer-copy">© {new Date().getFullYear()} Sriram Travels. Made for the road ahead.</span><a className="back-top" href="#home">BACK TO TOP ↑</a></footer>
      <a className="mobile-call" href={`tel:+${site.phone}`}><Phone size={17} /> Call Sriram Travels</a>
    </div>
  );
}
