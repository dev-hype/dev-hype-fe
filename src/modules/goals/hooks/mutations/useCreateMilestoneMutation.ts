import { useMutation, useQueryClient } from 'react-query'

import { createMilestone } from '../../api/milestones'
import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'

export const useCreateMilestoneMutation = () => {
  const queryClient = useQueryClient()

  const mutationResults = useMutation({
    mutationFn: createMilestone,
    onSuccess: ({ milestone }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(milestone.goalId))
    },
  })

  return mutationResults
}
