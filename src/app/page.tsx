"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Phone, ShieldCheck, Users, X, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fleet, services, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function WhatsAppLink({ label = "Book your journey", className = "", message = "Hello Sriram Travels, I'd like to enquire about car rental / towing service." }: { label?: string; className?: string; message?: string }) {
  const encodedMessage = encodeURIComponent(message);
  return (
    <a className={className} href={`https://wa.me/${site.whatsapp}?text=${encodedMessage}`} target="_blank" rel="noreferrer">
      {label}<ArrowUpRight size={16} strokeWidth={1.7} />
    </a>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
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
      // Cinematic, scroll-linked vehicle showcase.
      gsap.utils.toArray<HTMLElement>(".fleet-feature-image").forEach((frame) => {
        const image = frame.querySelector<HTMLElement>(".fleet-car-image");
        if (!image) return;
        gsap.fromTo(image, { scale: 1.12, yPercent: 2 }, {
          scale: 1, yPercent: 0, ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
      gsap.utils.toArray<HTMLElement>(".story-card").forEach((card, index) => {
        gsap.fromTo(card, { y: 46, opacity: 0.55 }, {
          y: 0, opacity: 1, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", end: "top 48%", scrub: 0.7 },
          delay: index * 0.04,
        });
        const photo = card.querySelector<HTMLElement>(".story-photo");
        if (photo) gsap.fromTo(photo, { backgroundPosition: "50% 62%" }, {
          backgroundPosition: "50% 38%", ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.7 },
        });
      });
      gsap.to(".manifesto-image img", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });
      gsap.fromTo(".manifesto-content h2", { y: 34, opacity: 0.65 }, {
        y: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".manifesto", start: "top 72%", end: "center 42%", scrub: 0.7 },
      });
      const cinematicStage = root.querySelector<HTMLElement>(".cinematic-stage");
      const cinematicChapters = gsap.utils.toArray<HTMLElement>(".cinematic-chapter");
      const cinematicImages = gsap.utils.toArray<HTMLElement>(".cinematic-visual-image");
      const progressFill = root.querySelector<HTMLElement>(".cinematic-progress-fill");
      const frameCount = root.querySelector<HTMLElement>(".cinematic-frame-count strong");
      if (cinematicStage && cinematicChapters.length === 4 && cinematicImages.length === 4) {
        cinematicImages.forEach((image, index) => {
          gsap.set(image, { autoAlpha: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 1.08 });
        });
        const storyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: cinematicStage,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => {
              if (progressFill) progressFill.style.transform = `scaleX(${self.progress})`;
              const chapterIndex = Math.min(3, Math.floor(self.progress * 4));
              if (frameCount) frameCount.textContent = `0${chapterIndex + 1}`;
              cinematicChapters.forEach((chapter, index) => chapter.classList.toggle("is-active", index === chapterIndex));
            },
          },
        });
        cinematicChapters.forEach((chapter, index) => {
          const start = index / 4;
          const end = (index + 1) / 4;
          if (index > 0) {
            storyTimeline.to(cinematicImages[index - 1], { autoAlpha: 0, scale: 0.96, duration: 0.16 }, start);
            storyTimeline.fromTo(cinematicImages[index], { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.22 }, start + 0.02);
          }
          storyTimeline.fromTo(chapter, { autoAlpha: 0.35, y: 38 }, { autoAlpha: 1, y: 0, duration: 0.18 }, start + 0.04);
          storyTimeline.to(chapter, { autoAlpha: index === 3 ? 1 : 0.45, y: index === 3 ? 0 : -22, duration: 0.14 }, end - 0.08);
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const chooseVehicle = (index: number) => {
    setActiveVehicle((index + fleet.length) % fleet.length);
    document.getElementById("fleet")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div ref={pageRef} className="site-shell">
      <div className="announcement"><span className="status-dot" /> LOCAL JOURNEYS · OUTSTATION TRAVEL · TOWING SUPPORT <a href={`tel:+${site.phone}`}>Need help? Call us <ArrowUpRight size={12} /></a></div>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Sriram Travels home">
          <span className="brand-mark"><span className="brand-mark-line" /><span className="brand-mark-line short" /></span>
          <span><strong>SRIRAM<span>.</span></strong><small>TRAVELS & TOWING SERVICES</small></span>
        </a>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#home">Home</a><a onClick={() => setMenuOpen(false)} href="#fleet">Our fleet</a><a onClick={() => setMenuOpen(false)} href="#services">Services</a><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#destinations">Destinations</a><a onClick={() => setMenuOpen(false)} href="#faq">FAQ</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </nav>
        <div className="header-actions"><a className="header-phone" href={`tel:+${site.phone}`}><Phone size={14} /> <span>{site.phoneDisplay}</span></a><WhatsAppLink label="Enquire now" className="button button-dark header-cta" /></div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
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
              <div className="fleet-feature-detail"><div className="fleet-detail-copy"><div className="fleet-rate"><strong>₹{active.ratePerKm}</strong><span>per km</span></div><h4>{active.description}</h4><div className="spec-list"><span><Users size={15} /> {active.seats}</span><span><ShieldCheck size={15} /> {active.features.join(" · ")}</span><span><MapPin size={15} /> {active.use}</span></div></div><WhatsAppLink label="Enquire about this vehicle" className="text-link" message={`Hello Sriram Travels, I'd like to enquire about the ${active.name} at the listed reference rate of ₹${active.ratePerKm}/km. Please confirm current pricing, availability and vehicle details.`} /></div>
            </div>
          </div>
          <div className="fleet-disclaimer">Reference rates shown for design setup only. Confirm Sriram Travels pricing, vehicle availability, seating and features before booking.</div>
        </section>


        <section className="cinematic-journey" id="journey-story" aria-labelledby="journey-title">
          <div className="cinematic-intro">
            <div className="cinematic-intro-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> THE ROAD AHEAD</div>
              <h2 id="journey-title">Every mile has<br /><em>a moment.</em></h2>
              <p>Four chapters. One journey. Scroll to travel from the first plan to the moment you arrive.</p>
              <a href="#destinations" className="button button-gold">Plan your journey <ArrowDownRight size={16} /></a>
            </div>
            <span className="cinematic-intro-index">SRIRAM TRAVELS <i> / </i> THE JOURNEY</span>
          </div>
          <div className="cinematic-stage">
            <div className="cinematic-sticky-visual" aria-hidden="true">
              <div className="cinematic-visual-image cinematic-image-departure" />
              <div className="cinematic-visual-image cinematic-image-ride" />
              <div className="cinematic-visual-image cinematic-image-openroad" />
              <div className="cinematic-visual-image cinematic-image-arrival" />
              <div className="cinematic-visual-shade" />
              <div className="cinematic-visual-label"><span className="status-dot" /> THE JOURNEY, FRAME BY FRAME</div>
              <div className="cinematic-progress"><span className="cinematic-progress-fill" /></div>
              <div className="cinematic-frame-count"><strong>01</strong><span> / 04</span></div>
            </div>
            <div className="cinematic-chapters">
              <article className="cinematic-chapter is-active" data-chapter="0">
                <span className="cinematic-chapter-number">01 <i> / THE DEPARTURE</i></span>
                <h3>It starts with<br /><em>a destination.</em></h3>
                <p>A place to be. A date to remember. Start by sharing your pickup point, route and travel plans with our team.</p>
                <span className="cinematic-chapter-foot">SET YOUR COURSE <ArrowDownRight size={15} /></span>
              </article>
              <article className="cinematic-chapter" data-chapter="1">
                <span className="cinematic-chapter-number">02 <i> / THE RIDE</i></span>
                <h3>Find your<br /><em>kind of comfort.</em></h3>
                <p>From a quick trip to a family journey, tell us how many people are travelling so we can discuss a suitable vehicle.</p>
                <span className="cinematic-chapter-foot">CHOOSE YOUR RIDE <ArrowDownRight size={15} /></span>
              </article>
              <article className="cinematic-chapter" data-chapter="2">
                <span className="cinematic-chapter-number">03 <i> / THE OPEN ROAD</i></span>
                <h3>Let the miles<br /><em>become memories.</em></h3>
                <p>Confirm the route, timing, fare and vehicle details with Sriram Travels before your journey begins.</p>
                <span className="cinematic-chapter-foot">ENJOY THE JOURNEY <ArrowDownRight size={15} /></span>
              </article>
              <article className="cinematic-chapter" data-chapter="3">
                <span className="cinematic-chapter-number">04 <i> / THE ARRIVAL</i></span>
                <h3>Arrive at<br /><em>what matters.</em></h3>
                <p>Whether it is a family visit or a place you have always wanted to see, let us help you plan the next step.</p>
                <WhatsAppLink label="Discuss your trip" className="button button-gold" message="Hello Sriram Travels, I'd like to plan a journey. Pickup: ____. Destination: ____. Date: ____. Passengers: ____. Please confirm availability and fare." />
              </article>
            </div>
          </div>
        </section>

        <section className="destinations-section section-pad" id="destinations">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> YOUR NEXT STOP</div><h2>Where to <em>next?</em></h2></div><p>Have a destination in mind? Send us your route and dates to enquire about your trip.</p></div>
          <div className="destination-cta reveal"><div><span className="destination-kicker">YOUR ROUTE, YOUR PLANS</span><h3>Let’s talk about<br /><em>where you’re going.</em></h3><p>Share the pickup point, destination, travel date and number of passengers. We’ll discuss availability and pricing with you.</p></div><WhatsAppLink label="Enquire about a trip" className="button button-gold" message="Hello Sriram Travels, I'd like to enquire about a trip. Pickup: ____. Destination: ____. Date: ____. Passengers: ____. Please confirm availability and fare." /></div>
        </section>

        <section className="booking-section section-pad">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> SIMPLE NEXT STEPS</div><h2>Booking, in <em>three steps.</em></h2></div><p>Start a conversation first. Confirm the details directly before finalising your journey.</p></div>
          <div className="booking-steps">
            <article className="booking-step reveal"><span className="booking-step-number">01</span><h3>Message or call</h3><p>Choose WhatsApp or phone to reach Sriram Travels.</p></article>
            <article className="booking-step reveal"><span className="booking-step-number">02</span><h3>Share your trip</h3><p>Tell us the route, date, passenger count and any special requirements.</p></article>
            <article className="booking-step reveal"><span className="booking-step-number">03</span><h3>Confirm the details</h3><p>Check the vehicle, availability, fare and trip terms with us before booking.</p></article>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="faq-intro reveal"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FAQ</div><h2>Good to <em>know.</em></h2><p>Need something else? Ask us directly and we’ll help clarify the details.</p><WhatsAppLink label="Ask on WhatsApp" className="text-link" /></div>
          <div className="faq-list reveal">
            {[
              { question: "How do I book a vehicle?", answer: "Message us on WhatsApp or call. Share where you are going, your travel date and how many people are travelling. We’ll discuss availability and next steps with you." },
              { question: "Which places do you travel to?", answer: "Please message us with your pickup point and destination so we can confirm whether your requested route is available." },
              { question: "How is the fare decided?", answer: "Fare can depend on the vehicle, route and trip details. Ask us for a confirmed quote before booking; any rates shown on this page are reference-only until confirmed by Sriram Travels." },
              { question: "Can I confirm the vehicle before booking?", answer: "Yes—please ask us to confirm the vehicle, seating and availability for your dates before you finalise the trip." },
              { question: "What if my plans change?", answer: "Contact us as soon as possible. We’ll explain what changes can be accommodated for your booking." }
            ].map((item, index) => <article className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={item.question}><button id={`faq-question-${index}`} className="faq-question" type="button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{item.question}</span><ChevronDown size={18} /></button><div id={`faq-answer-${index}`} className="faq-answer" role="region" aria-labelledby={`faq-question-${index}`} hidden={openFaq !== index}><p>{item.answer}</p></div></article>)}
          </div>
        </section>

        <section className="manifesto" id="about"><div className="manifesto-image"><Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85" alt="Mountain road landscape" fill sizes="100vw" unoptimized /></div><div className="manifesto-shade" /><div className="manifesto-content reveal"><span className="manifesto-kicker">MORE THAN JUST THE MILES</span><h2>It&apos;s not just<br />where you go.<br /><em>It&apos;s how you get there.</em></h2><p>Every trip has a reason. A family gathering, a new place, an important day. We’re here to help you get there with comfort and care.</p><a href="#contact" className="button button-light">Let&apos;s plan your journey <ArrowUpRight size={16} /></a></div><span className="manifesto-side-note">SRIRAM TRAVELS · EST. FOR THE ROAD AHEAD</span></section>

        <section className="services-section section-pad" id="services"><div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHAT WE DO</div><h2>Ready for the road.<br /><em>There when it isn&apos;t.</em></h2></div><p>From planning the miles ahead to helping when the road gets difficult, we’re one call away from your next step.</p></div>
          <div className="services-grid">{services.map((service) => <article className="service-card reveal" key={service.number}><span className="service-num">{service.number}</span><div className="service-icon">{service.number === "01" ? <MapPin /> : service.number === "02" ? <Users /> : <Zap />}</div><h3>{service.title}</h3><p>{service.copy}</p><a href={service.number === "03" ? `tel:+${site.phone}` : "#contact"} aria-label={`Enquire about ${service.title}`}><ArrowUpRight size={17} /></a></article>)}</div>
        </section>

        <section className="contact-section" id="contact"><div className="contact-watermark">SR.</div><div className="contact-copy reveal"><div className="eyebrow"><span className="eyebrow-line" /> THE NEXT CHAPTER STARTS HERE</div><h2>Where to<br /><em>next?</em></h2><p>Tell us what your journey needs. We’ll help you work out the next step.</p><div className="contact-actions"><WhatsAppLink label="Start a WhatsApp enquiry" className="button button-gold" /><a href={`tel:+${site.phone}`} className="button button-contact-outline"><Phone size={15} /> {site.phoneDisplay}</a></div></div><div className="contact-side reveal"><div className="contact-orbit"><ArrowDownRight size={30} strokeWidth={1} /></div><span className="contact-side-label">YOUR JOURNEY.<br />OUR RESPONSIBILITY.</span><div className="contact-details"><span><MapPin size={14} /> {site.location}</span><span><Clock3 size={14} /> Towing enquiries · Day or night</span></div></div></section>
      </main>

      <footer className="site-footer"><a href="#home" className="brand footer-brand"><span className="brand-mark"><span className="brand-mark-line" /><span className="brand-mark-line short" /></span><span><strong>SRIRAM<span>.</span></strong><small>TRAVELS & TOWING SERVICES</small></span></a><span className="footer-tagline">TAKE THE SCENIC ROUTE.</span><span className="footer-copy">© {new Date().getFullYear()} Sriram Travels. Made for the road ahead.</span><a className="back-top" href="#home">BACK TO TOP ↑</a></footer>
      <a className="mobile-call" href={`tel:+${site.phone}`}><Phone size={17} /> Call Sriram Travels</a>
    </div>
  );
}
