"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./HanumanIntro.module.css";

/** Configurable choreography; full-motion entrance completes within 4.3 seconds. */
const INTRO_TIMING = {
  backgroundRevealMs: 400,
  skipButtonDelayMs: 500,
  lightBurstStartMs: 1800,
  skipFocusMs: 560,
  flightStartMs: 300,
  flightDurationMs: 1700,
  titleStartMs: 2200,
  welcomeStartMs: 2820,
  exitStartMs: 3600,
  exitFadeMs: 650,
  reducedMotionExitStartMs: 520,
  reducedMotionTotalMs: 800,
  reducedMotionFadeMs: 280,
  skipFadeMs: 320,
} as const;

const SESSION_KEY = "sriram-hanuman-intro-seen";
const TRAIL_DELAYS_MS = [455, 585, 715] as const;
const TITLE = "Jai Shri Ram";

const EMBERS = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: (index * 37 + 11) % 97,
  bottom: (index * 23 + 7) % 42,
  delay: -((index * 0.37) % 4.8),
  duration: 3.8 + (index % 6) * 0.52,
  drift: ((index * 19) % 84) - 42,
  size: 2 + (index % 3),
  alpha: 0.35 + (index % 5) * 0.12,
}));

export function HanumanIntro() {
  // The opaque intro renders on the server too, preventing an initial homepage flash.
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef<number[]>([]);
  const effectStartedRef = useRef(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
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

  const finishIntro = useCallback((fadeMs?: number) => {
    clearTimers();
    setIsExiting(true);
    const duration = fadeMs ?? (reducedMotionRef.current
      ? INTRO_TIMING.reducedMotionFadeMs
      : INTRO_TIMING.exitFadeMs);

    timers.current.push(window.setTimeout(() => {
      const root = document.documentElement;
      root.classList.remove("hanuman-intro-active");
      root.classList.add("hanuman-home-reveal");
      root.dataset.hanumanIntroSeen = "true";
      setVisible(false);
      restoreScroll();
    }, duration));
  }, [clearTimers, restoreScroll]);

  useEffect(() => {
    const root = document.documentElement;
    const isEffectReplay = effectStartedRef.current;
    effectStartedRef.current = true;

    if (!isEffectReplay) {
      let seenThisSession = root.dataset.hanumanIntroSeen === "true";
      try {
        seenThisSession ||= window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        // Gracefully continue if sessionStorage is blocked.
      }

      if (seenThisSession) {
        root.dataset.hanumanIntroSeen = "true";
        setVisible(false);
        return;
      }
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reduce;
    setReducedMotion(reduce);

    try {
      // Mark at start so refreshing mid-intro does not replay it.
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The intro still completes normally when storage is unavailable.
    }

    root.classList.add("hanuman-intro-active");
    originalBodyOverflow.current = document.body.style.overflow;
    originalHtmlOverflow.current = root.style.overflow;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finishIntro();
      } else if (event.key === "Tab") {
        // The skip button is the only interactive control in this modal.
        event.preventDefault();
        skipButtonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    timers.current.push(window.setTimeout(
      () => skipButtonRef.current?.focus({ preventScroll: true }),
      INTRO_TIMING.skipFocusMs,
    ));

    if (reduce) {
      timers.current.push(window.setTimeout(
        () => setIsExiting(true),
        INTRO_TIMING.reducedMotionExitStartMs,
      ));
      timers.current.push(window.setTimeout(
        () => finishIntro(INTRO_TIMING.reducedMotionFadeMs),
        INTRO_TIMING.reducedMotionTotalMs - INTRO_TIMING.reducedMotionFadeMs,
      ));
    } else {
      timers.current.push(window.setTimeout(
        () => finishIntro(INTRO_TIMING.exitFadeMs),
        INTRO_TIMING.exitStartMs,
      ));
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimers();
      restoreScroll();
      root.classList.remove("hanuman-intro-active");
    };
  }, [clearTimers, finishIntro, restoreScroll]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.root} ${isExiting ? styles.exiting : ""} ${reducedMotion ? styles.reduced : ""}`}
      style={{
        "--background-reveal": `${INTRO_TIMING.backgroundRevealMs}ms`,
        "--burst-delay": `${INTRO_TIMING.lightBurstStartMs}ms`,
      } as CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hanuman-intro-title"
      aria-describedby="hanuman-intro-welcome"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.rays} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      {!reducedMotion && <div className={styles.noise} aria-hidden="true" />}
      {!reducedMotion && (
        <div className={styles.emberField} aria-hidden="true">
          {EMBERS.map((ember) => (
            <span
              className={styles.ember}
              key={ember.id}
              style={{
                left: `${ember.left}%`,
                bottom: `${ember.bottom}%`,
                animationDelay: `${ember.delay}s`,
                animationDuration: `${ember.duration}s`,
                opacity: ember.alpha,
                "--ember-drift": `${ember.drift}px`,
                "--ember-size": `${ember.size}px`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}
      <div className={styles.lightBurst} aria-hidden="true" />

      <div className={styles.flightStage}>
        <div className={styles.flight} role="img" aria-label="Flying Hanuman carrying the Sanjeevani mountain">
          {TRAIL_DELAYS_MS.map((delay, index) => (
            <Image
              key={delay}
              src="/images/hanuman-flying-silhouette.svg"
              alt=""
              aria-hidden="true"
              width={1200}
              height={520}
              className={`${styles.hanumanImage} ${styles.trailCopy}`}
              style={{
                "--flight-delay": `${delay}ms`,
                "--trail-opacity": [0.24, 0.15, 0.08][index],
                "--trail-blur": `${(index + 1) * 1.4}px`,
              } as CSSProperties}
              draggable={false}
            />
          ))}
          <Image
            src="/images/hanuman-flying-silhouette.svg"
            alt=""
            aria-hidden="true"
            width={1200}
            height={520}
            priority
            className={styles.hanumanImage}
            style={{
              "--flight-delay": `${INTRO_TIMING.flightStartMs}ms`,
              "--flight-duration": `${INTRO_TIMING.flightDurationMs}ms`,
            } as CSSProperties}
            draggable={false}
          />
        </div>
      </div>

      <div className={styles.copy}>
        <p className={styles.teluguBlessing} aria-label="Jai Shri Ram in Telugu">జై శ్రీ రామ్</p>
        <h1 id="hanuman-intro-title" className={styles.englishTitle} aria-label={TITLE}>
          {Array.from(TITLE).map((letter, index) => (
            <span
              aria-hidden="true"
              key={`${letter}-${index}`}
              style={{ animationDelay: `${INTRO_TIMING.titleStartMs + index * 32}ms` }}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </h1>
        <span
          className={styles.divider}
          aria-hidden="true"
          style={{ animationDelay: `${INTRO_TIMING.welcomeStartMs - 120}ms` }}
        ><span /></span>
        <p
          id="hanuman-intro-welcome"
          className={styles.welcome}
          style={{ animationDelay: `${INTRO_TIMING.welcomeStartMs}ms` }}
        >
          Welcome to Sriram Travels
        </p>
      </div>

      {!reducedMotion && (
        <div className={styles.windLines} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      )}

      <button
        ref={skipButtonRef}
        type="button"
        className={styles.skip}
        onClick={() => finishIntro(INTRO_TIMING.skipFadeMs)}
        aria-label="Skip Hanuman intro and open the website"
        style={{ animationDelay: `${INTRO_TIMING.skipButtonDelayMs}ms` }}
      >
        Skip intro <ArrowUpRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
