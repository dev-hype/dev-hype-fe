import React from 'react'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react'

import {
  FaAngleDown,
  FaCog,
  FaRegBell,
  FaRegEnvelope,
  FaSignOutAlt,
} from 'react-icons/fa'

import CountBadge from '../CountBadge'

// import { useAuthUserQuery } from 'src/modules/user/hooks/queries/useAuthUserQuery'

// import { logout_client } from 'src/modules/auth/api/auth'
// import { authPaths } from 'src/modules/auth/constants/paths'

interface IPageHeaderProps {
  title: string
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  const { title } = props

  const { replace } = useRouter()

  // const { data: userData } = useAuthUserQuery()

  return (
    <Box
      h="12"
      position="fixed"
      top="0"
      left="24"
      right="0"
      shadow="sm"
      bgColor="whiteAlpha.900"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="8"
    >
      <Heading as="h1" size="md" fontWeight={600}>
        {title}
      </Heading>

      <Box display="flex" alignItems="center">
        <CountBadge count={50} max={999}>
          <Tooltip label="Notifications" hasArrow={false}>
            <IconButton
              aria-label="notifications"
              icon={<FaRegBell size={18} />}
              variant="ghost"
              size="sm"
              colorScheme="brand"
            />
          </Tooltip>
        </CountBadge>

        <CountBadge count={8} max={99}>
          <Tooltip label="Messages" hasArrow={false}>
            <IconButton
              aria-label="messages"
              icon={<FaRegEnvelope size={18} />}
              variant="ghost"
              size="sm"
              colorScheme="brand"
              ml="2"
            />
          </Tooltip>
        </CountBadge>

        {/* {userData ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaAngleDown />}
              variant="ghost"
              size="xs"
              ml="4"
            >
              <Text fontSize="sm" textTransform="capitalize">
                {userData.profile
                  ? `${userData.profile.firstName} ${userData.profile.lastName}`
                  : userData.email}
              </Text>
            </MenuButton>

            <MenuList>
              <MenuGroup title="Account">
                <MenuItem icon={<FaCog size={14} />} fontSize="sm">
                  Settings
                </MenuItem>

                <MenuItem
                  icon={<FaSignOutAlt size={14} />}
                  fontSize="sm"
                  onClick={() => {
                    logout_client()
                    replace(authPaths.login())
                  }}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : null} */}
      </Box>
    </Box>
  )
}

export default PageHeader
