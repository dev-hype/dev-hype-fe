import { useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { isAfter, isEqual, isValid, startOfToday } from 'date-fns'

import { ICreateGoalDto } from 'src/modules/goals/types/dto'

const validationSchema = object().shape({
  name: string()
    .min(6, 'Name should have at least 6 characters')
    .max(64, 'Name should have at most 64 characters')
    .required('Name is required'),
  startDate: string()
    .test({
      test: (value) => {
        return value
          ? isValid(new Date(value)) &&
              (isAfter(new Date(value), startOfToday()) ||
                isEqual(new Date(value), startOfToday()))
          : true
      },
      message: 'Start date should be in the future',
    })
    .required('Start Date is required'),
  specializationId: number().required('Select specialization to proceed'),
  topicName: string().required('Add topic to proceed'),
})

export const useGoalForm = () => {
  const formMethods = useForm<ICreateGoalDto>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  return formMethods
}
