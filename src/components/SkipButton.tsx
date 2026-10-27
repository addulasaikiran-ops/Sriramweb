import type { RefObject } from "react";
import { HANUMAN_INTRO } from "./hanumanIntro.config";
import styles from "./HanumanIntro.module.css";

type SkipButtonProps = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  onSkip: () => void;
  disabled: boolean;
};

/** A native 44px+ button: Enter/Space activate it; the parent owns Escape and focus wrap. */
export function SkipButton({ buttonRef, onSkip, disabled }: SkipButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.skip}
      onClick={onSkip}
      aria-label="Skip the Hanuman intro and reveal Sriram Travels"
      disabled={disabled}
    >
      <span>{HANUMAN_INTRO.text.skipLabel}</span>
      <span className={styles.skipArrow} aria-hidden="true">↗</span>
    </button>
  );
}
