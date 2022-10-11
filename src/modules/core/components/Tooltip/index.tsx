import React from 'react'
import * as RTooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'

interface ITooltipProps {
  children: React.ReactNode
  className?: string
  title: string
  arrow?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: React.FC<ITooltipProps> = (props) => {
  const { children, className, title, arrow, side = 'bottom' } = props

  return (
    <RTooltip.Provider>
      <RTooltip.Root delayDuration={200}>
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>

        <RTooltip.Portal>
          <RTooltip.Content
            side={side}
            className={clsx(
              [
                'bg-gray-900',
                'backdrop-opacity-25',
                'py-1',
                'px-2',
                'rounded-sm',
                'text-gray-50',
                'text-xs',
                'tracking-wide',
                'dark:text-gray-200',
              ],
              className,
            )}
            sideOffset={7}
          >
            {arrow && <RTooltip.Arrow />}

            {title}
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  )
}

export default Tooltip
