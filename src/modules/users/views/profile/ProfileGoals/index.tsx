import React, { useMemo } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import {
  Box,
  Container,
  IconButton,
  Progress,
  Spinner,
  Text,
  Tooltip,
  useBoolean,
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'

import GoalWidget from 'src/modules/goals/components/GoalWidget'
import CreateGoalModal from 'src/modules/goals/components/CreateGoalModal'

import { useUserGoalsQuery } from 'src/modules/goals/hooks/queries/useUserGoalsQuery'

import { IUserGoalsResponse } from 'src/modules/goals/types/res'

const ProfileGoals: React.FC<{ userId: string }> = (props) => {
  const { userId } = props

  const [isNewGoalModalOpen, { on: openNewGoalModal, off: closeNewGoalModal }] =
    useBoolean(false)

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
    <>
      <Container maxW="container.lg" p="6" position="relative">
        <Tooltip label="New Goal">
          <IconButton
            size="lg"
            aria-label="add new goal"
            borderRadius="full"
            position="absolute"
            top={0}
            right={0}
            transform="translate(-24px, -50px)"
            onClick={openNewGoalModal}
          >
            <FaPlus />
          </IconButton>
        </Tooltip>

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

      <CreateGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={closeNewGoalModal}
      />
    </>
  )
}

export default ProfileGoals
