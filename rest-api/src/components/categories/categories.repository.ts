import { dataSource } from '../../db'
import { Category } from './categories.model'
import { GetAllResults } from './categories.types'
import {
  CategoryData,
  CreateResults,
  ICategoriesRepository,
} from './categories.types'

class CategoriesRepository implements ICategoriesRepository {
  async create (categoryData: CategoryData): Promise<CreateResults> {
    try {
      const category = new Category()
      category.name = categoryData.name as string
      const categoryCreated = await dataSource.manager.save(category)
/*       const categoryInserted: InsertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([{ name: categoryData.name as string }])
        .execute() */
      const success: boolean = !!categoryCreated.id

      if (!success) throw new Error('[CategoriesRepository.create] Unable to create category')

      return {
        success,
        data: categoryCreated.id
      }
    } catch (error: unknown) {
      return {
        success: false,
        data: null,
        error
      }
    }
  }

  async getAll (): Promise<GetAllResults> {
    try {
      const categoriesFound = await dataSource
        .getRepository(Category)
        .createQueryBuilder('categories')
        .getMany()
      const success: boolean = !!categoriesFound

      if (!success) throw new Error('[CategoriesRepository.getAll] Unable to get the list of categories')
      
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
