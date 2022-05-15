import axios, { AxiosError } from 'axios'

import {
  getAuthCookie_client,
  removeAuthCookie_client,
} from '../../auth/utils/authCookie'

import { corePaths } from '../constants/paths'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

httpClient.interceptors.request.use((config) => {
  const token = getAuthCookie_client()

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    }
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      if (error.response.status === 401) {
        removeAuthCookie_client()
        window.location.href = corePaths.home()
      }
    }

    return Promise.reject(error)
  },
)

export { httpClient }
