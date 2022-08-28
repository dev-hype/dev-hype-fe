import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'

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
      <h1>Hello</h1>
    </AppLayout>
  )
}

export default Home
