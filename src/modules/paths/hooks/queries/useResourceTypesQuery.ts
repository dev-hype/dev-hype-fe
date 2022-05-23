import { useQuery } from 'react-query'

import { getResourceTypes } from '../../api/resources'

import { IResourceTypesResponse } from '../../types/res'

export type ResourceTypesQueryKey = [string]

export const getResourceTypesQueryKey = (): ResourceTypesQueryKey => [
  '/paths/resource-types',
]

export const useResourceTypesQuery = () => {
  const queryResult = useQuery<
    IResourceTypesResponse,
    unknown,
    IResourceTypesResponse,
    ResourceTypesQueryKey
  >({
    queryFn: getResourceTypes,
    queryKey: getResourceTypesQueryKey(),
  })

  return queryResult
}
