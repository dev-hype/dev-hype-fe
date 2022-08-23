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

export interface IIconButtonProps extends AriaButtonProps<ElementType> {
  className?: string
  color?: ButtonColor
  size?: ButtonSize
  variant?: ButtonVariant
}

const sizeClassName: Record<ButtonSize, string> = {
  small: 'h-8 text-sm w-8',
  medium: 'h-10 text-base w-10',
  large: 'h-12 text-lg w-12',
}

function _IconButton(
  props: IIconButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children,
    className = '',
    color = 'gold',
    elementType: Component = 'button',
    isDisabled,
    size = 'medium',
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
      <span className="leading-none">{children}</span>
    </Component>
  )
}

const IconButton = memo(React.forwardRef(_IconButton))

IconButton.displayName = 'IconButton'

export default IconButton
