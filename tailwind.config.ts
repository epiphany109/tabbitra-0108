import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        forest: {
          DEFAULT: "#1A2F23",
          dark: "#162019",
          light: "#2A3F33",
        },
        accent: {
          DEFAULT: "#cc9966",
          dark: "#b88855",
        },
        wood: {
          DEFAULT: "#462921",
          light: "#5A3A32",
        },
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
      },
      keyframes: {
        "tree-sway": {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "tree-sway": "tree-sway 6s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;