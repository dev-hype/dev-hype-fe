import { useQuery } from 'react-query'

import { getSpecializations } from '../../../paths/api/specializations'

import { ISpecializationsResponse } from '../../types/res'

type SpecializationsQueryKey = [string]

export const getSpecializationsQueryKey = (): SpecializationsQueryKey => [
  '/paths/specializations',
]

export const useSpecializationsQuery = () => {
  const queryResult = useQuery<
    ISpecializationsResponse,
    unknown,
    ISpecializationsResponse,
    SpecializationsQueryKey
  >({
    queryFn: getSpecializations,
    queryKey: getSpecializationsQueryKey(),
  })

  return queryResult
}
