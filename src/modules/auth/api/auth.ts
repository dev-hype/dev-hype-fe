import { httpClient } from 'src/modules/core/config/httpClient'

import { ILoginDto, ISignupDto } from '../types/dto'
import { ILoginResponse } from '../types/res'

import { removeAuthCookie_client } from '../utils/authCookie'

export const login = async (data: ILoginDto) => {
  const response = await httpClient.post<ILoginResponse>(
    '/auth/local/login',
    data,
  )

  return response.data
}

export const signup = async (data: ISignupDto) => {
  const response = await httpClient.post<{ message: string }>(
    '/auth/local/signup',
    data,
  )

  return response.data
}

export const logout = () => {
  removeAuthCookie_client()
}
