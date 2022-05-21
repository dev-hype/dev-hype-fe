import React, { useMemo } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { Box, Container, Progress, Spinner, Text } from '@chakra-ui/react'

import GoalWidget from 'src/modules/goals/components/GoalWidget'

import { useUserGoalsQuery } from 'src/modules/goals/hooks/queries/useUserGoalsQuery'

import { IUserGoalsResponse } from 'src/modules/goals/types/res'

const ProfileGoals: React.FC<{ userId: string }> = (props) => {
  const { userId } = props

  const {
    data: goalsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useUserGoalsQuery(userId)

  const [sentryRef] = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    loading: isFetchingNextPage,
    disabled: isError,
  })

  const goals = useMemo(() => {
    if (goalsData) {
      return goalsData.pages.reduce(
        (base, current) => [...base, ...current.goals],
        [] as IUserGoalsResponse['goals'],
      )
    }

    return []
  }, [goalsData])

  const isEmptyView = goalsData && !isLoading && goals.length === 0

  return (
    <Container maxW="container.lg" p="6">
      {isLoading && <Spinner />}

      {isEmptyView && (
        <Box>
          <Text fontSize="md" color="gray.400">
            No Goals Added Yet
          </Text>
        </Box>
      )}

      {goalsData
        ? goals.map((goalData) => {
            const { milestones, projects, topic, ...goal } = goalData

            return (
              <Box key={goal.id} mb="4">
                <GoalWidget
                  goal={goal}
                  milestones={milestones}
                  projects={projects}
                  topic={topic}
                />
              </Box>
            )
          })
        : null}

      {hasNextPage || isFetchingNextPage ? (
        <Box ref={sentryRef}>
          <Progress size="xs" isIndeterminate />
        </Box>
      ) : null}
    </Container>
  )
}

export default ProfileGoals
