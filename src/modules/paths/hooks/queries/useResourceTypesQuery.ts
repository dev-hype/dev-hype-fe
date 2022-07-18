import { useQuery } from 'react-query'
import { getSdk, ResourceTypesQuery } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

export type ResourceTypesQueryKey = [string]

export const getResourceTypesQueryKey = (): ResourceTypesQueryKey => [
  '/paths/resource-types',
]

export const useResourceTypesQuery = () => {
  const queryResult = useQuery<
    ResourceTypesQuery,
    unknown,
    ResourceTypesQuery,
    ResourceTypesQueryKey
  >({
    queryFn: () => getSdk(gqlClient()).resourceTypes(),
    queryKey: getResourceTypesQueryKey(),
  })

  return queryResult
}
