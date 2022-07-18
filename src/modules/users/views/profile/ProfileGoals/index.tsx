import React, { useMemo, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import {
  Box,
  Container,
  IconButton,
  Progress,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'

import GoalWidget from 'src/modules/goals/components/GoalWidget'
import CreateGoalModal from 'src/modules/goals/components/CreateGoalModal'
import DeleteGoalModal from './DeleteGoalModal'

import { useGoalsQuery } from 'src/modules/goals/hooks/queries/useGoalsQuery'

import { GoalsQuery, GqlGoal } from 'src/generated/graphql'

const ProfileGoals: React.FC<{ userId: string }> = (props) => {
  const { userId } = props

  const {
    isOpen: isNewGoalModalOpen,
    onOpen: openNewGoalModal,
    onClose: closeNewGoalModal,
  } = useDisclosure()

  const [goalToDelete, setGoalToDelete] = useState<GqlGoal | null>(null)

  const {
    data: goalsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useGoalsQuery({ userId })

  const [sentryRef] = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    loading: isFetchingNextPage,
    disabled: isError,
  })

  const goals = useMemo(() => {
    if (goalsData) {
      return goalsData.pages.reduce(
        (base, current) => [...base, ...current.goals.list],
        [] as GoalsQuery['goals']['list'],
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
              return (
                <Box key={goalData.id} mb="4">
                  <GoalWidget
                    goal={goalData}
                    onDeleteClick={setGoalToDelete}
                    // projects={projects}
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

      {goalToDelete ? (
        <DeleteGoalModal
          goal={goalToDelete}
          isOpen={Boolean(goalToDelete)}
          onClose={() => {
            setGoalToDelete(null)
          }}
        />
      ) : null}
    </>
  )
}

export default ProfileGoals
