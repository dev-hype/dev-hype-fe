import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'

import SelectInput from 'src/modules/core/components/SelectInput'
import TopicSelect from './TopicSelect'

import { useFieldsQuery } from 'src/modules/paths/hooks/queries/useFieldsQuery'

import { SelectOption } from 'src/modules/core/types/entities'
import { GoalFormState } from './useGoalForm'

interface IGoalFormProps {
  isSubmitting?: boolean
}

const GoalForm: React.FC<IGoalFormProps> = (props) => {
  const { isSubmitting } = props

  const { control, register, formState, setValue, watch } =
    useFormContext<GoalFormState>()

  const { errors, touchedFields } = formState

  const fieldId = watch('fieldId')

  const { data: fieldsData, isLoading: isLoadingFieldsData } = useFieldsQuery()

  const fieldsOptions: SelectOption[] = useMemo(() => {
    if (fieldsData) {
      return fieldsData.fields.map((field) => ({
        label: field.name,
        value: field.id,
      }))
    }

    return []
  }, [fieldsData])

  const specializationsOptions: SelectOption[] = useMemo(() => {
    if (fieldsData && fieldId) {
      const specializations =
        fieldsData.fields.find((field) => field.id === fieldId)
          ?.specializations || []

      return specializations.map((specialization) => ({
        label: specialization.name,
        value: specialization.id,
      }))
    }

    return []
  }, [fieldId, fieldsData])

  return (
    <Box w={{ lg: '65%' }}>
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
        name="fieldId"
        render={({ field, fieldState }) => {
          const selectedOption = fieldsOptions.find(
            (item) => item.value === field.value,
          )

          return (
            <Box w="full" mb="6">
              <Flex w="full" justifyContent="space-between" mb="1">
                <Heading size="xs">Field:</Heading>

                <Text fontSize="sm" color="red.500" h="4">
                  {fieldState.error?.message}
                </Text>
              </Flex>

              <SelectInput
                value={selectedOption}
                isMulti={false}
                isLoading={isLoadingFieldsData}
                isDisabled={isSubmitting}
                options={fieldsOptions}
                onChange={(selection) => {
                  setValue(
                    'fieldId',
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
                isLoading={isLoadingFieldsData}
                isDisabled={isSubmitting || !fieldId}
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
