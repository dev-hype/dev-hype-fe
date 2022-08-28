import React from 'react'
import AuthCard from 'src/modules/auth/components/AuthCard'

import AuthModal from 'src/modules/auth/components/AuthModal'
import SuggestedFollowsCard from 'src/modules/users/components/SuggestedFollowsCard'
import UserCard from 'src/modules/users/components/UserCard'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { usersPaths } from 'src/modules/users/constants/paths'
import { useAuthModal } from 'src/modules/auth/hooks/useAuthModal'

const LeftSide: React.FC = () => {
  const { data: userData } = useAuthUserQuery()

  const { openAuthModal } = useAuthModal()

  return (
    <>
      {!userData ? (
        <UserCard
          email="example@asd.com"
          bio="Dolor sit amet consectetur adipisicing elit. Sint fugit reprehenderit reiciendis."
          followers={100}
          following={1270}
          userImage="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
          userName="John Doe"
          profileLink="/users/1"
        />
      ) : (
        <AuthCard openAuthModal={openAuthModal} />
      )}

      <SuggestedFollowsCard
        users={[
          {
            id: '1',
            email: 'example@asd.com',
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              country: {
                key: 'US',
                name: 'United States',
              },
              countryCode: 'US',
              id: '1',
              timezoneName: 'America/New_York',
              userId: '1',
              avatar: 'https://avatars.dicebear.com/api/adventurer/1.svg',
            },
          },
          {
            id: '2',
            email: 'example@asd.com',
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              country: {
                key: 'US',
                name: 'United States',
              },
              countryCode: 'US',
              id: '2',
              timezoneName: 'America/New_York',
              userId: '2',
              avatar: 'https://avatars.dicebear.com/api/adventurer/2.svg',
            },
          },
          {
            id: '3',
            email:
              'example@asd.comexample@asd.comexample@asd.comexample@asd.com',
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              country: {
                key: 'US',
                name: 'United States',
              },
              countryCode: 'US',
              id: '3',
              timezoneName: 'America/New_York',
              userId: '3',
              avatar: 'https://avatars.dicebear.com/api/adventurer/3.svg',
            },
          },
        ]}
      />

      <AuthModal />
    </>
  )
}

export default LeftSide
