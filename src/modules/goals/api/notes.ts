import { httpClient } from 'src/modules/core/config/httpClient'

import { IMilestoneNotesResponse } from '../types/res'

export const getMilestoneNotes = async (milestoneId: number) => {
  const response = await httpClient.get<IMilestoneNotesResponse>(
    `/milestones/${milestoneId}/notes`,
  )

  return response.data
}
