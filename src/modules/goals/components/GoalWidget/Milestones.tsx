import React from 'react'
import { format, isAfter, isValid } from 'date-fns'

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { IMilestone } from '../../types/entities'

interface IMilestonesProps {
  milestones: IMilestone[]
}

const Milestones: React.FC<IMilestonesProps> = (props) => {
  const { milestones } = props

  return (
    <VStack p="4" spacing="5" alignItems="flex-start">
      {milestones.map((milestone) => {
        const startDate = isValid(new Date(milestone.startDate))
          ? format(new Date(milestone.startDate), 'MMM d')
          : null

        const endDate =
          milestone.estimatedEndDate &&
          isValid(new Date(milestone.estimatedEndDate))
            ? format(new Date(milestone.estimatedEndDate), 'MMM d')
            : null

        const progress = isAfter(new Date(milestone.startDate), new Date())
          ? 0
          : (new Date().getTime() - new Date(milestone.startDate).getTime()) /
            (new Date(milestone.estimatedEndDate).getTime() -
              new Date(milestone.startDate).getTime())

        return (
          <HStack key={milestone.id}>
            <CircularProgress
              value={progress}
              color="brand.400"
              size="40px"
              mr="2"
            >
              <CircularProgressLabel fontWeight="semibold" fontSize="xs">
                {progress}%
              </CircularProgressLabel>
            </CircularProgress>

            <Box>
              <Heading size="sm" fontWeight="semibold">
                {milestone.name}
              </Heading>

              <Text fontSize="sm" fontWeight="semibold" color="gray.400">
                {startDate} - {endDate}
              </Text>
            </Box>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default Milestones
