import React, { useState } from 'react'
import { format, isValid } from 'date-fns'

import {
  Badge,
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react'

import Milestones from './Milestones'
import Projects from './Projects'

import {
  IGoal,
  IMilestone,
  IProject,
  ISpecialization,
  ITopic,
} from '../../types/entities'

import GoalDropdown from './GoalDropdown'

enum ExpandableContent {
  Milestones,
  Projects,
}

interface IGoalWidgetProps {
  goal: IGoal
  milestones: IMilestone[]
  projects: IProject[]
  topic: ITopic & {
    specialization: ISpecialization
  }
}

const GoalWidget: React.FC<IGoalWidgetProps> = (props) => {
  const { goal, milestones, projects, topic } = props

  const [activeContent, setActiveContent] = useState<ExpandableContent | null>(
    null,
  )

  const startDate = isValid(new Date(goal.startDate))
    ? format(new Date(goal.startDate), 'MMM d')
    : null
  const endDate =
    goal.estimatedEndDate && isValid(new Date(goal.estimatedEndDate))
      ? format(new Date(goal.estimatedEndDate), 'MMM d')
      : null

  return (
    <Box>
      <Box>
        <HStack p="4" bgColor="brand.50" justifyContent="space-between">
          <Box>
            <HStack mb="4">
              <Heading size="sm" mr="1.5">
                {goal.name}
              </Heading>

              <Badge variant="solid">{topic.specialization.name}</Badge>
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
                {projects.length} Project
              </Button>
            </Box>
          </Box>

          <HStack spacing={4}>
            <VStack alignItems="flex-end" spacing="0">
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="semibold"
                mb="1"
                lineHeight={1}
              >
                {startDate} - {endDate}
              </Text>

              <HStack>
                <Text fontWeight="semibold">20%</Text>

                <Box w="36" ml="1">
                  <Progress colorScheme="brand" size="sm" value={20} />
                </Box>
              </HStack>
            </VStack>

            <Box>
              <GoalDropdown
                onEditClick={() => {
                  console.log('Edit')
                }}
                onDeleteClick={() => {
                  console.log('Delete')
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
