import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'

import DefaultHead from 'src/modules/core/components/DefaultHead'

import AuthProvider from 'src/modules/auth/providers/AuthProvider'

import { useNProgress } from 'src/modules/core/hooks/useNProgress'
import { useRootQueryClient } from 'src/modules/core/hooks/useRootQueryClient'

import '../styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useNProgress()

  const queryClient = useRootQueryClient()

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <DefaultHead />

            <Component {...pageProps} />
          </AuthProvider>
        </Hydrate>

        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </JotaiProvider>
  )
}

export default MyApp
