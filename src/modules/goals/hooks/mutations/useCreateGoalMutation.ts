import { useMutation, useQueryClient } from 'react-query'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { createGoal } from '../../api/goals'

import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'
import { getUserGoalsQueryKey } from '../queries/useUserGoalsQuery'

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient()

  const { data: userData } = useAuthUserQuery()

  const mutationResults = useMutation({
    mutationFn: createGoal,
    onSuccess: ({ goal }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(goal.id))
      queryClient.invalidateQueries(
        getUserGoalsQueryKey(userData?.user?.id || ''),
      )
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
