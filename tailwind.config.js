/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ['"Source Sans 3"', "sans-serif"],
        ui: ['"IBM Plex Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          500: "#16a34a", // primary green (CTAs, highlights)
          600: "#276749", // hover / emphasis
          700: "#22543D", // strong actions, dark surfaces
        },

        light: {
          bg: "#F7FAF9", // app background (soft, not white)
          card: "#FFFFFF", // cards, modals
          border: "#E2E8F0", // dividers, inputs
          text: "#1A202C", // primary text
          text2: "#4A5568", // secondary text
        },

        dark: {
          bg: "#16202E", // dark background (not pure black)
          card: "#223044", // card surfaces
          border: "#334155", // borders
          text: "#E5E7EB", // primary text
          text2: "#94A3B8", // secondary text
        },

        accent: "#4ADE80", // success, subtle emphasis (not primary CTA)
      },
    },
  },
  plugins: [],
};
