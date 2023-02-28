import { dataSource } from '../../db';
import { UserData, UserRepositoryResults, IUsersRepository } from './users.types';
import { userSchema } from './users.schema';
import { InsertResult } from 'typeorm';

class UsersRepository implements IUsersRepository {
  async create (userData: UserData): Promise<UserRepositoryResults> {
    try {
      const { name, email, phoneNumber } = userData
      const userInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(userSchema)
        .values([{
          name: name as string,
          email: email as string,
          phoneNumber: phoneNumber as string,
        }])
        .execute()
      const success: boolean = !!userInserted.identifiers

      if (!success) throw new Error('[UsersRepository.create] Unable to create user')

      return {
        success,
        data: userInserted.identifiers
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async findByCategories (categories: string[]): Promise<UserRepositoryResults> {
    try {
      const usersFound = await dataSource
        .getRepository(userSchema)
        .createQueryBuilder('users')
        .distinct(true)
        .innerJoinAndSelect(
          'users.categories',
          'categories',
          'categories.id IN (:...categories)',
          { categories },
        )
        .getMany()

      return {
        success: usersFound && !!usersFound.length,
        data: usersFound,
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }
}

export default UsersRepository