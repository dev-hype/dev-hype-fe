import { useForm } from 'react-hook-form'
import { object, string, number, boolean, array } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ICreateMilestoneDto } from 'src/modules/goals/types/dto'

const validationSchema = object().shape({
  name: string().required('Name is required'),
  startDate: string().required('Start Date is required'),
  estimatedEndDate: string().required('Estimated end date is required'),
  resource: object()
    .shape({
      name: string().required('Name is required'),
      url: string().url('Invalid URL').required('URL is required'),
      isFree: boolean(),
      typeId: number().required('Select resource type to proceed'),
    })
    .required('Resource is required'),
  schedules: array()
    .of(
      object().shape({
        durationInHours: number().required('Duration is required'),
        weekDay: string().required('Select a weekday'),
      }),
    )
    .min(1, 'Add at least 1 weekly schedule'),
})

export const useMilestoneForm = () => {
  const formMethods = useForm<ICreateMilestoneDto>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

  return formMethods
}
