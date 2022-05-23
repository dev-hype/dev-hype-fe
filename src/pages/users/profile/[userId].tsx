import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { dehydrate } from 'react-query'

import { Box } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'
import PageHeader from 'src/modules/core/components/PageHeader'
import ProfileHead from 'src/modules/users/views/profile/ProfileHead'
import ProfileGoals from 'src/modules/users/views/profile/ProfileGoals'

import { hybridRoute } from 'src/modules/core/routes/hybridRoute'
import { getUser } from 'src/modules/users/api/users'

import { corePaths } from 'src/modules/core/constants/paths'
import { getUserQueryKey } from 'src/modules/users/hooks/queries/useUserQuery'

import { IUserResponse } from 'src/modules/users/types/res'
import { useRouter } from 'next/router'

export const getServerSideProps = hybridRoute(async (ctx, queryClient) => {
  const profileUserId = ctx.params?.userId

  if (typeof profileUserId !== 'string') {
    return {
      redirect: {
        destination: corePaths.home(),
        permanent: true,
      },
    }
  }

  await queryClient.prefetchQuery({
    queryKey: getUserQueryKey(profileUserId),
    queryFn: () => getUser(profileUserId, ctx),
  })

  const profileUser = queryClient.getQueryData<IUserResponse>(
    getUserQueryKey(profileUserId),
  )

  if (!profileUser) {
    return {
      redirect: {
        destination: corePaths.home(),
        permanent: true,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const Profile: NextPage = () => {
  const { query } = useRouter()

  return (
    <>
      <Head>
        <title>Profile - Dev Hype</title>
      </Head>

      <AppLayout disablePadding>
        <PageHeader title="Profile" />

        <Box>
          <ProfileHead />
        </Box>

        <Box py="6">
          <ProfileGoals userId={query.userId as string} />
        </Box>
      </AppLayout>
    </>
  )
}

export default Profile
