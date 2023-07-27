/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors:{
        'very-dark-gray':'#2B2B2B',
        'dark-gray':'#969696',

      },
      fontFamily: {
        'rubik':["Rubik","sans-serif"]
      }      
    },
  },
  plugins: [],
}

