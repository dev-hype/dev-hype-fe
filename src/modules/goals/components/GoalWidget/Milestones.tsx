import React from 'react'

import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

const Milestones: React.FC = () => {
  return (
    <VStack p="4" spacing="5" alignItems="flex-start">
      <HStack>
        <CircularProgress value={40} color="brand.400" size="40px" mr="2">
          <CircularProgressLabel fontWeight="semibold" fontSize="xs">
            40%
          </CircularProgressLabel>
        </CircularProgress>

        <Box>
          <Heading size="sm" fontWeight="semibold">
            Introduction To Databases with PostgresQL, 2nd Edition
          </Heading>

          <Text fontSize="sm" fontWeight="semibold" color="gray.400">
            Jan 1 - Feb 15
          </Text>
        </Box>
      </HStack>

      <HStack>
        <CircularProgress value={10} color="brand.400" size="40px" mr="2">
          <CircularProgressLabel fontWeight="semibold" fontSize="xs">
            10%
          </CircularProgressLabel>
        </CircularProgress>

        <Box>
          <Heading size="sm" fontWeight="semibold">
            PostgresQL: The Complete Guide, by John Darling
          </Heading>

          <Text fontSize="sm" fontWeight="semibold" color="gray.400">
            Feb 1 - Mar 31
          </Text>
        </Box>
      </HStack>
    </VStack>
  )
}

export default Milestones
