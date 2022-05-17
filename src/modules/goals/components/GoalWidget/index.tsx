import React, { useState } from 'react'

import {
  Badge,
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  IconButton,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'

import Milestones from './Milestones'
import Projects from './Projects'

enum ExpandableContent {
  Milestones,
  Projects,
}

const GoalWidget: React.FC = () => {
  const [activeContent, setActiveContent] = useState<ExpandableContent | null>(
    null,
  )

  return (
    <Box>
      <Box>
        <HStack p="4" bgColor="brand.50" justifyContent="space-between">
          <Box>
            <HStack mb="4">
              <Heading size="sm" mb="1" mr="1.5">
                Learn Backend web development with Golang
              </Heading>

              <Badge variant="solid">Web Development</Badge>
            </HStack>

            <Box display="flex">
              <Button
                mr="4"
                size="sm"
                px="0"
                h="4"
                color="gray.500"
                variant="ghost"
                _hover={{
                  bgColor: 'blackAlpha.100',
                }}
                _active={{
                  bgColor: 'transparent',
                  color: 'brand.500',
                  fontWeight: 'semibold',
                }}
                isActive={activeContent === ExpandableContent.Milestones}
                onClick={() =>
                  setActiveContent((current) =>
                    current === ExpandableContent.Milestones
                      ? null
                      : ExpandableContent.Milestones,
                  )
                }
              >
                5 Milestones
              </Button>

              <Button
                mr="4"
                size="sm"
                px="0"
                h="4"
                color="gray.500"
                variant="ghost"
                _hover={{
                  bgColor: 'blackAlpha.100',
                }}
                _active={{
                  bgColor: 'transparent',
                  color: 'brand.500',
                  fontWeight: 'bold',
                }}
                isActive={activeContent === ExpandableContent.Projects}
                onClick={() =>
                  setActiveContent((current) =>
                    current === ExpandableContent.Projects
                      ? null
                      : ExpandableContent.Projects,
                  )
                }
              >
                1 Project
              </Button>
            </Box>
          </Box>

          <HStack spacing={4}>
            <VStack alignItems="flex-end" spacing="0">
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="semibold"
                mb="2"
                lineHeight={1}
              >
                Jan 1 - Mar 31
              </Text>

              <HStack>
                <Text fontWeight="semibold">20%</Text>

                <Box w="36" ml="1">
                  <Progress colorScheme="brand" size="sm" value={20} />
                </Box>
              </HStack>
            </VStack>

            <Box>
              <IconButton
                colorScheme="black"
                color="gray.500"
                aria-label="options"
                variant="ghost"
                size="sm"
                _hover={{
                  bgColor: 'blackAlpha.100',
                }}
              >
                <FaEllipsisV size={16} />
              </IconButton>
            </Box>
          </HStack>
        </HStack>

        <Collapse in={activeContent !== null} unmountOnExit>
          <Box boxShadow="sm" border="1px" borderColor="gray.50">
            {activeContent === ExpandableContent.Milestones && (
              <Box>
                <Milestones />
              </Box>
            )}

            {activeContent === ExpandableContent.Projects && (
              <Box>
                <Projects />
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default GoalWidget
