import { QueryFunction, useQuery } from 'react-query'
import { getSdk, MeQuery } from 'src/generated/graphql'

import { useAuthContext } from 'src/modules/auth/providers/AuthProvider'

import { gqlClient } from 'src/modules/core/config/gqlClient'

type QueryKey = [string]

export const getAuthUserQueryKey = (): QueryKey => ['/users/me']

export const authUserQueryFn: QueryFunction<MeQuery, QueryKey> = () => {
  return getSdk(gqlClient()).me()
}

export const useAuthUserQuery = () => {
  const { isLoggedIn } = useAuthContext()

  const queryResult = useQuery<MeQuery, unknown, MeQuery, QueryKey>({
    queryFn: authUserQueryFn,
    queryKey: getAuthUserQueryKey(),
    enabled: isLoggedIn,
  })

  return queryResult
}
