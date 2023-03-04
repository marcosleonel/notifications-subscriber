import type { Request, Response } from 'express'
import { IChannelsController, IChannelsUseCases, ChannelData } from './channels.types';
import ChannelsUseCases from './channels.useCases';
import ChannelsRepository from './channels.repository';

class ChannelsController implements IChannelsController {
  readonly useCases: IChannelsUseCases
  readonly logger

  constructor(logger) {
    this.logger = logger
    this.useCases = new ChannelsUseCases(new ChannelsRepository())
  }

  async create (req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'body is required' })
    }

    if (!req.body.name) {
      return res.status(400).json({ message: 'name is required' })
    }

    try {
      const result = await this.useCases.addChannel(req.body as ChannelData)

      if (result.error) throw new Error(`${result.error}`)

      return res.status(201).json({ success: true, message: 'Notification channel created'})
    } catch (error: unknown) {
      this.logger.error(`[ChannelsController.create] error: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }

  async getAll (_, res: Response) {
    try {
      const result = await this.useCases.getAllChannels()

      if (result.error) throw new Error(`${result.error}`)

      return res.status(200).json(result)
    } catch (error: unknown) {
      this.logger.error(`[ChannelsController.getAll]: ${error}`)
      return res.status(500).json({ message: 'An internal error occured' })
    }
  }
}

export default ChannelsController