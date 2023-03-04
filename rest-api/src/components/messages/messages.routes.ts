import { Router } from 'express'

import MessagesController from './messages.controller'

const messagesRouter = Router()
const messagesController = new MessagesController()

messagesRouter.post('/messages', messagesController.create)

export default messagesRouter
