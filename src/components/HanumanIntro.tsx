"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./HanumanIntro.module.css";
import { HANUMAN_INTRO } from "./hanumanIntro.config";
import { IntroScene } from "./IntroScene";
import { IntroParticles } from "./IntroParticles";
import { SkipButton } from "./SkipButton";
import { CornerBrackets, IntroGrid, LoadCounter, Marquee } from "./IntroEditorial";

function withoutNulls<T>(values: Array<T | null | undefined>): T[] {
  return values.filter((value): value is T => value !== null && value !== undefined);
}

export function HanumanIntro() {
  // The opaque shell is server-rendered, so the homepage never flashes before hydration.
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [skipReady, setSkipReady] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishRef = useRef<() => void>(() => undefined);
  const effectStartedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const artStage = artRef.current;
    const orbit = orbitRef.current;
    if (!root || !artStage || !orbit) return;

    const html = document.documentElement;
    let finished = false;
    let onKeyDown: ((event: KeyboardEvent) => void) | null = null;
    let originalBodyOverflow: string | null = null;
    let originalHtmlOverflow: string | null = null;

    let seenThisSession = html.dataset.hanumanIntroSeen === "true";
    try {
      seenThisSession ||= window.sessionStorage.getItem(HANUMAN_INTRO.sessionKey) === "1";
    } catch {
      // The animation still works when storage is restricted by the browser.
    }

    if (!effectStartedRef.current && seenThisSession) {
      html.dataset.hanumanIntroSeen = "true";
      setVisible(false);
      return;
    }
    // React Strict Mode replays effects in development. Do not mistake our own
    // entry marker from the first setup for a genuine second visit.
    effectStartedRef.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) gsap.registerPlugin(MotionPathPlugin);
    const nav = window.navigator as Navigator & { deviceMemory?: number };
    const isLowPower = (
      (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4)
    );

    setReducedMotion(reduce);
    setLowPower(isLowPower);
    root.classList.toggle(styles.reduced, reduce);
    root.classList.toggle(styles.lowPower, isLowPower);

    // Avoid a blocking cinematic gate on phones, low-memory devices, and users
    // who request reduced motion. The homepage and its contact actions appear immediately.
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isLowPower || coarsePointer) {
      html.dataset.hanumanIntroSeen = "true";
      try {
        window.sessionStorage.setItem(HANUMAN_INTRO.sessionKey, "1");
      } catch {
        // Dismissal must work even when storage is unavailable.
      }
      setVisible(false);
      return;
    }

    try {
      window.sessionStorage.setItem(HANUMAN_INTRO.sessionKey, "1");
    } catch {
      // Session storage is an optimization, never a requirement for dismissal.
    }

    html.classList.remove("hanuman-home-reveal");
    html.classList.add("hanuman-intro-active");
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const q = <T extends Element>(selector: string) => root.querySelector<T>(selector);
    const qa = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

    const screenFrame = q<HTMLElement>('[data-frame="screen"]');
    const artFrame = q<HTMLElement>('[data-frame="art"]');
    const welcomeFrame = q<HTMLElement>('[data-frame="welcome"]');
    const scene = q<HTMLElement>(`.${styles.scene}`);
    const grid = q<HTMLElement>(`.${styles.gridLines}`);
    const gridLines = qa<HTMLElement>(`.${styles.gridLine}`);
    const screenMarks = qa<SVGElement>('[data-frame="screen"] .' + styles.cornerMark);
    const artMarks = qa<SVGElement>('[data-frame="art"] .' + styles.cornerMark);
    const welcomeMarks = qa<SVGElement>('[data-frame="welcome"] .' + styles.cornerMark);
    const skipButton = skipButtonRef.current;
    const copyBlock = q<HTMLElement>(`.${styles.copyBlock}`);
    const upperLabel = q<HTMLElement>(`.${styles.upperLabel}`);
    const headlineLines = qa<HTMLElement>(`.${styles.headlineLine}`);
    const telugu = q<HTMLElement>(`.${styles.teluguLine}`);
    const lowerLabel = q<HTMLElement>(`.${styles.lowerLabel}`);
    const welcome = q<HTMLElement>(`.${styles.welcomeText}`);
    const welcomeBlock = q<HTMLElement>(`.${styles.welcomeBlock}`);
    const statusDock = q<HTMLElement>(`.${styles.statusDock}`);
    const marquee = q<HTMLElement>(`.${styles.marquee}`);
    const speedLines = qa<HTMLElement>(`.${styles.speedLine}`);
    const shockwave = q<HTMLElement>(`.${styles.shockwaveRing}`);
    const exitBar = q<HTMLElement>(`.${styles.exitBar}`);
    const exitTop = q<HTMLElement>(`.${styles.exitPanelTop}`);
    const exitBottom = q<HTMLElement>(`.${styles.exitPanelBottom}`);
    const particles = q<HTMLElement>(`.${styles.emberField}`);
    const { timings, easing } = HANUMAN_INTRO;

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

    const revealHomepage = () => {
      if (finished) return;
      finished = true;
      masterTimelineRef.current?.kill();
      masterTimelineRef.current = null;
      if (onKeyDown) { document.removeEventListener("keydown", onKeyDown);
        onKeyDown = null;
      }
      finishRef.current = () => undefined;
      html.classList.remove("hanuman-intro-active");
      html.classList.add("hanuman-home-reveal");
      html.dataset.hanumanIntroSeen = "true";
      try {
        window.sessionStorage.setItem(HANUMAN_INTRO.sessionKey, "1");
      } catch {
        // The root data attribute still prevents a replay for this document.
      }
      restoreScroll();

      const introOwnedFocus = root.contains(document.activeElement);
      setVisible(false);
      if (introOwnedFocus) {
        window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>(".hero .button, .hero a[href='#enquiry']")?.focus({ preventScroll: true });
        });
      }
    };

    const runQuickExit = () => {
      if (finished) return;
      masterTimelineRef.current?.kill();
      masterTimelineRef.current = null;

      if (reduce) {
        const reducedExit = gsap.timeline({ onComplete: revealHomepage });
        reducedExit.to(root, {
          opacity: 0,
          duration: timings.reducedMotionExitMs / 1000,
          ease: easing.quartOut,
        });
        masterTimelineRef.current = reducedExit;
        return;
      }

      const quick = gsap.timeline({ onComplete: revealHomepage });
      quick.to(
        withoutNulls([scene, grid, screenFrame, artFrame, welcomeFrame, orbit, artStage, copyBlock, statusDock, marquee, skipButton, particles, speedLines, shockwave]),
        { autoAlpha: 0, duration: timings.skipFadeDurationMs / 1000, ease: easing.expoOut },
        0,
      );
      if (exitBar) {
        quick.fromTo(exitBar, { scaleX: 0 }, { scaleX: 1, duration: timings.skipWipeDurationMs / 1000, ease: easing.expoInOut }, timings.skipWipeStartMs / 1000);
      }
      if (exitTop && exitBottom) {
        quick.fromTo(exitTop, { yPercent: -105 }, { yPercent: 0, duration: timings.skipCurtainCloseDurationMs / 1000, ease: easing.expoInOut }, timings.skipCurtainCloseStartMs / 1000);
        quick.fromTo(exitBottom, { yPercent: 105 }, { yPercent: 0, duration: timings.skipCurtainCloseDurationMs / 1000, ease: easing.expoInOut }, timings.skipCurtainCloseStartMs / 1000);
        quick.set(root, { backgroundColor: "transparent" }, timings.skipCurtainOpenStartMs / 1000);
        const quickCurtainOpenDuration = Math.max(0, timings.skipExitDurationMs - timings.skipCurtainOpenStartMs) / 1000;
        quick.to(exitTop, { yPercent: -105, duration: quickCurtainOpenDuration, ease: easing.expoInOut }, timings.skipCurtainOpenStartMs / 1000);
        quick.to(exitBottom, { yPercent: 105, duration: quickCurtainOpenDuration, ease: easing.expoInOut }, timings.skipCurtainOpenStartMs / 1000);
      } else {
        quick.to(root, { opacity: 0, duration: timings.skipExitDurationMs / 1000, ease: easing.quartOut }, 0);
      }
      masterTimelineRef.current = quick;
    };

    finishRef.current = runQuickExit;

    onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        runQuickExit();
        return;
      }
      if (event.key === "Enter" && event.target !== skipButton) {
        event.preventDefault();
        runQuickExit();
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        if (skipButton?.disabled) root.focus({ preventScroll: true });
        else skipButton?.focus({ preventScroll: true });
      }
    };
    if (onKeyDown) document.addEventListener("keydown", onKeyDown);

    const counterValue = { value: 0 };
    const updateCounter = () => {
      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(counterValue.value)).padStart(3, "0");
      }
    };

    if (reduce) {
      // Keep the geometry still: reduced-motion mode uses one short fade, then reveals the page.
      gsap.set(withoutNulls([screenFrame, artFrame, welcomeFrame]), {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 0.76,
        scale: 1,
      });
      gsap.set(gridLines, { scaleY: 1, opacity: 0.08 });
      gsap.set(artStage, { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1 });
      gsap.set(copyBlock, { autoAlpha: 1, y: 0 });
      gsap.set(withoutNulls([upperLabel, ...headlineLines, telugu, lowerLabel, welcome, welcomeBlock]), { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(withoutNulls([statusDock, skipButton]), { autoAlpha: 1 });
      setSkipReady(true);
      const reducedTimeline = gsap.timeline({ onComplete: revealHomepage });
      reducedTimeline.fromTo(
        withoutNulls([upperLabel, ...headlineLines, telugu, lowerLabel, welcome]),
        { opacity: 0 },
        { opacity: 1, duration: 0.38, stagger: 0.05, ease: easing.quartOut },
        0,
      );
      reducedTimeline.call(() => skipButton?.focus({ preventScroll: true }), [], 0.08);
      reducedTimeline.to(root, { opacity: 0, duration: timings.reducedMotionExitMs / 1000, ease: easing.quartOut }, (timings.reducedMotionDurationMs - timings.reducedMotionExitMs) / 1000);
      masterTimelineRef.current = reducedTimeline;
    } else {
      gsap.set(screenMarks, { clipPath: "inset(0% 100% 100% 0%)", autoAlpha: 0 });
      gsap.set([...artMarks, ...welcomeMarks], { clipPath: "inset(0% 100% 100% 0%)", autoAlpha: 0 });
      gsap.set(gridLines, { scaleY: 0, opacity: 0, transformOrigin: "top center" });
      gsap.set(artStage, {
        x: -window.innerWidth * 0.88,
        y: window.innerHeight * 0.11,
        scale: 0.62,
        rotation: -8,
        autoAlpha: 0,
      });
      gsap.set(orbit, { scale: 0.84, rotation: -24, autoAlpha: 0 });
      gsap.set(withoutNulls([upperLabel, ...headlineLines, telugu, lowerLabel, welcome, welcomeBlock]), {
        autoAlpha: 0,
        y: 12,
      });
      gsap.set(headlineLines, { yPercent: 112, autoAlpha: 0 });
      gsap.set(marquee, { yPercent: 110, autoAlpha: 0 });
      gsap.set(skipButton!, { y: -8, autoAlpha: 0 });
      gsap.set(shockwave, { scale: 0.18, autoAlpha: 0 });
      gsap.set(speedLines, { scaleX: 0, autoAlpha: 0, transformOrigin: "right center" });
      gsap.set(exitBar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(exitTop, { yPercent: -105 });
      gsap.set(exitBottom, { yPercent: 105 });
      updateCounter();

      const timeline = gsap.timeline({
        defaults: { ease: easing.expoOut },
        onComplete: revealHomepage,
      });
      masterTimelineRef.current = timeline;

      // 0.00–0.42s — architecture draws in while the counter starts.
      timeline.fromTo(
        screenMarks,
        { clipPath: "inset(0% 100% 100% 0%)", autoAlpha: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 0.76, duration: timings.frameDurationMs / 1000, stagger: 0.02, ease: easing.quartOut },
        timings.frameStartMs / 1000,
      );
      timeline.fromTo(
        gridLines,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.08,
          duration: timings.gridDurationMs / 1000,
          stagger: timings.gridStaggerMs / 1000,
          ease: easing.quartOut,
        },
        timings.gridStartDelayMs / 1000,
      );
      timeline.call(() => screenFrame?.classList.add(styles.frameLive), [], (timings.frameDurationMs + 120) / 1000);
      timeline.call(() => setSkipReady(true), [], timings.skipStartMs / 1000);
      timeline.fromTo(
        skipButton!,
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: timings.skipDurationMs / 1000, ease: easing.expoOut },
        timings.skipStartMs / 1000,
      );
      timeline.call(() => skipButton?.focus({ preventScroll: true }), [], timings.focusSkipMs / 1000);

      // 0.30–1.90s — the artwork rides a curved MotionPath with three sharp ghost trails.
      timeline.fromTo(
        artMarks,
        { clipPath: "inset(0% 100% 100% 0%)", autoAlpha: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 0.72,
          duration: timings.artFrameDurationMs / 1000,
          stagger: timings.gridStaggerMs / 1600,
          ease: easing.quartOut,
        },
        timings.artFrameStartMs / 1000,
      );
      timeline.call(() => artFrame?.classList.add(styles.frameLive), [], (timings.artFrameStartMs + timings.artFrameDurationMs + 30) / 1000);
      timeline.fromTo(
        orbit,
        { scale: 0.84, rotation: -24, autoAlpha: 0 },
        {
          scale: 1,
          rotation: 172,
          autoAlpha: 0.64,
          duration: timings.orbitDurationMs / 1000,
          ease: easing.quartInOut,
        },
        timings.orbitStartMs / 1000,
      );
      timeline.fromTo(
        artStage,
        {
          x: -window.innerWidth * 0.88,
          y: window.innerHeight * 0.11,
          scale: 0.62,
          rotation: -8,
          autoAlpha: 0,
        },
        {
          motionPath: {
            path: [
              { x: -window.innerWidth * 0.88, y: window.innerHeight * 0.11 },
              { x: -window.innerWidth * 0.55, y: window.innerHeight * 0.03 },
              { x: -window.innerWidth * 0.2, y: -window.innerHeight * 0.07 },
              { x: 0, y: 0 },
            ],
            curviness: 1.25,
            autoRotate: false,
          },
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: (timings.flightEndMs - timings.flightStartMs) / 1000,
          ease: easing.expoInOut,
        },
        timings.flightStartMs / 1000,
      );
      timeline.fromTo(
        speedLines,
        { scaleX: 0, autoAlpha: 0 },
        { scaleX: 1, autoAlpha: 0.48, duration: timings.speedLineDurationMs / 1000, stagger: timings.gridStaggerMs / 1000, ease: easing.expoOut },
        timings.speedLinesStartMs / 1000,
      );
      timeline.to(speedLines, { autoAlpha: 0, duration: timings.speedLineFadeDurationMs / 1000, ease: easing.expoIn }, (timings.landStartMs - 260) / 1000);

      // Counter is tied to the precise arrival/landing beats, not a separate interval.
      timeline.to(
        counterValue,
        {
          value: 80,
          duration: timings.flightEndMs / 1000,
          ease: easing.expoOut,
          onUpdate: updateCounter,
        },
        0,
      );
      timeline.to(
        counterValue,
        {
          value: 100,
          duration: timings.counterLandDurationMs / 1000,
          ease: easing.expoOut,
          onUpdate: updateCounter,
        },
        timings.landStartMs / 1000,
      );

      // 1.90–2.42s — hard landing, 80ms glitch slice (disabled on low-end hardware), shockwave.
      timeline.call(() => {
        if (!isLowPower) root.classList.add(styles.landingImpact);
      }, [], timings.landStartMs / 1000);
      const landingAt = timings.landStartMs / 1000;
      const impactWindow = timings.landSliceDurationMs / 1000;
      timeline.to(artStage, { x: 5, y: 2, scale: 1.018, duration: impactWindow * 0.375, ease: easing.expoOut }, landingAt);
      timeline.to(artStage, { x: -3, y: -1, scale: 0.995, duration: impactWindow * 0.3125, ease: easing.expoInOut }, landingAt + impactWindow * 0.375);
      timeline.to(artStage, { x: 0, y: 0, scale: 1, duration: impactWindow * 0.3125, ease: easing.expoOut }, landingAt + impactWindow * 0.6875);
      timeline.call(() => root.classList.remove(styles.landingImpact), [], (timings.landStartMs + timings.landSliceDurationMs) / 1000);
      timeline.fromTo(
        shockwave,
        { scale: 0.18, autoAlpha: 0.9 },
        { scale: 2.55, autoAlpha: 0, duration: timings.shockwaveDurationMs / 1000, ease: easing.expoOut },
        timings.shockwaveStartMs / 1000,
      );

      // 2.28–3.80s — clipped headlines, Telugu copy, bracketed welcome, then the ticker.
      timeline.fromTo(
        upperLabel,
        { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 0, y: 8 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, y: 0, duration: timings.upperLabelDurationMs / 1000, ease: easing.expoOut },
        timings.upperLabelStartMs / 1000,
      );
      timeline.fromTo(
        welcomeMarks,
        { clipPath: "inset(0% 100% 100% 0%)", autoAlpha: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 0.76, duration: timings.copyFrameDurationMs / 1000, stagger: 0.025, ease: easing.quartOut },
        timings.copyFrameStartMs / 1000,
      );
      timeline.call(() => welcomeFrame?.classList.add(styles.frameLive), [], (timings.copyFrameStartMs + timings.copyFrameDurationMs) / 1000);
      timeline.to(welcomeBlock, { autoAlpha: 1, y: 0, duration: 0.08, ease: easing.expoOut }, timings.copyFrameStartMs / 1000);
      timeline.fromTo(
        headlineLines,
        { yPercent: 112, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: timings.headlineLineDurationMs / 1000,
          stagger: timings.headlineLineGapMs / 1000,
          ease: easing.expoOut,
        },
        timings.headlineStartMs / 1000,
      );
      timeline.fromTo(
        telugu,
        { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 0, y: 10 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, y: 0, duration: timings.teluguDurationMs / 1000, ease: easing.quartOut },
        timings.teluguStartMs / 1000,
      );
      timeline.fromTo(
        lowerLabel,
        { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 0, y: 8 },
        { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, y: 0, duration: timings.lowerLabelDurationMs / 1000, ease: easing.expoOut },
        timings.lowerLabelStartMs / 1000,
      );
      timeline.fromTo(
        welcome,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: timings.welcomeDurationMs / 1000, ease: easing.expoOut },
        timings.welcomeStartMs / 1000,
      );
      timeline.fromTo(
        marquee,
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: timings.marqueeDurationMs / 1000, ease: easing.quartOut },
        timings.marqueeStartMs / 1000,
      );
      timeline.call(() => marquee?.classList.add(styles.marqueeLive), [], timings.marqueeStartMs / 1000);

      // 3.80–4.50s — frames contract, saffron line wipes, then two curtains open to the homepage.
      timeline.to(
        withoutNulls([screenFrame, grid, artFrame, welcomeFrame]),
        { scale: 0.94, autoAlpha: 0, duration: 0.22, ease: easing.expoIn },
        timings.exitStartMs / 1000,
      );
      timeline.to(
        withoutNulls([scene, artStage, orbit, copyBlock, statusDock, marquee, skipButton, particles, speedLines, shockwave]),
        { autoAlpha: 0, duration: 0.16, ease: easing.expoOut },
        timings.exitStartMs / 1000,
      );
      timeline.fromTo(
        exitBar!,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: timings.exitBarDurationMs / 1000, ease: easing.expoInOut },
        timings.exitStartMs / 1000,
      );
      timeline.fromTo(
        exitTop!,
        { yPercent: -105 },
        { yPercent: 0, duration: timings.curtainCloseDurationMs / 1000, ease: easing.expoInOut },
        (timings.exitStartMs + timings.exitBarDurationMs) / 1000,
      );
      timeline.fromTo(
        exitBottom!,
        { yPercent: 105 },
        { yPercent: 0, duration: timings.curtainCloseDurationMs / 1000, ease: easing.expoInOut },
        (timings.exitStartMs + timings.exitBarDurationMs) / 1000,
      );
      const curtainOpenStartMs = timings.exitStartMs + timings.exitBarDurationMs + timings.curtainCloseDurationMs;
      const curtainOpenStart = curtainOpenStartMs / 1000;
      const curtainOpenDuration = Math.max(0, timings.totalDurationMs - curtainOpenStartMs) / 1000;
      timeline.set(root, { backgroundColor: "transparent" }, curtainOpenStart);
      // Begin the homepage hero stagger behind the moving curtains.
      timeline.call(() => {
        html.classList.remove("hanuman-intro-active");
        html.classList.add("hanuman-home-reveal");
      }, [], curtainOpenStart);
      timeline.call(() => undefined, [], timings.totalDurationMs / 1000);
      timeline.to(
        exitTop,
        { yPercent: -105, duration: curtainOpenDuration, ease: easing.expoInOut },
        curtainOpenStart,
      );
      timeline.to(
        exitBottom,
        { yPercent: 105, duration: curtainOpenDuration, ease: easing.expoInOut },
        curtainOpenStart,
      );
    }

    return () => {
      masterTimelineRef.current?.kill();
      masterTimelineRef.current = null;
      finishRef.current = () => undefined;
      if (onKeyDown) document.removeEventListener("keydown", onKeyDown);
      html.classList.remove("hanuman-intro-active");
      restoreScroll();
    };
  }, []);

  if (!visible) return null;

  const { colors, timings, text, trailOffsets } = HANUMAN_INTRO;
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
      className={styles.root}
      style={rootStyle}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-labelledby="hanuman-intro-title"
      aria-describedby="hanuman-intro-welcome"
    >
      <IntroScene lightMode={lowPower} />
      <IntroParticles lightMode={lowPower} reducedMotion={reducedMotion} />
      <IntroGrid />
      <CornerBrackets variant="screen" />

      <div className={styles.orbitRing} ref={orbitRef} aria-hidden="true">
        <svg viewBox="0 0 600 600" focusable="false">
          <circle cx="300" cy="300" r="258" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="300" r="230" fill="none" stroke="currentColor" strokeWidth=".7" strokeDasharray="1 14" />
          <path d="M300 12V52M300 548V588M12 300H52M548 300H588M97 97L125 125M475 475L503 503M503 97L475 125M125 475L97 503" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className={styles.artStage} ref={artRef} data-layer="art">
        <CornerBrackets variant="art" />
        {trailOffsets.slice(0, lowPower ? 1 : 3).map((trail, index) => (
          <Image
            key={index}
            src="/images/hanuman-flying-silhouette.svg"
            alt=""
            aria-hidden="true"
            width={850}
            height={480}
            className={styles.trailImage}
            style={{
              "--trail-x": `${trail.x}%`,
              "--trail-y": `${trail.y}px`,
              "--trail-opacity": trail.opacity,
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
          className={styles.hanumanImage}
          draggable={false}
        />
        {!lowPower && (
          <>
            <Image
              src="/images/hanuman-flying-silhouette.svg"
              alt=""
              aria-hidden="true"
              width={850}
              height={480}
              className={`${styles.hanumanImage} ${styles.glitchSlice} ${styles.glitchSliceOne}`}
              draggable={false}
            />
            <Image
              src="/images/hanuman-flying-silhouette.svg"
              alt=""
              aria-hidden="true"
              width={850}
              height={480}
              className={`${styles.hanumanImage} ${styles.glitchSlice} ${styles.glitchSliceTwo}`}
              draggable={false}
            />
          </>
        )}
      </div>

      <div className={styles.speedLines} aria-hidden="true" data-layer="speed-lines">
        <span className={styles.speedLine} />
        <span className={styles.speedLine} />
        <span className={styles.speedLine} />
        <span className={styles.speedLine} />
      </div>
      <div className={styles.shockwaveRing} aria-hidden="true" />

      <div className={styles.copyBlock} data-layer="copy">
        <p className={styles.upperLabel}>{text.upperLabel}</p>
        <h1 id="hanuman-intro-title" className={styles.headline} aria-label={text.headlineAccessible}>
          <span className={styles.headlineMask}><span className={styles.headlineLine} aria-hidden="true">{text.headlineLineOne}</span></span>
          <span className={styles.headlineMask}><span className={styles.headlineLine} aria-hidden="true">{text.headlineLineTwo}</span></span>
        </h1>
        <p className={styles.teluguLine} aria-label={text.telugu}>{text.telugu}</p>
        <p className={styles.lowerLabel}>{text.lowerLabel}</p>
        <div className={styles.welcomeBlock} id="hanuman-intro-welcome">
          <CornerBrackets variant="welcome" />
          <p className={styles.welcomeText}>{text.welcome}</p>
        </div>
      </div>

      <LoadCounter counterRef={counterRef} />
      <Marquee />
      <SkipButton buttonRef={skipButtonRef} onSkip={() => finishRef.current()} disabled={!skipReady} />

      <div className={styles.exitBar} aria-hidden="true" />
      <div className={`${styles.exitPanel} ${styles.exitPanelTop}`} aria-hidden="true" />
      <div className={`${styles.exitPanel} ${styles.exitPanelBottom}`} aria-hidden="true" />
    </div>
  );
}
