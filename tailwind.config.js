/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily : {
        poppins : ['Poppins', 'sans-serif'],
        kaushan:['Kaushan Script','cursive'],
        montserrat:['Montserrat','sans-serif']
      }
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require('tailwind-capitalize-first-letter'),
  ],
}
