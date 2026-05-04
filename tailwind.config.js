/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        "premium-bg": "#030712", // Very dark slate (nearly black)
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-bg": "rgba(255, 255, 255, 0.03)",
        "accent-primary": "#10b981", // Emerald
        "accent-secondary": "#6366f1", // Indigo
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52,211,153,0.35), 0 10px 30px rgba(16,185,129,0.2)",
        "glass": "0 4px 30px rgba(0, 0, 0, 0.1)",
        "glass-hover": "0 8px 40px rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
