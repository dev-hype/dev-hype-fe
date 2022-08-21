import clsx from 'clsx'
import React from 'react'

interface IPaperProps {
  children: React.ReactNode
  className?: string
}

const Paper: React.FC<IPaperProps> = (props) => {
  const { children, className } = props

  return (
    <div
      className={clsx(
        [
          'bg-white',
          'border',
          'border-gray-100',
          'p-6',
          'rounded-sm',
          'shadow-sm',
          'shadow-gray-100',
          'dark:bg-gray-800',
          'dark:border-gray-900',
          'dark:shadow-gray-900',
        ],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Paper
