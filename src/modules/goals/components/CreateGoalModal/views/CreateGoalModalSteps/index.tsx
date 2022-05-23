import React, { useMemo } from 'react'

import { Box, Center, Heading, HStack, Text } from '@chakra-ui/react'

import { FaCheckCircle } from 'react-icons/fa'

import { goalModalSteps } from '../../constants'

import { GoalModalStep } from '../../types'

interface ICreateGoalModalStepsProps {
  activeStepKey: GoalModalStep
  completedStepsKeys: GoalModalStep[]
}

const CreateGoalModalSteps: React.FC<ICreateGoalModalStepsProps> = (props) => {
  const { activeStepKey, completedStepsKeys } = props

  const activeStep = useMemo(
    () => goalModalSteps[activeStepKey],
    [activeStepKey],
  )

  return (
    <Box color="gray.50">
      <Box mb="12">
        <Heading size="lg" mb="1">
          Step {activeStepKey + 1}
        </Heading>

        <Text color="gray.300" fontSize="md">
          {activeStep?.description}
        </Text>
      </Box>

      <Box>
        {Object.values(goalModalSteps).map((step) => {
          const isActive = step.key === activeStepKey
          const isCompleted = completedStepsKeys.includes(step.key)

          return (
            <HStack
              spacing={4}
              key={step.key}
              mb="8"
              color={isActive ? 'brand.400' : 'gray.100'}
              opacity={isActive ? 1 : 0.7}
            >
              <Center
                w="8"
                h="8"
                flexShrink={0}
                flexGrow={0}
                fontWeight="semibold"
                overflow="hidden"
              >
                <Center
                  w="full"
                  h="full"
                  color={isActive ? 'brand.400' : 'gray.100'}
                  fontSize="2xl"
                >
                  {step.icon}
                </Center>
              </Center>

              <Box>
                <HStack mb="1">
                  <Heading size="sm">{step.title}</Heading>

                  {isCompleted && (
                    <Box color="green.600">
                      <FaCheckCircle />
                    </Box>
                  )}
                </HStack>

                <Text color={isActive ? 'brand.400' : 'gray.300'} fontSize="xs">
                  {step.description}
                </Text>
              </Box>
            </HStack>
          )
        })}
      </Box>
    </Box>
  )
}

export default CreateGoalModalSteps
