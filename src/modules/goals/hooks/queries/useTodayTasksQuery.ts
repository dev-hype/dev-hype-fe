import { QueryFunction, useQuery } from 'react-query'

import { getTodayTasks } from '../../api/milestones'

import { ITodayTasksResponse } from '../../types/res'

export type TodayTasksQueryKey = [string]

export const getTodayTasksQueryKey = (): TodayTasksQueryKey => [
  '/milestones/tasks',
]

export const userQueryFn: QueryFunction<
  ITodayTasksResponse,
  TodayTasksQueryKey
> = () => {
  return getTodayTasks()
}

export const useTodayTasksQuery = () => {
  const queryResult = useQuery<
    ITodayTasksResponse,
    unknown,
    ITodayTasksResponse,
    TodayTasksQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getTodayTasksQueryKey(),
  })

  return queryResult
}
