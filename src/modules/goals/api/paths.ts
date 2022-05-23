import { httpClient } from 'src/modules/core/config/httpClient'

import { ISpecializationsResponse } from '../types/res'

export const getSpecializations = async () => {
  const response = await httpClient.get<ISpecializationsResponse>(
    '/paths/specializations',
  )

  return response.data
}
