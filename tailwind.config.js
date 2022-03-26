module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pFont: {
          500: "#007980",
        },
        sFont: {
          500: "#000000"
        },
        lFont: {
          500: "#FFFFFF",
        },
        bg1 : {
          500: "#0081A7",
        },
        bg2 : {
          500: "#FDFCDC",
       
        },
        btn : {
          500 : "#F07176",
        },
        alrtBx : {
          500 : "#FED9B7",
        }
      },
      spacing: {
        150: '800px'
      }
    },
  },
  plugins: [],
}