"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Briefcase, Check, ChevronDown, Clock3, MapPin, Menu, Phone, ShieldCheck, Snowflake, UserRound, Users, X, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, site, SHOW_RATES } from "@/data/site";
import { fleet } from "@/data/fleet";
import { rates } from "@/data/rates";
import { destinations } from "@/data/destinations";
import { copy, type Language } from "@/data/i18n";
import { TowingEmergency } from "@/components/TowingEmergency";
import { EnquiryForm } from "@/components/EnquiryForm";
import { StickyContactBar } from "@/components/StickyContactBar";
import { buildWhatsAppUrl } from "@/components/whatsapp";
import { Brand } from "@/components/Brand";
import { TrustStrip } from "@/components/TrustStrip";
import { BookingSteps } from "@/components/BookingSteps";
import { Footer } from "@/components/Footer";
import { FleetControls } from "@/components/FleetControls";
import { HanumanIntro } from "@/components/HanumanIntro";

gsap.registerPlugin(ScrollTrigger);

function WhatsAppLink({ label = "Book your journey", className = "", message = "Hello Sriram Travels, I'd like to enquire about car rental / towing service." }: { label?: string; className?: string; message?: string }) {
  return (
    <a className={className} href={buildWhatsAppUrl(message)} target="_blank" rel="noreferrer">
      {label}<ArrowUpRight size={16} strokeWidth={1.7} />
    </a>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeVehicle, setActiveVehicle] = useState(0);
  const [hasChosenVehicle, setHasChosenVehicle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const active = fleet[activeVehicle];

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
      let heroRevealStarted = false;
      const startHeroReveal = () => {
        if (heroRevealStarted) return;
        heroRevealStarted = true;
        gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" });
        gsap.from(".hero-visual", { x: 50, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.08 });
      };
      document.addEventListener("sriram:intro-exit-start", startHeroReveal, { once: true });
      const heroRevealFallback = window.setTimeout(startHeroReveal, 3000);
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
        cinematicChapters.forEach((chapter, index) => {
          const isActive = index === 0;
          chapter.classList.toggle("is-active", isActive);
          if (window.matchMedia("(min-width: 761px)").matches) {
            chapter.setAttribute("aria-hidden", String(!isActive));
            chapter.inert = !isActive;
          } else {
            chapter.removeAttribute("aria-hidden");
            chapter.inert = false;
          }
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
              const desktopStory = window.matchMedia("(min-width: 761px)").matches;
              cinematicChapters.forEach((chapter, index) => {
                const isActive = index === chapterIndex;
                chapter.classList.toggle("is-active", isActive);
                if (desktopStory) {
                  chapter.setAttribute("aria-hidden", String(!isActive));
                  chapter.inert = !isActive;
                } else {
                  chapter.removeAttribute("aria-hidden");
                  chapter.inert = false;
                }
              });
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
          storyTimeline.fromTo(chapter, { autoAlpha: 0, y: 38, immediateRender: false }, { autoAlpha: 1, y: 0, duration: 0.18 }, start + 0.04);
          storyTimeline.to(chapter, { autoAlpha: index === 3 ? 1 : 0, y: index === 3 ? 0 : -22, duration: 0.14 }, end - 0.08);
        });
      }
      return () => {
        document.removeEventListener("sriram:intro-exit-start", startHeroReveal);
        window.clearTimeout(heroRevealFallback);
      };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const chooseVehicle = (index: number) => {
    setHasChosenVehicle(true);
    setActiveVehicle((index + fleet.length) % fleet.length);
    document.getElementById("fleet")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div ref={pageRef} className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <HanumanIntro />
      <div className="announcement"><span className="status-dot" /> LOCAL JOURNEYS · OUTSTATION TRAVEL · TOWING SUPPORT <a href={`tel:+${site.phone}`}>Need help? Call us <ArrowUpRight size={12} /></a></div>
      <header className="site-header">
        <Brand />
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#home">Home</a><a onClick={() => setMenuOpen(false)} href="#fleet">Our fleet</a><a onClick={() => setMenuOpen(false)} href="#services">Services</a><a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#destinations">Destinations</a><a onClick={() => setMenuOpen(false)} href="#faq">FAQ</a><a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </nav>
        <div className="header-actions"><button type="button" className="language-toggle" onClick={() => setLanguage(language === "en" ? "te" : "en")} aria-label={t.switchLabel}>{t.languageSwitch}</button><a className="header-phone" href={`tel:+${site.phone}`}><Phone size={14} /> <span>{site.phoneDisplay}</span></a><WhatsAppLink label={t.enquireNow} className="button button-dark header-cta" /></div>
        <button ref={menuToggleRef} className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-grain" /><div className="hero-orb" />
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY, OUR RESPONSIBILITY</div>
              <h1>{language === "en" ? <>Car Rental &amp;<br /><em>Outstation Taxi</em><br />in Gooty</> : <>గుత్తిలో కార్ రెంటల్<br /><em>&amp; అవుట్‌స్టేషన్ టాక్సీ</em></>}</h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>
              <p className="hero-description">{t.heroDescription}</p>
              <div className="hero-buttons"><a href={`tel:+${site.phone}`} className="button button-gold"><Phone size={16} /> {t.callNow}</a><WhatsAppLink label={t.whatsappEnquiry} className="button button-outline" message="Hello Sriram Travels, I'd like a car rental / outstation taxi quote. Pickup: ____. Destination: ____. Date: ____. Passengers: ____. Please confirm availability and fare." /></div>
              <div className="hero-proof"><div className="proof-icon"><ShieldCheck size={19} /></div><div><strong>Travel with confidence</strong><span>Comfortable rides · Responsive support</span></div><span className="proof-check"><Check size={13} /></span></div>
            </div>
            <div className="hero-visual">
              <div className="visual-arc arc-one" /><div className="visual-arc arc-two" />
              <div className="hero-number">01<span> / JOURNEY</span></div>
              <div className="image-frame hero-image-frame"><Image src="/fleet/urbania-placeholder.svg" alt="Placeholder for a Sriram Travels fleet photograph" fill priority sizes="(max-width: 900px) 100vw, 60vw" className="hero-car-image" /></div>
              <div className="image-caption"><span className="caption-line" /><span>THE JOURNEY IS PART OF THE DESTINATION</span></div>
              <div className="floating-note"><span className="note-star">✳</span><span>Made for the<br /><em>long way home.</em></span></div>
              
            </div>
          </div>
          <div className="hero-bottom"><a href="#fleet" className="scroll-hint"><span className="scroll-icon"><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a><div className="hero-bottom-rule" /><span className="hero-location"><MapPin size={13} /> {site.location}</span></div>
        </section>

        <TrustStrip />

        <section className="fleet-section section-pad" id="fleet">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FIND YOUR RIDE</div><h2>A good journey<br />starts with <em>the right one.</em></h2></div><p>From quick city rides to open-road escapes, discover a vehicle for the way you want to travel.</p></div>
          <div className="fleet-layout">
            <aside className="fleet-sidebar">
              <div className="fleet-list-label"><span>OUR FLEET</span><span className="fleet-list-hint">Swipe to choose</span><span>0{fleet.length}</span></div>
              <div className="fleet-list-options" role="group" aria-label="Choose a vehicle">
                {fleet.map((vehicle, index) => <button key={vehicle.number} className={`fleet-list-item ${index === activeVehicle ? "selected" : ""}`} onClick={() => { setActiveVehicle(index); setHasChosenVehicle(true); }} aria-pressed={index === activeVehicle}><span className="fleet-list-no">{vehicle.number}</span><span className="fleet-list-name">{vehicle.name}<small>{vehicle.className}</small></span><ArrowUpRight className="fleet-list-arrow" size={15} /></button>)}
              </div>
              <div className="fleet-sidebar-foot"><span className="sidebar-foot-line" /> <span>YOUR NEXT MEMORY<br />IS JUST A RIDE AWAY.</span></div>
            </aside>
            <div className="fleet-feature" key={active.number}>
              <div className="fleet-feature-image"><Image src={active.image} alt={`Placeholder for a Sriram Travels ${active.name} photograph`} fill sizes="(max-width: 900px) 100vw, 65vw" className="fleet-car-image" /><div className="fleet-image-shade" /><span className="fleet-image-num">{active.number}</span><span className="fleet-image-badge"><span className="status-dot" /> AVAILABLE FOR ENQUIRY</span><div className="fleet-image-title"><span>{active.className}</span><h3>{active.name}</h3></div><FleetControls index={activeVehicle} total={fleet.length} onChange={chooseVehicle} /></div>
              <div className="fleet-feature-detail"><div className="fleet-detail-copy">{SHOW_RATES && <div className="fleet-rate"><strong>₹{active.ratePerKm}</strong><span>per km · indicative, confirm on call</span></div>}<h4>{active.description}</h4><div className="spec-list"><span><Users size={15} /> {active.seats} seats</span><span><Snowflake size={15} /> AC: {active.ac}</span><span><Briefcase size={15} /> Luggage: {active.luggageCapacity}</span><span><UserRound size={15} /> {active.driverIncluded ? "Driver included" : "Driver not included"}</span><span><MapPin size={15} /> {active.use}</span></div></div><WhatsAppLink label="Get Quote" className="text-link" message={`Hello Sriram Travels, I'd like to enquire about the ${active.name}. Please confirm current pricing, availability, seating and vehicle details.`} /></div>
            </div>
          </div>
          <div className="fleet-disclaimer">Vehicle photos are illustrative references, not guaranteed fleet photos. Confirm the assigned vehicle, seating, availability and fare with Sriram Travels before booking.</div>
        </section>


        <section className="rates-section section-pad" id="rates" aria-labelledby="rates-title">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> TRANSPARENT QUOTES</div><h2 id="rates-title">Rates &amp; <em>fare guide.</em></h2></div><p>These editable placeholders must be replaced with your current rates. Request a written quote for your exact trip before booking.</p></div>
          <div className="rates-policy-grid reveal">
            <article><span>Minimum daily distance</span><strong>{rates.minimumDailyKm} km</strong></article>
            <article><span>Driver bata</span><strong>{rates.driverBata}</strong></article>
            <article><span>Night halt</span><strong>{rates.nightHalt}</strong></article>
            <article><span>Toll policy</span><strong>{rates.tollPolicy}</strong></article>
          </div>
          <div className="rates-tables">
            <div className="rates-table-wrap reveal"><h3>Per-kilometre rates</h3><div className="table-scroll"><table><thead><tr><th scope="col">Vehicle</th><th scope="col">Rate per km</th></tr></thead><tbody>{rates.vehicleRates.map((item) => <tr key={item.vehicle}><th scope="row">{item.vehicle}</th><td>{item.perKm}</td></tr>)}</tbody></table></div></div>
            <div className="rates-table-wrap reveal"><h3>Sample route fares</h3><div className="table-scroll"><table><thead><tr><th scope="col">Route from Gooty</th><th scope="col">Sample fare</th></tr></thead><tbody>{rates.sampleRoutes.map((item) => <tr key={item.route}><th scope="row">{item.route}</th><td>{item.fare}</td></tr>)}</tbody></table></div></div>
          </div>
          <p className="rates-disclaimer">Fare may depend on vehicle, route, total distance, minimum daily km, trip duration, driver bata, tolls, parking and night halt. Replace all bracketed values in <code>src/data/rates.ts</code> before publishing rates.</p>
          <div className="rates-cta"><WhatsAppLink label="Request an exact quote" className="button button-dark" message="Hello Sriram Travels, please share an exact fare quote. Pickup: ____. Destination: ____. Travel date: ____. Vehicle: ____. Please include minimum km, driver bata, tolls and night-halt charges." /></div>
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

        <section className="destinations-section section-pad" id="destinations" aria-labelledby="destinations-title">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> POPULAR ROUTES</div><h2 id="destinations-title">Where to <em>next?</em></h2></div><p>Distances and journey times are editable planning placeholders. Message us to confirm route availability, current conditions and your exact fare.</p></div>
          <div className="destination-route-grid">
            {destinations.map((destination) => <article className="destination-route-card reveal" key={destination.slug}><span className="destination-kicker">FROM GOOTY</span><h3>{destination.name}</h3><div className="destination-route-meta"><span><MapPin size={14}/>{destination.distance}</span><span><Clock3 size={14}/>{destination.duration}</span></div><WhatsAppLink label="Enquire about route" className="text-link" message={`Hello Sriram Travels, please quote for Gooty to ${destination.name}. Pickup: Gooty. Destination: ${destination.name}. Date: ____. Passengers: ____. Please confirm distance, travel time, vehicle availability and fare.`} /></article>)}
          </div>
          <div className="destination-cta reveal"><div><span className="destination-kicker">YOUR ROUTE, YOUR PLANS</span><h3>Going somewhere <em>else?</em></h3><p>Share the pickup point, destination, travel date and number of passengers. We’ll discuss availability and pricing with you.</p></div><WhatsAppLink label="Enquire about another route" className="button button-gold" message="Hello Sriram Travels, I'd like to enquire about a trip. Pickup: ____. Destination: ____. Date: ____. Passengers: ____. Please confirm availability and fare." /></div>
        </section>

        <BookingSteps />

        <section className="faq-section section-pad" id="faq">
          <div className="faq-intro reveal"><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FAQ</div><h2>{t.faqTitle}</h2><p>{t.faqIntro}</p><WhatsAppLink label={t.askOnWhatsApp} className="text-link" /></div>
          <div className="faq-list reveal">
            {t.faq.map((item, index) => <article className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={item.question}><button className="faq-question" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{item.question}</span><ChevronDown size={18} /></button><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={openFaq !== index}><p>{item.answer}</p></div></article>)}
          </div>
        </section>

        <section className="manifesto" id="about"><div className="manifesto-image"><Image src="/images/manifesto-road.svg" alt="Mountain road landscape" fill sizes="100vw" /></div><div className="manifesto-shade" /><div className="manifesto-content reveal"><span className="manifesto-kicker">MORE THAN JUST THE MILES</span><h2>It&apos;s not just<br />where you go.<br /><em>It&apos;s how you get there.</em></h2><p>Every trip has a reason. A family gathering, a new place, an important day. We’re here to help you get there with comfort and care.</p><a href="#contact" className="button button-light">Let&apos;s plan your journey <ArrowUpRight size={16} /></a></div><span className="manifesto-side-note">SRIRAM TRAVELS · EST. FOR THE ROAD AHEAD</span></section>

        <section className="services-section section-pad" id="services"><div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> {t.servicesEyebrow}</div><h2>{language === "en" ? <>Ready for the road.<br /><em>There when it isn&apos;t.</em></> : t.servicesTitle}</h2></div><p>{t.servicesIntro}</p></div>
          <div className="services-grid">{services.map((service) => <article className="service-card reveal" key={service.number}><span className="service-num">{service.number}</span><div className="service-icon">{service.number === "01" ? <MapPin /> : service.number === "02" ? <Users /> : <Zap />}</div><h3>{t.services[Number(service.number) - 1]?.title ?? service.title}</h3><p>{t.services[Number(service.number) - 1]?.copy ?? service.copy}</p><a href={service.number === "03" ? `tel:+${site.phone}` : "#contact"} aria-label={`Enquire about ${service.title}`}><ArrowUpRight size={17} /></a></article>)}</div>
        </section>

        <section className="trust-proof-section section-pad" id="why-us" aria-labelledby="why-us-title">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> WHY SRIRAM TRAVELS</div><h2 id="why-us-title">Travel with <em>clarity.</em></h2></div><p>Review these business details with us before booking. Only publish verified claims once the corresponding placeholders have been updated.</p></div>
          <div className="trust-facts-grid reveal">
            <article><ShieldCheck size={22}/><h3>Driver verification</h3><p>{site.driverVerification}</p></article>
            <article><ShieldCheck size={22}/><h3>Vehicle insurance</h3><p>{site.vehicleInsurance}</p></article>
            <article><ShieldCheck size={22}/><h3>Tourist permit</h3><p>{site.touristPermit}</p></article>
            <article><MapPin size={22}/><h3>GPS tracking</h3><p>{site.gpsTracking}</p></article>
          </div>
          <div className="years-highlight reveal"><span>Years in business</span><strong>{site.yearsInBusiness}</strong></div>
        </section>

        <section className="reviews-section section-pad" id="reviews" aria-labelledby="reviews-title">
          <div className="section-heading reveal"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> CUSTOMER EXPERIENCES</div><h2 id="reviews-title">Words from <em>travellers.</em></h2></div><p>These are empty review slots—not real testimonials. Replace them with genuine customer feedback and permission to publish.</p></div>
          <div className="review-placeholder-grid">
            {[1, 2, 3].map((item) => <article className="review-placeholder-card reveal" key={item}><span className="review-placeholder-label">REVIEW SLOT 0{item}</span><p>[CUSTOMER_REVIEW_{item}]</p><strong>[CUSTOMER_NAME_{item}]</strong><small>Replace with a genuine, approved customer review.</small></article>)}
          </div>
        </section>

        <section className="contact-section" id="contact"><div className="contact-watermark">SR.</div><div className="contact-copy reveal"><div className="eyebrow"><span className="eyebrow-line" /> THE NEXT CHAPTER STARTS HERE</div><h2>Where to<br /><em>next?</em></h2><p>Tell us what your journey needs. We’ll help you work out the next step.</p><div className="contact-actions"><WhatsAppLink label="Start a WhatsApp enquiry" className="button button-gold" /><a href={`tel:+${site.phone}`} className="button button-contact-outline"><Phone size={15} /> {site.phoneDisplay}</a></div></div><div className="contact-side reveal"><div className="contact-orbit"><ArrowDownRight size={30} strokeWidth={1} /></div><span className="contact-side-label">YOUR JOURNEY.<br />OUR RESPONSIBILITY.</span><div className="contact-details"><span><MapPin size={14} /> {site.address}</span><span><Clock3 size={14} /> Hours: {site.operatingHours}</span><span><Phone size={14} /> {site.phoneDisplay}</span><span>{site.email}</span><span>{site.location}</span></div></div></section>
        <section className="contact-map-section section-pad" aria-labelledby="map-title">
          <div className="section-heading"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> FIND US</div><h2 id="map-title">Contact &amp; <em>location.</em></h2></div><p>Update the address, email and map embed URL in <code>src/data/site.ts</code> before launch. The map currently points to Gooty town, not a verified business pin.</p></div>
          <div className="contact-map-layout"><div className="contact-map-copy"><h3>{site.name}</h3><p>{site.address}</p><p>{site.location}</p><p><a href={`tel:+${site.phone}`}>{site.phoneDisplay}</a></p><p><a href={`mailto:${site.email}`}>{site.email}</a></p><p>Operating hours: {site.operatingHours}</p><a className="button button-dark" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address === "[BUSINESS_ADDRESS]" ? site.location : site.address)}`} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={16}/></a></div><div className="contact-map-frame"><iframe src={site.mapEmbedUrl} title="Map showing Gooty, Andhra Pradesh" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></div>
        </section>
        <TowingEmergency />
        <EnquiryForm selectedVehicle={hasChosenVehicle ? active.name : ""} />
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
}
