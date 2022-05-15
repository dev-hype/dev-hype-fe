import { useMutation } from 'react-query'

import { signup } from '../../api/auth'

export const useSignupMutation = () => {
  const mutationResults = useMutation({
    mutationFn: signup,
  })

  return mutationResults
}
