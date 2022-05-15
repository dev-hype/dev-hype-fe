import React, { createContext, ReactNode, useContext, useMemo } from 'react'
import { useBoolean } from '@chakra-ui/react'

import { getAuthCookie_client } from '../utils/authCookie'

interface IAuthProviderProps {
  children: ReactNode
}

type AuthContextValue = {
  isLoggedIn: boolean
  setLoggedInFlagOn: () => void
  setLoggedInFlagOff: () => void
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

const AuthProvider: React.FC<IAuthProviderProps> = (props) => {
  const { children } = props

  const [isLoggedIn, { on: setLoggedInFlagOn, off: setLoggedInFlagOff }] =
    useBoolean(Boolean(getAuthCookie_client()))

  const value: AuthContextValue = useMemo(
    () => ({
      isLoggedIn,
      setLoggedInFlagOn,
      setLoggedInFlagOff,
    }),
    [isLoggedIn, setLoggedInFlagOff, setLoggedInFlagOn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
