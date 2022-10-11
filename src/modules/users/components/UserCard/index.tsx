import React from 'react'
import Link from 'next/link'
import numeral from 'numeral'

import { FaUserGraduate } from 'react-icons/fa'

import Avatar from 'src/modules/core/components/Avatar'
import Button from 'src/modules/core/components/Button'
import Paper from 'src/modules/core/components/Paper'

interface IUserCardProps {
  bio?: string | null
  email: string
  followers?: number | null
  following?: number | null
  profileLink: string
  userImage?: string | null
  userName?: string | null
}

const UserCard: React.FC<IUserCardProps> = props => {
  const { email, bio, followers, following, userImage, userName, profileLink } =
    props

  return (
    <Paper className="p-0">
      <div className="flex flex-col items-center p-8 pb-0">
        <Avatar
          className="mb-4"
          name={userName || ''}
          size="large"
          src={userImage || ''}
        />

        {userName && <h5 className="text-xl mb-1">{userName}</h5>}

        <p className="text-sm text-gray-500 truncate mb-4">{email}</p>

        {bio && <p className="mb-6 text-center">{bio}</p>}
      </div>

      <div className="flex">
        <div className="border-y border-gray-100 dark:border-gray-500 p-2 text-center w-1/2">
          <p>{numeral(following || 0).format('0,0')}</p>

          <p className="text-gold">Following</p>
        </div>

        <div className="border-y border-l border-gray-100 dark:border-gray-500 p-2 text-center w-1/2">
          <p>{numeral(followers || 0).format('0,0')}</p>

          <p className="text-gold">Followers</p>
        </div>
      </div>

      <Link href={profileLink} passHref>
        <Button
          className="!h-14 w-full rounded-b-3xl"
          startIcon={<FaUserGraduate />}
          variant="ghost"
        >
          My Profile
        </Button>
      </Link>
    </Paper>
  )
}

export default UserCard
