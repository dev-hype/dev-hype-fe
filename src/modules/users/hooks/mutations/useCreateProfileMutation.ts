import { useMutation } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

import { CreateProfileMutationVariables, getSdk } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'

const mutationFn = (args: CreateProfileMutationVariables) =>
  getSdk(gqlClient()).createProfile(args)

export const useCreateProfileMutation = () => {
  const toast = useToast()

  const mutationResults = useMutation({
    mutationFn,
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
