import React from 'react'

import { TbDots, TbSettings } from 'react-icons/tb'

import Button from 'src/modules/core/components/Button'
import HashtagLink from 'src/modules/core/components/HashtagLink'
import IconButton from 'src/modules/core/components/IconButton'
import Paper from 'src/modules/core/components/Paper'
import Tooltip from 'src/modules/core/components/Tooltip'

interface ITrendsCardProps {
  specializations: Array<{
    id: number
    name: string
    topics: Array<{
      id: number
      name: string
      goalsCount: number
    }>
  }>
}

const TrendsCard: React.FC<ITrendsCardProps> = props => {
  const { specializations } = props

  return (
    <Paper className="p-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-lg text-gold">Trending now</h2>

          <Tooltip title="Customize">
            <IconButton variant="ghost" size="small">
              <TbSettings size={20} />
            </IconButton>
          </Tooltip>
        </div>

        {specializations.map(specialization => (
          <div key={specialization.id}>
            <h3 className="font-semibold mb-3 text-md">
              {specialization.name}
            </h3>

            <div className="flex flex-col gap-2">
              {specialization.topics.map(topic => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <HashtagLink className="font-semibold" title={topic.name} />

                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {topic.goalsCount} new goals
                    </p>
                  </div>

                  <IconButton variant="ghost" color="gray" size="small">
                    <TbDots size={18} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button size="small" variant="ghost" className="w-full rounded-b-3xl">
        See more
      </Button>
    </Paper>
  )
}

export default TrendsCard
