import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
  },
  colors: {
    white: '#fefefe',
    black: '#050505',
    brand: {
      50: '#f7ecd5',
      100: '#eddfc1',
      200: '#dfca9e',
      300: '#d1b47a',
      400: '#c49f55',
      500: '#aa853b',
      600: '#84682d',
      700: '#604a1e',
      800: '#3a2c0f',
      900: '#170e00',
    },
    gray: {
      50: '#f1f4e8',
      100: '#dadbd2',
      200: '#c3c3ba',
      300: '#ababa0',
      400: '#939386',
      500: '#7a786d',
      600: '#5f5e54',
      700: '#44443b',
      800: '#2a2921',
      900: '#141000',
    },
  },
  shadows: {
    outline: '0 0 0 3px #84682d55',
  },
  components: {
    Button: {
      variants: {
        ghost: {
          _hover: {
            bgColor: 'blackAlpha.200',
          },
          _active: {
            bgColor: 'blackAlpha.300',
          },
        },
      },
      baseStyle: {
        borderRadius: 2,
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
})
