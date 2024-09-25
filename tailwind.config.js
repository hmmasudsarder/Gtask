/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppns", "sans-serif"],
        inter: ["nter", "sans-serif"],
      },
      colors: {
        backText: "#222222",
        primry: "#40282c",
        secondary: "#fff",
        darkOrange: "#A65132",
        grayText: "#999",
        lightOrange: "#FFBF64",
        black: "#0D0D10",
        chartBar:"blue",
        borderColor: "#F1F3F7"
      },
    },
  },
  plugins: [],
}