export interface IUserProfile {
  id: number
  firstName: string
  lastName: string
  bio: string | null
  avatar: string | null
  userId: string
  countryId: number | null
}

export interface IAuthUser {
  id: string
  email: string
  profile: IUserProfile | null
}

export interface IUser {
  id: string
  profile: IUserProfile | null
}
