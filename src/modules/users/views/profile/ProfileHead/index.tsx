import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
} from '@chakra-ui/react'

import { MdOutlineLocationOn } from 'react-icons/md'

import Photo from 'src/modules/core/components/Photo'

import { useProfileQuery } from 'src/modules/users/hooks/queries/useProfileQuery'
import { useAuthUserQuery } from 'src/modules/users/hooks/queries/useAuthUserQuery'

import { usersPaths } from 'src/modules/users/constants/paths'

const ProfileHead: React.FC = () => {
  const { query } = useRouter()

  const profileUserId = query.userId as string

  const { data: profileUserData } = useProfileQuery(profileUserId)

  const { data: authUserData } = useAuthUserQuery()

  const profile = profileUserData?.profile

  return (
    <Box bgColor="gray.50">
      <Container maxW="container.lg" p={{ base: '3', sm: '4', md: '6' }}>
        <Box>
          <Box>
            <HStack alignItems="flex-start" justifyContent="space-between">
              <Center
                borderRadius="4px"
                w="24"
                h="24"
                mr="4"
                mb="2"
                overflow="hidden"
                bgColor="white"
              >
                <Photo
                  src={`https://avatars.dicebear.com/api/adventurer/${profileUserData?.profile?.id}.svg`}
                  alt="user"
                  placeholder="blur"
                  width={90}
                  height={90}
                  objectFit="cover"
                  objectPosition="top"
                  borderRadius="4px"
                />
              </Center>

              <HStack justifyContent="flex-end" mb="auto">
                {authUserData?.me.id === profileUserId && (
                  <Link href={usersPaths.edit_profile()} passHref>
                    <Button
                      as="a"
                      size="xs"
                      variant="outline"
                      colorScheme="brand"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                )}
              </HStack>
            </HStack>

            <Box maxW="96" py="2">
              <Heading size="md" mb="3">
                {profile
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Anonymous'}
              </Heading>

              <Text fontSize="sm" color="gray.600" mb="3">
                {profile?.bio}
              </Text>
            </Box>
          </Box>

          <HStack
            justifyContent={{ base: 'flex-start', md: 'space-between' }}
            alignItems={{ base: 'flex-start', md: 'flex-end' }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <HStack spacing="0" mb={{ base: '8', md: 0 }}>
              <Icon color="gray.700" fontSize="xl" mr="0.5">
                <MdOutlineLocationOn size="inherit" />
              </Icon>

              <Text fontSize="sm" color="gray.600">
                {profile?.country.name} - {profile?.timezoneName}
              </Text>
            </HStack>

            <HStack spacing={8}>
              <Stat flexGrow={0}>
                <StatNumber fontSize={{ base: 'lg', md: '2xl' }}>4</StatNumber>
                <StatHelpText whiteSpace="nowrap" m={0}>
                  Goals
                </StatHelpText>
              </Stat>

              <Stat flexGrow={0}>
                <StatNumber fontSize={{ base: 'lg', md: '2xl' }}>
                  60%
                </StatNumber>
                <StatHelpText whiteSpace="nowrap" m={0}>
                  Overall Progress
                </StatHelpText>
              </Stat>

              <Stat flexGrow={0}>
                <StatNumber fontSize={{ base: 'lg', md: '2xl' }}>
                  50%
                </StatNumber>
                <StatHelpText whiteSpace="nowrap" m={0}>
                  Success Rate
                </StatHelpText>
              </Stat>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}

export default ProfileHead
