import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { startOfToday } from 'date-fns'

import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'

import DatePicker from 'src/modules/core/components/DatePicker'
import SelectInput from 'src/modules/core/components/SelectInput'
import TopicSelect from './TopicSelect'

import { useSpecializationsQuery } from 'src/modules/goals/hooks/queries/useSpecializationsQuery'

import { SelectOption } from 'src/modules/core/types/entities'
import { ICreateGoalDto } from 'src/modules/goals/types/dto'

interface IGoalFormProps {
  isSubmitting?: boolean
}

const GoalForm: React.FC<IGoalFormProps> = (props) => {
  const { isSubmitting } = props

  const { control, register, formState, setValue } =
    useFormContext<ICreateGoalDto>()

  const { errors, touchedFields } = formState

  const { data: specializationsData, isLoading: isLoadingSpecializationsData } =
    useSpecializationsQuery()

  const specializationsOptions: SelectOption[] = useMemo(() => {
    if (specializationsData) {
      return specializationsData.specializations.map((specialization) => ({
        label: specialization.name,
        value: specialization.id,
      }))
    }

    return []
  }, [specializationsData])

  return (
    <Box w="50%">
      <Box w="full" mb="6">
        <Flex w="full" justifyContent="space-between" mb="1">
          <Heading size="xs">Goal Name:</Heading>

          <Text fontSize="sm" color="red.500" h="4">
            {touchedFields.name && errors.name?.message}
          </Text>
        </Flex>

        <Input
          {...register('name')}
          w="full"
          placeholder="Goal name..."
          disabled={isSubmitting}
        />
      </Box>

      <Controller
        control={control}
        name="startDate"
        render={({ field, fieldState }) => {
          return (
            <Box w="full" mb="6">
              <Flex w="full" justifyContent="space-between" mb="1">
                <Heading size="xs">Start Date:</Heading>

                <Text fontSize="sm" color="red.500" h="4">
                  {fieldState.error?.message}
                </Text>
              </Flex>

              <DatePicker
                value={field.value}
                placeholder="Select start date..."
                minDate={startOfToday()}
                isDisabled={isSubmitting}
                onChange={(date) => {
                  setValue('startDate', date, {
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }}
              />
            </Box>
          )
        }}
      />

      <Controller
        control={control}
        name="specializationId"
        render={({ field, fieldState }) => {
          const selectedOption = specializationsOptions.find(
            (item) => item.value === field.value,
          )

          return (
            <Box w="full" mb="6">
              <Flex w="full" justifyContent="space-between" mb="1">
                <Heading size="xs">Specialization:</Heading>

                <Text fontSize="sm" color="red.500" h="4">
                  {fieldState.error?.message}
                </Text>
              </Flex>

              <SelectInput
                value={selectedOption}
                isMulti={false}
                isLoading={isLoadingSpecializationsData}
                isDisabled={isSubmitting}
                options={specializationsOptions}
                onChange={(selection) => {
                  setValue(
                    'specializationId',
                    (selection as SelectOption)?.value as number,
                    {
                      shouldTouch: true,
                      shouldValidate: true,
                    },
                  )
                }}
              />
            </Box>
          )
        }}
      />

      <TopicSelect />
    </Box>
  )
}

export default GoalForm
