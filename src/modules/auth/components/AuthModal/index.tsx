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

import { FaCheck } from 'react-icons/fa'

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
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} size="4xl">
      <ModalOverlay />

      <ModalContent h="lg" maxH="80vh">
        <ModalCloseButton zIndex="modal" />

        <ModalBody p={0}>
          <Flex h="full">
            <Center h="full" w="50%" bgColor="gray.900" p="8" flexDir="column">
              <Box>
                <Heading size="md" color="whiteAlpha.800" mb="1">
                  {activeView} to
                </Heading>

                <Heading size="lg" color="brand.500">
                  Dev Hype
                </Heading>
              </Box>
            </Center>

            <Center
              h="full"
              p="10"
              w="50%"
              position="relative"
              flexDir="column"
              bgColor="white"
            >
              <Box mb="6">
                <Image
                  src={Logo.src}
                  alt="Dev Hype"
                  width={70}
                  height={70}
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
                        description: 'Login Success',
                        icon: <FaCheck />,
                        colorScheme: 'green',
                      })
                    }}
                  />
                ) : (
                  <SignupForm
                    onSuccess={() => {
                      setActiveView(AuthView.Login)

                      toast({
                        description: 'Signup Success',
                        icon: <FaCheck />,
                        colorScheme: 'green',
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
