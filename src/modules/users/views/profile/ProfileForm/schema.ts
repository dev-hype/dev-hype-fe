import { object, string } from 'yup'

export const profileFormSchema = object().shape({
  firstName: string()
    .min(3, 'First name should have at least 3 characters')
    .max(20, 'First name should have maximum 20 characters')
    .required('First name is required'),

  lastName: string()
    .min(3, 'Last name should have at least 3 characters')
    .max(20, 'Last name should have maximum 20 characters')
    .required('Last name is required'),

  bio: string()
    .min(3, 'Bio should have at least 3 characters')
    .max(100, 'Bio should have maximum 100 characters'),

  avatar: string().url('Invalid avatar URL'),

  countryCode: string().required('Country is required'),
  timezoneName: string().required('Timezone is required'),
})
