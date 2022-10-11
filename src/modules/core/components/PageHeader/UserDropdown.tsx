import React from 'react'
import { TbChevronDown, TbLogout, TbSettings } from 'react-icons/tb'
import Avatar from '../Avatar'

import Button from '../Button'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownTrigger,
} from '../Dropdown'

// interface IUserDropdownProps {}

const UserDropdown: React.FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          color="gray"
          size="large"
          variant="ghost"
          className="!px-3 !rounded-full"
          endIcon={<TbChevronDown size={15} />}
          startIcon={
            <Avatar
              size="small"
              src="https://avatars.dicebear.com/api/adventurer/a8s7.svg"
              name="John Doe"
            />
          }
        >
          John Doe
        </Button>
      </DropdownTrigger>

      <DropdownMenu className="w-52">
        <DropdownMenuLabel>Account</DropdownMenuLabel>

        <DropdownMenuItem startIcon={<TbSettings />}>Settings</DropdownMenuItem>

        <DropdownMenuItem startIcon={<TbLogout />}>Logout</DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserDropdown
