import React from 'react'
import {
  Content,
  MenuContentProps,
  Portal,
  DropdownMenuPortalProps,
} from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

interface IDropdownMenuProps extends MenuContentProps {
  portalProps?: DropdownMenuPortalProps
}

const DropdownMenu: React.FC<IDropdownMenuProps> = (props) => {
  const { portalProps, ...contentProps } = props

  return (
    <Portal {...portalProps}>
      <Content
        {...contentProps}
        className={clsx(
          [
            'bg-white',
            'shadow-lg',
            'dark:shadow-gray-900',
            'border',
            'py-1',
            'border-gray-100',
            'dark:border-gray-700',
            'dark:bg-gray-800',
          ],
          contentProps.className,
        )}
      />
    </Portal>
  )
}

export default DropdownMenu
