import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Box, Button, Link as ChakraLink, Show, Text } from '@chakra-ui/react'

import { FaChartPie, FaHome, FaUserGraduate } from 'react-icons/fa'

import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { corePaths } from 'src/modules/core/constants/paths'
import { usersPaths } from 'src/modules/users/constants/paths'

import Logo from 'public/images/logo.png'

const AppNav: React.FC = () => {
  const { asPath } = useRouter()

  const { data: userData } = useAuthUserQuery()

  const navItems = useMemo(
    () => [
      {
        icon: <FaHome size={26} />,
        title: 'Home',
        href: corePaths.home(),
      },
      ...(userData?.me
        ? [
            {
              icon: <FaUserGraduate size={24} />,
              title: 'Profile',
              href: userData.me.profile
                ? usersPaths.profile(userData.me.id)
                : usersPaths.create_profile(),
            },
          ]
        : []),
      {
        icon: <FaChartPie size={24} />,
        title: 'Insights',
        href: '/insights',
      },
    ],
    [userData],
  )

  return (
    <Box
      bgColor="black"
      h={{ base: '16', md: '100vh' }}
      w={{ base: '100vw', md: '24' }}
      position="fixed"
      top={{ md: 0 }}
      left={0}
      right={{ base: 0, md: 'auto' }}
      bottom={0}
      zIndex="docked"
      shadow="lg"
      flexWrap="nowrap"
      as="nav"
    >
      <Show above="md">
        <Link href="/" passHref>
          <ChakraLink
            w="12"
            h="12"
            mx={{ md: 'auto' }}
            mt={{ md: '4' }}
            borderRadius="4px"
            bgColor="brand.50"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={Logo}
              alt="Dev Hype"
              width={40}
              height={40}
              placeholder="blur"
            />
          </ChakraLink>
        </Link>
      </Show>

      <Box
        h={{ base: 'full', md: 'calc(100vh - 74px)' }}
        display="flex"
        flexDir={{ md: 'column' }}
        alignItems="center"
        justifyContent={{ base: 'space-evenly', md: 'center' }}
      >
        {navItems.map((item) => {
          const isActive = asPath === item.href

          return (
            <Link key={item.title} href={item.href} passHref>
              <Button
                as="a"
                variant="ghost"
                color="gray.500"
                _active={{
                  color: 'brand.500',
                }}
                _hover={{
                  bgColor: 'gray.900',
                }}
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                mb={{ md: '8' }}
                w="16"
                h="14"
                isActive={isActive}
              >
                <Box as="span" display="block" mb="1">
                  {item.icon}
                </Box>

                <Text as="span" fontSize="xs" fontWeight={isActive ? 900 : 400}>
                  {item.title}
                </Text>
              </Button>
            </Link>
          )
        })}
      </Box>
    </Box>
  )
}

export default AppNav
