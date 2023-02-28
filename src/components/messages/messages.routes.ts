import { Router } from 'express'

import MessagesController from './messages.controller'
import logger from '../../logger'

const messagesRouter = Router()
const messagesController = new MessagesController(logger)

messagesRouter.post('./messages', messagesController.create)

export default messagesRouter
