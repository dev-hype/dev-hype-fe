import React from 'react'
import debounce from 'debounce'
import { useCombobox } from 'downshift'

import {
  Box,
  Input,
  InputProps,
  List,
  ListItem,
  usePopper,
} from '@chakra-ui/react'

interface IAutoSuggestInputProps extends Omit<InputProps, 'onChange'> {
  value: string
  items: string[]
  onInputValueChange: (value?: string) => void
}

const AutoSuggestInput: React.FC<IAutoSuggestInputProps> = props => {
  const { value, items, onInputValueChange, ...restProps } = props

  const inputValueChangeHandler = debounce(onInputValueChange, 300)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) => {
      onInputValueChange(inputValue)
    },
    inputValue: value,
    onSelectedItemChange: ({ inputValue }) => {
      inputValueChangeHandler(inputValue)
    },
  })

  const { referenceRef, popperRef } = usePopper({
    matchWidth: true,
  })

  return (
    <Box>
      <Box ref={referenceRef}>
        <Box {...getComboboxProps()}>
          <Input {...restProps} {...getInputProps()} />
        </Box>
      </Box>

      <Box {...getMenuProps()}>
        {isOpen && items.length > 0 && (
          <List
            ref={popperRef}
            bgColor="white"
            shadow="md"
            py="1"
            overflowY="auto"
            border="1px"
            borderColor="gray.200"
            zIndex="popover"
            maxH="36"
          >
            {items.map((item, index) => {
              const isHiglighted = highlightedIndex === index

              return (
                <ListItem
                  key={`${item}${index}`}
                  bgColor={isHiglighted ? 'brand.400' : undefined}
                  color={isHiglighted ? 'white' : undefined}
                  px="4"
                  py="2"
                  {...getItemProps({ item, index })}
                >
                  {item}
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Box>
  )
}

export default AutoSuggestInput
