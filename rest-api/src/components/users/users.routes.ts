import { Router } from 'express'

import UsersController from './users.controller'
import logger from '../../logger/index';

const usersRouter = Router()
const usersController = new UsersController(logger)

usersRouter.get('/users/:category', usersController.getByCategory)
usersRouter.post('/users', usersController.create)

export default usersRouter
