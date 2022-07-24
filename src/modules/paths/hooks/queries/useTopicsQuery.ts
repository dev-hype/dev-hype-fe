import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  getSdk,
  TopicsQuery,
  TopicsQueryVariables,
} from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

type TopicsQueryKey = [string, TopicsQueryVariables | undefined]

export const getTopicsQueryKey = (
  args?: TopicsQueryVariables,
): TopicsQueryKey => ['/paths/topics', args]

export const useTopicsQuery = ({
  args,
  options = {},
}: {
  args?: TopicsQueryVariables
  options?: UseQueryOptions<TopicsQuery, unknown, TopicsQuery, TopicsQueryKey>
}) => {
  const queryResult = useQuery<
    TopicsQuery,
    unknown,
    TopicsQuery,
    TopicsQueryKey
  >({
    queryFn: () => getSdk(gqlClient()).topics(args),
    queryKey: getTopicsQueryKey(args),
    ...options,
  })

  return queryResult
}
