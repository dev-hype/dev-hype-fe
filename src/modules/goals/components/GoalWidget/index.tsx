import React, { useState } from 'react'
import { format, isValid } from 'date-fns'

import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Collapse,
  Flex,
  Heading,
  HStack,
  Progress,
  Show,
  Text,
} from '@chakra-ui/react'

import Milestones from './Milestones'
import Projects from './Projects'

import GoalDropdown from './GoalDropdown'

import { GqlGoal } from 'src/generated/graphql'

enum ExpandableContent {
  Milestones,
  Projects,
}

interface IGoalWidgetProps {
  goal: GqlGoal
  // projects: GqlProject[]
  onDeleteClick: (goal: GqlGoal) => void
}

const GoalWidget: React.FC<IGoalWidgetProps> = (props) => {
  const { goal, onDeleteClick } = props

  const { milestones, topic } = goal

  const [activeContent, setActiveContent] = useState<ExpandableContent | null>(
    null,
  )

  const startDate =
    goal.startDate && isValid(new Date(goal.startDate))
      ? format(new Date(goal.startDate), 'MMM d')
      : null
  const endDate =
    goal.estimatedEndDate && isValid(new Date(goal.estimatedEndDate))
      ? format(new Date(goal.estimatedEndDate), 'MMM d')
      : null

  return (
    <Box boxShadow="sm">
      <Box>
        <HStack p="4" bgColor="brand.50" justifyContent="space-between">
          <Box>
            <HStack mb={{ base: '1.5', md: '4' }}>
              <Heading size="sm" mr="1.5">
                {goal.name}
              </Heading>

              <Badge variant="solid">{topic.specialization.name}</Badge>
            </HStack>

            <Show below="md">
              <Text
                fontSize="xs"
                color="gray.300"
                fontWeight="semibold"
                mb="4"
                lineHeight={1}
              >
                {startDate} - {endDate}
              </Text>
            </Show>

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
                {milestones.length} Milestones
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
                {/*projects.length*/} Project
              </Button>
            </Box>
          </Box>

          <HStack spacing={4}>
            <Flex
              flexDir={{ md: 'column' }}
              alignItems={{ base: 'center', md: 'flex-end' }}
            >
              <Show above="md">
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontWeight="semibold"
                  mb={{ md: '1' }}
                  lineHeight={1}
                >
                  {startDate} - {endDate}
                </Text>
              </Show>

              <Show above="md">
                <HStack>
                  <Text fontWeight="semibold">20%</Text>

                  <Box w="36" ml="1">
                    <Progress colorScheme="brand" size="sm" value={20} />
                  </Box>
                </HStack>
              </Show>

              <Show below="md">
                <CircularProgress
                  value={20}
                  color="brand.400"
                  trackColor="brand.200"
                  size="40px"
                >
                  <CircularProgressLabel fontWeight="semibold" fontSize="xs">
                    20%
                  </CircularProgressLabel>
                </CircularProgress>
              </Show>
            </Flex>

            <Box>
              <GoalDropdown
                onEditClick={() => {
                  console.log('Edit')
                }}
                onDeleteClick={() => {
                  onDeleteClick(goal)
                }}
              />
            </Box>
          </HStack>
        </HStack>

        <Collapse in={activeContent !== null} unmountOnExit>
          <Box boxShadow="sm" border="1px" borderColor="gray.50">
            {activeContent === ExpandableContent.Milestones && (
              <Box>
                <Milestones milestones={milestones} />
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
