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
    const revealHomepage = () => {
      if (finished) return;
      finished = true;
      timeline?.kill();
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

    // Never let an animation failure leave a full-screen intro blocking the page.
    const safetyTimer = window.setTimeout(revealHomepage, 5000);

    try {
      timeline = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safetyTimer);
          revealHomepage();
        },
      });

      if (reduceMotion) {
        gsap.set(artStage, { clearProps: "transform", autoAlpha: 1 });
        timeline.to(root, { autoAlpha: 0, duration: 0.25, ease: "power1.out" }, 0.45);
      } else {
        timeline.fromTo(
          artStage,
          { x: 0, y: 42, scale: 0.84, rotation: -1.5, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            duration: 1.15,
            ease: "back.out(1.25)",
          },
          0,
        );
        timeline.to(root, { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, "+=1.35");
      }
    } catch (error) {
      console.error("Sriram Travels intro animation failed; showing the homepage.", error);
      window.clearTimeout(safetyTimer);
      revealHomepage();
    }

    return () => {
      window.clearTimeout(safetyTimer);
      timeline?.kill();
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
      <div className={styles.artStage} ref={artRef} data-layer="art">
        <Image
          src="/Hanuman%20Flight%20Sriram%20Travels%20Logo.png"
          alt="Sriram Travels logo with flying Lord Hanuman carrying the Sanjeevani mountain"
          width={1000}
          height={1000}
          priority
          fetchPriority="high"
          className={styles.hanumanImage}
          draggable={false}
        />
      </div>
    </div>
  );
}
