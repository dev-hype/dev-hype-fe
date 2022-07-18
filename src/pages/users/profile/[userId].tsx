import React, { useState } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { dehydrate } from 'react-query'
import { useRouter } from 'next/router'

import { Box, Container, HStack } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'
import PageHeader from 'src/modules/core/components/PageHeader'
import ProfileHead from 'src/modules/users/views/profile/ProfileHead'
import ProfileGoals from 'src/modules/users/views/profile/ProfileGoals'
import ProfileTabs, {
  ProfileTab,
} from 'src/modules/users/views/profile/ProfileTabs'
import ProfileTasks from 'src/modules/users/views/profile/ProfileTasks'

import { hybridRoute } from 'src/modules/core/routes/hybridRoute'

import { getSdk, ProfileQuery } from 'src/generated/graphql'
import { gqlClient } from 'src/modules/core/config/gqlClient'
import { getProfileQueryKey } from 'src/modules/users/hooks/queries/useProfileQuery'

import { corePaths } from 'src/modules/core/constants/paths'

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
    queryKey: getProfileQueryKey(profileUserId),
    queryFn: () => getSdk(gqlClient(ctx)).profile({ userId: profileUserId }),
  })

  const profileUser = queryClient.getQueryData<ProfileQuery>(
    getProfileQueryKey(profileUserId),
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
  const [selectedTab, setSelectedTab] = useState(ProfileTab.Goals)

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

          <Box bgColor="gray.50">
            <Container maxW="container.lg" px="2">
              <HStack>
                <ProfileTabs
                  selectedTab={selectedTab}
                  onChange={setSelectedTab}
                />
              </HStack>
            </Container>
          </Box>
        </Box>

        <Box py="6">
          {selectedTab === ProfileTab.Goals && (
            <ProfileGoals userId={query.userId as string} />
          )}

          {selectedTab === ProfileTab.Tasks && <ProfileTasks />}
        </Box>
      </AppLayout>
    </>
  )
}

export default Profile
