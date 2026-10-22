import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#111b2b", gold: "#c9a96e", paper: "#f4f1eb" } } },
  plugins: [],
};
export default config;
