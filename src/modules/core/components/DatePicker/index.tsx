import React from 'react'
import { format } from 'date-fns'

import {
  Input,
  useBoolean,
  InputProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@chakra-ui/react'

import Calendar from '../Calendar'

interface IDatePicker
  extends Omit<InputProps, 'value' | 'onChange' | 'readOnly' | 'onFocus'> {
  value: string | null
  minDate?: Date
  maxDate?: Date
  onChange: (value: string) => void
}

const DatePicker: React.FC<IDatePicker> = (props) => {
  const { value, onChange, minDate, maxDate, ...restProps } = props

  const [isOpen, { on, off }] = useBoolean(false)

  return (
    <Popover isOpen={isOpen} placement="bottom-start" onClose={off}>
      <PopoverTrigger>
        <Button variant="unstyled" w="full" onClick={on}>
          <Input
            value={value ? format(new Date(value), 'dd MMM yyyy') : ''}
            readOnly
            disabled
            borderColor={isOpen ? 'brand.400' : 'gray.200'}
            borderWidth={isOpen ? 2 : 1}
            boxShadow={isOpen ? '0 0 0 1px #c49f55' : 0}
            _disabled={{
              opacity: 1,
            }}
            {...restProps}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent w="fit-content" borderRadius={1}>
        <Calendar
          selected={value ? new Date(value) : undefined}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(date) => {
            onChange(date)
            off()
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
