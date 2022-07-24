import { QueryFunction, useQuery } from '@tanstack/react-query'

import { gqlClient } from 'src/modules/core/config/gqlClient'

import {
  getSdk,
  ProfileQuery,
  ProfileQueryVariables,
} from 'src/generated/graphql'

export type ProfileQueryKey = [string, ProfileQueryVariables]

export const getProfileQueryKey = (userId: string): ProfileQueryKey => [
  '/users/:id',
  { userId },
]

export const userQueryFn: QueryFunction<ProfileQuery, ProfileQueryKey> = ({
  queryKey,
}) => {
  const [, { userId }] = queryKey

  return getSdk(gqlClient()).profile({ userId })
}

export const useProfileQuery = (userId: string) => {
  const queryResult = useQuery<
    ProfileQuery,
    unknown,
    ProfileQuery,
    ProfileQueryKey
  >({
    queryFn: userQueryFn,
    queryKey: getProfileQueryKey(userId),
  })

  return queryResult
}
