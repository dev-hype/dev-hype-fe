export interface IUserProfile {
  id: number
  firstName: string
  lastName: string
  bio: string | null
  avatar: string | null
  userId: number
  countryId: number | null
}

export interface IAuthUser {
  id: number
  email: string
  profile?: IUserProfile
}

export interface IUser {
  id: number
  profile?: IUserProfile
}
