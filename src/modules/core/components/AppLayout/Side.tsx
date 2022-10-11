import clsx from 'clsx'
import React from 'react'

interface ISideProps {
  children: React.ReactNode
  className?: string
}

const Side: React.FC<ISideProps> = (props) => {
  const { children, className } = props

  return (
    <aside
      className={clsx(
        [
          'flex',
          'flex-col',
          'gap-5',
          'sticky',
          'top-20',
          'h-[calc(100vh_-_72px)]',
          'overflow-y-auto',
          'no-scrollbar',
        ],
        className,
      )}
    >
      {children}
    </aside>
  )
}

export default Side
