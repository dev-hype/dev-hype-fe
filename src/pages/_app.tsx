import { ChakraProvider } from '@chakra-ui/react'

import type { AppProps } from 'next/app'

import DefaultHead from 'src/modules/core/components/DefaultHead'

import { theme } from 'src/modules/core/config/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultHead />

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
