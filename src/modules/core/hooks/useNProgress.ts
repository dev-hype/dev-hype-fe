import { useEffect } from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'

import 'nprogress/nprogress.css'

export const useNProgress = () => {
  useEffect(() => {
    const progress = NProgress.configure({
      showSpinner: false,
    })

    const handleRouteStart = () => progress.start()
    const handleRouteDone = () => progress.done()

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])
}
