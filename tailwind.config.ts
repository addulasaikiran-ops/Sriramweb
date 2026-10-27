import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#111b2b", gold: "#c9a96e", paper: "#f5f3ee", textMuted: "var(--text-muted)", goldDeep: "var(--gold-deep)", accentOrangeDeep: "var(--accent-orange-deep)" } } },
  plugins: [],
};
export default config;
