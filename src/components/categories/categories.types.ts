export type CategoryData = {
  id?: string | undefined | unknown
  name: string
  createdAt?: string
  updatedAt?: string
}

export type CategoriesRepositoryResults = {
  success: boolean,
  data: Object | Object[] | CategoryData | null
  error?: unknown | null 
}

export interface ICategoriesRepository {
  create: (data: CategoryData) => Promise<CategoriesRepositoryResults>
  getAll: () => Promise<CategoriesRepositoryResults>
}

export interface ICategoriesUseCases {
  readonly categoryRepository: ICategoriesRepository
  addCategory: (data: CategoryData) => Promise<CategoriesRepositoryResults>
  getAllCategories: () => Promise<CategoriesRepositoryResults>
}