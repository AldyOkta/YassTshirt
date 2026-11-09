/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        line: '#E8E2D9',
        navy: {
          DEFAULT: '#14213D',
          dark: '#0F1626',
          soft: 'rgba(20, 33, 61, 0.08)',
        },
        mute: '#5B6577',
        wa: {
          DEFAULT: '#15803D',
          hover: '#116B32',
        },
        accent: '#F2B705',
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      boxShadow: {
        'wa': '0 10px 25px -5px rgba(21, 128, 61, 0.25), 0 8px 10px -6px rgba(21, 128, 61, 0.15)',
        'card': '0 2px 10px rgba(20, 33, 61, 0.04), 0 10px 24px rgba(20, 33, 61, 0.05)',
      }
    },
  },
  plugins: [],
}
