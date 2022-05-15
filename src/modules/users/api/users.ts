import { AxiosInstance } from 'axios'
import { GetServerSidePropsContext } from 'next'

import { httpClient } from 'src/modules/core/config/httpClient'
import { httpServer } from 'src/modules/core/config/httpServer'

import { IUser } from '../types/entities'
import { IAuthUserResponse } from '../types/res'

export const getAuthUser = async (ctx?: GetServerSidePropsContext) => {
  let http: AxiosInstance

  if (ctx) {
    http = httpServer(ctx)
  } else {
    http = httpClient
  }

  const response = await http.get<IAuthUserResponse>('/users/me')

  return response.data
}

export const getUser = async (id: string, ctx?: GetServerSidePropsContext) => {
  let http: AxiosInstance

  if (ctx) {
    http = httpServer(ctx)
  } else {
    http = httpClient
  }

  try {
    const user = await http.get<IUser>(`/users/${id}`)

    return user.data
  } catch (error) {
    return null
  }
}
