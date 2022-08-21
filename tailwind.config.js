/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#050505',
      blue: colors.indigo,
      current: 'currentColor',
      gray: colors.stone,
      green: colors.green,
      purple: colors.violet,
      red: colors.red,
      transparent: 'transparent',
      white: '#fefefe',
    },
    extend: {
      colors: {
        gold: {
          50: '#f7ecd5',
          100: '#eddfc1',
          200: '#dfca9e',
          300: '#d1b47a',
          400: '#c49f55',
          DEFAULT: '#aa853b',
          600: '#84682d',
          700: '#604a1e',
          800: '#3a2c0f',
          900: '#170e00',
        },
      },
      zIndex: {
        appBar: 1000,
        drawer: 1100,
        modal: 1200,
        snackbar: 1300,
        tooltip: 1400,
      },
    },
  },
  plugins: [],
}
