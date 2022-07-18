import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import AutoSuggestInput from 'src/modules/core/components/AutoSuggestInput'

import { GoalFormState } from './useGoalForm'

interface ITopicSelectProps {
  isSubmitting?: boolean
}

const TopicSelect: React.FC<ITopicSelectProps> = (props) => {
  const { isSubmitting } = props

  const { control, setValue } = useFormContext<GoalFormState>()

  // const [searchTerm, setSearchTerm] = useState('')

  // const selectedSpecializationId = watch('specializationId')

  // const topics = useMemo(() => {
  //   return topicsData?.topicsAutoComplete || []
  // }, [topicsData])

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
              isDisabled={isSubmitting}
              items={[]}
              onInputValueChange={(value) => {
                // setSearchTerm(value ?? '')

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
