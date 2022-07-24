import React, { useCallback, useState } from 'react'

import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'

import GoalDetails from './views/GoalDetails'
import Milestones from './views/Milestones'

import { useCreateGoalMutation } from '../../hooks/mutations/useCreateGoalMutation'

import { GoalModalStep } from './types'
import { GqlGoal } from 'src/generated/graphql'

interface ICreateGoalModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateGoalModal: React.FC<ICreateGoalModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [step, setStep] = useState(GoalModalStep.Goal)
  const [goal, setGoal] = useState<GqlGoal | null>(null)

  const closeHandler = useCallback(() => {
    onClose()
    setStep(GoalModalStep.Goal)
    setGoal(null)
  }, [onClose])

  const { mutate: createGoal, isLoading: isCreatingGoal } =
    useCreateGoalMutation()

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={closeHandler}
        size={['sm', 'md', '3xl', '4xl']}
      >
        <ModalOverlay />

        <ModalContent h="2xl" maxH="80vh">
          <ModalBody p={0}>
            <Box h="full">
              {step === GoalModalStep.Goal && (
                <GoalDetails
                  onSubmit={(goal) => {
                    setStep(GoalModalStep.Milestones)
                    createGoal(goal, {
                      onSuccess: ({ createGoal: goal }) => {
                        setGoal(goal)
                      },
                    })
                  }}
                  isSubmitting={isCreatingGoal}
                />
              )}

              {step === GoalModalStep.Milestones && goal ? (
                <Milestones goalId={goal.id} onClose={closeHandler} />
              ) : null}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateGoalModal
