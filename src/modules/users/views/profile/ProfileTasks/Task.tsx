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
import { FaArrowRight, FaPlay } from 'react-icons/fa'

interface ITaskProps {
  milestoneName: string
  resourceName: string
  durationInHours: number
}

const Task: React.FC<ITaskProps> = (props) => {
  const { milestoneName, resourceName, durationInHours } = props

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
          <Button rightIcon={<FaPlay size={10} />} iconSpacing="4">
            Start
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}

export default Task
