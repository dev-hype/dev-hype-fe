import { httpClient } from 'src/modules/core/config/httpClient'

import { IResourceTypesResponse } from '../types/res'

export const getResourceTypes = async () => {
  const response = await httpClient.get<IResourceTypesResponse>(
    '/paths/resource-types',
  )

  return response.data
}
