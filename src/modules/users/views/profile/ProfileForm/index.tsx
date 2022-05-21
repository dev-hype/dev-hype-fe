import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { IProfileFormDto } from 'src/modules/users/types/dto'
import { profileFormSchema } from './schema'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react'

import { FaExclamationCircle } from 'react-icons/fa'

import SelectInput from 'src/modules/core/components/SelectInput'

import { SelectOption } from 'src/modules/core/types/entities'
import Link from 'next/link'
import { usersPaths } from 'src/modules/users/constants/paths'

interface IProfileFormProps {
  userId: string
  initialState?: IProfileFormDto | null
  isSubmitting?: boolean
  isEdit?: boolean
  onSubmit: (profile: IProfileFormDto) => void
}

const defaultState: IProfileFormDto = {
  firstName: '',
  lastName: '',
  countryCode: '',
}

const ProfileForm: React.FC<IProfileFormProps> = (props) => {
  const { userId, initialState, isSubmitting, isEdit, onSubmit } = props

  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfileFormDto>({
    defaultValues: initialState || defaultState,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(profileFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormControl mb="4" isInvalid={Boolean(errors.firstName)}>
          <FormLabel htmlFor="firstName" mb="1" fontSize="sm">
            First Name
          </FormLabel>

          <InputGroup>
            <Input
              id="firstName"
              disabled={isSubmitting}
              placeholder="First name..."
              fontSize="sm"
              isInvalid={false}
              // disabled={isLoading}
              {...register('firstName')}
            />

            {Boolean(errors.firstName) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.firstName?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={Boolean(errors.lastName)}>
          <FormLabel htmlFor="lastName" mb="1" fontSize="sm">
            Last Name
          </FormLabel>

          <InputGroup>
            <Input
              id="lastName"
              disabled={isSubmitting}
              placeholder="Last name..."
              fontSize="sm"
              isInvalid={false}
              // disabled={isLoading}
              {...register('lastName')}
            />

            {Boolean(errors.lastName) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.lastName?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={Boolean(errors.bio)}>
          <FormLabel htmlFor="lastName" mb="1" fontSize="sm">
            Bio
          </FormLabel>

          <InputGroup>
            <Textarea
              id="bio"
              disabled={isSubmitting}
              placeholder="Bio..."
              fontSize="sm"
              isInvalid={false}
              // disabled={isLoading}
              {...register('bio')}
            />

            {Boolean(errors.bio) && (
              <InputRightElement color="red.500">
                <FaExclamationCircle />
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage fontSize="xs">
            {errors.bio?.message}
          </FormErrorMessage>
        </FormControl>

        <Controller
          control={control}
          name="countryCode"
          render={({ field: { value, onBlur }, fieldState: { error } }) => {
            const selectedOption = [{ label: 'Iran', value: 'ir' }].find(
              (option) => option.value === value,
            )

            return (
              <FormControl mb="4" isInvalid={Boolean(error?.message)}>
                <FormLabel htmlFor="country" mb="1" fontSize="sm">
                  Country
                </FormLabel>

                <SelectInput
                  value={selectedOption}
                  options={[{ label: 'Iran', value: 'ir' }]}
                  onBlur={onBlur}
                  isDisabled={isSubmitting}
                  onChange={(newValue) => {
                    setValue(
                      'countryCode',
                      (newValue as SelectOption).value as string,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      },
                    )
                  }}
                />

                <FormErrorMessage fontSize="xs">
                  {error?.message}
                </FormErrorMessage>
              </FormControl>
            )
          }}
        />

        <HStack mt="12" spacing="4">
          <Button type="submit" disabled={isSubmitting}>
            {isEdit ? 'Update' : 'Setup'} Profile
          </Button>

          {isEdit && (
            <Link href={usersPaths.profile(userId)} passHref>
              <Button as="a" variant="ghost" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
          )}
        </HStack>
      </Box>
    </form>
  )
}

export default ProfileForm
