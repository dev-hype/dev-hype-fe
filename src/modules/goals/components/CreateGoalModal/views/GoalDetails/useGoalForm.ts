import { useForm } from 'react-hook-form'
import { object, string, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { CreateGoalMutationVariables } from 'src/generated/graphql'

export type GoalFormState = CreateGoalMutationVariables & {
  fieldId: number
}

const validationSchema = object().shape({
  name: string()
    .min(6, 'Name should have at least 6 characters')
    .max(64, 'Name should have at most 64 characters')
    .required('Name is required'),
  fieldId: number().required('Select field to proceed'),
  specializationId: number().required('Select specialization to proceed'),
  topicName: string().required('Add topic to proceed'),
})

export const useGoalForm = () => {
  const formMethods = useForm<GoalFormState>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  return formMethods
}
