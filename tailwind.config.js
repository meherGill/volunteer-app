module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary": "#d66f2b",
            "secondary": "#c45c29",
            "accent": "#0891b2",
            "neutral": "#22d3ee",
            "base-100": "#FFF7ED",
            "info": "#A6D2E7",
            "success": "#177D4C",
            "warning": "#B27C10",                
            "error": "#FA4E42",
        }
      }
    ]
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        '3' : 3,
        '1' : 1,
      },

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
  plugins: [
    require("daisyui")
  ],
}