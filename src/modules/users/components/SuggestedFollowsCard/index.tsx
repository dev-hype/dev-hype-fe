import React from 'react'

import { GqlUser } from 'src/generated/graphql'

import Avatar from 'src/modules/core/components/Avatar'
import Button from 'src/modules/core/components/Button'
import Paper from 'src/modules/core/components/Paper'

interface ISuggestedFollowsCardProps {
  users: GqlUser[]
}

const SuggestedFollowsCard: React.FC<ISuggestedFollowsCardProps> = (props) => {
  const { users } = props

  return (
    <Paper className="p-0">
      <div className="p-6">
        <h2 className="mb-6 text-gold font-semibold tracking-wide text-lg">
          Who to follow
        </h2>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <Avatar
                name={`${user.profile?.firstName} ${user.profile?.lastName}`}
                src={user.profile?.avatar as string}
                size="small"
              />

              <div>
                <h3 className="font-semibold">{`${user.profile?.firstName} ${user.profile?.lastName}`}</h3>

                <p
                  className="text-gray-500 leading-none text-sm text-ellipsis overflow-hidden w-32"
                  title={user.email}
                >
                  {user.email}
                </p>
              </div>

              <Button variant="outlined" size="small" className="ml-auto">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button size="small" variant="ghost" className="w-full rounded-b-3xl">
        See more
      </Button>
    </Paper>
  )
}

export default SuggestedFollowsCard
