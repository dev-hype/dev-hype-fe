import React from 'react'

import {
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react'

interface IScheduleItemProps {
  label: string
  isSelected: boolean
  durationInHours: number
  invalidDuration?: boolean
  onSelectionChange: (checked: boolean) => void
  onDurationChange: (duration: number) => void
}

const ScheduleItem: React.FC<IScheduleItemProps> = props => {
  const {
    label,
    isSelected,
    durationInHours,
    invalidDuration,
    onSelectionChange,
    onDurationChange,
  } = props

  return (
    <HStack mb="3" justifyContent="space-between" h="8">
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="36"
      >
        <FormLabel htmlFor="email-alerts" mb="0">
          {label}
        </FormLabel>

        <Switch
          checked={isSelected}
          onChange={e => {
            onSelectionChange(e.target.checked)
          }}
        />
      </FormControl>

      {isSelected && (
        <NumberInput
          size="sm"
          min={1}
          max={8}
          isInvalid={invalidDuration}
          placeholder="Duration in Hours..."
          value={durationInHours}
          onChange={value => {
            onDurationChange(Number(value))
          }}
        >
          <NumberInputField autoFocus />

          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
    </HStack>
  )
}

export default ScheduleItem
