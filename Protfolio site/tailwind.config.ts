import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030712",
        accent: "#2563EB",
        muted: "#94A3B8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(37, 99, 235, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
