import React, { ForwardedRef, memo, useMemo, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'solid' | 'outlined' | 'ghost'
type ButtonColor = 'gold' | 'gray'

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  endIcon?: React.ReactNode
  size?: ButtonSize
  startIcon?: React.ReactNode
  variant?: ButtonVariant
}

function _Button(props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    children,
    className = '',
    color = 'gold',
    endIcon,
    size = 'medium',
    startIcon,
    variant = 'solid',
    ...restProps
  } = props

  const baseClassName = useMemo(
    () => [
      'border',
      'border-transparent',
      'flex',
      'items-center',
      'justify-center',
      'rounded-sm',
      'transition',
      'disabled:opacity-50',
      'focus:outline-none',
      'focus-visible:ring',
      'focus-visible:ring-gold-300',
      'focus-visible:dark:ring-gold-700',
    ],
    [],
  )

  const sizeClassName: Record<ButtonSize, string> = useMemo(
    () => ({
      small: 'gap-1 h-8 px-2 text-sm',
      medium: 'gap-2 h-10 px-4 text-base',
      large: 'gap-3 h-12 px-7 text-lg',
    }),
    [],
  )

  const variantColorClassName: Record<
    ButtonVariant,
    Record<ButtonColor, string[]>
  > = useMemo(
    () => ({
      ghost: {
        gold: [
          'text-gold',
          'hover:enabled:text-gold-600',
          'hover:enabled:bg-gray-50',
          'hover:enabled:border-gray-50',
          'hover:dark:enabled:border-gray-900',
          'hover:dark:enabled:bg-gray-900',
          'active:enabled:bg-gray-100',
          'active:enabled:border-gray-100',
          'active:dark:enabled:bg-gray-800',
          'active:dark:enabled:border-gray-800',
        ],
        gray: [
          'text-gray-400',
          'hover:enabled:text-gray-600',
          'hover:enabled:bg-gray-50',
          'hover:enabled:border-gray-50',
          'hover:dark:enabled:border-gray-900',
          'hover:dark:enabled:bg-gray-900',
          'active:enabled:bg-gray-100',
          'active:enabled:border-gray-100',
          'active:dark:enabled:bg-gray-800',
          'active:dark:enabled:border-gray-800',
        ],
      },
      outlined: {
        gold: [
          'border-gold',
          'text-gold',
          'hover:enabled:border-gold-600',
          'hover:enabled:text-gold-600',
          'hover:enabled:bg-gold-50',
          'hover:dark:enabled:bg-gold-900',
          'active:enabled:border-gold-700',
          'active:enabled:text-gold-700',
        ],
        gray: [
          '!border-gray',
          'text-gray',
          'hover:enabled:border-gray-600',
          'hover:enabled:text-gray-600',
          'hover:enabled:bg-gray-50',
          'hover:dark:enabled:bg-gray-900',
          'active:enabled:border-gray-700',
          'active:enabled:text-gray-700',
        ],
      },
      solid: {
        gold: [
          'bg-gold',
          ' border-gold',
          ' text-white',
          'hover:enabled:bg-gold-600',
          'hover:enabled:border-gold-600',
          'active:enabled:bg-gold-700',
          'active:enabled:border-gold-700',
        ],
        gray: [
          'bg-gray-500',
          'dark:bg-gray-600',
          ' border-gray',
          ' text-gray-50',
          'hover:enabled:bg-gray-600',
          'hover:enabled:border-gray-600',
          'active:enabled:bg-gray-700',
          'active:enabled:border-gray-700',
        ],
      },
    }),
    [],
  )

  return (
    <button
      className={clsx(
        baseClassName,
        sizeClassName[size],
        variantColorClassName[variant][color],
        className,
      )}
      ref={ref}
      {...restProps}
    >
      {startIcon ? <span className={'leading-none'}>{startIcon}</span> : null}

      {children}

      {endIcon ? <span className={'leading-none'}>{endIcon}</span> : null}
    </button>
  )
}

const Button = memo(React.forwardRef(_Button))

Button.displayName = 'Button'

export default Button
