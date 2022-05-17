import { QueryFunction, useQuery } from 'react-query'

import { useAuthContext } from 'src/modules/auth/providers/AuthProvider'

import { getAuthUser } from '../../api/users'

import { IAuthUserResponse } from '../../types/res'

type QueryKey = [string]

export const getAuthUserQueryKey = (): QueryKey => ['/users/me']

export const authUserQueryFn: QueryFunction<
  IAuthUserResponse,
  QueryKey
> = () => {
  return getAuthUser()
}

export const useAuthUserQuery = () => {
  const { isLoggedIn } = useAuthContext()

  const queryResult = useQuery<
    IAuthUserResponse,
    unknown,
    IAuthUserResponse,
    QueryKey
  >({
    queryFn: authUserQueryFn,
    queryKey: getAuthUserQueryKey(),
    enabled: isLoggedIn,
  })

  return queryResult
}
