import { useQuery } from 'react-query'

import { getSdk } from 'src/generated/graphql'
import { gqlClient } from '../../config/gqlClient'

export const useCountriesQuery = () => {
  const results = useQuery({
    queryFn: () => getSdk(gqlClient()).countries(),
    queryKey: ['/misc/countries'],
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  return results
}
