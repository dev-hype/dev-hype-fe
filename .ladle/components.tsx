import React from 'react'
import * as NextImage from 'next/image'

import 'tailwindcss/tailwind.css'
import '../src/styles/global.css'

import type { GlobalProvider } from '@ladle/react'

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <div className={globalState.theme}>
    <div id="root">{children}</div>
  </div>
)

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})
