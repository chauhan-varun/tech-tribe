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
          50: '#ffebeb',
          100: '#ffd6d6',
          200: '#ffadad',
          300: '#ff8585',
          400: '#ff5c5c',
          500: '#ff3333', /* Main primary color */
          600: '#e60000',
          700: '#cc0000',
          800: '#990000',
          900: '#660000',
        },
        dark: {
          100: '#1a1a1a',
          200: '#121212',
          300: '#0a0a0a', 
          400: '#000000', /* Main background color */
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}
