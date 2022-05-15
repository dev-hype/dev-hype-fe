import React, { ReactNode } from 'react'

import { Box, ColorProps } from '@chakra-ui/react'

interface ICountBadgeProps {
  count: number
  color?: ColorProps['color']
  max?: number
  children: ReactNode
}

const CountBadge: React.FC<ICountBadgeProps> = (props) => {
  const { count, color, max, children } = props

  return (
    <Box position="relative">
      {children}

      <Box
        bgColor={color || 'red.400'}
        color="white"
        position="absolute"
        top={0}
        left="100%"
        transform="translateX(-75%)"
        h="3.5"
        minW="3.5"
        px="0.5"
        borderRadius="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="xs"
      >
        {max && count > max ? `+${max}` : count}
      </Box>
    </Box>
  )
}

export default CountBadge
