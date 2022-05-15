import React from 'react'

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
import AuthModal from 'src/modules/auth/components/AuthModal'

import { useAuthModal } from 'src/modules/auth/hooks/useAuthModal'
import { useAuthContext } from 'src/modules/auth/providers/AuthProvider'
import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { logout } from 'src/modules/auth/api/auth'

interface IPageHeaderProps {
  title: string
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  const { title } = props

  const { openAuthModal } = useAuthModal()

  const { setLoggedInFlagOff } = useAuthContext()

  const { data: userData } = useAuthUserQuery()

  return (
    <>
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
          {userData?.user ? (
            <>
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

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FaAngleDown />}
                  variant="ghost"
                  size="xs"
                  ml="4"
                >
                  <Text fontSize="sm" textTransform="capitalize">
                    {userData.user.profile
                      ? `${userData.user.profile.firstName} ${userData.user.profile.lastName}`
                      : userData.user.email}
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
                        logout()
                        setLoggedInFlagOff()
                        window.location.reload()
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button
              size="xs"
              colorScheme="brand"
              variant="ghost"
              onClick={openAuthModal}
            >
              Login / Signup
            </Button>
          )}
        </Box>
      </Box>

      <AuthModal />
    </>
  )
}

export default PageHeader
