import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { dehydrate } from '@tanstack/react-query'
import { NextPage } from 'next'
import Head from 'next/head'

import { Box, Container } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'
import ProfileForm from 'src/modules/users/views/profile/ProfileForm'
import Photo from 'src/modules/core/components/Photo'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'
import { useCreateProfileMutation } from 'src/modules/users/hooks/mutations/useCreateProfileMutation'
import { usersPaths } from 'src/modules/users/constants/paths'

import { protectedRoute } from 'src/modules/core/routes/protectedRoute'
import { corePaths } from 'src/modules/core/constants/paths'

import { CreateProfileMutationVariables } from 'src/generated/graphql'

export const getServerSideProps = protectedRoute(async (ctx, queryClient) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const CreateProfile: NextPage = () => {
  const { replace } = useRouter()

  const { data: userData } = useAuthUserQuery()

  const { mutate: createProfile, isLoading } = useCreateProfileMutation()

  const submitHandler = useCallback(
    (formData: CreateProfileMutationVariables) => {
      const userId = userData?.me?.id

      if (userId) {
        createProfile(
          {
            ...formData,
            avatar: `https://avatars.dicebear.com/api/adventurer/${userData?.me?.id}.svg`,
          },
          {
            onSuccess: () => {
              replace(usersPaths.profile(userId))
            },
          },
        )
      }
    },
    [createProfile, replace, userData],
  )

  return (
    <>
      <Head>
        <title>Setup Your Profile - Dev Hype</title>
      </Head>

      <AppLayout pageTitle="Profile" backUrl={corePaths.home()}>
        <Box bgColor="gray.50" mb="24">
          <Container>
            <Box
              bgColor="white"
              w="90px"
              h="90px"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="4"
              transform="translateY(50%)"
            >
              <Photo
                src={`https://avatars.dicebear.com/api/adventurer/${userData?.me?.id}.svg`}
                alt="user"
                placeholder="blur"
                width={90}
                height={90}
                objectFit="cover"
                objectPosition="top"
                borderRadius="4px"
              />
            </Box>
          </Container>
        </Box>

        <Container>
          <ProfileForm
            userId={userData?.me?.id || ''}
            onSubmit={submitHandler}
            isSubmitting={isLoading}
          />
        </Container>
      </AppLayout>
    </>
  )
}

export default CreateProfile
