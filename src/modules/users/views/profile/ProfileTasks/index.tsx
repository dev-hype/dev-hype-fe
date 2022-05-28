import React from 'react'

import { Box, Container, Spinner } from '@chakra-ui/react'

import { useTodayTasksQuery } from 'src/modules/goals/hooks/queries/useTodayTasksQuery'
import Task from './Task'

const ProfileTasks: React.FC = () => {
  const { data, isLoading } = useTodayTasksQuery()

  return (
    <Container maxW="container.lg" p="6" position="relative">
      {isLoading && <Spinner />}

      {data
        ? data.milestones.map((milestone) => {
            const [schedule] = milestone.milestoneSchedules

            return (
              <Box key={milestone.id} mb="8">
                <Task
                  milestoneName={milestone.name}
                  resourceName={milestone.resource.name}
                  durationInHours={schedule.durationInHours}
                />
              </Box>
            )
          })
        : null}
    </Container>
  )
}

export default ProfileTasks
