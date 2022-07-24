import React, { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

interface IAppLayoutProps {
  disablePadding?: boolean
  children: ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children, disablePadding }) => {
  return (
    <Box
      ml={{ md: '24' }}
      mt="12"
      mb={{ base: '18', md: '0' }}
      px={disablePadding ? 0 : '8'}
      py={disablePadding ? 0 : '4'}
      as="main"
    >
      {children}
    </Box>
  )
}

export default AppLayout
