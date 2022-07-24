import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'

import { Button, Container, Heading, Text } from '@chakra-ui/react'

import AppLayout from 'src/modules/core/components/AppLayout'

import { hybridRoute } from 'src/modules/core/routes/hybridRoute'

export const getServerSideProps = hybridRoute(async (ctx, queryClient) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
})

const Home: NextPage = () => {
  return (
    <AppLayout headerTitle="Home">
      <Container>
        <Heading>Home Again!!!!!!</Heading>
        <Heading>Test</Heading>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minima
          maxime totam in ad doloribus nesciunt perferendis, ex blanditiis nobis
          a hic sunt fugiat voluptates amet distinctio dignissimos facilis
          suscipit?
        </Text>

        <Button colorScheme="brand">Hello</Button>
      </Container>
    </AppLayout>
  )
}

export default Home
