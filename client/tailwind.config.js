/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-bg': 'gradient-bg 10s ease infinite',
      },
      keyframes: {
        'gradient-bg': {
          '0%, 60%': { background: 'linear-gradient(90deg, #00FF00, #FFFF00, #0000FF)' },
          '33%': { background: 'linear-gradient(90deg, #FFFF00, #0000FF, #00FF00)' },
          '50%': { background: 'linear-gradient(90deg, #0000FF, #00FF00, #FFFF00)' },
        },
      },
    },
  },
  plugins: [],
}
