import { Router } from 'express'

import CategoriesController from './categories.controller'

const categoriesRouter = Router()
const categoriesController = new CategoriesController()

categoriesRouter.get('/categories', categoriesController.getAll)
categoriesRouter.post('/categories', categoriesController.create)

export default categoriesRouter
