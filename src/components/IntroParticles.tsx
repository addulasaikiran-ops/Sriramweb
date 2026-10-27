import type { CSSProperties } from "react";
import { HANUMAN_INTRO } from "./hanumanIntro.config";
import styles from "./HanumanIntro.module.css";

type IntroParticlesProps = {
  lightMode: boolean;
  reducedMotion: boolean;
};

const PARTICLE_SEEDS = Array.from({ length: HANUMAN_INTRO.particles.standardCount }, (_, index) => ({
  id: index,
  left: (index * 37 + 11) % 97,
  bottom: (index * 23 + 7) % 42,
  delay: -((index * 0.37) % 4.8),
  duration: 3.8 + (index % 6) * 0.52,
  drift: ((index * 19) % 84) - 42,
  size: 2 + (index % 3),
  alpha: 0.35 + (index % 5) * 0.12,
  colorIndex: 0,
}));

const EMBER_COLORS = [HANUMAN_INTRO.colors.saffron] as const;

/** Deterministic CSS particles avoid canvas startup and keep the layer inexpensive. */
export function IntroParticles({ lightMode, reducedMotion }: IntroParticlesProps) {
  if (reducedMotion) return null;

  const count = lightMode
    ? HANUMAN_INTRO.particles.lowPowerCount
    : HANUMAN_INTRO.particles.standardCount;

  return (
    <div className={styles.emberField} aria-hidden="true">
      {PARTICLE_SEEDS.slice(0, count).map((ember) => (
        <span
          className={styles.ember}
          key={ember.id}
          style={{
            left: `${ember.left}%`,
            bottom: `${ember.bottom}%`,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
            "--ember-drift": `${ember.drift}px`,
            "--ember-size": `${ember.size}px`,
            "--ember-alpha": ember.alpha,
            "--ember-color": EMBER_COLORS[0],
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
