import React from 'react'
import AuthCard from 'src/modules/auth/components/AuthCard'

import UserCard from 'src/modules/users/components/UserCard'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { usersPaths } from 'src/modules/users/constants/paths'
import { useAuthModal } from 'src/modules/auth/hooks/useAuthModal'
import AuthModal from 'src/modules/auth/components/AuthModal'

const LeftSide: React.FC = () => {
  const { data: userData } = useAuthUserQuery()

  const { openAuthModal } = useAuthModal()

  return (
    <>
      {userData ? (
        <UserCard
          email={userData.me.email}
          bio={userData.me.profile?.bio}
          followers={0}
          following={0}
          userImage={`https://avatars.dicebear.com/api/adventurer/${userData.me.id}.svg`}
          userName={
            userData.me.profile
              ? `${userData.me.profile?.firstName} ${userData.me.profile?.lastName}`
              : ''
          }
          profileLink={
            userData.me.profile
              ? usersPaths.profile(userData.me.id)
              : usersPaths.create_profile()
          }
        />
      ) : (
        <AuthCard openAuthModal={openAuthModal} />
      )}

      <AuthModal />
    </>
  )
}

export default LeftSide
