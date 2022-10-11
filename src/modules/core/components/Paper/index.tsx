import clsx from 'clsx'
import React from 'react'

interface IPaperProps {
  children: React.ReactNode
  className?: string
}

const Paper: React.FC<IPaperProps> = props => {
  const { children, className } = props

  return (
    <div
      className={clsx(
        [
          'bg-white',
          'border',
          'border-gray-200',
          'p-6',
          'rounded-3xl',
          'shadow-sm',
          'shadow-gray-50',
          'dark:bg-gray-900',
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
