import { useCallback } from 'react'
import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { setCookie } from 'nookies'

export type ColorMode = 'light' | 'dark'

export const COLOR_MODE_COOKIE_KEY = 'dev-hype-color-scheme'

export const colorModeAtom = atom<ColorMode>('light')

export const useColorMode = (initialColorMode?: ColorMode) => {
  useHydrateAtoms([[colorModeAtom, initialColorMode]] as const)

  const [colorMode, setColorMode] = useAtom(colorModeAtom)

  const changeHandler = useCallback(
    (mode: ColorMode) => {
      setColorMode(mode)
      setCookie(null, COLOR_MODE_COOKIE_KEY, mode, { path: '/' })
    },
    [setColorMode],
  )

  return { colorMode, setColorMode: changeHandler }
}
