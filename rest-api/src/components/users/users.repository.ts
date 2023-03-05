import { dataSource } from '../../db';
import { UserData, UserRepositoryResults, IUsersRepository } from './users.types';
import { UserModel } from './users.model';
import { InsertResult } from 'typeorm';

class UsersRepository implements IUsersRepository {
  async create (userData: UserData): Promise<UserRepositoryResults> {
    try {
      const { name, email, phoneNumber } = userData
      const userInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(UserModel)
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

  async findAll (): Promise<UserRepositoryResults> {
    try {
      const usersFound = await dataSource
        .getRepository(UserModel)
        .createQueryBuilder('users')
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

  async findByCategories (categories: string[]): Promise<UserRepositoryResults> {
    try {
      const usersFound = await dataSource
        .getRepository(UserModel)
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