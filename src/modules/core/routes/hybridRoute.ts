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

import { IAuthUser } from 'src/modules/users/types/entities'
import { IAuthUserResponse } from 'src/modules/users/types/res'

type Callback<
  P extends { [key: string]: any } = { user: IAuthUser },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D>,
  queryClient: QueryClient,
  user: IAuthUser | null,
) => Promise<GetServerSidePropsResult<P>>

export const hybridRoute =
  <
    P extends { [key: string]: any } = { user: IAuthUser },
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

    return callback(ctx, queryClient, userData?.user || null)
  }
