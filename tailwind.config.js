// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in the src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add Inter font
      },
      keyframes: {
        fadeInDown: {
          'from': { opacity: 0, transform: 'translateY(-20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
      },
    },
  },
  plugins: [],
}