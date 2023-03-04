import { ObjectLiteral } from 'typeorm'

export type CategoryData = {
  id?: string | undefined | unknown
  name: string
  createdAt?: string
  updatedAt?: string
}

export type RepositoryResults = {
  success: boolean,
  error?: unknown | null
}

export type CreateResults = RepositoryResults & {
  data: ObjectLiteral[] | null
}

export type GetAllResults = RepositoryResults & {
  data: CategoryData[] | null
}

export interface ICategoriesRepository {
  create: (data: CategoryData) => Promise<CreateResults>
  getAll: () => Promise<GetAllResults>
}

export interface ICategoriesUseCases {
  readonly categoryRepository: ICategoriesRepository
  addCategory: (data: CategoryData) => Promise<CreateResults>
  getAllCategories: () => Promise<GetAllResults>
}