import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { getSingleGoalQueryKey } from '../queries/useSingleGoalQuery'
import { getTodayTasksQueryKey } from '../queries/useTodayTasksQuery'
import { getGoalsQueryKey } from '../queries/useGoalsQuery'

import { CreateGoalMutationVariables, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

const mutationFn = (vars: CreateGoalMutationVariables) =>
  getSdk(gqlClient()).createGoal(vars)

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient()

  const { data: userData } = useAuthUserQuery()

  const mutationResults = useMutation({
    mutationFn,
    onSuccess: ({ createGoal: { id } }) => {
      queryClient.invalidateQueries(getSingleGoalQueryKey(id))
      queryClient.invalidateQueries(
        getGoalsQueryKey({ userId: userData?.me?.id || '' }),
      )
      queryClient.invalidateQueries(getTodayTasksQueryKey())
    },
  })

  return mutationResults
}
