import { useMutation, useQueryClient } from 'react-query'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { createMilestone } from '../../api/milestones'
import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'
import { getUserGoalsQueryKey } from '../queries/useUserGoalsQuery'

export const useCreateMilestoneMutation = () => {
  const queryClient = useQueryClient()

  const { data: userData } = useAuthUserQuery()

  const mutationResults = useMutation({
    mutationFn: createMilestone,
    onSuccess: ({ milestone }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(milestone.goalId))
      queryClient.invalidateQueries(
        getUserGoalsQueryKey(userData?.user?.id || ''),
      )
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
