import React from 'react'

import { Container, Tab, TabList, Tabs } from '@chakra-ui/react'

const ProfileTabs: React.FC = () => {
  return (
    <Tabs variant="unstyled" colorScheme="brand">
      <TabList>
        <Container maxW="container.lg" display="flex">
          <Tab
            color="gray.500"
            _selected={{
              color: 'brand.500',
              fontWeight: 'bold',
              borderBottom: '1px solid',
            }}
          >
            Goals
          </Tab>

          <Tab
            color="gray.500"
            _selected={{
              color: 'brand.500',
              fontWeight: 'bold',
              borderBottom: '1px solid',
            }}
          >
            Tasks
          </Tab>

          <Tab
            color="gray.500"
            _selected={{
              color: 'brand.500',
              fontWeight: 'bold',
              borderBottom: '1px solid',
            }}
          >
            Timeline
          </Tab>

          <Tab
            color="gray.500"
            _selected={{
              color: 'brand.500',
              fontWeight: 'bold',
              borderBottom: '1px solid',
            }}
          >
            Stats
          </Tab>

          <Tab
            color="gray.500"
            _selected={{
              color: 'brand.500',
              fontWeight: 'bold',
              borderBottom: '1px solid',
            }}
          >
            Activity
          </Tab>
        </Container>
      </TabList>
    </Tabs>
  )
}

export default ProfileTabs
