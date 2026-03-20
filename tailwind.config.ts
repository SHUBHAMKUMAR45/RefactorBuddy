import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#080810",
          secondary: "#0f0f1a",
          tertiary: "#14142a",
          card: "#1a1a30",
        },
        accent: {
          purple: "#8b5cf6",
          "purple-dim": "#6d28d9",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          red: "#ef4444",
        },
        border: {
          subtle: "#1e1e3a",
          DEFAULT: "#2a2a4a",
          bright: "#3a3a6a",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          muted: "#4a5568",
          code: "#c4b5fd",
        },
      },
      fontFamily: {
        // These match the CSS variables defined in globals.css
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
