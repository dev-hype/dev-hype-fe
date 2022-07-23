import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'

import { getSdk, GoalsQuery, GoalsQueryVariables } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

export type GoalsQueryKey = [
  string,
  Omit<GoalsQueryVariables, 'page' | 'limit'>,
]

export const getGoalsQueryKey = (
  vars: Omit<GoalsQueryVariables, 'page' | 'limit'>,
): GoalsQueryKey => ['/goals', vars]

export const goalsQueryFn: QueryFunction<GoalsQuery, GoalsQueryKey> = ({
  queryKey,
  pageParam = 1,
}) => {
  const [, { userId, topicId }] = queryKey

  return getSdk(gqlClient()).goals({
    userId,
    topicId,
    page: pageParam,
    limit: 20,
  })
}

export const useGoalsQuery = (
  vars: Omit<GoalsQueryVariables, 'page' | 'limit'>,
) => {
  const queryResult = useInfiniteQuery<
    GoalsQuery,
    unknown,
    GoalsQuery,
    GoalsQueryKey
  >({
    queryFn: goalsQueryFn,
    queryKey: getGoalsQueryKey(vars),
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      return lastPage.goals.page * lastPage.goals.limit < lastPage.goals.count
        ? lastPage.goals.page + 1
        : undefined
    },
  })

  return queryResult
}
