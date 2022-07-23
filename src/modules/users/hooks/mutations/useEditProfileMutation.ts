import { useMutation } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

import { EditProfileMutationVariables, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

const mutationFn = (args: EditProfileMutationVariables) =>
  getSdk(gqlClient()).editProfile(args)

export const useEditProfileMutation = () => {
  const toast = useToast()

  const mutationResults = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated',
        status: 'success',
      })
    },
  })

  return mutationResults
}
