import {
  Box,
  Button,
  Collapse,
  Heading,
  Slide,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import { produce } from 'immer'
import React, { useCallback, useState } from 'react'

interface ILastSessionNotesProps {
  notes: any[]
  skip: () => void
}

const getRandomIndex = (length: number, exclude: number[]) => {
  let result = Math.floor(Math.random() * length)

  if (exclude.includes(result)) {
    result = getRandomIndex(length, exclude)
  }

  return result
}

const LastSessionNotes: React.FC<ILastSessionNotesProps> = (props) => {
  const { notes, skip } = props

  const [randomNoteIndex, setRandomNoteIndex] = useState<number>(() =>
    getRandomIndex(notes.length, []),
  )

  const [reviewedNotesIndices, setReviewedNotesIndices] = useState<number[]>([])

  const [isCurrentNoteRevealed, { on: revealNote, off: hideNote }] =
    useBoolean(false)

  const activeNote = notes.at(randomNoteIndex)

  const showNextNote = useCallback(() => {
    setReviewedNotesIndices(
      produce((draft) => {
        draft.push(randomNoteIndex)
      }),
    )

    const nextNoteIndex = getRandomIndex(notes.length, reviewedNotesIndices)

    hideNote()
    setRandomNoteIndex(nextNoteIndex)
  }, [hideNote, notes, randomNoteIndex, reviewedNotesIndices])

  return (
    <Box>
      <Heading>Review notes from your last session</Heading>

      <Slide key={activeNote?.id} in direction="left">
        <Box>
          <Button
            variant="ghost"
            colorScheme="brand"
            onClick={revealNote}
            mb="6"
          >
            {activeNote?.title}
          </Button>

          <Collapse in={isCurrentNoteRevealed}>
            <Text>{activeNote?.note}</Text>
          </Collapse>
        </Box>
      </Slide>

      <Box>
        <Button onClick={skip}>Skip</Button>

        <Button onClick={showNextNote}>Next</Button>
      </Box>
    </Box>
  )
}

export default LastSessionNotes
