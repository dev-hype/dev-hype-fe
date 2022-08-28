import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'

import { Container, Heading } from '@chakra-ui/react'

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
    <AppLayout>
      <Container>
        <Heading>Home Again!!!!!!</Heading>
        <Heading>Test</Heading>
      </Container>
    </AppLayout>
  )
}

export default Home
