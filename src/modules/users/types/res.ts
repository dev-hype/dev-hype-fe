import { IAuthUser, IUser } from './entities'

export interface IAuthUserResponse {
  user: IAuthUser | null
}

export interface IUserResponse {
  user: IUser
}
