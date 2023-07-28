/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    screens: {
      'xs-screen':'360px',
      'small-screen':'375px',
      'normal-screen':'389px',
      'large-mobile':'411px',
      ' md'	:"768px",
      'lg':"1024px",
      'xl':"1280px",
    },
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

