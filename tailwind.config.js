/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e8',
          100: '#c3e6c3',
          200: '#9cd49c',
          300: '#74c274',
          400: '#52ab52',
          500: '#2e7d32', // Primary green
          600: '#256828',
          700: '#1d5520',
          800: '#164419',
          900: '#0f3612',
        },
        accent: {
          pink: '#ff6b9d',
          yellow: '#ffd93d',
          blue: '#6bcf7f',
          purple: '#c56cf0',
          orange: '#ff8b94',
        }
      },
      fontFamily: {
        'rounded': ['Comic Sans MS', 'Marker Felt', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}