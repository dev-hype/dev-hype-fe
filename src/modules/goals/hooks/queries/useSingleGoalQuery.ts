import { QueryFunction, useQuery } from 'react-query'
import { getSdk, GoalQuery, GoalQueryVariables } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

export type SingleGoalQueryKey = [string, GoalQueryVariables]

export const getSingleGoalQueryKey = (id: number): SingleGoalQueryKey => [
  '/goals/:id',
  { id },
]

export const userQueryFn: QueryFunction<GoalQuery, SingleGoalQueryKey> = ({
  queryKey,
}) => {
  const [, { id }] = queryKey

  return getSdk(gqlClient()).goal({ id })
}

export const useGoalQuery = (id: number) => {
  const queryResult = useQuery<
    GoalQuery,
    unknown,
    GoalQuery,
    SingleGoalQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getSingleGoalQueryKey(id),
  })

  return queryResult
}
