import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"], theme: { extend: { colors: { paper: "#FAF1E6", "cream-2": "#F3E7D8", card: "#FFFDF9", ink: "#131313", flame: "#E4572E", "flame-deep": "#C74A24", espresso: "#2A1A12", olive: "#7A8450", butter: "#F6C15B" }, fontFamily: { display: ["var(--font-display)"], "serif-subtle": ["var(--font-serif-subtle)"], "mono-price": ["var(--font-mono-price)"] } } }, plugins: [] };
export default config;
