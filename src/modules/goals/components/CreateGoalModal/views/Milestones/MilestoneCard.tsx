import React from 'react'
import { format } from 'date-fns'

import { Box, Heading, HStack, Link, Tag, Text } from '@chakra-ui/react'

import { weekdays } from 'src/modules/core/constants/dates'

import { GqlMilestone } from 'src/generated/graphql'

interface IMilestoneCardProps {
  milestone: GqlMilestone
}

const MilestoneCard: React.FC<IMilestoneCardProps> = (props) => {
  const { milestone } = props

  return (
    <Box border="1px" borderColor="gray.100" px="4" py="3">
      <Box>
        <Heading size="md">{milestone.name}</Heading>

        <HStack mb="4">
          <Text color="gray.400" fontSize="sm" mr="2">
            {milestone.startDate
              ? format(new Date(milestone.startDate), 'dd MMM yyyy')
              : ''}
          </Text>

          <Text color="red.600" fontSize="sm">
            {milestone.durationInHours} Hours
          </Text>
        </HStack>
      </Box>

      <Box>
        <HStack mb="2">
          <Link href={milestone.resource.url}>{milestone.resource.name}</Link>

          <Tag variant="solid" bgColor="gray.700" size="sm">
            {milestone.resource.name}
          </Tag>
        </HStack>
      </Box>

      <HStack>
        {milestone.milestoneSchedules.map((day) => {
          const weekday = weekdays.find((item) => item.id === day.weekDay)

          return <Tag key={day.weekDay}>{weekday?.shortName}</Tag>
        })}
      </HStack>
    </Box>
  )
}

export default MilestoneCard
