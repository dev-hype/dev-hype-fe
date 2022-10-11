import { dehydrate } from '@tanstack/react-query'
import type { NextPage } from 'next'

import AppLayout from 'src/modules/core/components/AppLayout'
import { GoalCreatedPost } from 'src/modules/paths/components/Post'

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
    <AppLayout pageTitle="Home">
      <div className="flex flex-col gap-5">
        <GoalCreatedPost />

        <GoalCreatedPost />
        <GoalCreatedPost />
        <GoalCreatedPost />
        <GoalCreatedPost />
        <GoalCreatedPost />
      </div>
    </AppLayout>
  )
}

export default Home
