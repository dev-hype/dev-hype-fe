import { useMutation } from 'react-query'

import { useAuthContext } from '../../providers/AuthProvider'

import { login } from '../../api/auth'
import { setAuthCookie_client } from '../../utils/authCookie'

export const useLoginMutation = () => {
  const { setLoggedInFlagOn } = useAuthContext()

  const mutationResults = useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      setAuthCookie_client(token)
      setLoggedInFlagOn()
    },
  })

  return mutationResults
}
