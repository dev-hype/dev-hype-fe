import React, { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { debounce } from 'debounce'

import AutoSuggestInput from 'src/modules/core/components/AutoSuggestInput'

import { useTopicsQuery } from 'src/modules/paths/hooks/queries/useTopicsQuery'

import { GoalFormState } from './useGoalForm'

interface ITopicSelectProps {
  isSubmitting?: boolean
}

const TopicSelect: React.FC<ITopicSelectProps> = props => {
  const { isSubmitting } = props

  const { control, setValue, watch } = useFormContext<GoalFormState>()

  const [searchTerm, setSearchTerm] = useState('')

  const specializationId = watch('specializationId')

  const { data: topicsData } = useTopicsQuery({
    args: { specializationId, search: searchTerm },
    options: {
      enabled: Boolean(searchTerm.trim()),
    },
  })

  const topics = useMemo(() => {
    return topicsData?.topics.map(topic => topic.name) || []
  }, [topicsData])

  const updateSearchTerm = debounce(
    (value: string) => setSearchTerm(value ?? ''),
    300,
  )

  return (
    <Controller
      control={control}
      name="topicName"
      render={({ field: { value, onBlur, name }, fieldState }) => {
        return (
          <Box w="full">
            <Flex w="full" justifyContent="space-between" mb="1">
              <Heading size="xs">Topic:</Heading>

              <Text fontSize="sm" color="red.500" h="4">
                {fieldState.error?.message}
              </Text>
            </Flex>

            <AutoSuggestInput
              name={name}
              onBlur={onBlur}
              value={value ?? ''}
              isDisabled={isSubmitting || !specializationId}
              items={topics}
              onInputValueChange={value => {
                updateSearchTerm(value ?? '')

                setValue('topicName', value ?? '', {
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }}
            />
          </Box>
        )
      }}
    />
  )
}

export default TopicSelect
