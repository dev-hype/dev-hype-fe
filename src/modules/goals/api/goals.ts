import { httpClient } from 'src/modules/core/config/httpClient'

import { IUserGoalsResponse } from '../types/res'

export const getUserGoals = async ({
  userId,
  page = 1,
  limit = 20,
}: {
  userId: string
  page?: number
  limit?: number
}) => {
  const response = await httpClient.get<IUserGoalsResponse>('/goals', {
    params: { userId, page, limit },
  })

  return response.data
}
