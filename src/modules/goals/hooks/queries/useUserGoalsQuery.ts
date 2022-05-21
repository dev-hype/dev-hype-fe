import { QueryFunction, useQuery } from 'react-query'

import { getUserGoals } from '../../api/goals'

import { IUserGoalsResponse } from '../../types/res'

export type UserQueryKey = [string, { userId: string }]

export const getUserGoalsQueryKey = (userId: string): UserQueryKey => [
  '/goals?userId=:id',
  { userId },
]

export const userQueryFn: QueryFunction<IUserGoalsResponse, UserQueryKey> = ({
  queryKey,
}) => {
  const [, { userId }] = queryKey

  return getUserGoals(userId)
}

export const useUserGoalsQuery = (userId: string) => {
  const queryResult = useQuery<
    IUserGoalsResponse,
    unknown,
    IUserGoalsResponse,
    UserQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getUserGoalsQueryKey(userId),
  })

  return queryResult
}
