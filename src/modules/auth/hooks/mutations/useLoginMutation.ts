import { useMutation } from 'react-query'

import { getSdk, LoginMutationVariables } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

import { useAuthContext } from '../../providers/AuthProvider'

import { setAuthCookie_client } from '../../utils/authCookie'

const mutationFn = (args: LoginMutationVariables) =>
  getSdk(gqlClient()).login(args)

export const useLoginMutation = () => {
  const { setLoggedInFlagOn } = useAuthContext()

  const mutationResults = useMutation({
    mutationFn,
    onSuccess: ({ login: accessToken }) => {
      setAuthCookie_client(accessToken)
      setLoggedInFlagOn()
    },
  })

  return mutationResults
}
