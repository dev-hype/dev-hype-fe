import React, { ReactNode } from 'react'
import { TbChevronDown, TbChevronUp, TbMessageCircle2 } from 'react-icons/tb'

import Avatar from 'src/modules/core/components/Avatar'
import IconButton from 'src/modules/core/components/IconButton'
import Paper from 'src/modules/core/components/Paper'
import Tooltip from 'src/modules/core/components/Tooltip'

interface IPostProps {
  children: ReactNode
  message: ReactNode
  messageIcon: ReactNode
  sideContent?: ReactNode
}

const Post: React.FC<IPostProps> = props => {
  const { children, message, messageIcon, sideContent } = props

  return (
    <Paper>
      <div className="flex items-center mb-2 gap-2">
        <div className="w-[50px] flex justify-end">{messageIcon}</div>

        <p className="text-gray-400 dark:text-gray-500 text-sm">{message}</p>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar src="https://avatars.dicebear.com/api/adventurer/sfzs8s7asss.svg" />

          <div>
            <p className="font-semibold leading-tight">Learn Web Development</p>

            <p className="text-gray-400 dark:text-gray-500 text-sm">
              2 hours ago
            </p>
          </div>
        </div>

        {sideContent}
      </div>

      <div className="mb-6">{children}</div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Tooltip title="Upvote">
            <IconButton size="small" variant="ghost" className="">
              <TbChevronUp size={24} />
            </IconButton>
          </Tooltip>

          <p className="text-gray-600 dark:text-gray-400 text-xs font-bold">
            8.2k
          </p>

          <Tooltip title="Dowvote">
            <IconButton size="small" variant="ghost" className="">
              <TbChevronDown size={24} />
            </IconButton>
          </Tooltip>
        </div>

        <div className="flex gap-1 items-center">
          <Tooltip title="Comment">
            <IconButton size="small" variant="ghost" className="">
              <TbMessageCircle2 size={22} />
            </IconButton>
          </Tooltip>

          <p className="text-gray-600 dark:text-gray-400 text-xs font-bold">
            36
          </p>
        </div>
      </div>
    </Paper>
  )
}

export default Post
