import React, { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import AppNav from '../AppNav'
import PageHeader from '../PageHeader'

interface IAppLayoutProps {
  children: ReactNode
  headerTitle: string
}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
  const { children, headerTitle } = props

  return (
    <>
      <SkipNavLink zIndex="tooltip">Skip to Content</SkipNavLink>

      <AppNav />

      <PageHeader title={headerTitle} />

      <SkipNavContent>
        <Box ml={{ md: '24' }} mt="12" mb={{ base: '28', md: '0' }} as="main">
          {children}
        </Box>
      </SkipNavContent>
    </>
  )
}

export default AppLayout
