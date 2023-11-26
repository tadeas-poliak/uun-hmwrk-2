/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper-yellow':'#F1E6CF',
        'dark-red':"#6F3D3D",
        'body-red':"#9F4343",
        'button-default':"#DA7035",
        'button-edit':"#AA8F04",
        'button-delete':"#DA3535",
        'button-submit':"#64B216",
      }
    },
  },

  plugins: [],
}