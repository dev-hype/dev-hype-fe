import { useMutation } from 'react-query'

import { getSdk, SignupMutationVariables } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

export const useSignupMutation = () => {
  const mutationResults = useMutation({
    mutationFn: (args: SignupMutationVariables) =>
      getSdk(gqlClient()).signup(args),
  })

  return mutationResults
}
