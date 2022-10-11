import { useCallback, useState } from 'react'
import nookies from 'nookies'

export type ColorMode = 'light' | 'dark'

export const COLOR_MODE_COOKIE_KEY = 'dev-hype-color-scheme'

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState(
    () => nookies.get(null)[COLOR_MODE_COOKIE_KEY] as ColorMode,
  )

  const changeHandler = useCallback((mode: ColorMode) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(mode)

    nookies.set(null, COLOR_MODE_COOKIE_KEY, mode, { path: '/' })

    setColorMode(mode)
  }, [])

  return { colorMode, setColorMode: changeHandler }
}
