import { useQuery } from '@tanstack/react-query'

import { FieldsQuery, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

type FieldsQueryKey = [string]

export const getFieldsQueryKey = (): FieldsQueryKey => ['/paths/fields']

export const useFieldsQuery = () => {
  const queryResult = useQuery<
    FieldsQuery,
    unknown,
    FieldsQuery,
    FieldsQueryKey
  >({
    queryFn: () => getSdk(gqlClient()).fields(),
    queryKey: getFieldsQueryKey(),
  })

  return queryResult
}
