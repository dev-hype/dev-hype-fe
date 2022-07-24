import React, { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

import { FaAngleRight } from 'react-icons/fa'

import GoalForm from './GoalForm'
import CreateGoalModalSteps from '../CreateGoalModalSteps'

import { useGoalForm, GoalFormState } from './useGoalForm'

import { goalModalSteps } from '../../constants'

import { GoalModalStep } from '../../types'

interface IGoalDetailsProps {
  isSubmitting?: boolean
  onSubmit: (formData: GoalFormState) => void
}

const goalDetailsStep = goalModalSteps[GoalModalStep.Goal]

const GoalDetails: React.FC<IGoalDetailsProps> = (props) => {
  const { onSubmit, isSubmitting } = props

  const formMethods = useGoalForm()

  const submitHandler = useCallback(
    async (formData: GoalFormState) => {
      onSubmit(formData)
    },
    [onSubmit],
  )

  return (
    <FormProvider {...formMethods}>
      <Flex
        h="full"
        as="form"
        onSubmit={formMethods.handleSubmit(submitHandler)}
      >
        <Box h="full" w="30%" bgColor="gray.900" p="8">
          <CreateGoalModalSteps
            activeStepKey={GoalModalStep.Goal}
            completedStepsKeys={[]}
          />
        </Box>

        <VStack p="8" h="full" w="70%">
          <Box flexGrow={0} flexShrink={0} w="full">
            <Heading size="lg" mb="1">
              {goalDetailsStep.title}
            </Heading>

            <Text fontSize="md" color="gray.400">
              {goalDetailsStep.description}
            </Text>
          </Box>

          <Center flexGrow={1} flexShrink={1} w="full">
            <GoalForm isSubmitting={isSubmitting} />
          </Center>

          <Flex flexGrow={0} flexShrink={0} justifyContent="flex-end" w="full">
            <Button ml="auto" rightIcon={<FaAngleRight />} type="submit">
              Create Goal
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </FormProvider>
  )
}

export default GoalDetails
