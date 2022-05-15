import React, { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

import AppNav from '../AppNav'

interface IAppLayoutProps {
  disablePadding?: boolean
  children: ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children, disablePadding }) => {
  return (
    <Box>
      <AppNav />

      <Box
        ml="24"
        mt="12"
        px={disablePadding ? 0 : '8'}
        py={disablePadding ? 0 : '4'}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AppLayout
