import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'
import { getGoalsQueryKey } from '../queries/useGoalsQuery'

import { MutationCreateMilestoneArgs, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

const mutationFn = (vars: MutationCreateMilestoneArgs) =>
  getSdk(gqlClient()).createMilestone(vars)

export const useCreateMilestoneMutation = () => {
  const queryClient = useQueryClient()

  const { data: userData } = useAuthUserQuery()

  const mutationResults = useMutation({
    mutationFn,
    onSuccess: ({ createMilestone: { goalId } }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(goalId))
      queryClient.invalidateQueries(
        getGoalsQueryKey({ userId: userData?.me?.id || '' }),
      )
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
