import React, { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

interface IAppLayoutProps {
  disablePadding?: boolean
  children: ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children, disablePadding }) => {
  return (
    <Box
      ml="24"
      mt="12"
      px={disablePadding ? 0 : '8'}
      py={disablePadding ? 0 : '4'}
    >
      {children}
    </Box>
  )
}

export default AppLayout
