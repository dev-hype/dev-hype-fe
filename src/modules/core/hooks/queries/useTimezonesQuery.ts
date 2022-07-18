import { useQuery } from 'react-query'

import { getSdk } from 'src/generated/graphql'
import { gqlClient } from '../../config/gqlClient'

export const useTimezonesQuery = () => {
  const results = useQuery({
    queryFn: () => getSdk(gqlClient()).timezones(),
    queryKey: ['/misc/timezones'],
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  return results
}
