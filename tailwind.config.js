/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        cyber: ['Cyberjunkies', 'sans-serif'],
      },
      backgroundImage: {
        'custom-bg': "url('../public/images/RCBG.png')",
      },
    },
  },
  plugins: [],
}

