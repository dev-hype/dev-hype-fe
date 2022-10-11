import React from 'react'

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { FaEdit, FaEllipsisV, FaTrashAlt } from 'react-icons/fa'

interface IGoalDropdownProps {
  onEditClick: () => void
  onDeleteClick: () => void
}

const GoalDropdown: React.FC<IGoalDropdownProps> = props => {
  const { onEditClick, onDeleteClick } = props

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaEllipsisV size={16} />}
        colorScheme="black"
        color="gray.500"
        aria-label="options"
        variant="ghost"
        size="sm"
        _hover={{
          bgColor: 'blackAlpha.100',
        }}
      />

      <MenuList>
        <MenuItem
          icon={<FaEdit size={14} />}
          fontSize="sm"
          onClick={onEditClick}
        >
          Edit
        </MenuItem>

        <MenuItem
          icon={<FaTrashAlt size={14} />}
          fontSize="sm"
          color="red.500"
          onClick={onDeleteClick}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default GoalDropdown
