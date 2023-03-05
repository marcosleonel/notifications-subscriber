import { Router } from 'express'

import MessagesController from './messages.controller'

const messagesRouter = Router()
const messagesController = new MessagesController()

messagesRouter.get('/messages', messagesController.getAll)
messagesRouter.post('/messages', messagesController.create)

export default messagesRouter
