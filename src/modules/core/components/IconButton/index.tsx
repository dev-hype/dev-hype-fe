import React, { ForwardedRef, memo, useMemo } from 'react'
import { clsx } from 'clsx'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'solid' | 'outlined' | 'ghost'
type ButtonColor = 'gold' | 'gray'

type BaseProps = {
  className?: string
  color?: ButtonColor
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonProps = JSX.IntrinsicElements['button'] & { as?: 'button' }
type AnchorProps = JSX.IntrinsicElements['a'] & { as?: 'a' }

export type IconButtonProps = BaseProps & (ButtonProps | AnchorProps)

const sizeClassName: Record<ButtonSize, string> = {
  small: 'h-8 text-sm w-8',
  medium: 'h-10 text-base w-10',
  large: 'h-12 text-lg w-12',
}

function _IconButton(
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children,
    className = '',
    color = 'gold',
    size = 'medium',
    variant = 'solid',
    as: Component = 'button',
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
      'focus-visible:ring-gray-300',
    ],
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
          'hover:dark:enabled:border-gray-800',
          'hover:dark:enabled:bg-gray-800',
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
          'hover:dark:enabled:border-gray-800',
          'hover:dark:enabled:bg-gray-800',
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
    <Component
      className={clsx(
        baseClassName,
        sizeClassName[size],
        variantColorClassName[variant][color],
        className,
      )}
      ref={ref as any}
      {...(restProps as any)}
    >
      <span className="leading-none">{children}</span>
    </Component>
  )
}

const IconButton = memo(React.forwardRef(_IconButton))

IconButton.displayName = 'IconButton'

export default IconButton
