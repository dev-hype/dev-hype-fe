import { QueryFunction, useQuery } from 'react-query'

import { getSingleGoal } from '../../api/goals'

import { ISingleGoalResponse } from '../../types/res'

export type SingleGoalQueryKey = [string, { goalId: number }]

export const getSingleGoalQueryKey = (goalId: number): SingleGoalQueryKey => [
  '/goals/:id',
  { goalId },
]

export const userQueryFn: QueryFunction<
  ISingleGoalResponse,
  SingleGoalQueryKey
> = ({ queryKey }) => {
  const [, { goalId }] = queryKey

  return getSingleGoal(goalId)
}

export const useGoalQuery = (goalId: number) => {
  const queryResult = useQuery<
    ISingleGoalResponse,
    unknown,
    ISingleGoalResponse,
    SingleGoalQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getSingleGoalQueryKey(goalId),
  })

  return queryResult
}
