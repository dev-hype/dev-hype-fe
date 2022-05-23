import { useMutation, useQueryClient } from 'react-query'

import { deleteGoal } from '../../api/goals'

import { getUserGoalsQueryKey } from '../queries/useUserGoalsQuery'

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient()

  const mutationResults = useMutation({
    mutationFn: deleteGoal,
    onSuccess: ({ goal }) => {
      queryClient.invalidateQueries(getUserGoalsQueryKey(goal.userId))
    },
  })

  return mutationResults
}
