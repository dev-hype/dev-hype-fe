import { QueryFunction, useInfiniteQuery } from 'react-query'

import { getUserGoals } from '../../api/goals'

import { IUserGoalsResponse } from '../../types/res'

export type UserQueryKey = [string, { userId: string }]

export const getUserGoalsQueryKey = (userId: string): UserQueryKey => [
  '/goals?userId=:id',
  { userId },
]

export const userQueryFn: QueryFunction<IUserGoalsResponse, UserQueryKey> = ({
  queryKey,
  pageParam = 1,
}) => {
  const [, { userId }] = queryKey

  return getUserGoals({ userId, page: pageParam, limit: 20 })
}

export const useUserGoalsQuery = (userId: string) => {
  const queryResult = useInfiniteQuery<
    IUserGoalsResponse,
    unknown,
    IUserGoalsResponse,
    UserQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getUserGoalsQueryKey(userId),
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      return lastPage.page * lastPage.limit < lastPage.count
        ? lastPage.page + 1
        : undefined
    },
  })

  return queryResult
}
