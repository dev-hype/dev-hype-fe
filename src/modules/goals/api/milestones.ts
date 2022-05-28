import { httpClient } from 'src/modules/core/config/httpClient'

import { IMilestone } from '../types/entities'
import { ITodayTasksResponse } from '../types/res'
import { ICreateMilestoneDto } from '../types/dto'

export const createMilestone = async ({
  goalId,
  data,
}: {
  goalId: number
  data: ICreateMilestoneDto
}) => {
  const response = await httpClient.post<{ milestone: IMilestone }>(
    '/milestones',
    { goalId, ...data },
  )

  return response.data
}

export const getTodayTasks = async () => {
  const response = await httpClient.get<ITodayTasksResponse>(
    '/milestones/tasks',
  )

  return response.data
}
