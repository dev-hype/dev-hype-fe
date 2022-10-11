import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { Box } from '@chakra-ui/react'

import ScheduleItem from './ScheduleItem'

import { weekdays } from 'src/modules/core/constants/dates'

import { MilestoneFormState } from './useMilestoneForm'

const MileStoneScheduleInput: React.FC = () => {
  const { control, setValue } = useFormContext<MilestoneFormState>()

  const { fields, append, remove } = useFieldArray<MilestoneFormState>({
    name: 'schedules',
    control,
  })

  return (
    <Box>
      {weekdays.map(day => {
        const dayIndex = fields.findIndex(field => field.weekDay === day.id)

        const isSelected = dayIndex >= 0

        return (
          <Box key={day.id}>
            <Controller
              control={control}
              name={`schedules.${dayIndex}.durationInHours`}
              render={({ field, fieldState }) => {
                return (
                  <ScheduleItem
                    durationInHours={field.value}
                    isSelected={isSelected}
                    label={day.shortName}
                    invalidDuration={Boolean(fieldState.error?.message)}
                    onDurationChange={duration => {
                      setValue(
                        `schedules.${dayIndex}.durationInHours`,
                        duration,
                        {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        },
                      )
                    }}
                    onSelectionChange={selected => {
                      if (selected) {
                        append({ weekDay: day.id, durationInHours: 0 })
                      } else {
                        remove(dayIndex)
                      }
                    }}
                  />
                )
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default MileStoneScheduleInput
