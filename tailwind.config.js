/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

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
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function (helpers) {
      // variants that help styling Radix-UI components
      dataStateVariant('open', helpers)
      dataStateVariant('closed', helpers)
      dataStateVariant('on', helpers)
      dataStateVariant('checked', helpers)
      dataStateVariant('unchecked', helpers)
      dataStateVariant('disabled', helpers)

      // disabled
      helpers.addVariant(`data-disabled`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${helpers.e(
            `data-disabled${separator}${className}`,
          )}[data-disabled]`
        })
      })
    }),
  ],
}

function dataStateVariant(
  state,
  {
    addVariant, // for registering custom variants
    e, // for manually escaping strings meant to be used in class names
  },
) {
  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(
        `data-state-${state}${separator}${className}`,
      )}[data-state='${state}']`
    })
  })

  addVariant(`group-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-state='${state}'] .${e(
        `group-data-state-${state}${separator}${className}`,
      )}`
    })
  })

  addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-state='${state}'] ~ .${e(
        `peer-data-state-${state}${separator}${className}`,
      )}`
    })
  })
}
