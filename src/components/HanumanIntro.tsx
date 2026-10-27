"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./HanumanIntro.module.css";
import { HANUMAN_INTRO, HANUMAN_SESSION_KEY } from "./hanumanIntro.config";
import { IntroScene } from "./IntroScene";
import { IntroParticles } from "./IntroParticles";
import { SkipButton } from "./SkipButton";

export function HanumanIntro() {
  // Render the opaque overlay on the server to avoid a homepage flash.
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [skipReady, setSkipReady] = useState(false);
  const [exitDuration, setExitDuration] = useState<number>(HANUMAN_INTRO.timings.exitDurationMs);

  const rootRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const skipReadyRef = useRef(false);
  const timers = useRef<number[]>([]);
  const effectStartedRef = useRef(false);
  const seenMarkerTimer = useRef<number | null>(null);
  const keydownHandlerRef = useRef<((event: KeyboardEvent) => void) | null>(null);
  const pointerHandlerRef = useRef<((event: PointerEvent) => void) | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const originalBodyOverflow = useRef<string | null>(null);
  const originalHtmlOverflow = useRef<string | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const restoreScroll = useCallback(() => {
    if (originalBodyOverflow.current !== null) {
      document.body.style.overflow = originalBodyOverflow.current;
      originalBodyOverflow.current = null;
    }
    if (originalHtmlOverflow.current !== null) {
      document.documentElement.style.overflow = originalHtmlOverflow.current;
      originalHtmlOverflow.current = null;
    }
  }, []);

  const finishIntro = useCallback((duration: number = HANUMAN_INTRO.timings.exitDurationMs) => {
    clearTimers();

    if (keydownHandlerRef.current) {
      document.removeEventListener("keydown", keydownHandlerRef.current);
      keydownHandlerRef.current = null;
    }
    if (pointerHandlerRef.current) {
      window.removeEventListener("pointermove", pointerHandlerRef.current);
      pointerHandlerRef.current = null;
    }

    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }

    setExitDuration(duration);
    setIsExiting(true);

    timers.current.push(window.setTimeout(() => {
      const html = document.documentElement;
      html.classList.remove("hanuman-intro-active");
      html.classList.add("hanuman-home-reveal");
      html.dataset.hanumanIntroSeen = "true";
      setVisible(false);
      restoreScroll();

      // Only move focus if the intro owned it; never steal focus from another control.
      if (rootRef.current?.contains(document.activeElement)) {
        window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>(".hero .button, .hero a[href='#enquiry']")?.focus({ preventScroll: true });
        });
      }
    }, duration));
  }, [clearTimers, restoreScroll]);

  useEffect(() => {
    const html = document.documentElement;

    if (seenMarkerTimer.current !== null) {
      window.clearTimeout(seenMarkerTimer.current);
      seenMarkerTimer.current = null;
    }

    const isEffectReplay = effectStartedRef.current;

    if (!isEffectReplay) {
      let seenThisSession = html.dataset.hanumanIntroSeen === "true";
      try {
        seenThisSession ||= window.sessionStorage.getItem(HANUMAN_SESSION_KEY) === "1";
      } catch {
        // Gracefully continue when sessionStorage is disabled by the browser.
      }

      if (seenThisSession) {
        html.dataset.hanumanIntroSeen = "true";
        setVisible(false);
        return;
      }

      // Only mark initialized after deciding to play; Strict Mode must not replay a skipped intro.
      effectStartedRef.current = true;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reduce;
    setReducedMotion(reduce);

    const navigatorWithMemory = window.navigator as Navigator & { deviceMemory?: number };
    const hasLowHardware = (
      (navigatorWithMemory.hardwareConcurrency > 0 && navigatorWithMemory.hardwareConcurrency <= 4) ||
      (navigatorWithMemory.deviceMemory !== undefined && navigatorWithMemory.deviceMemory <= 4)
    );
    setLightMode(hasLowHardware);

    try {
      // Mark at entry so refresh/back-navigation cannot replay mid-flight.
      window.sessionStorage.setItem(HANUMAN_SESSION_KEY, "1");
    } catch {
      // The intro remains usable if storage cannot be written.
    }

    html.classList.remove("hanuman-home-reveal");
    html.classList.add("hanuman-intro-active");
    originalBodyOverflow.current = document.body.style.overflow;
    originalHtmlOverflow.current = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finishIntro(reduce
          ? HANUMAN_INTRO.timings.reducedMotionFadeMs
          : HANUMAN_INTRO.timings.skipDurationMs);
      } else if (event.key === "Tab") {
        // Before the visible skip action arrives, Tab dismisses rather than trapping focus invisibly.
        event.preventDefault();
        if (!skipReadyRef.current) {
          finishIntro(reduce
            ? HANUMAN_INTRO.timings.reducedMotionFadeMs
            : HANUMAN_INTRO.timings.skipDurationMs);
          return;
        }
        skipButtonRef.current?.focus({ preventScroll: true });
      }
    };

    keydownHandlerRef.current = handleKeyDown;
    document.addEventListener("keydown", handleKeyDown);

    timers.current.push(window.setTimeout(() => {
      skipReadyRef.current = true;
      setSkipReady(true);
      window.requestAnimationFrame(() => {
        skipButtonRef.current?.focus({ preventScroll: true });
      });
    }, HANUMAN_INTRO.timings.focusSkipMs));

    const canUseParallax = (
      !reduce &&
      !hasLowHardware &&
      window.matchMedia("(pointer: fine)").matches &&
      window.navigator.maxTouchPoints === 0
    );

    let lastPointerX = 0;
    let lastPointerY = 0;
    const updateParallax = () => {
      pointerFrameRef.current = null;
      const element = rootRef.current;
      if (!element) return;
      element.style.setProperty("--parallax-x", `${lastPointerX}px`);
      element.style.setProperty("--parallax-y", `${lastPointerY}px`);
      element.style.setProperty("--parallax-horizon-x", `${lastPointerX * 0.35}px`);
      element.style.setProperty("--parallax-horizon-y", `${lastPointerY * 0.3}px`);
      element.style.setProperty("--parallax-ray-x", `${lastPointerX * 0.55}px`);
      element.style.setProperty("--parallax-ray-y", `${lastPointerY * 0.55}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canUseParallax || event.pointerType === "touch") return;
      const xRatio = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const yRatio = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      const parallaxLimit = HANUMAN_INTRO.particles.maxParallaxPx;
      lastPointerX = Math.max(-parallaxLimit, Math.min(parallaxLimit, xRatio * parallaxLimit));
      lastPointerY = Math.max(-parallaxLimit, Math.min(parallaxLimit, yRatio * parallaxLimit));
      if (pointerFrameRef.current === null) {
        pointerFrameRef.current = window.requestAnimationFrame(updateParallax);
      }
    };

    if (canUseParallax) {
      pointerHandlerRef.current = handlePointerMove;
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    if (reduce) {
      timers.current.push(window.setTimeout(
        () => finishIntro(HANUMAN_INTRO.timings.reducedMotionFadeMs),
        HANUMAN_INTRO.timings.reducedMotionTotalMs - HANUMAN_INTRO.timings.reducedMotionFadeMs,
      ));
    } else {
      timers.current.push(window.setTimeout(
        () => finishIntro(HANUMAN_INTRO.timings.exitDurationMs),
        HANUMAN_INTRO.timings.exitStartMs,
      ));
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (canUseParallax) window.removeEventListener("pointermove", handlePointerMove);
      pointerHandlerRef.current = null;
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
        pointerFrameRef.current = null;
      }
      keydownHandlerRef.current = null;
      clearTimers();
      restoreScroll();

      const wasInterrupted = html.classList.contains("hanuman-intro-active");
      html.classList.remove("hanuman-intro-active");

      // Mark an interrupted entrance as seen, but cancel this during React Strict Mode replay.
      if (wasInterrupted) {
        seenMarkerTimer.current = window.setTimeout(() => {
          if (!html.classList.contains("hanuman-intro-active")) {
            html.dataset.hanumanIntroSeen = "true";
          }
          seenMarkerTimer.current = null;
        }, 0);
      }
    };
  }, [clearTimers, finishIntro, restoreScroll]);

  if (!visible) return null;

  const timings = HANUMAN_INTRO.timings;
  const rootStyle = {
    "--exit-duration": `${exitDuration}ms`,
    "--scene-night": HANUMAN_INTRO.colors.midnight,
    "--scene-indigo": HANUMAN_INTRO.colors.indigo,
    "--scene-maroon": HANUMAN_INTRO.colors.maroon,
    "--accent-saffron": HANUMAN_INTRO.colors.saffron,
    "--accent-orange": HANUMAN_INTRO.colors.orange,
    "--accent-gold": HANUMAN_INTRO.colors.gold,
    "--scene-fade-duration": `${timings.sceneFadeMs}ms`,
    "--skip-appear-duration": `${timings.skipAppearDurationMs}ms`,
    "--flight-delay": `${timings.flightStartMs}ms`,
    "--flight-duration": `${timings.flightDurationMs}ms`,
    "--hover-duration": `${timings.hoverDurationMs}ms`,
    "--hover-start": `${timings.hoverStartMs}ms`,
    "--shockwave-delay": `${timings.shockwaveStartMs}ms`,
    "--shockwave-duration": `${timings.shockwaveDurationMs}ms`,
    "--exit-start": `${timings.exitStartMs}ms`,
    "--sun-bloom-start": `${timings.sunBloomStartMs}ms`,
    "--sun-bloom-duration": `${timings.sunBloomDurationMs}ms`,
    "--kicker-start": `${timings.kickerStartMs}ms`,
    "--telugu-start": `${timings.teluguStartMs}ms`,
    "--telugu-duration": `${timings.teluguDurationMs}ms`,
    "--english-letter-duration": `${timings.englishLetterDurationMs}ms`,
    "--shimmer-start": `${timings.shimmerStartMs}ms`,
    "--shimmer-duration": `${timings.shimmerDurationMs}ms`,
    "--divider-duration": `${timings.dividerDurationMs}ms`,
    "--welcome-duration": `${timings.welcomeDurationMs}ms`,
    "--tagline-duration": `${timings.taglineDurationMs}ms`,
    "--progress-duration": `${timings.progressDurationMs}ms`,
    "--progress-delay": `${timings.skipAppearMs}ms`,
    "--parallax-horizon-x": "0px",
    "--parallax-horizon-y": "0px",
    "--parallax-ray-x": "0px",
    "--parallax-ray-y": "0px",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${isExiting ? styles.exiting : ""} ${reducedMotion ? styles.reduced : ""} ${lightMode ? styles.lightMode : ""}`}
      style={rootStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hanuman-intro-title"
      aria-describedby="hanuman-intro-welcome"
    >
      <IntroScene lightMode={lightMode} />
      <div className={styles.editorialChrome} aria-hidden="true">
        <div className={styles.chromeFrame} />
        <div className={styles.chromeTop}>
          <span className={styles.brandIndex}><span>SR</span><i /></span>
          <span className={styles.chromeHeader}>
            <strong>SRIRAM TRAVELS</strong>
            <span>{HANUMAN_INTRO.text.header}</span>
          </span>
          <span className={styles.chromeCounter}>DIVINE ARRIVAL <b>01 / 04</b></span>
        </div>
        <span className={styles.sideStamp}>FAITH GUIDES THE WAY</span>
        <div className={styles.editorialTicker}>
          <div className={styles.tickerTrack}>
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index}>{HANUMAN_INTRO.text.ticker}</span>
            ))}
          </div>
        </div>
        <div className={styles.chromeBottom}>
          <span>{HANUMAN_INTRO.text.location}</span>
          <span className={styles.scrollCue}><i /> SCROLL TO EXPLORE <b>↓</b></span>
        </div>
      </div>
      <IntroParticles lightMode={lightMode} reducedMotion={reducedMotion} />

      <div
        className={styles.lightBurst}
        aria-hidden="true"
        style={{ animationDelay: `${timings.shockwaveStartMs}ms` }}
      />
      <div
        className={styles.shockwave}
        aria-hidden="true"
        style={{ animationDelay: `${timings.shockwaveStartMs}ms` }}
      />

      <div className={styles.flightStage}>
        <div className={styles.flightOrigin}>
          <div className={styles.flightPath}>
            <div className={styles.flightHover}>
              {!lightMode && HANUMAN_INTRO.trailOffsets.map((trail, index) => (
                <Image
                  key={index}
                  src="/images/hanuman-flying-silhouette.svg"
                  alt=""
                  aria-hidden="true"
                  width={850}
                  height={480}
                  className={`${styles.hanumanImage} ${styles.trailCopy}`}
                  style={{
                    "--trail-x": `${trail.x}%`,
                    "--trail-y": `${trail.y}px`,
                    "--trail-opacity": trail.opacity,
                    "--trail-blur": `${trail.blur}px`,
                    "--trail-scale": trail.scale,
                  } as CSSProperties}
                  draggable={false}
                />
              ))}
              <Image
                src="/images/hanuman-flying-silhouette.svg"
                alt="Flying Hanuman carrying the Sanjeevani mountain"
                width={850}
                height={480}
                priority
                fetchPriority="high"
                className={`${styles.hanumanImage} ${styles.mainImage}`}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {!reducedMotion && (
        <div className={styles.windLines} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      )}

      <div className={styles.copy}>
        <p
          className={styles.kicker}
          style={{ animationDelay: `${timings.kickerStartMs}ms` }}
        >
          {HANUMAN_INTRO.text.kicker}
        </p>
        <p
          className={`${styles.teluguBlessing} ${styles.shimmer}`}
          aria-label={HANUMAN_INTRO.text.telugu}
          style={{ animationDelay: `${timings.teluguStartMs}ms` }}
        >
          <span>{HANUMAN_INTRO.text.telugu}</span>
          <span className={styles.shimmerSweep} aria-hidden="true">{HANUMAN_INTRO.text.telugu}</span>
        </p>
        <h1 id="hanuman-intro-title" className={styles.englishTitle} aria-label={HANUMAN_INTRO.text.english}>
          {Array.from(HANUMAN_INTRO.text.english).map((letter, index) => (
            <span
              aria-hidden="true"
              key={`${letter}-${index}`}
              style={{
                animationDelay: `${timings.englishStartMs + index * timings.englishStaggerMs}ms`,
              }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </h1>
        <span
          className={styles.divider}
          aria-hidden="true"
          style={{ animationDelay: `${timings.dividerStartMs}ms` }}
        ><span /></span>
        <p
          id="hanuman-intro-welcome"
          className={styles.welcome}
          style={{ animationDelay: `${timings.welcomeStartMs}ms` }}
        >
          {HANUMAN_INTRO.text.welcome}
        </p>
        <p
          className={styles.tagline}
          style={{ animationDelay: `${timings.taglineStartMs}ms` }}
        >
          {HANUMAN_INTRO.text.tagline}
        </p>
      </div>

      <SkipButton
        buttonRef={skipButtonRef}
        onSkip={() => finishIntro(reducedMotion
          ? timings.reducedMotionFadeMs
          : timings.skipDurationMs)}
        reducedMotion={reducedMotion}
        disabled={!skipReady}
      />
    </div>
  );
}
