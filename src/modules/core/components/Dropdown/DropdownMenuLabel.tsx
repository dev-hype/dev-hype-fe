import { DropdownMenuLabelProps, Label } from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import React from 'react'

const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = (props) => {
  return (
    <Label
      {...props}
      className={clsx(
        ['py-1', 'px-7', 'text-xs', 'text-gray-400', 'font-semibold'],
        props.className,
      )}
    />
  )
}

export default DropdownMenuLabel
