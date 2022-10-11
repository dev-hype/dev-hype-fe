import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export type BottomNavItem = {
  icon: React.ReactNode
  label: string
  url: string
}

interface IBottomNavProps {
  className?: string
  items: BottomNavItem[]
}

const BottomNav: React.FC<IBottomNavProps> = props => {
  const { className, items } = props

  return (
    <nav
      className={clsx(
        [
          'bg-white/70',
          'dark:bg-black/70',
          'backdrop-blur',
          'bottom-0',
          'fixed',
          'left-0',
          'right-0',
          'border',
          'h-16',
          'flex',
          'gap-2',
          'justify-evenly',
          'items-center',
        ],
        className,
      )}
    >
      {items.map(item => {
        return (
          <Link key={item.url} href={item.url}>
            <a className="flex flex-col items-center p-3">
              {item.icon}

              <span className="hidden sm:block">{item.label}</span>
            </a>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
