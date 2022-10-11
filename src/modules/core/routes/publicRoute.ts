import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { QueryClient } from '@tanstack/react-query'
import { getSdk, MeQuery } from 'src/generated/graphql'
import { getAuthCookie_server } from 'src/modules/auth/utils/authCookie'

import { getAuthUserQueryKey } from 'src/modules/users/hooks/queries/useAuthUserQuery'
import { gqlClient } from '../config/gqlClient'

import { corePaths } from '../constants/paths'

type Callback<
  P extends Record<string, unknown>,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
) => Promise<GetServerSidePropsResult<P>>

export const publicRoute =
  <
    P extends Record<string, unknown> = Record<string, unknown>,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData,
  >(
    callback: Callback<P, Q, D>,
  ): GetServerSideProps<P, Q, D> =>
  async ctx => {
    const authToken = getAuthCookie_server(ctx)
    const queryClient = new QueryClient()

    if (authToken) {
      await queryClient.prefetchQuery(getAuthUserQueryKey(), () =>
        getSdk(gqlClient(ctx)).me(),
      )
    }

    const userData = queryClient.getQueryData<MeQuery>(getAuthUserQueryKey())

    if (userData?.me) {
      return {
        redirect: {
          destination: corePaths.home(),
          permanent: true,
        },
      }
    }

    return callback(ctx)
  }
