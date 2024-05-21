/** @type {import('tailwindcss').Config} */

const myTheme = require("./theme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: myTheme.colors,
      fontsize: myTheme.fontSize,
      fontFamily: myTheme.fontFamily,
      boxShadow: myTheme.boxShadow,
      borderRadius: myTheme.borderRadius,
    },
  },
  plugins: [],
};
