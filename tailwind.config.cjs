/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#E72B71",
        "brand-dark": "#c81f5e",
        "brand-soft": "#fce4ed",
        brandText: "#9a1459",
        "brandText-light": "#cb5086",
      },
    },
  },
  plugins: [],
};
