/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        heading: ['Inter', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        ui: ['"IBM Plex Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
