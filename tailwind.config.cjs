/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        beaufort: ["Beaufort", "sans-serif"],
        barlow: ["Barlow Condensed", "sans-serif"],
      },

      colors: {
        brand: "#002e6b",
        "brand-dark": "#1565C0",
        "brand-soft": "#E3F2FD",
        brandText: "#0D3B66",
        "brandText-light": "#4B6B88",
        brandtexting: "#fff930",
        bgMain: "#f7fac6",
        brandbrown: "#41291b",
      },
    },
  },
  plugins: [],
};
