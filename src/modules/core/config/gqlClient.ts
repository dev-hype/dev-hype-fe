import { GraphQLClient } from 'graphql-request'
import { GetServerSidePropsContext } from 'next'

import {
  getAuthCookie_client,
  getAuthCookie_server,
  removeAuthCookie_client,
  removeAuthCookie_server,
} from '../../auth/utils/authCookie'

import { corePaths } from '../constants/paths'

const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

export const gqlClient = (ctx?: GetServerSidePropsContext) => {
  const authToken = ctx ? getAuthCookie_server(ctx) : getAuthCookie_client()

  return new GraphQLClient(endpoint as string, {
    requestMiddleware: (request) => ({
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${authToken}`,
      },
    }),
    responseMiddleware: (response) => {
      if (response.status === 401) {
        ctx ? removeAuthCookie_server(ctx) : removeAuthCookie_client()
        if (window) window.location.href = corePaths.home()
      }
    },
  })
}
