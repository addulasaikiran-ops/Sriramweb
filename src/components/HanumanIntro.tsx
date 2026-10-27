"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function HanumanIntro() {
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (window.sessionStorage.getItem("sriram-hanuman-intro-seen") === "1") return;
      window.sessionStorage.setItem("sriram-hanuman-intro-seen", "1");
    } catch {
      // If session storage is blocked, the intro can still run for this page view.
    }

    setVisible(true);
    timers.current.push(window.setTimeout(() => setIsExiting(true), 2150));
    timers.current.push(window.setTimeout(() => setVisible(false), 2750));

    return () => timers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const skipIntro = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
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
          <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hanuman-gold" x1="72" y1="45" x2="254" y2="285" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F4DCA5" />
                <stop offset=".48" stopColor="#D7AD66" />
                <stop offset="1" stopColor="#97652E" />
              </linearGradient>
              <radialGradient id="hanuman-glow" cx="0" cy="0" r="1" gradientTransform="translate(160 150) rotate(90) scale(132)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D7AD66" stopOpacity=".2" />
                <stop offset="1" stopColor="#D7AD66" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="160" cy="160" r="150" fill="url(#hanuman-glow)" />
            <circle className="hanuman-emblem-ring" cx="160" cy="160" r="132" stroke="url(#hanuman-gold)" strokeOpacity=".72" strokeWidth="1.2" />
            <circle cx="160" cy="160" r="119" stroke="#D7AD66" strokeOpacity=".22" />
            <g stroke="#D7AD66" strokeOpacity=".6" strokeWidth="1.2" strokeLinecap="round">
              <path d="M160 17V34M160 286V303M17 160H34M286 160H303" />
              <path d="M59 59L71 71M249 249L261 261M59 261L71 249M249 71L261 59" />
              <path d="M105 28L111 43M209 277L215 292M28 105L43 111M277 209L292 215M28 215L43 209M277 111L292 105M105 292L111 277M209 43L215 28" />
            </g>
            <g fill="url(#hanuman-gold)" stroke="#F5DCA5" strokeWidth="1.1" strokeLinejoin="round">
              {/* Crown and head */}
              <path d="M120 96L128 61L148 79L160 43L174 79L194 61L201 96L188 108H133L120 96Z" />
              <path d="M134 87L146 88L160 64L174 88L187 87L182 101H139L134 87Z" fill="#9C6A32" strokeWidth=".8" />
              <path d="M125 112C125 95 140 87 160 87C180 87 195 95 195 112L191 146C189 161 177 172 160 172C143 172 131 161 129 146L125 112Z" />
              {/* Ears and face */}
              <path d="M127 116C112 105 104 120 112 135L130 142L127 116Z" />
              <path d="M193 116C208 105 216 120 208 135L190 142L193 116Z" />
              <path d="M137 119C144 112 151 114 156 120M164 120C169 114 176 112 183 119" stroke="#30231B" strokeWidth="3" strokeLinecap="round" />
              <path d="M151 132L160 126L169 132L166 139H154L151 132Z" fill="#30231B" stroke="none" />
              <path d="M142 145C149 139 171 139 178 145C176 155 168 160 160 160C152 160 144 155 142 145Z" fill="#30231B" stroke="none" />
              <path d="M151 145L160 148L169 145" stroke="#E5BD7B" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M157 99L160 113L163 99" stroke="#FFF0C9" strokeWidth="2.1" strokeLinecap="round" />
              {/* Neck and shoulders */}
              <path d="M144 166L143 181L124 188C108 194 96 209 92 232L83 265H237L228 232C224 209 212 194 196 188L177 181L176 166C166 175 154 175 144 166Z" />
              <path d="M122 196C139 207 181 207 198 196L190 226L160 246L130 226L122 196Z" fill="#9C6A32" strokeWidth=".8" />
              <path d="M160 208L150 224L160 237L170 224L160 208Z" fill="#F0D39A" strokeWidth=".8" />
              {/* Arms */}
              <path d="M112 198C94 211 83 228 78 248L91 256C103 242 117 229 130 220L135 205L112 198Z" />
              <path d="M208 198C226 211 237 228 242 248L229 256C217 242 203 229 190 220L185 205L208 198Z" />
              {/* Lower body and legs */}
              <path d="M126 231L160 250L194 231L205 269L188 280H132L115 269L126 231Z" />
              <path d="M137 274L132 292H151L160 278L169 292H188L183 274H137Z" />
              {/* Tail curling behind left side */}
              <path d="M100 213C75 205 60 190 64 171C67 156 82 153 89 164C94 172 87 181 79 178" stroke="url(#hanuman-gold)" strokeWidth="7" strokeLinecap="round" fill="none" />
            </g>
            {/* Gada, the traditional mace */}
            <g stroke="url(#hanuman-gold)" strokeLinecap="round" strokeLinejoin="round">
              <path d="M231 123L252 255" strokeWidth="6" />
              <path d="M217 105C214 92 222 81 235 78L248 75L260 84C271 93 269 109 257 117L246 125L230 118L217 105Z" fill="url(#hanuman-gold)" strokeWidth="1.4" />
              <path d="M227 96L256 104M230 88L261 96M233 112L258 119" stroke="#855A2C" strokeWidth="1.5" />
              <path d="M247 255L257 266L247 276L237 266L247 255Z" fill="url(#hanuman-gold)" strokeWidth="1.2" />
            </g>
          </svg>
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
