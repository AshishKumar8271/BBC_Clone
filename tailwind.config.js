/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '600px',
      'md': '900px',
      'lg': '1240px',
      'xl': '1500px',
      '2xl': '1900px',
    },
    extend: {
      boxShadow: {
        'bottom': '0px 2px',
        'menuShadow': '0px -1px rgb(255 255 255 / 22%)',
        'newsShadow': '0px 2px 10px 0px #b19e9e',
      },
      keyframes: {
        scale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(.90)' },
        }
      },
      animation: {
        scale: 'scale 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}