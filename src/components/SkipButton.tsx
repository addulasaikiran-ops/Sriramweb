import type { RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { HANUMAN_INTRO } from "./hanumanIntro.config";
import styles from "./HanumanIntro.module.css";

type SkipButtonProps = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  onSkip: () => void;
  reducedMotion: boolean;
};

/** Native button semantics provide Tab/Enter support; Esc is handled by the parent dialog. */
export function SkipButton({ buttonRef, onSkip, reducedMotion }: SkipButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.skip} ${reducedMotion ? styles.skipReduced : ""}`}
      onClick={onSkip}
      aria-label="Skip the Hanuman intro and open Sriram Travels"
      style={{ animationDelay: `${HANUMAN_INTRO.timings.skipAppearMs}ms` }}
    >
      <span>Skip intro</span>
      {!reducedMotion && (
        <svg className={styles.progressRing} viewBox="0 0 36 36" aria-hidden="true">
          <circle className={styles.progressTrack} cx="18" cy="18" r="15.5" pathLength="100" />
          <circle className={styles.progressValue} cx="18" cy="18" r="15.5" pathLength="100" />
        </svg>
      )}
      <ArrowUpRight size={14} aria-hidden="true" />
    </button>
  );
}
