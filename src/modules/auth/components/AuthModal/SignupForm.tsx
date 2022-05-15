import React, { useCallback } from 'react'
import { object, string, ref } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'

import { FaExclamationCircle } from 'react-icons/fa'

import { useSignupMutation } from '../../hooks/mutations/useSignupMutation'

import { ISignupDto } from '../../types/dto'

const schema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must have at least 1 uppercase, 1 lowercase and 1 number',
    }),

  password_confirm: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
})

interface ISignupFormProps {
  onSuccess: () => void
}

const SignupForm: React.FC<ISignupFormProps> = (props) => {
  const { onSuccess } = props

  const { mutate: signupMutation, isLoading } = useSignupMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupDto>({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const submitHandler = useCallback(
    (formData: ISignupDto) => {
      signupMutation(formData, { onSuccess })
    },
    [onSuccess, signupMutation],
  )

  return (
    <Box>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormControl mb="4" isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email" mb="1" fontSize="sm">
            Email
          </FormLabel>

          <InputGroup>
            <Input
              id="email"
              type="email"
              placeholder="Type email here..."
              fontSize="sm"
              isInvalid={false}
              disabled={isLoading}
              {...register('email')}
            />

            {Boolean(errors.email) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password" mb="1" fontSize="sm">
            Password
          </FormLabel>

          <InputGroup>
            <Input
              id="password"
              type="password"
              placeholder="Type password here..."
              fontSize="sm"
              isInvalid={false}
              disabled={isLoading}
              {...register('password')}
            />

            {Boolean(errors.password) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={Boolean(errors.password_confirm)}>
          <FormLabel htmlFor="password" mb="1" fontSize="sm">
            Confirm Password
          </FormLabel>

          <InputGroup>
            <Input
              id="password-confirm"
              type="password"
              placeholder="Type password here..."
              fontSize="sm"
              isInvalid={false}
              disabled={isLoading}
              {...register('password_confirm')}
            />

            {Boolean(errors.password_confirm) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.password_confirm?.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant="solid"
          colorScheme="brand"
          w="100%"
          disabled={isLoading}
        >
          Signup
        </Button>
      </form>
    </Box>
  )
}

export default SignupForm
