import React, { useCallback, useMemo } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { startOfToday } from 'date-fns'

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import DatePicker from 'src/modules/core/components/DatePicker'
import SelectInput from 'src/modules/core/components/SelectInput'
import MileStoneScheduleInput from './MileStoneScheduleInput'

import { MilestoneFormState, useMilestoneForm } from './useMilestoneForm'
import { useResourceTypesQuery } from 'src/modules/paths/hooks/queries/useResourceTypesQuery'
import { useCreateMilestoneMutation } from 'src/modules/goals/hooks/mutations/useCreateMilestoneMutation'

import { SelectOption } from 'src/modules/core/types/entities'

interface IAddMilestoneModalProps {
  goalId: number
  isOpen: boolean
  onClose: () => void
}

const AddMilestoneModal: React.FC<IAddMilestoneModalProps> = (props) => {
  const { goalId, isOpen, onClose } = props

  const { data: resourceTypesData, isLoading: isLoadingResourceTypes } =
    useResourceTypesQuery()

  const { mutate: createMilestone } = useCreateMilestoneMutation()

  const formMethods = useMilestoneForm()

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = formMethods
  console.log(watch())

  const startDate = watch('startDate')
  const estimatedEndDate = watch('estimatedEndDate')

  const resourceTypesOptions = useMemo(() => {
    if (resourceTypesData) {
      return resourceTypesData.resourceTypes.map((type) => ({
        label: type.name,
        value: type.id,
      }))
    }

    return []
  }, [resourceTypesData])

  const closeHandler = useCallback(() => {
    onClose()
    reset()
  }, [onClose, reset])

  const submitHandler = useCallback(
    async (formData: MilestoneFormState) => {
      createMilestone(
        {
          goalId,
          ...formData,
        },
        {
          onSuccess: () => {
            closeHandler()
          },
        },
      )
    },
    [createMilestone, goalId, closeHandler],
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeHandler}
      size="xl"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Add Milestone</ModalHeader>

        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <ModalBody>
              <Box>
                <Box w="full" mb="6">
                  <Flex w="full" justifyContent="space-between" mb="1">
                    <Heading size="xs">Name:</Heading>

                    <Text fontSize="sm" color="red.500" h="4">
                      {errors.name?.message}
                    </Text>
                  </Flex>

                  <Input
                    {...register('name')}
                    w="full"
                    placeholder="Milestone name..."
                  />
                </Box>

                <Controller
                  control={control}
                  name="startDate"
                  render={({ field, fieldState }) => {
                    return (
                      <Box w="full" mb="6">
                        <Flex w="full" justifyContent="space-between" mb="1">
                          <Heading size="xs">Start Date:</Heading>

                          <Text fontSize="sm" color="red.500" h="4">
                            {fieldState.error?.message}
                          </Text>
                        </Flex>

                        <DatePicker
                          value={field.value}
                          placeholder="Milestone Start Date..."
                          maxDate={
                            estimatedEndDate
                              ? new Date(estimatedEndDate)
                              : undefined
                          }
                          onChange={(date) => {
                            setValue('startDate', date, {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            })
                          }}
                        />
                      </Box>
                    )
                  }}
                />

                <Controller
                  control={control}
                  name="estimatedEndDate"
                  render={({ field, fieldState }) => {
                    return (
                      <Box w="full" mb="6">
                        <Flex w="full" justifyContent="space-between" mb="1">
                          <Heading size="xs">Estimated End Date:</Heading>

                          <Text fontSize="sm" color="red.500" h="4">
                            {fieldState.error?.message}
                          </Text>
                        </Flex>

                        <DatePicker
                          value={field.value}
                          placeholder="Milestone End Date..."
                          minDate={
                            startDate ? new Date(startDate) : startOfToday()
                          }
                          onChange={(date) => {
                            setValue('estimatedEndDate', date, {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            })
                          }}
                        />
                      </Box>
                    )
                  }}
                />

                <HStack spacing="1" my="6">
                  <Heading size="sm" mr="2" lineHeight={1}>
                    Resource
                  </Heading>

                  <Divider mt="8" mb="1" />
                </HStack>

                <Controller
                  control={control}
                  name="resource.typeId"
                  render={({ field, fieldState }) => {
                    const selectedOption = resourceTypesOptions.find(
                      (opt) => opt.value === field.value,
                    )

                    return (
                      <Box w="full" mb="6">
                        <Flex w="full" justifyContent="space-between" mb="1">
                          <Heading size="xs">Resource Type:</Heading>

                          <Text fontSize="sm" color="red.500" h="4">
                            {fieldState.error?.message}
                          </Text>
                        </Flex>

                        <SelectInput
                          value={selectedOption}
                          isLoading={isLoadingResourceTypes}
                          isMulti={false}
                          options={resourceTypesOptions}
                          placeholder="Select source type..."
                          onBlur={field.onBlur}
                          onChange={(selection) => {
                            setValue(
                              'resource.typeId',
                              (selection as SelectOption)?.value as number,
                              {
                                shouldTouch: true,
                                shouldValidate: true,
                              },
                            )
                          }}
                        />
                      </Box>
                    )
                  }}
                />

                <Box w="full" mb="6">
                  <Flex w="full" justifyContent="space-between" mb="1">
                    <Heading size="xs">Resource Name:</Heading>

                    <Text fontSize="sm" color="red.500" h="4">
                      {errors.resource?.name?.message}
                    </Text>
                  </Flex>

                  <Input
                    {...register('resource.name')}
                    w="full"
                    placeholder="Resource name..."
                  />
                </Box>

                <Box w="full" mb="6">
                  <Flex w="full" justifyContent="space-between" mb="1">
                    <Heading size="xs">Resource URL:</Heading>

                    <Text fontSize="sm" color="red.500" h="4">
                      {errors.resource?.url?.message}
                    </Text>
                  </Flex>

                  <Input
                    {...register('resource.url')}
                    w="full"
                    placeholder="Resource URL..."
                  />
                </Box>

                <Box>
                  <Checkbox {...register('resource.isFree')}>
                    This resource is free
                  </Checkbox>
                </Box>

                <HStack spacing="1" my="6">
                  <Heading size="sm" mr="2" lineHeight={1}>
                    Schedule
                  </Heading>

                  <Divider mt="8" mb="1" />
                </HStack>

                <MileStoneScheduleInput />
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                colorScheme="gray"
                mr="4"
                size="md"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button variant="solid" size="md" type="submit">
                Add Milestone
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}

export default AddMilestoneModal
