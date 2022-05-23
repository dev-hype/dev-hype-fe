import { httpClient } from 'src/modules/core/config/httpClient'
import { ICreateGoalDto } from '../types/dto'

import { ISingleGoalResponse, IUserGoalsResponse } from '../types/res'

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

export const getSingleGoal = async (goalId: number) => {
  const response = await httpClient.get<ISingleGoalResponse>(`/goals/${goalId}`)

  return response.data
}

export const createGoal = async (data: ICreateGoalDto) => {
  const response = await httpClient.post<ISingleGoalResponse>(`/goals`, data)

  return response.data
}

export const deleteGoal = async (goalId: number) => {
  const response = await httpClient.delete<ISingleGoalResponse>(
    `/goals/${goalId}`,
  )

  return response.data
}
