import React, { useLayoutEffect, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@chakra-ui/react'

import LastSessionNotes from './LastSessionNotes'

import { useMilestoneNotesQuery } from '../../hooks/queries/useMilestoneNotesQuery'

import {
  IMilestone,
  IMilestoneSchedule,
  IResource,
} from 'src/modules/goals/types/entities'

enum TaskNotesModalStep {
  LAST_SESSION = 'LAST_SESSION',
  RANDOM_SESSIONS = 'RANDOM_SESSIONS',
  NEW_SESSION = 'NEW_SESSION',
}

export type MilestoneTask = IMilestone & {
  milestoneSchedules: IMilestoneSchedule[]
  resource: IResource
}

interface ITaskNotesModalProps {
  task: MilestoneTask | null
  isOpen: boolean
  onClose: () => void
}

const TaskNotesModal: React.FC<ITaskNotesModalProps> = (props) => {
  const { task, isOpen, onClose } = props

  const [activeStep, setActiveStep] = useState(TaskNotesModalStep.LAST_SESSION)

  const {
    data: notesData,
    isLoading: isLoadingNotes,
    isFetched: isNotesFetched,
  } = useMilestoneNotesQuery(task?.id)

  const lastSessionNotes = useMemo(() => {
    if (notesData && notesData.notes.length) {
      const lastSessionDate = notesData.notes.reduce((prev, current) =>
        new Date(prev.createdAt).getTime() >
        new Date(current.createdAt).getTime()
          ? prev
          : current,
      ).createdAt

      return notesData.notes.filter(
        (note) => note.createdAt === lastSessionDate,
      )
    }

    return []
  }, [notesData])

  useLayoutEffect(() => {
    if (notesData && isNotesFetched) {
      if (notesData.notes.length === 0) {
        return setActiveStep(TaskNotesModalStep.NEW_SESSION)
      }
    }
  }, [isNotesFetched, notesData])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {isLoadingNotes && <Spinner />}

          {isNotesFetched && notesData ? (
            <Box>
              {activeStep === TaskNotesModalStep.LAST_SESSION && (
                <LastSessionNotes
                  notes={lastSessionNotes}
                  skip={() => {
                    setActiveStep(
                      notesData &&
                        notesData.notes.length === lastSessionNotes.length
                        ? TaskNotesModalStep.NEW_SESSION
                        : TaskNotesModalStep.RANDOM_SESSIONS,
                    )
                  }}
                />
              )}

              {activeStep === TaskNotesModalStep.RANDOM_SESSIONS && (
                <Box>
                  <h1>Random sessions</h1>
                </Box>
              )}

              {activeStep === TaskNotesModalStep.NEW_SESSION && (
                <Box>
                  <h1>Current session</h1>
                </Box>
              )}
            </Box>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TaskNotesModal
