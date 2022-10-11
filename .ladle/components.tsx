import React, { useEffect } from 'react'
import * as NextImage from 'next/image'

import 'tailwindcss/tailwind.css'
import '../src/styles/global.css'

import type { GlobalProvider } from '@ladle/react'

export const Provider: GlobalProvider = ({ children, globalState }) => {
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(globalState.theme)
  }, [globalState.theme])

  return <div>{children}</div>
}

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})
