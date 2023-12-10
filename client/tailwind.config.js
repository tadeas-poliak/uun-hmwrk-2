/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper-yellow':'#F1E6CF',
        'paper-darker-yellow':'#EED5A4',
        'dark-red':"#602200",
        "darker-red":"#451D1D",
        'body-red':"#A82E06",
        'body-darker-red':"#632E06",
        'button-default':"#DA7035",
        'button-edit':"#AA8F04",
        'button-delete':"#DA3535",
        'button-submit':"#64B216",
      }
    },
  },

  plugins: [],
}