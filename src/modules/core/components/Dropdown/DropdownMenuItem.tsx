import React from 'react'
import clsx from 'clsx'

import { Item, MenuItemProps } from '@radix-ui/react-dropdown-menu'

interface IDropdownMenuItemProps extends MenuItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const DropdownMenuItem: React.FC<IDropdownMenuItemProps> = props => {
  const { children, startIcon, endIcon, ...restProps } = props

  return (
    <Item
      {...restProps}
      className={clsx(
        [
          'py-2',
          'px-7',
          'flex',
          'items-center',
          'gap-2',
          'focus-visible:outline-none',
          'focus-visible:bg-gray-100',
          'dark:focus-visible:bg-gray-700',
          'cursor-pointer',
          'text-gray-500',
          'dark:text-gray-300',
          'text-sm',
          'data-disabled:cursor-default',
          'data-disabled:opacity-50',
        ],
        props.className,
      )}
    >
      {startIcon && <span className="leading-none text-lg">{startIcon}</span>}

      {children}

      {endIcon && <span className="leading-none text-lg">{endIcon}</span>}
    </Item>
  )
}

export default DropdownMenuItem
