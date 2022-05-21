import React from 'react'
import { useRouter } from 'next/router'

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
  VStack,
} from '@chakra-ui/react'

import { MdOutlineLocationOn } from 'react-icons/md'

import ProfileTabs from '../ProfileTabs'
import Photo from 'src/modules/core/components/Photo'

import { useUserQuery } from 'src/modules/users/hooks/queries/useUserQuery'
import Link from 'next/link'
import { usersPaths } from 'src/modules/users/constants/paths'

const ProfileHead: React.FC = () => {
  const { query } = useRouter()

  const profileUserId = query.userId as string

  const { data: profileUserData } = useUserQuery(profileUserId)

  const profile = profileUserData?.user.profile

  return (
    <Box bgColor="gray.50">
      <Container
        maxW="container.lg"
        p="6"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
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
              src={`https://avatars.dicebear.com/api/adventurer/${profileUserData?.user.id}.svg`}
              alt="user"
              placeholder="blur"
              width={90}
              height={90}
              objectFit="cover"
              objectPosition="top"
              borderRadius="4px"
            />
          </Center>

          <Box w="96" py="2">
            <Heading size="md" mb="2">
              {profile
                ? `${profile.firstName} ${profile.lastName}`
                : 'Anonymous'}
            </Heading>

            <Text fontSize="sm" color="gray.600" mb="8">
              {profile?.bio}
            </Text>

            <HStack spacing="0">
              <Icon color="gray.700" fontSize="xl" mr="0.5">
                <MdOutlineLocationOn size="inherit" />
              </Icon>

              <Text fontSize="sm" color="gray.600">
                {profile?.country.name}
              </Text>
            </HStack>
          </Box>
        </Box>

        <VStack alignItems="flex-end">
          <HStack justifyContent="flex-end" mb="auto">
            <Link href={usersPaths.edit_profile()} passHref>
              <Button as="a" size="sm" variant="outline" colorScheme="brand">
                Update Profile
              </Button>
            </Link>
          </HStack>

          <HStack spacing={8}>
            <Stat flexGrow={0}>
              <StatNumber>4</StatNumber>
              <StatHelpText whiteSpace="nowrap">Goals</StatHelpText>
            </Stat>

            <Stat flexGrow={0}>
              <StatNumber>60%</StatNumber>
              <StatHelpText whiteSpace="nowrap">Overall Progress</StatHelpText>
            </Stat>

            <Stat flexGrow={0}>
              <StatNumber>50%</StatNumber>
              <StatHelpText whiteSpace="nowrap">Success Rate</StatHelpText>
            </Stat>
          </HStack>
        </VStack>
      </Container>

      <Box>
        <ProfileTabs />
      </Box>
    </Box>
  )
}

export default ProfileHead
