import type { CSSProperties, RefObject } from "react";
import { HANUMAN_INTRO } from "./hanumanIntro.config";
import styles from "./HanumanIntro.module.css";

type CornerPosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type CornerVariant = "screen" | "art" | "welcome";

const cornerClasses: Record<CornerPosition, string> = {
  topLeft: styles.cornerTopLeft,
  topRight: styles.cornerTopRight,
  bottomLeft: styles.cornerBottomLeft,
  bottomRight: styles.cornerBottomRight,
};

const cornerPositions: CornerPosition[] = [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

/** Four light, vector-only corner marks. GSAP reveals each mark with clip-path. */
export function CornerBrackets({ variant }: { variant: CornerVariant }) {
  const variantClass = variant === "screen"
    ? styles.screenFrame
    : variant === "art"
      ? styles.artFrame
      : styles.welcomeFrame;

  return (
    <div className={`${styles.cornerFrame} ${variantClass}`} data-frame={variant} aria-hidden="true">
      {cornerPositions.map((position, index) => (
        <svg
          key={position}
          className={`${styles.cornerMark} ${cornerClasses[position]}`}
          viewBox="0 0 34 34"
          focusable="false"
          style={{ "--mark-index": index } as CSSProperties}
        >
          <path d="M2 32V2H32" fill="none" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </div>
  );
}

/** Five architectural hairlines: scaleY is animated, so paint stays on the compositor. */
export function IntroGrid() {
  return (
    <div className={styles.gridLines} data-layer="grid" aria-hidden="true">
      {HANUMAN_INTRO.gridPositions.map((left, index) => (
        <span
          className={styles.gridLine}
          key={left}
          style={{
            left: `${left}%`,
            "--grid-index": index,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

type LoadCounterProps = {
  counterRef: RefObject<HTMLSpanElement | null>;
};

/** The displayed value is driven by the master GSAP timeline, not a clock or CSS timer. */
export function LoadCounter({ counterRef }: LoadCounterProps) {
  const { metaBrand, metaDetail, counterLabel } = HANUMAN_INTRO.text;

  return (
    <div className={styles.statusDock} data-layer="status">
      <div className={styles.counterBlock}>
        <span className={styles.counterLabel}>{counterLabel}</span>
        <span className={styles.counterNumber} ref={counterRef} aria-label="Intro progress">000</span>
      </div>
      <div className={styles.metaBlock}>
        <span>{metaBrand}</span>
        <span>{metaDetail}</span>
      </div>
    </div>
  );
}

/** A duplicated track makes a seamless loop; it pauses for reduced-motion users. */
export function Marquee() {
  const phrase = HANUMAN_INTRO.text.marquee;

  return (
    <div className={styles.marquee} data-layer="marquee" aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[0, 1].map((group) => (
          <div className={styles.marqueeGroup} key={group}>
            {Array.from({ length: 4 }, (_, index) => (
              <span className={styles.marqueePhrase} key={index}>{phrase}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
