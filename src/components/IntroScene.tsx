import styles from "./HanumanIntro.module.css";

type IntroSceneProps = {
  lightMode: boolean;
};

/** Pure CSS/SVG scene artwork: no network-loaded image or font assets. */
export function IntroScene({ lightMode }: IntroSceneProps) {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.sky} />
      <div className={styles.horizonGlow} />
      <div className={styles.sunHalo} />
      <div className={styles.rays} />
      <div className={`${styles.mist} ${styles.mistFar}`} />
      <div className={`${styles.mist} ${styles.mistMid}`} />
      <div className={`${styles.mist} ${styles.mistNear}`} />

      <svg
        className={styles.horizon}
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
      >
        <path
          className={styles.ridgeFar}
          d="M0 290 78 237 139 260 209 187 265 231 333 210 386 248 461 181 525 225 584 190 651 232 724 175 789 222 855 196 919 239 991 179 1056 227 1128 197 1190 240 1260 198 1324 234 1382 213 1440 252V520H0Z"
        />
        <path
          className={styles.ridgeMid}
          d="M0 352 82 306 132 324 194 281 254 317 315 290 388 333 455 280 525 326 593 298 662 337 736 287 800 333 872 303 937 350 1004 297 1071 342 1142 303 1203 342 1269 313 1330 349 1384 326 1440 349V520H0Z"
        />
        <path
          className={styles.ridgeNear}
          d="M0 402 80 371 155 394 223 359 294 389 360 370 430 403 500 370 571 395 650 366 719 403 789 371 859 398 936 367 1003 406 1075 371 1149 399 1226 365 1302 402 1374 380 1440 398V520H0Z"
        />

        {/* A small, purely vector gopuram keeps the horizon devotional, not busy. */}
        <g className={styles.temple} transform="translate(1123 0)">
          <path d="M0 306H230V520H0Z" />
          <path d="M18 306 115 258 212 306Z" />
          <path d="M42 288 55 233 75 252 83 201 104 225 115 165 127 225 148 201 156 252 176 233 189 288Z" />
          <path d="M25 309H205V337H25ZM38 351H192V378H38ZM48 392H182V419H48Z" />
          <path d="M72 520V430C72 399 158 399 158 430V520Z" />
          <path d="M108 165V130H122V165M115 130V112" fill="none" stroke="#FF9933" strokeWidth="4" />
          <path d="M112 112 132 122 112 132Z" fill="#FF9933" />
          <g fill="#FF9933" opacity=".56">
            <path d="M49 321H63V334H49ZM82 321H96V334H82ZM115 321H129V334H115ZM148 321H162V334H148ZM181 321H195V334H181Z" />
            <path d="M60 363H73V376H60ZM92 363H105V376H92ZM124 363H137V376H124ZM156 363H169V376H156Z" />
          </g>
        </g>
      </svg>

      <div className={styles.foregroundSilhouette} />
      <div className={styles.vignette} />
      {!lightMode && <div className={styles.noise} />}
    </div>
  );
}
