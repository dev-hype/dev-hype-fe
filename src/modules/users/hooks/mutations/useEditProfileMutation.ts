import { useMutation } from 'react-query'
import { useToast } from '@chakra-ui/react'

import { editProfile } from '../../api/profile'

export const useEditProfileMutation = () => {
  const toast = useToast()

  const mutationResults = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully',
        status: 'success',
      })
    },
  })

  return mutationResults
}
