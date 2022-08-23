import React, { ForwardedRef, memo, RefObject, useMemo, useRef } from 'react'
import { clsx } from 'clsx'
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
} from 'react-aria'

type ButtonSize = 'small' | 'medium' | 'large'
type ButtonVariant = 'solid' | 'outlined' | 'ghost'
type ButtonColor = 'gold'
type ElementType = 'button' | 'a'

export interface IButtonProps extends AriaButtonProps<ElementType> {
  className?: string
  color?: ButtonColor
  endIcon?: React.ReactNode
  size?: ButtonSize
  startIcon?: React.ReactNode
  variant?: ButtonVariant
}

function _Button(
  props: IButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children,
    className = '',
    color = 'gold',
    elementType: Component = 'button',
    endIcon,
    isDisabled,
    size = 'medium',
    startIcon,
    variant = 'solid',
    ...restProps
  } = props

  const fallbackRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const domRef = ref || fallbackRef

  const { focusProps, isFocusVisible } = useFocusRing()
  const { hoverProps, isHovered } = useHover({ isDisabled })
  const { buttonProps, isPressed } = useButton(
    { ...restProps, elementType: Component, isDisabled },
    domRef as RefObject<Element>,
  )

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
      ...(isFocusVisible ? ['ring', 'ring-gold-300'] : []),
    ],
    [isFocusVisible],
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
          ...(isHovered
            ? [
                'enabled:text-gold-600',
                'enabled:bg-gray-50',
                'enabled:border-gray-50',
              ]
            : []),
          ...(isPressed
            ? ['enabled:bg-gray-100', 'enabled:border-gray-100']
            : []),
        ],
      },
      outlined: {
        gold: [
          '!border-gold',
          'text-gold',
          ...(isHovered
            ? [
                'enabled:border-gold-600',
                'enabled:text-gold-600',
                'enabled:bg-gold-50',
              ]
            : []),
          ...(isPressed
            ? ['enabled:border-gold-700', 'enabled:text-gold-700']
            : []),
        ],
      },
      solid: {
        gold: [
          'bg-gold',
          ' border-gold',
          ' text-white',
          ...(isHovered
            ? ['enabled:bg-gold-600', 'enabled:border-gold-600']
            : []),

          ...(isPressed
            ? [' enabled:bg-gold-700', ' enabled:border-gold-700']
            : []),
        ],
      },
    }),
    [isHovered, isPressed],
  )

  return (
    <Component
      className={clsx(
        baseClassName,
        sizeClassName[size],
        variantColorClassName[variant][color],
        className,
      )}
      ref={domRef}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
    >
      {startIcon ? <span className={'leading-none'}>{startIcon}</span> : null}

      {children}

      {endIcon ? <span className={'leading-none'}>{endIcon}</span> : null}
    </Component>
  )
}

const Button = memo(React.forwardRef(_Button))

Button.displayName = 'Button'

export default Button
