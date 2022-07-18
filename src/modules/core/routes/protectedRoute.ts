import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { QueryClient } from 'react-query'

import { corePaths } from '../constants/paths'

import { getAuthUserQueryKey } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { gqlClient } from '../config/gqlClient'
import { getSdk, MeQuery } from 'src/generated/graphql'
import {
  getAuthCookie_server,
  removeAuthCookie_server,
} from 'src/modules/auth/utils/authCookie'

type Callback<
  P extends Record<string, unknown> = Record<string, unknown>,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
  queryClient: QueryClient,
  user: MeQuery,
) => Promise<GetServerSidePropsResult<P>>

export const protectedRoute =
  <
    P extends Record<string, unknown> = Record<string, unknown>,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData,
  >(
    callback: Callback<P, Q, D>,
  ): GetServerSideProps<P, Q, D> =>
  async (ctx) => {
    const authToken = getAuthCookie_server(ctx)
    const queryClient = new QueryClient()

    if (authToken) {
      await queryClient.prefetchQuery(getAuthUserQueryKey(), () =>
        getSdk(gqlClient(ctx)).me(),
      )
    }

    const userData = queryClient.getQueryData<MeQuery>(getAuthUserQueryKey())

    if (!userData) {
      removeAuthCookie_server(ctx)

      return {
        redirect: {
          destination: corePaths.home(),
          permanent: true,
        },
      }
    }

    return callback(ctx, queryClient, userData)
  }
