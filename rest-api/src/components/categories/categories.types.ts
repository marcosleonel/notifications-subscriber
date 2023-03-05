import { ObjectLiteral } from 'typeorm'
import type { Response, Request } from 'express'

import { Category } from './categories.model'

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
  data: string | null
}

export type GetAllResults = RepositoryResults & {
  data: Category[] | null
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

export interface ICategoriesController {
  create: (req: Request, res: Response) => Promise<Response>
  getAll: (_, res: Response) => Promise<Response>
}