/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode support
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        canela: ['"Canela Deck"', 'serif'],
        sodo: ['"SoDo Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

