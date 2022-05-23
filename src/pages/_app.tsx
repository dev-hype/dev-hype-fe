import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'

import type { AppProps } from 'next/app'

import DefaultHead from 'src/modules/core/components/DefaultHead'
import AuthProvider from 'src/modules/auth/providers/AuthProvider'

import { theme } from 'src/modules/core/config/theme'
import AppNav from 'src/modules/core/components/AppNav'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { retry: false },
          queries: {
            staleTime: 2 * 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <DefaultHead />

          <ChakraProvider theme={theme}>
            <AppNav />

            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </Hydrate>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
