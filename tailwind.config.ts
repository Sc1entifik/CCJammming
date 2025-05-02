import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
				headerColor: "hsl(12, 100%, 55%)",
				textColor: "hsl(52, 100%, 85%)",
      },
			fontFamily: {
				bounce: ["NiceBounce", "Geist-MonoVF", "sans-serif"],
				tropiLand: ["Tropiland", "Geist-MonoVF", "sans-serif"],
			}
    },
  },
  plugins: [],
};
export default config;
