import styles from "./HanumanIntro.module.css";

type IntroElements = {
  screenFrame: HTMLElement | null;
  artFrame: HTMLElement | null;
  welcomeFrame: HTMLElement | null;
  scene: HTMLElement | null;
  grid: HTMLElement | null;
  gridLines: HTMLElement[];
  screenMarks: SVGElement[];
  artMarks: SVGElement[];
  welcomeMarks: SVGElement[];
  skipButton: HTMLButtonElement | null;
  copyBlock: HTMLElement | null;
  upperLabel: HTMLElement | null;
  headlineLines: HTMLElement[];
  telugu: HTMLElement | null;
  lowerLabel: HTMLElement | null;
  welcome: HTMLElement | null;
  statusDock: HTMLElement | null;
  marquee: HTMLElement | null;
  speedLines: HTMLElement[];
  shockwave: HTMLElement | null;
  exitBar: HTMLElement | null;
  exitTop: HTMLElement | null;
  exitBottom: HTMLElement | null;
  particles: HTMLElement | null;
};

/**
 * Collect the intro's animation targets in one place. The choreography stays
 * in HanumanIntro; this module owns the DOM contract between JSX and GSAP.
 */
export function collectHanumanIntroElements(
  root: HTMLElement,
  skipButton: HTMLButtonElement | null,
): IntroElements {
  const one = <T extends Element>(selector: string) => root.querySelector<T>(selector);
  const many = <T extends Element>(selector: string) =>
    Array.from(root.querySelectorAll<T>(selector));

  return {
    screenFrame: one<HTMLElement>('[data-frame="screen"]'),
    artFrame: one<HTMLElement>('[data-frame="art"]'),
    welcomeFrame: one<HTMLElement>('[data-frame="welcome"]'),
    scene: one<HTMLElement>(`.${styles.scene}`),
    grid: one<HTMLElement>(`.${styles.gridLines}`),
    gridLines: many<HTMLElement>(`.${styles.gridLine}`),
    screenMarks: many<SVGElement>('[data-frame="screen"] .' + styles.cornerMark),
    artMarks: many<SVGElement>('[data-frame="art"] .' + styles.cornerMark),
    welcomeMarks: many<SVGElement>('[data-frame="welcome"] .' + styles.cornerMark),
    skipButton,
    copyBlock: one<HTMLElement>(`.${styles.copyBlock}`),
    upperLabel: one<HTMLElement>(`.${styles.upperLabel}`),
    headlineLines: many<HTMLElement>(`.${styles.headlineLine}`),
    telugu: one<HTMLElement>(`.${styles.teluguLine}`),
    lowerLabel: one<HTMLElement>(`.${styles.lowerLabel}`),
    welcome: one<HTMLElement>(`.${styles.welcomeText}`),
    statusDock: one<HTMLElement>(`.${styles.statusDock}`),
    marquee: one<HTMLElement>(`.${styles.marquee}`),
    speedLines: many<HTMLElement>(`.${styles.speedLine}`),
    shockwave: one<HTMLElement>(`.${styles.shockwaveRing}`),
    exitBar: one<HTMLElement>(`.${styles.exitBar}`),
    exitTop: one<HTMLElement>(`.${styles.exitPanelTop}`),
    exitBottom: one<HTMLElement>(`.${styles.exitPanelBottom}`),
    particles: one<HTMLElement>(`.${styles.emberField}`),
  };
}
