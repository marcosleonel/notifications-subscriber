import type { Request, Response } from 'express'

import MessagesUseCases from './messages.useCases'
import MessagesRepository from './messages.repository';
import { IMessageController, IMessagesUseCases, MessageData } from './messages.types';

class MessagesController implements IMessageController {
  readonly useCases: IMessagesUseCases
  readonly logger

  constructor(logger) {
    this.logger = logger
    this.useCases = new MessagesUseCases(new MessagesRepository())
  }

  async create (req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'body is required' })
    }

    if (!req.body.category || !req.body.text) {
      return res.status(400).json({ message: 'category and text are required' })
    }

    try {
      const result = await this.useCases.addMessage(req.body as MessageData)

      if (result.error) throw new Error(`${result.error}`)

      return res.status(201).json({ success: true, message: 'Notification message created'})
    } catch (error: unknown) {
      this.logger.error(`[MessagesController.create] error: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }

  async getAll (_, res: Response) {
    try {
      const result = await this.useCases.getAllMessages()

      if (result.error) throw new Error(`${result.error}`)

      return res.status(200).json(result)
    } catch (error: unknown) {
      this.logger.error(`[MessagesController.getAll]: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }
}

export default MessagesController