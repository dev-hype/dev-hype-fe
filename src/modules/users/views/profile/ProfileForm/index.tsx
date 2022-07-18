import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
import { CreateProfileMutationVariables } from 'src/generated/graphql'
import { useCountriesQuery } from 'src/modules/core/hooks/queries/useCountriesQuery'
import { useTimezonesQuery } from 'src/modules/core/hooks/queries/useTimezonesQuery'

interface IProfileFormProps {
  userId: string
  initialState?: CreateProfileMutationVariables | null
  isSubmitting?: boolean
  isEdit?: boolean
  onSubmit: (profile: CreateProfileMutationVariables) => void
}

const defaultState: CreateProfileMutationVariables = {
  firstName: '',
  lastName: '',
  countryCode: '',
  timezoneName: '',
  avatar: '',
  bio: '',
}

const ProfileForm: React.FC<IProfileFormProps> = (props) => {
  const { userId, initialState, isSubmitting, isEdit, onSubmit } = props

  const { data: countriesData, isLoading: isLoadingCountries } =
    useCountriesQuery()

  const { data: timezonesData, isLoading: isLoadingTimezones } =
    useTimezonesQuery()

  const countriesOptions = useMemo(
    (): SelectOption[] =>
      countriesData?.countries.map((country) => ({
        label: country.name,
        value: country.key,
      })) || [],
    [countriesData],
  )

  const timezonesOptions = useMemo(
    (): SelectOption[] =>
      timezonesData?.timezones?.map((timezone) => ({
        label: timezone.name,
        value: timezone.name,
      })) || [],
    [timezonesData],
  )

  const {
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateProfileMutationVariables>({
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
                  options={countriesOptions}
                  onBlur={onBlur}
                  isLoading={isLoadingCountries}
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

        <Controller
          control={control}
          name="timezoneName"
          render={({ field: { value, onBlur }, fieldState: { error } }) => {
            const selectedOption = [{ label: 'Iran', value: 'ir' }].find(
              (option) => option.value === value,
            )

            return (
              <FormControl mb="4" isInvalid={Boolean(error?.message)}>
                <FormLabel htmlFor="country" mb="1" fontSize="sm">
                  Timezone
                </FormLabel>

                <SelectInput
                  value={selectedOption}
                  options={timezonesOptions}
                  onBlur={onBlur}
                  isLoading={isLoadingTimezones}
                  isDisabled={isSubmitting}
                  onChange={(newValue) => {
                    setValue(
                      'timezoneName',
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
