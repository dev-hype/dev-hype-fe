import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'

import {
  getAuthCookie_server,
  removeAuthCookie_server,
} from '../../auth/utils/authCookie'

export const httpServer = (ctx: GetServerSidePropsContext) => {
  const token = getAuthCookie_server(ctx)

  const config: AxiosRequestConfig = {}

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...config,
  })

  http.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    async (error: AxiosError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response) {
        if (error.response.status === 401) {
          removeAuthCookie_server(ctx)
        }
      }

      return Promise.reject(error)
    },
  )

  return http
}
