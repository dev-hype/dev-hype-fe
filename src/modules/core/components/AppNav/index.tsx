import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Box, Button, Link as ChakraLink, Text } from '@chakra-ui/react'

import { FaChartPie, FaHome, FaUserGraduate } from 'react-icons/fa'

// import { corePaths } from '../../constants/paths'
// import { userPaths } from 'src/modules/user/constants/paths'
// import { insightsPaths } from 'src/modules/insights/constants/paths'

import Logo from 'public/images/logo.png'

const navItems = [
  {
    icon: <FaHome size={26} />,
    title: 'Home',
    href: '/',
  },
  {
    icon: <FaUserGraduate size={24} />,
    title: 'Profile',
    href: '',
  },
  {
    icon: <FaChartPie size={24} />,
    title: 'Insights',
    href: '',
  },
]

const AppNav: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <Box
      bgColor="black"
      h="100vh"
      w="24"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      zIndex="docked"
      shadow="lg"
    >
      <Link href="/" passHref>
        <ChakraLink
          w="12"
          h="12"
          mx="auto"
          mt="4"
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

      <Box
        h="calc(100vh - 74px)"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href

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
                mb="8"
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
