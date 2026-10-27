/**
 * Single source of truth for the devotional intro's timing, brand colors and copy.
 * Keep the complete cinematic entrance at or below 4.8 seconds.
 */
export const HANUMAN_INTRO = {
  timings: {
    sceneFadeMs: 500,
    skipAppearMs: 500,
    flightStartMs: 400,
    flightDurationMs: 1800,
    hoverStartMs: 2150,
    shockwaveStartMs: 2050,
    shockwaveDurationMs: 720,
    teluguStartMs: 2380,
    englishStartMs: 2580,
    englishStaggerMs: 34,
    dividerStartMs: 3100,
    welcomeStartMs: 3280,
    taglineStartMs: 3650,
    exitStartMs: 3980,
    exitDurationMs: 820,
    reducedMotionTotalMs: 800,
    reducedMotionFadeMs: 280,
    skipDurationMs: 360,
    focusSkipMs: 520,
  },
  colors: {
    midnight: "#070915",
    indigo: "#11142b",
    maroon: "#2a0b19",
    saffron: "#FF9933",
    orange: "#E8590C",
    ember: "#B3360B",
    gold: "#FFD166",
    paleGold: "#FFE9A8",
    greenGold: "#D7E47A",
  },
  text: {
    telugu: "జై శ్రీ రామ్",
    english: "JAI SHRI RAM",
    welcome: "Welcome to Sriram Travels",
    tagline: "Safe journeys. Blessed by Hanuman Ji.",
  },
  particles: {
    standardCount: 32,
    lowPowerCount: 10,
  },
  trailOffsets: [
    { x: -13, y: 5, opacity: 0.2, blur: 1.8, scale: 0.98 },
    { x: -24, y: 9, opacity: 0.12, blur: 3.2, scale: 0.95 },
    { x: -35, y: 13, opacity: 0.075, blur: 4.8, scale: 0.92 },
    { x: -46, y: 16, opacity: 0.045, blur: 6.2, scale: 0.89 },
  ],
} as const;

export const HANUMAN_SESSION_KEY = "sriram-hanuman-intro-seen";
