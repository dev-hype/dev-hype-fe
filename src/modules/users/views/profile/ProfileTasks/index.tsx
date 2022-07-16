import React, { useState } from 'react'

import { Box, Container, Spinner } from '@chakra-ui/react'

import Task from './Task'
import TaskNotesModal, {
  MilestoneTask,
} from 'src/modules/goals/components/TaskModal'

import { useTodayTasksQuery } from 'src/modules/goals/hooks/queries/useTodayTasksQuery'

const ProfileTasks: React.FC = () => {
  const { data, isLoading } = useTodayTasksQuery()

  const [openTask, setOpenTask] = useState<MilestoneTask | null>(null)

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
                  onStartClick={() => setOpenTask(milestone)}
                />
              </Box>
            )
          })
        : null}

      {openTask && (
        <TaskNotesModal
          isOpen
          onClose={() => {
            setOpenTask(null)
          }}
          task={openTask}
        />
      )}
    </Container>
  )
}

export default ProfileTasks
