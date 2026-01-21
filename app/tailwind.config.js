/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1966b3",
        "primary-light": "#1183d4", 
        "background-light": "#ffffff",
        "background-dark": "#1f262e", // Unifying dark mode bg
        "star-yellow": "#FFD700",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Work Sans", "sans-serif"],
      },
      borderRadius: {
        "xl": "0.75rem",
        "2xl": "1rem",
      }
    },
  },
  plugins: [],
}
