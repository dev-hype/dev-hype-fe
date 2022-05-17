import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'

import { createProfile } from '../../api/profile'

export const useCreateProfileMutation = () => {
  const toast = useToast()

  const mutationResults = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      toast({
        title: 'Profile setup',
        description: 'Your profile has been setup',
        status: 'success',
      })
    },
  })

  return mutationResults
}
