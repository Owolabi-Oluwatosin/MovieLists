module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "3000px"
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
