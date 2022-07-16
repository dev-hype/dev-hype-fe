import { useMutation, useQueryClient } from 'react-query'

import { deleteGoal } from '../../api/goals'

import { getUserGoalsQueryKey } from '../queries/useUserGoalsQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient()

  const mutationResults = useMutation({
    mutationFn: deleteGoal,
    onSuccess: ({ goal }) => {
      queryClient.invalidateQueries(getUserGoalsQueryKey(goal.userId))
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
