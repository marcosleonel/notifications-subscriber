import type { Request, Response } from 'express'

import logger from '../../logger'

import { ICategoriesController, CategoryData } from './categories.types'
import CategoriesUseCases from './categories.useCases'
import CategoriesRepository from './categories.repository'

const categoriesUseCases = new CategoriesUseCases(new CategoriesRepository())

class CategoriesController implements ICategoriesController {
  async create (req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'body is required' })
    }

    if (!req.body.name) {
      return res.status(400).json({ message: 'name is required' })
    }

    try {
      const result = await categoriesUseCases.addCategory(req.body as CategoryData)

      if (result.error) throw new Error(`${result.error}`)

      return res.status(201).json({ success: true, message: 'Category created'})
    } catch (error: unknown) {
      logger.error(`[CategoriesController.create] error: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }

  async getAll (_, res: Response): Promise<Response> {
    try {
      const result = await categoriesUseCases.getAllCategories()

      if (result.error) throw new Error(`${result.error}`)

      return res.status(200).json(result)
    } catch (error: unknown) {
      logger.error(`[CategoriesController.getAll]: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }
}

export default CategoriesController