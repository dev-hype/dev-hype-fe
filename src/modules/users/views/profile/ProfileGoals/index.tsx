import React from 'react'

import { Box, Container, Spinner, Text } from '@chakra-ui/react'

import GoalWidget from 'src/modules/goals/components/GoalWidget'

import { useUserGoalsQuery } from 'src/modules/goals/hooks/queries/useUserGoalsQuery'

const ProfileGoals: React.FC<{ userId: string }> = (props) => {
  const { userId } = props

  const { data: goalsData, isLoading } = useUserGoalsQuery(userId)

  const isEmptyView = goalsData && !isLoading && goalsData.goals.length === 0

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
        ? goalsData.goals.map((goalData) => {
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
    </Container>
  )
}

export default ProfileGoals
