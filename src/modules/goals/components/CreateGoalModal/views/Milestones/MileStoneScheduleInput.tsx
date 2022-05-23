import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import { Box } from '@chakra-ui/react'

import ScheduleItem from './ScheduleItem'

import { weekdays } from 'src/modules/core/constants/dates'

import { ICreateMilestoneDto } from 'src/modules/goals/types/dto'

const MileStoneScheduleInput: React.FC = () => {
  const { control, setValue } = useFormContext<ICreateMilestoneDto>()

  const { fields, append, remove } = useFieldArray<ICreateMilestoneDto>({
    name: 'schedules',
    control,
  })

  return (
    <Box>
      {weekdays.map((day) => {
        const dayIndex = fields.findIndex((field) => field.weekDay === day.id)

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
                    onDurationChange={(duration) => {
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
                    onSelectionChange={(selected) => {
                      if (selected) {
                        append({ weekDay: day.id })
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
