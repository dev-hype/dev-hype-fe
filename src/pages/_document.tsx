import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import nookies from 'nookies'

import {
  ColorMode,
  COLOR_MODE_COOKIE_KEY,
} from 'src/modules/core/hooks/useColorMode'

export default class Document extends NextDocument<{
  initialColorMode: ColorMode
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)

    const initialColorMode = nookies.get(ctx)[COLOR_MODE_COOKIE_KEY]

    return { ...initialProps, initialColorMode }
  }

  render() {
    return (
      <Html lang="en" className={this.props.initialColorMode}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
