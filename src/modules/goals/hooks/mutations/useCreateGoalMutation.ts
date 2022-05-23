import { useMutation, useQueryClient } from 'react-query'

import { createGoal } from '../../api/goals'

import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient()

  const mutationResults = useMutation({
    mutationFn: createGoal,
    onSuccess: ({ goal }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(goal.id))
    },
  })

  return mutationResults
}
