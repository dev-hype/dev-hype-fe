import React from 'react'

import {
  Box,
  Button,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'

interface ITaskProps {
  milestoneName: string
  resourceName: string
  durationInHours: number
  onStartClick: () => void
}

const Task: React.FC<ITaskProps> = (props) => {
  const { milestoneName, resourceName, durationInHours, onStartClick } = props

  return (
    <Box border="1px" borderColor="gray.200" px="6" py="3" borderRadius="4px">
      <HStack>
        <Stat>
          <StatLabel>Milestone: {milestoneName}</StatLabel>
          <StatNumber>{resourceName}</StatNumber>
          <StatHelpText fontWeight="bold" color="brand.700">
            {durationInHours} Hours
          </StatHelpText>
        </Stat>

        <Box>
          <Button
            size="sm"
            rightIcon={<FaPlay size={8} />}
            iconSpacing="4"
            onClick={onStartClick}
          >
            Start
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}

export default Task
