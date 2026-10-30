"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "./whatsapp";
import styles from "./HanumanIntro.module.css";

gsap.registerPlugin(Flip, CustomEase);
CustomEase.create("sriramCinematic", "0.76, 0, 0.24, 1");

const SESSION_KEY = "sriram-hanuman-intro-seen";
const EASE = "sriramCinematic";
const TOTAL_MS = 2850;
const NAVY = "#111b2b";
const SAFFRON = "#e7a34b";
const PAPER = "#f5f3ee";

export function HanumanIntro() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const logo = logoRef.current;
    if (!root || !logo) return;

    const html = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchOnly = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const startedAt = performance.now();
    let timeline: gsap.core.Timeline | undefined;
    let skipTimer = 0;
    let safetyTimer = 0;
    let parallaxHandler: ((event: MouseEvent) => void) | undefined;
    let flightClone: HTMLImageElement | undefined;
    let previousBodyOverflow = "";
    let previousHtmlOverflow = "";

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // The intro remains usable when storage is blocked.
    }

    const releaseScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
      html.classList.remove("hanuman-intro-active");
    };

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      window.clearTimeout(skipTimer);
      window.clearTimeout(safetyTimer);
      timeline?.kill();
      if (parallaxHandler) window.removeEventListener("mousemove", parallaxHandler);
      if (flightClone) {
        gsap.killTweensOf(flightClone);
        flightClone.remove();
      }
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Session storage is an enhancement, never a requirement.
      }
      html.dataset.hanumanIntroSeen = "true";
      releaseScroll();
      setVisible(false);
    };

    const skipIntro = () => {
      if (finishedRef.current) return;
      timeline?.kill();
      if (reduceMotion) {
        gsap.to(root, { autoAlpha: 0, duration: 0.3, onComplete: finish });
        return;
      }
      gsap.to(root, { autoAlpha: 0, duration: 0.22, ease: "power2.in", onComplete: finish });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipIntro();
    };

    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = html.style.overflow;
    html.classList.add("hanuman-intro-active");
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const onSkipEvent = () => skipIntro();
    window.addEventListener("sriram:skip-intro", onSkipEvent);
    skipTimer = window.setTimeout(() => {
      if (skipRef.current) skipRef.current.dataset.ready = "true";
    }, 300);
    // The hard deadline keeps a slow image or animation from trapping the visitor.
    safetyTimer = window.setTimeout(finish, TOTAL_MS + 150);

    const decodeLogo = async () => {
      if (logo.complete && logo.naturalWidth > 0) {
        try { await logo.decode(); } catch { /* decoded pixels may still be drawable */ }
        return;
      }
      await Promise.race([
        new Promise<void>((resolve) => {
          logo.addEventListener("load", () => resolve(), { once: true });
          logo.addEventListener("error", () => resolve(), { once: true });
        }),
        new Promise<void>((resolve) => window.setTimeout(resolve, 1500)),
      ]);
      if (logo.complete && logo.naturalWidth > 0 && typeof logo.decode === "function") {
        try { await logo.decode(); } catch { /* use the 1.5s fallback */ }
      }
    };

    const run = async () => {
      if (!reduceMotion && !alreadySeen) await decodeLogo();
      if (finishedRef.current) return;

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(650, TOTAL_MS - elapsed);
      const duration = alreadySeen ? 0.4 : remaining / 1000;
      if (alreadySeen || reduceMotion) window.dispatchEvent(new Event("sriram:intro-exit-start"));

      if (reduceMotion || alreadySeen) {
        timeline = gsap.timeline({ onComplete: finish });
        timeline.to(root, { autoAlpha: 0, duration: reduceMotion ? 0.3 : 0.4, ease: "power1.out" }, 0);
        return;
      }

      const road = root.querySelector<HTMLElement>("[data-road]");
      const lane = root.querySelector<HTMLElement>("[data-lane]");
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      const logoStage = root.querySelector<HTMLElement>("[data-logo-stage]");
      const wordmark = root.querySelector<HTMLElement>("[data-wordmark]");
      const tagline = root.querySelector<HTMLElement>("[data-tagline]");
      const eyebrow = root.querySelector<HTMLElement>("[data-eyebrow]");
      const glow = root.querySelector<HTMLElement>("[data-glow]");
      const topPanel = root.querySelector<HTMLElement>("[data-panel-top]");
      const bottomPanel = root.querySelector<HTMLElement>("[data-panel-bottom]");
      const wordLetters = root.querySelectorAll<HTMLElement>("[data-letter]");
      const progressNumber = { value: 0 };
      const digitStrips = Array.from(root.querySelectorAll<HTMLElement>("[data-digit-strip]"));
      let previousDigits = "000";

      gsap.set([road, lane, counter, logoStage, wordmark, tagline, eyebrow, glow, topPanel, bottomPanel], { willChange: "transform, opacity, clip-path" });
      gsap.set(logoStage, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)", scale: 1.08 });
      gsap.set(wordLetters, { yPercent: 110, autoAlpha: 0 });
      gsap.set(tagline, { autoAlpha: 0, y: 8 });
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 });
      gsap.set(counter, { autoAlpha: 1, y: 0 });
      gsap.set([topPanel, bottomPanel], { xPercent: 0, yPercent: 0 });
      gsap.set(root, { autoAlpha: 1 });

      timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });

      // Road draws from its center. The moving lane dash is intentionally tiny.
      timeline.fromTo(road, { scaleX: 0 }, { scaleX: 1, duration: 0.38, ease: EASE }, 0);
      timeline.fromTo(lane, { xPercent: -180, autoAlpha: 0 }, { xPercent: 180, autoAlpha: 1, duration: 1.7, ease: "none" }, 0.42);

      // Non-linear count-up, with tabular digits and a compact 00 → 100 flash.
      timeline.to(progressNumber, {
        value: 100,
        duration: 1.28,
        ease: "power2.inOut",
        onUpdate: () => {
          const digits = String(Math.round(progressNumber.value)).padStart(3, "0");
          if (counter && progressNumber.value >= 100) counter.classList.add(styles.counterHundredsVisible);
          digitStrips.forEach((strip, index) => {
            if (digits[index] === previousDigits[index]) return;
            gsap.to(strip, { yPercent: -Number(digits[index]) * 10, duration: 0.12, ease: "power2.out", overwrite: true });
          });
          previousDigits = digits;
        },
        onComplete: () => {
          if (counter) counter.classList.add(styles.counterHit);
        },
      }, 0.38);

      timeline.to(glow, { autoAlpha: 0.9, scale: 1.04, duration: 0.32, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.92);
      timeline.to(logoStage, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.7, ease: "power4.out" }, 0.98);
      timeline.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" }, 1.08);
      timeline.to(wordLetters, { yPercent: 0, autoAlpha: 1, duration: 0.48, stagger: 0.03, ease: "power4.out" }, 1.22);
      timeline.to(tagline, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, 1.66);

      // Mouse-only parallax; never attach a continuous pointer listener on touch devices.
      if (!touchOnly && logoStage) {
        parallaxHandler = (event: MouseEvent) => {
          if (finishedRef.current) return;
          const x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 8;
          const y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 6;
          gsap.to(logoStage, { x, y, duration: 0.35, overwrite: "auto", ease: "power2.out" });
        };
        window.addEventListener("mousemove", parallaxHandler, { passive: true });
      }

      // At 2.05s, prepare a Flip-style logo handoff to the real navbar mark.
      timeline.call(() => {
        window.dispatchEvent(new Event("sriram:intro-exit-start"));
        const target = document.querySelector<HTMLImageElement>(".brand-logo");
        if (!target || !logoStage || !logo) return;
        const sourceRect = logo.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        flightClone = logo.cloneNode(true) as HTMLImageElement;
        Object.assign(flightClone.style, {
          position: "fixed",
          zIndex: "10002",
          left: `${sourceRect.left}px`,
          top: `${sourceRect.top}px`,
          width: `${sourceRect.width}px`,
          height: `${sourceRect.height}px`,
          margin: "0",
          objectFit: "contain",
          pointerEvents: "none",
          transformOrigin: "center center",
        });
        document.body.appendChild(flightClone);
        const state = Flip.getState(flightClone);
        Object.assign(flightClone.style, {
          left: `${targetRect.left}px`,
          top: `${targetRect.top}px`,
          width: `${targetRect.width}px`,
          height: `${targetRect.height}px`,
        });
        Flip.from(state, {
          duration: Math.min(0.52, duration * 0.22),
          ease: EASE,
          scale: true,
          absolute: true,
          onComplete: () => flightClone?.remove(),
        });
      }, [], 2.03);

      // Overlap the hero reveal with the final panel split; no blank beat.
      timeline.to(counter, { yPercent: -150, autoAlpha: 0, duration: 0.28, ease: "power3.in" }, 2.12);
      timeline.to([wordmark, tagline, eyebrow], { yPercent: -120, autoAlpha: 0, duration: 0.3, ease: "power3.in" }, 2.12);
      timeline.to(topPanel, { yPercent: -101, duration: 0.62, ease: EASE }, 2.2);
      timeline.to(bottomPanel, { yPercent: 101, duration: 0.62, ease: EASE }, 2.2);
      timeline.to(logoStage, { autoAlpha: 0, scale: 0.78, duration: 0.48, ease: "power3.in" }, 2.22);
      timeline.to(root, { autoAlpha: 0, duration: 0.14, ease: "power1.out" }, Math.max(2.55, duration - 0.14));

      // Release scroll and clear transient will-change hints after the transition.
      timeline.call(() => {
        gsap.set(root.querySelectorAll<HTMLElement>("[style*='will-change']"), { clearProps: "willChange" });
      }, [], Math.max(2.7, duration - 0.05));
      timeline.timeScale(Math.max(1, 2.7 / Math.max(0.5, remaining / 1000)));
    };

    void run().catch((error: unknown) => {
      console.error("Sriram Travels intro failed open:", error);
      finish();
    });

    return () => {
      window.clearTimeout(skipTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("sriram:skip-intro", onSkipEvent);
      if (parallaxHandler) window.removeEventListener("mousemove", parallaxHandler);
      timeline?.kill();
      if (flightClone) flightClone.remove();
      releaseScroll();
    };
  }, []);

  if (!visible) return null;

  const style = {
    "--intro-navy": NAVY,
    "--intro-saffron": SAFFRON,
    "--intro-paper": PAPER,
  } as CSSProperties;

  const wordmark = "SRIRAM TRAVELS";

  return (
    <div ref={rootRef} className={styles.root} style={style} aria-label="Sriram Travels intro">
      <button ref={skipRef} type="button" className={styles.skipIntro} onClick={() => window.dispatchEvent(new Event("sriram:skip-intro"))}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>

      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.road} data-road aria-hidden="true">
        <span className={styles.lane} data-lane />
      </div>
      <div className={styles.counter} data-counter aria-live="off" aria-label="Loading progress">
        {["hundreds", "tens", "ones"].map((place) => (
          <span className={styles.digitWindow} data-digit-place={place} key={place} aria-hidden="true">
            <span className={styles.digitStrip} data-digit-strip>
              {"0123456789".split("").map((digit) => <span className={styles.digit} key={digit}>{digit}</span>)}
            </span>
          </span>
        ))}
      </div>

      <div className={styles.logoComposition} data-logo-stage>
        <div className={styles.logoGlow} data-glow aria-hidden="true" />
        <div className={styles.eyebrow} data-eyebrow>EST. IN MOTION · ANDHRA PRADESH</div>
        <div className={styles.logoFrame}>
          <Image
            ref={logoRef}
            data-intro-logo="true"
            src="/sriram-travels-logo-transparent%20(1).png"
            alt="Sriram Travels logo featuring flying Lord Hanuman carrying the Sanjeevani mountain"
            width={1000}
            height={1000}
            priority
            fetchPriority="high"
            draggable={false}
            className={styles.logo}
          />
        </div>
        <div className={styles.wordmark} data-wordmark aria-label={wordmark}>
          {wordmark.split("").map((letter, index) => (
            <span className={styles.letterMask} key={`${letter}-${index}`} aria-hidden="true">
              <span data-letter className={styles.letter}>{letter === " " ? "\u00a0" : letter}</span>
            </span>
          ))}
        </div>
        <p className={styles.tagline} data-tagline>Safe journeys. Blessed beginnings.</p>
      </div>

      <div className={styles.contactActions} aria-label="Emergency contact actions">
        <a href={`tel:+${site.phone}`} aria-label="Call Sriram Travels"><Phone size={17} aria-hidden="true" /><span>Call</span></a>
        <a href={buildWhatsAppUrl("Hello Sriram Travels, I need urgent travel or towing assistance.")} target="_blank" rel="noreferrer" aria-label="WhatsApp Sriram Travels"><MessageCircle size={17} aria-hidden="true" /><span>WhatsApp</span></a>
      </div>

      <div className={styles.splitPanelTop} data-panel-top aria-hidden="true" />
      <div className={styles.splitPanelBottom} data-panel-bottom aria-hidden="true" />
    </div>
  );
}
