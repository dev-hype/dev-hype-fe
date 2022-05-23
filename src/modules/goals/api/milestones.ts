import { httpClient } from 'src/modules/core/config/httpClient'

import { ICreateMilestoneDto } from '../types/dto'
import { IMilestone } from '../types/entities'

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
