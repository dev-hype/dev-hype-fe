export interface IUserProfile {
  id: number
  firstName: string
  lastName: string
  bio: string | null
  avatar: string | null
  userId: string
  country: {
    id: number
    name: string
    alpha2: string
    alpha3: string
  }
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
