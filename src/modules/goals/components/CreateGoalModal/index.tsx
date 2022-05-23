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
import { IGoal } from '../../types/entities'

interface ICreateGoalModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateGoalModal: React.FC<ICreateGoalModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [step, setStep] = useState(GoalModalStep.Goal)
  const [goal, setGoal] = useState<IGoal | null>(null)

  const closeHandler = useCallback(() => {
    onClose()
    setStep(GoalModalStep.Goal)
    setGoal(null)
  }, [onClose])

  const { mutate: createGoal, isLoading: isCreatingGoal } =
    useCreateGoalMutation()

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeHandler} size="6xl">
        <ModalOverlay />

        <ModalContent h="2xl" maxH="80vh">
          <ModalBody p={0}>
            <Box h="full">
              {step === GoalModalStep.Goal && (
                <GoalDetails
                  onSubmit={(goal) => {
                    setStep(GoalModalStep.Milestones)
                    createGoal(goal, {
                      onSuccess: ({ goal }) => {
                        setGoal(goal)
                      },
                    })
                  }}
                  isSubmitting={isCreatingGoal}
                />
              )}

              {step === GoalModalStep.Milestones && goal ? (
                <Milestones goal={goal} onClose={closeHandler} />
              ) : null}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreateGoalModal
