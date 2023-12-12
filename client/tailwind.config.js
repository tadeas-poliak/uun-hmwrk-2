/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper-yellow':'#f3dfc1',
        'paper-darker-yellow':'#B8A991',
        'dark-red':"#602200",
        "darker-red":"#451D1D",
        'body-red':"#A82E06",
        'body-darker-red':"#462104",
        'button-default':"#DA7035",
        'button-dark-default':"#81411F",
        'button-edit':"#AA8F04",
        'button-delete':"#DA3535",
        'button-submit':"#64B216",
      }
    },
  },

  plugins: [],
}