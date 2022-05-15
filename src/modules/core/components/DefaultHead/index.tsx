import React from 'react'
import Head from 'next/head'

const DefaultHead: React.FC = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/images/favicons/safari-pinned-tab.svg"
        color="#f4ead7"
      />
      <link rel="shortcut icon" href="/images/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#f4ead7" />
      <meta
        name="msapplication-config"
        content="/images/favicons/browserconfig.xml"
      />
      <meta name="theme-color" content="#f4ead7" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <title>Dev Hype</title>
    </Head>
  )
}

export default DefaultHead
