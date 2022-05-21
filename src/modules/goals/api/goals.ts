import { httpClient } from 'src/modules/core/config/httpClient'

import { IUserGoalsResponse } from '../types/res'

export const getUserGoals = async (userId: string) => {
  const response = await httpClient.get<IUserGoalsResponse>('/goals', {
    params: { userId },
  })

  return response.data
}
