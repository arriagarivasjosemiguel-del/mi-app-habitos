/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#0B0E14',
        cardDark: '#161B26',
        accent: '#5C4DFF',
        accentHover: '#4B3FE0',
        textMain: '#FFFFFF',
        textMuted: '#8B93A6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}