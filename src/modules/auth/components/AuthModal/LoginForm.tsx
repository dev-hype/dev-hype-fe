import React, { useCallback } from 'react'
import { object, string } from 'yup'
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

import { useLoginMutation } from '../../hooks/mutations/useLoginMutation'

import { ILoginDto } from '../../types/dto'

const schema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  password: string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must have at least 1 uppercase, 1 lowercase and 1 number',
    }),
})

interface ILoginFormProps {
  onSuccess: () => void
}

const LoginForm: React.FC<ILoginFormProps> = (props) => {
  const { onSuccess } = props

  const { mutate: loginMutation, isLoading } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  const submitHandler = useCallback(
    (formData: ILoginDto) => {
      loginMutation(formData, { onSuccess })
    },
    [onSuccess, loginMutation],
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

        <Button
          type="submit"
          variant="solid"
          colorScheme="brand"
          w="100%"
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
