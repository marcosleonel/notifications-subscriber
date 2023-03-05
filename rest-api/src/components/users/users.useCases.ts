import {
  IUsersRepository,
  IUserUseCases,
  UserData,
  UserRepositoryResults
} from './users.types'
import Users from './users.entity'

class UsersUseCases implements IUserUseCases {
  readonly userRepository: IUsersRepository

  constructor(repository: IUsersRepository) {
    this.userRepository = repository
  }

  async addUser (userData: UserData): Promise<UserRepositoryResults> {
    const newUser = new Users(userData)
    const validation = newUser.validate()

    if (validation.errors.length) return validation

    try {
      const { data, error, success } = await this.userRepository.create(userData)

      if (!success) throw new Error(`[UsersUseCases.addUser] Unable to add user: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        error,
        data: null
      }
    }
  }

  async getAllUsers (): Promise<UserRepositoryResults> {
    try {
      const { data, error, success } = await this.userRepository.findAll()

      if (!success) throw new Error(`[UsersUseCases.getAllUsers] Unable to get users: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async getUsersByCategory (category: string): Promise<UserRepositoryResults> {
    try {
      const { data, error, success } = await this.userRepository.findByCategories([category])

      if (!success) throw new Error(`[UsersUseCases.getUsersByCategory] Unable to get user: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }
}

export default UsersUseCases
