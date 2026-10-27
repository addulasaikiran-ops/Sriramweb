"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function HanumanIntro() {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(false); return; }

    try {
      if (window.sessionStorage.getItem("sriram-hanuman-intro-seen") === "1") { setVisible(false); return; }
    } catch {
      // If session storage is blocked, the intro can still run for this page view.
    }

    setIsExiting(false);
    setVisible(true);
    timers.current.push(window.setTimeout(() => setIsExiting(true), 2450));
    timers.current.push(window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("sriram-hanuman-intro-seen", "1");
      } catch {
        // The intro still closes normally when session storage is blocked.
      }
      setVisible(false);
    }, 3050));

    return () => timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const skipIntro = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    try {
      window.sessionStorage.setItem("sriram-hanuman-intro-seen", "1");
    } catch {
      // Skipping still works when session storage is blocked.
    }
    setIsExiting(true);
    timers.current.push(window.setTimeout(() => setVisible(false), 420));
  };

  if (!visible) return null;

  return (
    <div
      className={`hanuman-intro ${isExiting ? "hanuman-intro--exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sriram Travels welcome intro"
    >
      <div className="hanuman-intro-grain" aria-hidden="true" />
      <div className="hanuman-intro-aura hanuman-intro-aura--one" aria-hidden="true" />
      <div className="hanuman-intro-aura hanuman-intro-aura--two" aria-hidden="true" />

      <div className="hanuman-intro-content">
        <span className="hanuman-intro-blessing">॥ श्री राम ॥</span>
        <div className="hanuman-emblem" aria-hidden="true">
          <Image
            src="/images/hanuman-flying-silhouette.svg"
            alt=""
            width={1628}
            height={846}
            priority
            className="hanuman-silhouette-image"
          />
        </div>

        <div className="hanuman-intro-copy">
          <span className="hanuman-intro-kicker">STRENGTH · COURAGE · EVERY JOURNEY</span>
          <h1>Jai Shri Ram</h1>
          <p>Welcome to Sriram Travels</p>
          <span className="hanuman-intro-rule" aria-hidden="true"><span /></span>
        </div>
      </div>

      <button type="button" className="hanuman-intro-skip" onClick={skipIntro}>
        Skip intro <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
