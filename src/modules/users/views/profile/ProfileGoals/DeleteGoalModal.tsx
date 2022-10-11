import React, { useCallback } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'

import { useDeleteGoalMutation } from 'src/modules/goals/hooks/mutations/useDeleteGoalMutation'

import { GqlGoal } from 'src/generated/graphql'

interface IDeleteGoalModalProps {
  goal: GqlGoal
  isOpen: boolean
  onClose: () => void
}

const DeleteGoalModal: React.FC<IDeleteGoalModalProps> = props => {
  const { goal, isOpen, onClose } = props

  const toast = useToast()

  const { mutate: deleteGoal } = useDeleteGoalMutation()

  const submitHandler = useCallback(() => {
    deleteGoal(
      { id: goal.id },
      {
        onSuccess: () => {
          onClose()
          toast({
            title: 'Success',
            description: 'Goal is deleted',
            status: 'success',
          })
        },
      },
    )
  }, [deleteGoal, goal.id, onClose, toast])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Goal</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          You&apos;re about to delete the goal{' '}
          <strong>&quot;{goal.name}&quot;</strong>. Are you sure you want to
          delete it?
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blackAlpha"
            variant="ghost"
            size="sm"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>

          <Button colorScheme="red" size="sm" onClick={submitHandler}>
            Delete Goal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteGoalModal
