import React from 'react'
import Head from 'next/head'

const DefaultHead: React.FC = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicons/apple-touch-icon.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicons/favicon-32x32.png?v=1"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicons/favicon-16x16.png?v=1"
      />
      <link rel="manifest" href="/images/favicons/site.webmanifest?v=1" />
      <link
        rel="mask-icon"
        href="/images/favicons/safari-pinned-tab.svg?v=1"
        color="#84682d"
      />
      <link rel="shortcut icon" href="/images/favicons/favicon.ico?v=1" />
      <meta name="apple-mobile-web-app-title" content="Dev Hype" />
      <meta name="application-name" content="Dev Hype" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta
        name="msapplication-config"
        content="/images/favicons/browserconfig.xml?v=1"
      />
      <meta name="theme-color" content="#fafafa" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <title>Dev Hype</title>
    </Head>
  )
}

export default DefaultHead
