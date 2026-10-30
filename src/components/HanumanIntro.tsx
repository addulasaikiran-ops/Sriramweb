"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./HanumanIntro.module.css";
import { HANUMAN_INTRO } from "./hanumanIntro.config";

export function HanumanIntro() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const effectStartedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const artStage = artRef.current;
    if (!root || !artStage) return;

    const html = document.documentElement;
    let finished = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let originalBodyOverflow: string | null = null;
    let originalHtmlOverflow: string | null = null;

    let seenThisSession = html.dataset.hanumanIntroSeen === "true";
    try {
      seenThisSession ||= window.sessionStorage.getItem(HANUMAN_INTRO.sessionKey) === "1";
    } catch {
      // Storage is optional; the intro still works when it is unavailable.
    }

    if (!effectStartedRef.current && seenThisSession) {
      setVisible(false);
      return;
    }
    // Avoid treating React Strict Mode's effect replay as a second visit.
    effectStartedRef.current = true;

    try {
      window.sessionStorage.setItem(HANUMAN_INTRO.sessionKey, "1");
    } catch {
      // The document marker below still prevents replay during this page lifetime.
    }

    html.classList.remove("hanuman-home-reveal");
    html.classList.add("hanuman-intro-active");
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const restoreScroll = () => {
      if (originalBodyOverflow !== null) {
        document.body.style.overflow = originalBodyOverflow;
        originalBodyOverflow = null;
      }
      if (originalHtmlOverflow !== null) {
        html.style.overflow = originalHtmlOverflow;
        originalHtmlOverflow = null;
      }
    };

    let timeline: gsap.core.Timeline | null = null;
    let windTween: gsap.core.Tween | null = null;
    let safetyTimer = 0;
    const revealHomepage = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(safetyTimer);
      timeline?.kill();
      windTween?.kill();
      html.classList.remove("hanuman-intro-active");
      html.classList.add("hanuman-home-reveal");
      html.dataset.hanumanIntroSeen = "true";
      try {
        window.sessionStorage.setItem(HANUMAN_INTRO.sessionKey, "1");
      } catch {
        // The document marker is sufficient for the current page.
      }
      restoreScroll();
      setVisible(false);
    };

    // Fail open if the animation library throws or stalls for any reason.
    safetyTimer = window.setTimeout(revealHomepage, 5000);

    try {
      timeline = gsap.timeline({ onComplete: revealHomepage });

      if (reduceMotion) {
        gsap.set(artStage, { clearProps: "transform", autoAlpha: 1 });
        timeline.to(root, { autoAlpha: 0, duration: 0.25, ease: "power1.out" }, 0.45);
      } else {
        const eyebrow = root.querySelector<HTMLElement>("[data-intro-eyebrow]");
        const footer = root.querySelector<HTMLElement>("[data-intro-footer]");
        const progress = root.querySelector<HTMLElement>("[data-intro-progress]");

        // A deliberate editorial sequence: atmosphere first, then the sacred mark.
        timeline.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 0);
        if (eyebrow) {
          timeline.fromTo(eyebrow, { y: 12, autoAlpha: 0, letterSpacing: "0.34em" }, {
            y: 0, autoAlpha: 1, letterSpacing: "0.22em", duration: 0.85, ease: "expo.out",
          }, 0.28);
        }
        timeline.fromTo(
          artStage,
          { x: 0, y: 42, scale: 0.84, rotation: -2.2, autoAlpha: 0, filter: "blur(10px)" },
          {
            x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, filter: "blur(0px)",
            duration: 1.65, ease: "expo.out",
          },
          0.38,
        );
        // A light crosswind gives the sacred mark a living, airborne quality.
        const logoImage = artStage.querySelector<HTMLElement>("img");
        if (logoImage) {
          windTween = gsap.to(logoImage, {
            x: 5, y: -3, rotation: 0.35, duration: 1.15,
            ease: "sine.inOut", yoyo: true, repeat: -1,
          });
        }
        // Soft optical settle; restrained enough to feel art-directed, not templated.
        timeline.to(artStage, { scale: 1.018, duration: 0.42, ease: "power2.out" }, 1.72);
        timeline.to(artStage, { scale: 1, duration: 0.7, ease: "power2.inOut" }, 2.14);
        if (footer) {
          timeline.fromTo(footer, { y: 10, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out",
          }, 1.35);
        }
        if (progress) {
          timeline.fromTo(progress, { scaleX: 0 }, {
            scaleX: 1, duration: 3.55, ease: "none",
          }, 0.2);
        }
        // Hold the composed frame for a beat, then dissolve into the homepage.
        timeline.to(root, { autoAlpha: 0, duration: 0.62, ease: "power2.inOut" }, 4.05);
      }
    } catch (error) {
      console.error("Sriram Travels intro animation failed; showing the homepage.", error);
      revealHomepage();
    }

    return () => {
      window.clearTimeout(safetyTimer);
      timeline?.kill();
      windTween?.kill();
      html.classList.remove("hanuman-intro-active");
      restoreScroll();
    };
  }, []);

  if (!visible) return null;

  const { colors, timings } = HANUMAN_INTRO;
  const rootStyle = {
    "--intro-black": colors.black,
    "--intro-saffron": colors.saffron,
    "--intro-orange": colors.deepOrange,
    "--intro-gold": colors.gold,
    "--intro-paper": colors.offWhite,
    "--frame-pulse-duration": `${timings.framePulseDurationMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles.simpleIntro}`}
      style={rootStyle}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-label="Sriram Travels intro"
    >
      <div className={styles.introEyebrow} data-intro-eyebrow aria-hidden="true">
        <span className={styles.eyebrowRule} />
        <span>SRIRAM TRAVELS</span>
        <span className={styles.eyebrowIndex}>EST. IN MOTION · ANDHRA PRADESH</span>
      </div>
      <div className={styles.artStage} ref={artRef} data-layer="art">
        <Image
          src="/sriram-travels-logo-transparent%20(1).png"
          alt="Sriram Travels logo with flying Lord Hanuman carrying the Sanjeevani mountain"
          width={1000}
          height={1000}
          priority
          fetchPriority="high"
          className={styles.hanumanImage}
          draggable={false}
        />
      </div>
      <div className={styles.introFooter} data-intro-footer aria-hidden="true">
        <span className={styles.footerMark}>ST<span>®</span></span>
        <span className={styles.footerCaption}>SAFE JOURNEYS. BLESSED BEGINNINGS.</span>
        <span className={styles.footerIndex}>01 <i /> 01</span>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span data-intro-progress />
      </div>
    </div>
  );
}
