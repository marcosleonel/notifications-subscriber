export type UserData = {
  id?: string | undefined | unknown
  name: string
  email: string
  phoneNumber: string
  subscribed?: boolean
  channels?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface IUserUseCases {
  readonly userRepository: IUsersRepository
  addUser: (data: UserData) => Promise<UserRepositoryResults>
  getUsersByCategory: (category: string) => Promise<UserRepositoryResults>
}

export type UserRepositoryResults = {
  success: boolean,
  data: Object | Object[] | UserData | null
  error?: unknown | null 
}

export interface IUsersRepository {
  create: (data: UserData) => Promise<UserRepositoryResults>
  findByCategories: (categories: string[]) => Promise<UserRepositoryResults>
}

export interface IUserController {
  getByCategory: Function
  add: Function
}
