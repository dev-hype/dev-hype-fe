import React from 'react'

import { Props, useDayzed } from 'dayzed'

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarHead: React.FC<{ month: string; year: number }> = ({
  month,
  year,
}) => (
  <Flex p="2" alignItems="baseline" justifyContent="center">
    <Heading color="gray.800" size="lg" mr="2" fontWeight="semibold">
      {month}
    </Heading>

    <Heading color="brand.600" size="lg" fontWeight="semibold">
      {year}
    </Heading>
  </Flex>
)

const GridHead: React.FC<{ month: number; year: number }> = ({
  month,
  year,
}) => (
  <HStack spacing={2} px="2" py="1" wrap="nowrap">
    {weekdayNamesShort.map((weekday) => (
      <Box key={`${month}${year}${weekday}`} w="40px" textAlign="center">
        <Text color="brand.400" fontSize="sm">
          {weekday}
        </Text>
      </Box>
    ))}
  </HStack>
)

type CalendarProps = Omit<Props, 'onDateSelected'> & {
  onChange: (date: string) => void
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const { onChange, ...restProps } = props

  const { calendars, getBackProps, getDateProps, getForwardProps } = useDayzed({
    ...restProps,
    onDateSelected: ({ date }) => {
      const timezoneDiff = date.getTimezoneOffset() * 60 * 1000
      const utcDate = date.getTime() - timezoneDiff
      const utcDateObj = new Date(utcDate)

      onChange(utcDateObj.toISOString())
    },
    showOutsideDays: true,
  })

  return (
    <Box
      border="1px"
      borderColor="gray.50"
      shadow="md"
      w="350px"
      pb="4"
      bgColor="white"
    >
      <Box position="relative">
        <Button
          variant="ghost"
          position="absolute"
          top="4"
          left="2"
          {...getBackProps({ calendars })}
        >
          <FaAngleLeft />
        </Button>

        <Button
          variant="ghost"
          position="absolute"
          top="4"
          right="2"
          {...getForwardProps({ calendars })}
        >
          <FaAngleRight />
        </Button>

        {calendars.map((calendar) => {
          return (
            <Box key={`${calendar.month}${calendar.year}`}>
              <Flex p="2" justifyContent="center" alignItems="center">
                <CalendarHead
                  month={monthNamesShort[calendar.month]}
                  year={calendar.year}
                />
              </Flex>

              <Divider h="3px" bgColor="brand.400" mb="4" ml="auto" w="50%" />

              <GridHead month={calendar.month} year={calendar.year} />

              <Box>
                {calendar.weeks.map((week, weekIndex) => (
                  <HStack
                    key={`${calendar.month}${calendar.year}${weekIndex}`}
                    spacing={2}
                    px="2"
                    py="1"
                    wrap="nowrap"
                  >
                    {week.map((dateObj, index) => {
                      const key = `${calendar.month}${calendar.year}${weekIndex}${index}`

                      if (!dateObj) {
                        return <Box key={key} />
                      }

                      const {
                        date,
                        selected,
                        selectable,
                        today,
                        prevMonth,
                        nextMonth,
                      } = dateObj

                      return (
                        <Button
                          {...getDateProps({ dateObj })}
                          w="40px"
                          h="40px"
                          variant="ghost"
                          key={key}
                          color={
                            selected
                              ? 'white'
                              : today
                              ? 'brand.400'
                              : prevMonth || nextMonth
                              ? 'red.600'
                              : 'gray.800'
                          }
                          bgColor={selected ? 'brand.400' : 'white'}
                          cursor={
                            selectable && !selected
                              ? 'pointer'
                              : 'default !important'
                          }
                          _hover={{
                            bgColor: selectable
                              ? selected
                                ? 'brand.400'
                                : 'brand.50'
                              : 'white',
                          }}
                          _active={{
                            bgColor: selected ? 'brand.400' : 'brand.100',
                          }}
                          position="relative"
                        >
                          {date.getDate()}
                        </Button>
                      )
                    })}
                  </HStack>
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Calendar
