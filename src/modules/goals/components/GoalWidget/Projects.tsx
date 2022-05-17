import React from 'react'

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaCubes, FaExternalLinkAlt } from 'react-icons/fa'

const Projects: React.FC = () => {
  return (
    <VStack p="4" spacing="5" alignItems="flex-start">
      <Flex justifyContent="space-between" w="full">
        <HStack>
          <Box mr="2">
            <FaCubes size={20} />
          </Box>

          <Box>
            <Heading size="sm" fontWeight="semibold">
              Blog Website
            </Heading>

            <Text fontSize="sm" fontWeight="semibold" color="gray.400">
              A blogging website built with Golang and Postgres
            </Text>
          </Box>
        </HStack>

        <Box>
          <Button
            leftIcon={<FaExternalLinkAlt />}
            variant="ghost"
            colorScheme="brand"
            size="sm"
            as={Link}
          >
            Visit
          </Button>
        </Box>
      </Flex>

      <Flex justifyContent="space-between" w="full">
        <HStack>
          <Box mr="2">
            <FaCubes size={20} />
          </Box>

          <Box>
            <Heading size="sm" fontWeight="semibold">
              Blog Website
            </Heading>

            <Text fontSize="sm" fontWeight="semibold" color="gray.400">
              A blogging website built with Golang and Postgres
            </Text>
          </Box>
        </HStack>

        <Box>
          <Button
            leftIcon={<FaExternalLinkAlt />}
            variant="ghost"
            colorScheme="brand"
            size="sm"
            as={Link}
          >
            Visit
          </Button>
        </Box>
      </Flex>
    </VStack>
  )
}

export default Projects
