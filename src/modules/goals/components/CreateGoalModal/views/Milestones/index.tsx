import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useBoolean,
  VStack,
} from '@chakra-ui/react'

import { FaCheck, FaPlus } from 'react-icons/fa'

import AddMilestoneModal from './AddMilestoneModal'
import MilestoneCard from './MilestoneCard'
import CreateGoalModalSteps from '../CreateGoalModalSteps'

import { useGoalQuery } from 'src/modules/goals/hooks/queries/useSingleGoalQuery'

import { goalModalSteps } from '../../constants'

import { GoalModalStep } from '../../types'

const milestonesStep = goalModalSteps[GoalModalStep.Milestones]

interface IProps {
  goalId: number
  onClose: () => void
}

const CreateGoalMilestones: React.FC<IProps> = props => {
  const { goalId, onClose } = props

  const [
    isAddMilestoneModalOpen,
    { on: openAddMilestoneModalOpen, off: closeAddMilestoneModalOpen },
  ] = useBoolean(false)

  const { data: goalResponse } = useGoalQuery(goalId)

  const milestones = useMemo(
    () => goalResponse?.goal?.milestones || [],
    [goalResponse],
  )

  return (
    <Flex h="full">
      <Box h="full" w="30%" bgColor="gray.900" p="8">
        <CreateGoalModalSteps
          activeStepKey={GoalModalStep.Milestones}
          completedStepsKeys={[GoalModalStep.Goal]}
        />
      </Box>

      <VStack w="70%" p="8" h="full">
        <Box flexGrow={0} flexShrink={0} w="full" mb="8">
          <Heading size="lg" mb="1">
            {milestonesStep.title}
          </Heading>

          <Text fontSize="md" color="gray.400">
            {milestonesStep.description}
          </Text>
        </Box>

        {milestones.length > 0 ? (
          <Box flexGrow={1} flexShrink={1} w="full">
            <Box mb="4">
              {milestones.map(milestone => {
                return (
                  <Box key={milestone.id} mb="3">
                    <MilestoneCard milestone={milestone} />
                  </Box>
                )
              })}
            </Box>

            <Box>
              <Button
                variant="ghost"
                size="md"
                onClick={openAddMilestoneModalOpen}
                leftIcon={<FaPlus />}
              >
                Add Milestone
              </Button>
            </Box>
          </Box>
        ) : (
          <Center flexGrow={1} flexShrink={1} w="full">
            <Button
              variant="ghost"
              size="lg"
              onClick={openAddMilestoneModalOpen}
              leftIcon={<FaPlus />}
            >
              Add Milestone
            </Button>
          </Center>
        )}

        <Flex flexGrow={0} flexShrink={0} justifyContent="flex-end" w="full">
          <Button
            rightIcon={<FaCheck />}
            ml="auto"
            type="submit"
            onClick={onClose}
          >
            Done
          </Button>
        </Flex>
      </VStack>

      <AddMilestoneModal
        isOpen={isAddMilestoneModalOpen}
        onClose={closeAddMilestoneModalOpen}
        goalId={goalId}
      />
    </Flex>
  )
}

export default CreateGoalMilestones
