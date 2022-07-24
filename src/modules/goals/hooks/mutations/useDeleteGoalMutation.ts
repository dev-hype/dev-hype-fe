import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteGoalMutationVariables, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

import { getGoalsQueryKey } from '../queries/useGoalsQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient()

  const mutationResults = useMutation({
    mutationFn: (vars: DeleteGoalMutationVariables) =>
      getSdk(gqlClient()).deleteGoal(vars),
    onSuccess: ({ deleteGoal: { userId } }) => {
      queryClient.invalidateQueries(getGoalsQueryKey({ userId }))
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
