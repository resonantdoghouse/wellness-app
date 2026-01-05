/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        lavender: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        zen: {
          bg: '#FDFBF7',
          text: '#4A4A4A',
          accent: '#8CAE9E',
          dark: {
            bg: '#1a1b26',
            text: '#a9b1d6',
            card: '#24283b'
          }
        }
      },
      animation: {
        'breathe-in': 'breatheIn 4s ease-in-out forwards',
        'breathe-hold': 'breatheHold 7s linear forwards',
        'breathe-out': 'breatheOut 8s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '1' },
        },
        breatheHold: {
          '0%': { transform: 'scale(1.5)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '1' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.5)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
