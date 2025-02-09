/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Clash Display', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
