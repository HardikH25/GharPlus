/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        "accent-primary": "#688A71", // Brand sage green (updated from old emerald)
      },
    },
  },
  plugins: [],
};
