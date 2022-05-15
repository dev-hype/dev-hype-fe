import type { NextPage } from 'next'

import { Box, Button, Heading, Text } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'
import PageHeader from 'src/modules/core/components/PageHeader'

const Home: NextPage = () => {
  return (
    <AppLayout>
      <PageHeader title="Home" />

      <Box>
        <Heading>Home</Heading>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minima
          maxime totam in ad doloribus nesciunt perferendis, ex blanditiis nobis
          a hic sunt fugiat voluptates amet distinctio dignissimos facilis
          suscipit?
        </Text>

        <Button colorScheme="brand">Hello</Button>
      </Box>
    </AppLayout>
  )
}

export default Home
