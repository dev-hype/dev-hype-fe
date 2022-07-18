import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { dehydrate } from 'react-query'
import { NextPage } from 'next'
import Head from 'next/head'

import { Box, Container } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'
import PageHeader from 'src/modules/core/components/PageHeader'
import ProfileForm from 'src/modules/users/views/profile/ProfileForm'
import Photo from 'src/modules/core/components/Photo'

import { useEditProfileMutation } from 'src/modules/users/hooks/mutations/useEditProfileMutation'
import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'
import { usersPaths } from 'src/modules/users/constants/paths'

import { protectedRoute } from 'src/modules/core/routes/protectedRoute'

import { EditProfileMutationVariables } from 'src/generated/graphql'

export const getServerSideProps = protectedRoute(async (ctx, queryClient) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const EditProfile: NextPage = () => {
  const { replace } = useRouter()

  const { data: userData } = useAuthUserQuery()

  const { mutate: editProfile, isLoading } = useEditProfileMutation()

  const submitHandler = useCallback(
    (formData: EditProfileMutationVariables) => {
      const userId = userData?.me?.id

      if (userId) {
        editProfile(formData, {
          onSuccess: () => {
            replace(usersPaths.profile(userId))
          },
        })
      }
    },
    [editProfile, replace, userData],
  )

  return (
    <>
      <Head>
        <title>Edit Profile - Dev Hype</title>
      </Head>

      <AppLayout disablePadding>
        <PageHeader title="Setup Your Profile" />

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
          {userData?.me?.profile ? (
            <ProfileForm
              userId={userData.me.id}
              onSubmit={submitHandler}
              isSubmitting={isLoading}
              initialState={{
                firstName: userData.me.profile.firstName,
                lastName: userData.me.profile.lastName,
                bio: userData.me.profile.bio || '',
                ...(userData.me.profile.avatar
                  ? { avatar: userData.me.profile.avatar }
                  : {}),
                countryCode: userData.me.profile.countryCode,
                timezoneName: userData.me.profile.timezoneName,
              }}
              isEdit
            />
          ) : null}
        </Container>
      </AppLayout>
    </>
  )
}

export default EditProfile
