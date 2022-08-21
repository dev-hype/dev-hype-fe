import React, { memo, useMemo } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { FaUserAlt } from 'react-icons/fa'

import { useBoolean } from '../../hooks/useBoolean'

type AvatarSize = 'small' | 'medium' | 'large'

interface IAvatarProps {
  name?: string
  size?: AvatarSize
  src?: string
}

const Avatar: React.FC<IAvatarProps> = (props) => {
  const { name, size = 'medium', src } = props

  const [error, { toggle: toggleError }] = useBoolean(false)

  const userInitials = useMemo(() => {
    if (!name) return ''

    const [firstName, lastName] = name.split(' ')

    return `${firstName[0]}${lastName ? lastName[0] : ''}`
  }, [name])

  const sizeClassName = useMemo(
    (): Record<AvatarSize, string[]> => ({
      large: ['h-20 text-2xl w-20'],
      medium: ['h-16 text-xl w-16'],
      small: ['h-10 text-base w-10'],
    }),
    [],
  )

  return (
    <div
      className={clsx(
        [
          'bg-gray-200 flex items-center justify-center rounded-full text-gray-500',
        ],
        sizeClassName[size],
      )}
    >
      {src && !error ? (
        <Image
          alt={name}
          height="100%"
          objectFit="cover"
          objectPosition="center"
          onError={toggleError}
          src={src || ''}
          width="100%"
        />
      ) : userInitials ? (
        <div className="">{userInitials}</div>
      ) : (
        <FaUserAlt />
      )}
    </div>
  )
}

export default memo(Avatar)
