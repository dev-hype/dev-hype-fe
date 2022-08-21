import App from 'next/app'
import nookies from 'nookies'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SSRProvider as AriaSSRProvider } from 'react-aria'
import { Provider as JotaiProvider } from 'jotai'
import type { AppContext, AppProps } from 'next/app'

import Root from 'src/modules/core/components/Root'
import DefaultHead from 'src/modules/core/components/DefaultHead'

import AuthProvider from 'src/modules/auth/providers/AuthProvider'

import { useNProgress } from 'src/modules/core/hooks/useNProgress'
import { useRootQueryClient } from 'src/modules/core/hooks/useRootQueryClient'

import {
  ColorMode,
  COLOR_MODE_COOKIE_KEY,
} from 'src/modules/core/hooks/useColorMode'

import '../styles/global.css'

interface Props extends AppProps {
  initialColorMode?: ColorMode
}

const MyApp = ({ Component, pageProps, initialColorMode }: Props) => {
  useNProgress()

  const queryClient = useRootQueryClient()

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <DefaultHead />

            <AriaSSRProvider>
              <Root initialColorMode={initialColorMode}>
                <Component {...pageProps} />
              </Root>
            </AriaSSRProvider>
          </AuthProvider>
        </Hydrate>

        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </JotaiProvider>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const initialColorMode = nookies.get(appContext.ctx)[COLOR_MODE_COOKIE_KEY]

  return { ...appProps, initialColorMode }
}
