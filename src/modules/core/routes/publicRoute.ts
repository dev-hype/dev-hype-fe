import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { QueryClient } from 'react-query'

import { getAuthUser } from 'src/modules/users/api/users'
import { authUserQueryKey } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { IAuthUserResponse } from 'src/modules/users/types/res'

import { corePaths } from '../constants/paths'

type Callback<
  P extends { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
) => Promise<GetServerSidePropsResult<P>>

export const publicRoute =
  <
    P extends { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData,
  >(
    callback: Callback<P, Q, D>,
  ): GetServerSideProps<P, Q, D> =>
  async (ctx) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(authUserQueryKey, () => getAuthUser(ctx))

    const userData =
      queryClient.getQueryData<IAuthUserResponse>(authUserQueryKey)

    if (userData?.user) {
      return {
        redirect: {
          destination: corePaths.home(),
          permanent: true,
        },
      }
    }

    return callback(ctx)
  }
