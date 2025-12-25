/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
         script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
