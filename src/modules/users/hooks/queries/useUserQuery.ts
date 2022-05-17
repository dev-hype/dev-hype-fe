import { QueryFunction, useQuery } from 'react-query'

import { getUser } from '../../api/users'

import { IUserResponse } from '../../types/res'

export type UserQueryKey = [string, { userId: string }]

export const getUserQueryKey = (userId: string): UserQueryKey => [
  '/users/:id',
  { userId },
]

export const userQueryFn: QueryFunction<IUserResponse, UserQueryKey> = ({
  queryKey,
}) => {
  const [, { userId }] = queryKey

  return getUser(userId)
}

export const useUserQuery = (userId: string) => {
  const queryResult = useQuery<
    IUserResponse,
    unknown,
    IUserResponse,
    UserQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getUserQueryKey(userId),
  })

  return queryResult
}
