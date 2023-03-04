import {
  ICategoriesRepository,
  ICategoriesUseCases,
  CategoryData,
} from './categories.types'
import Users from './categories.entity'
import { CreateResults, GetAllResults } from './categories.types';

class CategoriesUseCases implements ICategoriesUseCases {
  readonly categoryRepository: ICategoriesRepository

  constructor(repository: ICategoriesRepository) {
    this.categoryRepository = repository
  }

  async addCategory (categoryData: CategoryData): Promise<CreateResults> {
    const newUser = new Users(categoryData)
    const validation = newUser.validate()

    if (validation.errors && validation.errors.length) {
      throw new Error(`Validation Error: ${validation}`)
    }

    try {
      const { data, error, success } = await this.categoryRepository.create(categoryData)

      if (!success) throw new Error(`[CategoriesUseCases.addCategory] Unable to add category: ${error}`)

      return { success, data }
    } catch (error: unknown) {
      return {
        success: false,
        error,
        data: null
      }
    }
  }

  async getAllCategories (): Promise<GetAllResults> {
    try {
      const { data, error, success } = await this.categoryRepository.getAll()

      if (!success) throw new Error(` [CategoriesUseCases.getAllCategories] Unable to get categories: ${error}`)

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

export default CategoriesUseCases
