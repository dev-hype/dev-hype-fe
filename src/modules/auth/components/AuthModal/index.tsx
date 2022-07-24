import React, { useState } from 'react'
import Image from 'next/image'

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  Flex,
  Center,
  useToast,
  Text,
  Button,
} from '@chakra-ui/react'

import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

import { useAuthModal } from '../../hooks/useAuthModal'

import Logo from 'public/images/logo.png'

export enum AuthView {
  Login = 'Login',
  Signup = 'Signup',
}

const AuthModal: React.FC = () => {
  const [activeView, setActiveView] = useState(AuthView.Login)

  const toast = useToast()

  const { isAuthModalOpen, closeAuthModal } = useAuthModal()

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      size={['sm', 'md', '3xl', '4xl']}
    >
      <ModalOverlay />

      <ModalContent h="lg" maxH="80vh" overflow="hidden">
        <ModalBody p={0}>
          <Flex h="full" flexDir={{ base: 'column', md: 'row' }}>
            <Center
              h={{ md: 'full' }}
              w={{ md: '50%' }}
              bgColor="gray.900"
              p={{ base: '1', md: '8' }}
              flexDir="column"
            >
              <Flex flexDir={{ md: 'column' }} alignItems="baseline">
                <Heading
                  size="md"
                  color="whiteAlpha.800"
                  mb={{ md: '1' }}
                  mr={{ base: '2', md: 0 }}
                >
                  {activeView} to
                </Heading>

                <Heading size="lg" color="brand.500">
                  Dev Hype
                </Heading>
              </Flex>
            </Center>

            <Center
              h={{ md: 'full' }}
              p="10"
              w={{ md: '50%' }}
              position="relative"
              flexDir="column"
              bgColor="white"
            >
              <ModalCloseButton zIndex="modal" />

              <Box mb="6">
                <Image
                  src={Logo.src}
                  alt="Dev Hype"
                  width={75}
                  height={75}
                  objectFit="contain"
                  objectPosition="center"
                />
              </Box>

              <Box mb="8" w="75%">
                {activeView === AuthView.Login ? (
                  <LoginForm
                    onSuccess={() => {
                      closeAuthModal()

                      toast({
                        title: 'Login Success',
                        description: "You're now logged in",
                        status: 'success',
                      })
                    }}
                  />
                ) : (
                  <SignupForm
                    onSuccess={() => {
                      setActiveView(AuthView.Login)

                      toast({
                        title: 'Signup Success',
                        description: "You're now registered",
                        status: 'success',
                      })
                    }}
                  />
                )}
              </Box>

              {activeView === AuthView.Login && (
                <>
                  <Text fontSize="sm">Don&apos;t have an account?</Text>

                  <Button
                    variant="link"
                    color="InfoText"
                    size="sm"
                    onClick={() => {
                      setActiveView(AuthView.Signup)
                    }}
                  >
                    Signup
                  </Button>
                </>
              )}

              {activeView === AuthView.Signup && (
                <>
                  <Text fontSize="sm">Already have an account?</Text>

                  <Button
                    variant="link"
                    color="InfoText"
                    size="sm"
                    onClick={() => {
                      setActiveView(AuthView.Login)
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal
