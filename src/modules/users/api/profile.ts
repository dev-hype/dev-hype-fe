import { httpClient } from 'src/modules/core/config/httpClient'

import { IProfileFormDto } from '../types/dto'

export const createProfile = async (data: IProfileFormDto) => {
  const response = await httpClient.post('/users/profile', data)

  return response.data
}

export const editProfile = async (data: IProfileFormDto) => {
  const response = await httpClient.put('/users/profile', data)

  return response.data
}
