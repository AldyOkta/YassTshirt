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
        cream: '#F8FAFC',
        line: '#E2E8F0',
        navy: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          soft: 'rgba(15, 23, 42, 0.06)',
        },
        mute: '#64748B',
        wa: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
        },
        accent: {
          DEFAULT: '#EA580C',
          hover: '#C2410C',
          light: '#FFF7ED',
        },
      },
      fontFamily: {
        heading: [
          'Outfit',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
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
        'wa': '0 10px 25px -5px rgba(22, 163, 74, 0.3), 0 8px 10px -6px rgba(22, 163, 74, 0.2)',
        'accent': '0 10px 25px -5px rgba(234, 88, 12, 0.25), 0 8px 10px -6px rgba(234, 88, 12, 0.15)',
        'card': '0 2px 10px rgba(20, 33, 61, 0.04), 0 10px 24px rgba(20, 33, 61, 0.05)',
      }
    },
  },
  plugins: [],
}
