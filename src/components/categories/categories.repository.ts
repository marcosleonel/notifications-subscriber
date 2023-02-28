import { InsertResult } from 'typeorm';

import { dataSource } from '../../db';
import { categorySchema } from './categories.schema';
import {
  CategoryData,
  CategoriesRepositoryResults,
  ICategoriesRepository,
} from './categories.types';

class CategoriesRepository implements ICategoriesRepository {
  async create (categoryData: CategoryData): Promise<CategoriesRepositoryResults> {
    try {
      const categoryInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(categorySchema)
        .values([{ name: categoryData.name as string }])
        .execute()
      const success: boolean = !!categoryInserted.identifiers

      if (!success) throw new Error('[CategoriesRepository.create] Unable to create category')

      return {
        success,
        data: categoryInserted.identifiers
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async getAll (): Promise<CategoriesRepositoryResults> {
    try {
      const categoriesFound = await dataSource
        .getRepository(categorySchema)
        .createQueryBuilder('categories')
        .getMany()
      const success: boolean = !!categoriesFound

      if (!success) throw new Error('[CategoriesRepository.findAll] Unable to get the list of categories')
      
      return {
        success,
        data: categoriesFound
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

export default CategoriesRepository