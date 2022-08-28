import { FaUser } from 'react-icons/fa'
import { Dropdown, DropdownMenu, DropdownMenuItem, DropdownTrigger } from '.'

import Button from '../Button'
import DropdownMenuLabel from './DropdownMenuLabel'

export const Default = () => {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button>Hello</Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownMenuLabel>Section</DropdownMenuLabel>
        <DropdownMenuItem disabled startIcon={<FaUser />}>
          Item 1
        </DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  )
}
