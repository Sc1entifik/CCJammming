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
				headerColor: "hsl(160, 90%, 75%)",
				textColor: "hsl(340, 60%, 95%)",
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
