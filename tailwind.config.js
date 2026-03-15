/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream:  "#f7f4ef",
        dark:   "#1a1814",
        gold:   "#c9a96e",
        "gold-light": "#e8d5b0",
        gray:   "#8a8578",
        border: "rgba(26,24,20,0.1)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans:  ['"DM Sans"', "sans-serif"],
      },
      backgroundImage: {
        "grad-1": "linear-gradient(160deg, #4a3f35 0%, #1e1a15 100%)",
        "grad-2": "linear-gradient(160deg, #35402a 0%, #1a1e14 100%)",
        "grad-3": "linear-gradient(160deg, #30354a 0%, #141620 100%)",
        "grad-4": "linear-gradient(160deg, #403530 0%, #201a17 100%)",
        "grad-5": "linear-gradient(160deg, #3a3040 0%, #1c1520 100%)",
        "grad-6": "linear-gradient(160deg, #3a4535 0%, #1c2218 100%)",
        "grad-7": "linear-gradient(160deg, #453828 0%, #221c14 100%)",
        "grad-8": "linear-gradient(160deg, #2a4035 0%, #141f1a 100%)",
      },
    },
  },
  plugins: [],
};
